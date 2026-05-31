"""
Python WebSocket bridge server.
Receives tool calls from AgentCore and forwards them to the JLCEDA extension.
Run this before starting the agent: python bridge/server.py
"""
from __future__ import annotations

import asyncio
import json
import logging
import os

import websockets

logging.basicConfig(level=logging.INFO, format="%(asctime)s [bridge] %(message)s")

# Connected JLCEDA extension clients
_eda_clients: set = set()
# Pending response futures keyed by request id
_pending: dict[str, asyncio.Future] = {}
_counter = 0


async def handle_agent(websocket):
    """Handle incoming calls from the Python agent."""
    global _counter
    async for raw in websocket:
        data = json.loads(raw)
        if not _eda_clients:
            await websocket.send(json.dumps({"error": "嘉立创EDA扩展未连接，请先在EDA中启动桥接扩展"}))
            continue

        _counter += 1
        req_id = str(_counter)
        data["id"] = req_id
        future: asyncio.Future = asyncio.get_event_loop().create_future()
        _pending[req_id] = future

        eda_ws = next(iter(_eda_clients))
        await eda_ws.send(json.dumps(data))

        try:
            result = await asyncio.wait_for(future, timeout=10)
            await websocket.send(json.dumps({"result": result}))
        except asyncio.TimeoutError:
            await websocket.send(json.dumps({"error": "EDA响应超时"}))
        finally:
            _pending.pop(req_id, None)


async def handle_eda(websocket):
    """Handle the persistent connection from the JLCEDA extension."""
    _eda_clients.add(websocket)
    logging.info("嘉立创EDA扩展已连接")
    try:
        async for raw in websocket:
            data = json.loads(raw)
            req_id = data.get("id")
            if req_id and req_id in _pending:
                _pending[req_id].set_result(data.get("result"))
    finally:
        _eda_clients.discard(websocket)
        logging.info("嘉立创EDA扩展已断开")


async def router(websocket):
    first = await websocket.recv()
    data = json.loads(first)
    if data.get("type") == "eda_extension":
        await handle_eda(websocket)
    else:
        await websocket.send(json.dumps({"error": "first message must identify client type"}))


async def main():
    port = int(os.getenv("BRIDGE_PORT", 9527))
    logging.info(f"Bridge server listening on ws://localhost:{port}")
    async with websockets.serve(router, "localhost", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
