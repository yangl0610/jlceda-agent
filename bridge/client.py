from __future__ import annotations

import asyncio
import json
import os
from typing import Any

import websockets


class BridgeClient:
    """Agent 侧的同步客户端：把工具调用发给桥接服务（bridge/server.py），
    由服务转成 bridge/task 派给 EDA 里的 mcp-bridge 插件执行。

    用法：
        BridgeClient().task("/bridge/jlceda/schematic/read", {})
        BridgeClient().invoke("eda.sch_Drc.check", False, False, True)
    """

    def __init__(self):
        host = os.getenv("BRIDGE_HOST", "127.0.0.1")
        port = os.getenv("BRIDGE_PORT", "8765")
        self._uri = f"ws://{host}:{port}/agent"

    def task(self, path: str, payload: dict[str, Any] | None = None, timeout: float = 30.0) -> Any:
        """调用一个桥接 path（见 mcp-bridge 的任务路由），返回插件回传的 result。"""
        return asyncio.run(self._call(path, payload or {}, timeout))

    def invoke(self, api_full_name: str, *args: Any, timeout: float = 30.0) -> Any:
        """通用通道：调用任意 eda.<模块>.<方法>(...args)，返回 {apiFullName, result}。"""
        return self.task(
            "/bridge/jlceda/api/invoke",
            {"apiFullName": api_full_name, "args": list(args)},
            timeout,
        )

    async def _call(self, path: str, payload: dict[str, Any], timeout: float) -> Any:
        async with websockets.connect(self._uri) as ws:
            await ws.send(json.dumps({"path": path, "payload": payload, "timeout": timeout}))
            data = json.loads(await ws.recv())
            if data.get("error"):
                raise RuntimeError(data["error"])
            return data.get("result")
