from __future__ import annotations

import json
from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


def read_snapshot(bridge: BridgeClient, timeout: float = 30.0) -> dict:
    """读取并解析当前原理图的电路语义快照（供 BOM / 网表等工具复用）。

    桥接返回的 schematicCircuitSnapshot 是一段 JSON 字符串，这里统一解析成 dict。
    若当前激活文档不是原理图，桥接会抛错（doctype 不支持），原样向上传递。
    """
    raw = bridge.task("/bridge/jlceda/schematic/read", {}, timeout)
    snap = raw.get("schematicCircuitSnapshot") if isinstance(raw, dict) else raw
    if isinstance(snap, str):
        snap = json.loads(snap)
    if not isinstance(snap, dict):
        raise RuntimeError("无法解析原理图快照（当前激活文档可能不是原理图页面）")
    return snap


class GetSchematicInfo(BaseTool):
    name = "get_schematic_info"
    description = "读取当前原理图页面的完整电路语义快照（元件、网络、连接等）"

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        # 走官方 mcp-bridge 的高层路径，返回插件构造好的电路快照
        return self._bridge.task("/bridge/jlceda/schematic/read", {})
