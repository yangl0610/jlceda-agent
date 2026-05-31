from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class GenerateBOM(BaseTool):
    name = "generate_bom"
    description = "生成当前原理图的物料清单（BOM），包含元件型号、数量、封装信息"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        # params: {"format": "json" | "csv"}
        return self._bridge.call("generate_bom", params)
