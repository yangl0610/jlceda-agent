from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class GetSchematicInfo(BaseTool):
    name = "get_schematic_info"
    description = "读取当前原理图页面的完整电路语义快照（元件、网络、连接等）"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        # 走官方 mcp-bridge 的高层路径，返回插件构造好的电路快照
        return self._bridge.task("/bridge/jlceda/schematic/read", {})
