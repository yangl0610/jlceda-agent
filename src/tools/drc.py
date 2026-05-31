from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class RunDRC(BaseTool):
    name = "run_drc"
    description = "对当前原理图执行设计规则检查（DRC），返回错误和警告列表"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        return self._bridge.call("run_drc", params)
