from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class SearchComponent(BaseTool):
    name = "search_component"
    description = "在嘉立创元件库中搜索指定型号或关键词，返回匹配的元件列表"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        # params: {"keyword": "STM32F103", "limit": 10}
        return self._bridge.call("search_component", params)
