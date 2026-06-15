from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


class InvokeEdaApi(BaseTool):
    name = "invoke_eda_api"
    description = (
        "调用任意嘉立创EDA API（通用通道，可用于 BOM、网表、规则检查等）。"
        "参数: apiFullName*(如 eda.sch_ManufactureData.getAllNets), args(参数数组，无参传 [])"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        api_full_name = params.get("apiFullName") or params.get("api") or ""
        args = params.get("args") or []
        if not isinstance(args, list):
            args = [args]
        return self._bridge.invoke(api_full_name, *args)
