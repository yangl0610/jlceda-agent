"""
Python WebSocket 桥接服务（顶替 sengbin/JLCEDA-MCP 的 mcp-hub）。

它在 `ws://<host>:<port>/bridge/ws` 上实现「桥接服务端」协议，等嘉立创EDA里的
官方 **mcp-bridge** 扩展主动拨入；握手成功并选为 active 后，即可把工具调用包成
`bridge/task` 下发给插件，由插件调真实 `eda.*` API 执行，再经 `bridge/result` 回传。

因此你**无需自建/构建任何EDA扩展**——装官方 mcp-bridge 插件、把它的桥接地址指向
本服务（默认 ws://127.0.0.1:8765/bridge/ws，连地址都不用改），再跑本服务即可。

同一端口上，本项目的 Agent 走另一条路径（默认 /agent）提交 {path, payload}，
本服务转成 bridge/task 派发给插件，把结果回给 Agent。

协议要点（依据 mcp-bridge / mcp-hub 源码实现）：
  客户端(插件)->服务端: bridge/hello, bridge/heartbeat, bridge/ready, bridge/result, bridge/log
  服务端->客户端:        bridge/welcome, bridge/role, bridge/heartbeat-ack, bridge/task, bridge/error
  - hello 后必须尽快回 welcome（插件握手超时 5s）；
  - 选主后下发 role(active)，插件仅在 active 角色执行任务；
  - 每个 heartbeat 都要回 heartbeat-ack（插件 5s 无服务端活动即判定掉线）；
  - 收到 ready 后才可派任务；task.leaseTerm 必须等于下发 role 时的 leaseTerm。

启动：python bridge/server.py
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import time
from datetime import datetime, timezone
from dataclasses import dataclass, field

import websockets

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(level=logging.INFO, format="%(asctime)s [bridge] %(message)s")

BRIDGE_PATH = "/bridge/ws"  # 官方 mcp-bridge 默认拨入路径
AGENT_PATH = "/agent"        # 本项目 Agent 提交工具调用的路径


@dataclass
class Peer:
    client_id: str
    socket: object
    connected_at: float
    ready: bool = False


# 已连接的桥接插件（按 clientId）
_peers: dict[str, Peer] = {}
_socket_to_client: dict[object, str] = {}
_active_client_id: str = ""
_lease_term: int = 0

# 待回收的任务结果（requestId -> Future）
_pending: dict[str, asyncio.Future] = {}
_req_seq: int = 0

# 当存在「已就绪的 active 插件」时置位，供 Agent 调用等待
_active_event: asyncio.Event | None = None


def _now_ms() -> int:
    return int(time.time() * 1000)


def _iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _get_event() -> asyncio.Event:
    global _active_event
    if _active_event is None:
        _active_event = asyncio.Event()
    return _active_event


def _refresh_active_event() -> None:
    peer = _peers.get(_active_client_id)
    if peer is not None and peer.ready:
        _get_event().set()
    else:
        _get_event().clear()


async def _send(socket, message: dict) -> None:
    await socket.send(json.dumps(message))


def _elect_active() -> bool:
    """无 active 时选最早连接的插件为 active，租期 +1。返回是否发生改选。"""
    global _active_client_id, _lease_term
    if _active_client_id and _active_client_id in _peers:
        return False
    if not _peers:
        _active_client_id = ""
        return False
    earliest = min(_peers.values(), key=lambda p: (p.connected_at, p.client_id))
    _active_client_id = earliest.client_id
    _lease_term += 1
    return True


async def _broadcast_roles(reason: str) -> None:
    for peer in list(_peers.values()):
        role = "active" if peer.client_id == _active_client_id else "standby"
        try:
            await _send(peer.socket, {
                "type": "bridge/role",
                "clientId": peer.client_id,
                "role": role,
                "leaseTerm": _lease_term,
                "activeClientId": _active_client_id,
                "reason": reason,
            })
        except Exception:
            pass


async def handle_bridge(websocket) -> None:
    """处理嘉立创EDA里的 mcp-bridge 插件连接（/bridge/ws）。"""
    client_id = ""
    try:
        async for raw in websocket:
            data = json.loads(raw)
            mtype = data.get("type")

            if mtype == "bridge/hello":
                client_id = str(data.get("clientId") or "")
                _peers[client_id] = Peer(client_id, websocket, time.time())
                _socket_to_client[websocket] = client_id
                await _send(websocket, {
                    "type": "bridge/welcome",
                    "clientId": client_id,
                    "connectedAt": _iso(),
                })
                _elect_active()
                await _broadcast_roles("client connected")
                _refresh_active_event()
                logging.info("mcp-bridge 已握手: %s (active=%s)", client_id, _active_client_id)

            elif mtype == "bridge/heartbeat":
                await _send(websocket, {
                    "type": "bridge/heartbeat-ack",
                    "clientId": data.get("clientId"),
                    "sentAt": data.get("sentAt"),
                    "receivedAt": _iso(),
                })

            elif mtype == "bridge/ready":
                peer = _peers.get(client_id)
                if peer is not None:
                    peer.ready = True
                _refresh_active_event()
                logging.info("mcp-bridge 执行链路就绪: %s", client_id)

            elif mtype == "bridge/result":
                req_id = str(data.get("requestId") or "")
                fut = _pending.get(req_id)
                if fut is not None and not fut.done():
                    fut.set_result(data)

            elif mtype == "bridge/log":
                pass  # 插件日志，忽略

    except websockets.ConnectionClosed:
        pass
    finally:
        await _remove_peer(websocket, client_id)


async def _remove_peer(websocket, client_id: str) -> None:
    global _active_client_id
    _socket_to_client.pop(websocket, None)
    peer = _peers.get(client_id)
    if peer is not None and peer.socket is websocket:
        _peers.pop(client_id, None)
    if client_id and client_id == _active_client_id:
        _active_client_id = ""
        # 拒绝该插件名下未完成的任务
        for rid, fut in list(_pending.items()):
            if not fut.done():
                fut.set_result({"error": {"message": "EDA bridge 连接已断开"}})
        _elect_active()
        await _broadcast_roles("active disconnected")
    _refresh_active_event()
    if client_id:
        logging.info("mcp-bridge 已断开: %s", client_id)


async def _dispatch_task(path: str, payload: dict, timeout: float = 30.0):
    """把一次工具调用包成 bridge/task 派给 active 插件，等回 bridge/result。"""
    global _req_seq
    try:
        await asyncio.wait_for(_get_event().wait(), timeout=10)
    except asyncio.TimeoutError:
        raise RuntimeError("嘉立创EDA扩展(mcp-bridge)未连接或未就绪，请在EDA中打开工程并确认桥接已连上本服务")

    peer = _peers.get(_active_client_id)
    if peer is None or not peer.ready:
        raise RuntimeError("EDA bridge 未就绪")

    _req_seq += 1
    req_id = f"bridge_req_{_now_ms()}_{_req_seq}"
    fut: asyncio.Future = asyncio.get_event_loop().create_future()
    _pending[req_id] = fut
    try:
        await _send(peer.socket, {
            "type": "bridge/task",
            "requestId": req_id,
            "path": path,
            "payload": payload,
            "createdAt": _now_ms(),
            "leaseTerm": _lease_term,
        })
        reply = await asyncio.wait_for(fut, timeout=timeout)
    except asyncio.TimeoutError:
        raise RuntimeError("EDA 任务响应超时")
    finally:
        _pending.pop(req_id, None)

    err = reply.get("error")
    if err:
        msg = err.get("message") if isinstance(err, dict) else str(err)
        raise RuntimeError(msg or "EDA 任务执行出错")
    return reply.get("result")


async def handle_agent(websocket, first: dict) -> None:
    """处理本项目 Agent 的工具调用（/agent）：{path, payload} -> {result|error}。"""
    data = first
    while True:
        path = data.get("path") or ""
        payload = data.get("payload") or {}
        timeout = float(data.get("timeout") or 30)
        try:
            result = await _dispatch_task(path, payload, timeout)
            await _send(websocket, {"result": result})
        except Exception as e:  # noqa: BLE001 - 回传给 Agent
            await _send(websocket, {"error": str(e)})
        try:
            raw = await websocket.recv()
        except websockets.ConnectionClosed:
            break
        data = json.loads(raw)


def _request_path(websocket) -> str:
    req = getattr(websocket, "request", None)
    if req is not None and getattr(req, "path", None):
        return req.path.split("?")[0]
    return getattr(websocket, "path", "/").split("?")[0]


async def router(websocket) -> None:
    path = _request_path(websocket)
    if path == BRIDGE_PATH:
        await handle_bridge(websocket)
    else:
        first = json.loads(await websocket.recv())
        await handle_agent(websocket, first)


async def main() -> None:
    host = os.getenv("BRIDGE_HOST", "127.0.0.1")
    port = int(os.getenv("BRIDGE_PORT", "8765"))
    logging.info("桥接服务监听 ws://%s:%d%s (EDA插件) 与 %s (Agent)", host, port, BRIDGE_PATH, AGENT_PATH)
    async with websockets.serve(router, host, port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
