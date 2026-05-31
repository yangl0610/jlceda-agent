from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool


class ToolRegistry:
    def __init__(self):
        self._tools: dict[str, BaseTool] = {}

    def register(self, tool: BaseTool) -> None:
        self._tools[tool.name] = tool

    def all(self) -> list[BaseTool]:
        return list(self._tools.values())

    def run(self, name: str, params: dict[str, Any]) -> Any:
        if name not in self._tools:
            raise ValueError(f"未知工具: {name}。可用工具: {list(self._tools)}")
        return self._tools[name].run(params)
