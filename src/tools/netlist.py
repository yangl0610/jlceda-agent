from __future__ import annotations

from typing import Any
from src.tools.base import BaseTool
from src.tools.schematic import read_snapshot
from bridge.client import BridgeClient

# 常见电源/地网络名（用于 power_only 过滤与高亮）
_POWER_HINTS = ("VBUS", "VCC", "VDD", "VSS", "GND", "AGND", "DGND", "V+", "V-", "3V3", "5V", "1V", "2V")


def _is_power(name: str) -> bool:
    n = name.upper()
    return any(h in n for h in _POWER_HINTS)


class GetNetlist(BaseTool):
    name = "get_netlist"
    description = (
        "导出当前原理图的网表：列出每个网络连接了哪些元件引脚。"
        "params: {power_only: 仅返回电源/地网络(默认false), limit: 最多返回网络数(默认50)}。"
        "返回 {total_nets, nets:[{net, pin_count, pins:[...]}]}"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        power_only = bool(params.get("power_only", False))
        limit = int(params.get("limit", 50))

        snap = read_snapshot(self._bridge)
        nets = []
        for net in snap.get("networks", []):
            name = net.get("networkName") or ""
            pins = net.get("connectedPinRefs") or []
            if power_only and not _is_power(name):
                continue
            nets.append({
                "net": name,
                "is_power": _is_power(name),
                "pin_count": len(pins),
                "pins": pins,
            })
        # 引脚多的网络通常更重要，排前面
        nets.sort(key=lambda n: -n["pin_count"])
        return {"total_nets": len(nets), "nets": nets[:limit]}
