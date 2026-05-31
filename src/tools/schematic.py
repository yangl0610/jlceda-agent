from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class GetSchematicInfo(BaseTool):
    name = "get_schematic_info"
    description = "获取当前原理图中的元件列表、网络连接和引脚信息"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        return self._bridge.call("get_schematic_info", params)
