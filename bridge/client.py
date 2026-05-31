from __future__ import annotations

import asyncio
import json
import os
from typing import Any

import websockets


class BridgeClient:
    """Sync wrapper around the async WebSocket bridge to JLCEDA."""

    def __init__(self):
        host = os.getenv("BRIDGE_HOST", "localhost")
        port = os.getenv("BRIDGE_PORT", "9527")
        self._uri = f"ws://{host}:{port}"

    def call(self, tool: str, params: dict[str, Any]) -> Any:
        return asyncio.run(self._async_call(tool, params))

    async def _async_call(self, tool: str, params: dict[str, Any]) -> Any:
        async with websockets.connect(self._uri) as ws:
            await ws.send(json.dumps({"tool": tool, "params": params}))
            response = await ws.recv()
            data = json.loads(response)
            if data.get("error"):
                raise RuntimeError(data["error"])
            return data.get("result")
