"""
Mock 版的 mcp-bridge（无需嘉立创EDA）。

它以**客户端**身份连上 bridge/server.py 的 /bridge/ws，完整跑官方握手流程
（hello -> welcome -> role -> ready），并对收到的 bridge/task 用内置假数据应答，
回 bridge/result。用于在没有真实 EDA 的情况下端到端联调/测试整条桥接链路。

真实插件的对外协议与此一致，因此 Agent/服务端零改动即可切到真实 EDA。

直接运行：python bridge/mock_bridge.py   （默认连 ws://127.0.0.1:8765/bridge/ws）
"""
from __future__ import annotations

import asyncio
import json
import os
import time

import websockets

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# 假数据：模拟一份原理图快照
_SCHEMATIC = {
    "components": [
        {"id": "U1", "name": "STM32F103C8T6", "value": "", "package": "LQFP-48"},
        {"id": "R1", "name": "Resistor", "value": "10k", "package": "R0402"},
        {"id": "C1", "name": "Capacitor", "value": "100nF", "package": "C0402"},
    ],
    "nets": ["VCC", "GND", "SWDIO", "SWCLK"],
}

_CANDIDATES = [
    {"uuid": "u-stm32-1", "libraryUuid": "lib-1", "name": "STM32F103C8T6",
     "symbolName": "STM32F103C8T6", "footprintName": "LQFP-48", "description": "ARM MCU",
     "manufacturer": "ST", "manufacturerId": "STM32F103C8T6", "supplier": "LCSC",
     "supplierId": "C8734", "lcscInventory": 9999, "lcscPrice": 1.23},
    {"uuid": "u-stm32-2", "libraryUuid": "lib-1", "name": "STM32F103RCT6",
     "symbolName": "STM32F103RCT6", "footprintName": "LQFP-64", "description": "ARM MCU",
     "manufacturer": "ST", "manufacturerId": "STM32F103RCT6", "supplier": "LCSC",
     "supplierId": "C8323", "lcscInventory": 5000, "lcscPrice": 2.34},
]


def _dispatch(path: str, payload: dict):
    """返回 (result, error)；error 为 None 表示成功。"""
    if path == "/bridge/jlceda/schematic/read":
        return _SCHEMATIC, None
    if path == "/bridge/jlceda/schematic/review":
        return {"netlists": [{"page": "Sheet1", "nets": _SCHEMATIC["nets"]}]}, None
    if path == "/bridge/jlceda/component/select":
        keyword = str(payload.get("keyword", ""))
        cands = [c for c in _CANDIDATES if keyword.lower() in c["name"].lower()] or _CANDIDATES
        limit = int(payload.get("limit", 20))
        return {
            "ok": True,
            "selection": {
                "title": "器件选型", "description": f"关键词: {keyword}",
                "candidates": cands[:limit], "pageSize": limit, "currentPage": 1,
            },
        }, None
    if path == "/bridge/jlceda/api/invoke":
        api = str(payload.get("apiFullName", ""))
        args = payload.get("args", [])
        if api == "eda.sch_Drc.check":
            return {"apiFullName": api, "result": []}, None  # 无 DRC 问题
        return {"apiFullName": api, "result": {"echo": args}}, None
    return None, {"message": f"不支持的桥接路径: {path}"}


async def serve(uri: str, ready: asyncio.Event | None = None) -> None:
    client_id = f"mock_{int(time.time() * 1000)}"
    async with websockets.connect(uri) as ws:
        await ws.send(json.dumps({
            "type": "bridge/hello", "clientId": client_id, "bridgeVersion": "mock-0.1.0",
        }))
        async for raw in ws:
            data = json.loads(raw)
            mtype = data.get("type")
            if mtype == "bridge/welcome":
                await ws.send(json.dumps({
                    "type": "bridge/ready", "clientId": client_id, "readyAt": int(time.time() * 1000),
                }))
                if ready is not None:
                    ready.set()
            elif mtype == "bridge/task":
                result, error = _dispatch(data.get("path", ""), data.get("payload") or {})
                msg = {
                    "type": "bridge/result", "clientId": client_id,
                    "requestId": data.get("requestId"), "leaseTerm": data.get("leaseTerm"),
                }
                if error is not None:
                    msg["error"] = error
                else:
                    msg["result"] = result
                await ws.send(json.dumps(msg))
            # bridge/role, bridge/heartbeat-ack 等无需处理


async def _main() -> None:
    host = os.getenv("BRIDGE_HOST", "127.0.0.1")
    port = os.getenv("BRIDGE_PORT", "8765")
    uri = f"ws://{host}:{port}/bridge/ws"
    print(f"[mock-bridge] connecting to {uri} ...")
    while True:
        try:
            await serve(uri)
        except Exception as e:  # noqa: BLE001
            print(f"[mock-bridge] disconnected ({e}); retry in 2s")
            await asyncio.sleep(2)


if __name__ == "__main__":
    asyncio.run(_main())
