from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class SearchComponent(BaseTool):
    name = "search_component"
    description = "在嘉立创元件库中搜索器件候选项。参数: keyword*(关键词), limit(2-20)"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        keyword = params.get("keyword", "")
        limit = params.get("limit", 20)
        return self._bridge.task(
            "/bridge/jlceda/component/select",
            {"keyword": keyword, "limit": limit, "page": 1},
        )
