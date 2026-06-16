from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from src.tools.schematic import read_snapshot
from bridge.client import BridgeClient

# 这些"元件"实际是电源端口/网络标号，不应计入 BOM 物料
_NON_PARTS = {"VBUS", "VCC", "VDD", "VSS", "GND", "AGND", "DGND", "+5V", "+3V3", "3V3", "5V"}


class GenerateBOM(BaseTool):
    name = "generate_bom"
    description = (
        "生成当前原理图的 BOM 物料清单：按元件型号(symbol)归并，统计每种料的数量与位号。"
        "无参数。返回 {total_kinds, total_parts, rows:[{part, qty, refs}]}"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        snap = read_snapshot(self._bridge)
        # 按 symbolName 归并，同一位号(designator)只计一次（多 part 元件会重复出现）
        groups: dict[str, set[str]] = {}
        for comp in snap.get("components", []):
            sym = (comp.get("componentSymbolName") or "").strip()
            ref = (comp.get("componentDesignator") or "").strip()
            if not sym or not ref:
                continue
            if ref in _NON_PARTS or sym in _NON_PARTS:
                continue  # 跳过电源端口/网络标号
            groups.setdefault(sym, set()).add(ref)

        rows = [
            {"part": sym, "qty": len(refs), "refs": ",".join(sorted(refs))}
            for sym, refs in sorted(groups.items(), key=lambda kv: -len(kv[1]))
        ]
        return {
            "total_kinds": len(rows),
            "total_parts": sum(r["qty"] for r in rows),
            "rows": rows,
        }
