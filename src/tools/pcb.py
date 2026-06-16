from __future__ import annotations

import json
from typing import Any
from src.tools.base import BaseTool
from bridge.client import BridgeClient


def _result(reply: Any) -> Any:
    """invoke 返回形如 {apiFullName, result}，取出 result 部分。"""
    if isinstance(reply, dict) and "result" in reply:
        return reply["result"]
    return reply


def _describe_blob(reply: Any) -> dict:
    """制造文件类 API 返回 {kind:'blob', size, type}，转成友好描述。"""
    res = _result(reply)
    if isinstance(res, dict) and res.get("kind") == "blob":
        size = res.get("size", 0)
        return {
            "ok": True,
            "generated": True,
            "size_bytes": size,
            "size_kb": round(size / 1024, 1),
            "mime": res.get("type", ""),
        }
    return {"ok": True, "result": res}


class RunPcbDrc(BaseTool):
    name = "run_pcb_drc"
    description = (
        "对当前 PCB 执行设计规则检查(DRC)，检测未布线飞线、间距违规等。无参数。"
        "需当前工程包含 PCB。返回问题明细列表。"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        # eda.pcb_Drc.check(strict, userInterface, includeVerboseError)
        # 返回形如 [{name, count, list:[明细...], title}]：count 才是该类违规总数，
        # list 只是截断的明细样本且常大量重复，这里按类别汇总并对明细去重。
        reply = self._bridge.invoke("eda.pcb_Drc.check", False, False, True)
        issues = _result(reply)
        categories = []
        total = 0
        for it in issues or []:
            if not isinstance(it, dict):
                continue
            details = it.get("list") or []
            n = it.get("count")
            if not isinstance(n, int):
                n = len(details)
            total += n
            # 明细去重（[MaxDepthExceeded] 这类会重复几十上百次）
            dedup: dict[str, int] = {}
            for d in details:
                key = d if isinstance(d, str) else json.dumps(d, ensure_ascii=False)
                dedup[key] = dedup.get(key, 0) + 1
            categories.append({
                "category": it.get("name") or "未命名",
                "count": n,
                "detail_samples": [{"detail": k, "times": v} for k, v in list(dedup.items())[:5]],
            })
        return {"passed": total == 0, "total_violations": total, "categories": categories}


class ExportGerber(BaseTool):
    name = "export_gerber"
    description = (
        "生成/导出当前 PCB 的 Gerber 制造文件(发嘉立创打样用)。无参数。"
        "需当前工程包含 PCB，建议先通过 run_pcb_drc 确认无误。返回生成文件大小等信息。"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        return _describe_blob(self._bridge.invoke("eda.pcb_ManufactureData.getGerberFile", timeout=60))


class ExportPickPlace(BaseTool):
    name = "export_pick_place"
    description = (
        "生成/导出当前 PCB 的贴片坐标文件(pick and place，用于 SMT 贴片)。无参数。"
        "需当前工程包含 PCB。返回生成文件大小等信息。"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        return _describe_blob(self._bridge.invoke("eda.pcb_ManufactureData.getPickAndPlaceFile", timeout=60))


class GetPcbLayout(BaseTool):
    name = "get_pcb_layout"
    description = (
        "读取当前 PCB 上所有器件的布局：位号、型号、封装、坐标(x,y mil)、旋转角、所在层、是否锁定。"
        "用于分析布局、辅助调整器件位置。无参数。返回 {count, components:[...]}"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        comps = _result(self._bridge.invoke("eda.pcb_PrimitiveComponent.getAll"))
        out = []
        for c in comps or []:
            if not isinstance(c, dict):
                continue
            out.append({
                "designator": c.get("designator"),
                "part": (c.get("component") or {}).get("name"),
                "footprint": (c.get("footprint") or {}).get("name"),
                "x": c.get("x"),
                "y": c.get("y"),
                "rotation": c.get("rotation"),
                "layer": c.get("layer"),
                "locked": c.get("primitiveLock"),
                "primitiveId": c.get("primitiveId"),
            })
        return {"count": len(out), "components": out}


class MoveComponent(BaseTool):
    name = "move_component"
    description = (
        "移动/旋转 PCB 上的某个器件。params: {designator*(位号如C1), x, y(目标坐标mil，省略则不变), "
        "dx, dy(相对位移mil，与x/y二选一), rotation(目标角度，省略则不变)}。"
        "锁定的器件不会被移动。返回 {designator, before, after}。"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def _find(self, designator: str) -> dict | None:
        comps = _result(self._bridge.invoke("eda.pcb_PrimitiveComponent.getAll"))
        for c in comps or []:
            if isinstance(c, dict) and c.get("designator") == designator:
                return c
        return None

    def run(self, params: dict[str, Any]) -> Any:
        designator = params.get("designator")
        if not designator:
            raise ValueError("缺少参数 designator（要移动的器件位号，如 C1）")
        comp = self._find(designator)
        if comp is None:
            raise RuntimeError(f"PCB 上找不到位号为 {designator} 的器件")
        if comp.get("primitiveLock"):
            raise RuntimeError(f"{designator} 已锁定，需先在 EDA 中解锁才能移动")

        before = {"x": comp["x"], "y": comp["y"], "rotation": comp["rotation"]}
        # 目标坐标：绝对 x/y 优先，其次相对 dx/dy，否则保持
        nx = params.get("x", before["x"] + params.get("dx", 0))
        ny = params.get("y", before["y"] + params.get("dy", 0))
        nrot = params.get("rotation", before["rotation"])

        updated = _result(self._bridge.invoke(
            "eda.pcb_PrimitiveComponent.modify",
            comp["primitiveId"], {"x": nx, "y": ny, "rotation": nrot},
        ))
        after = (
            {"x": updated.get("x"), "y": updated.get("y"), "rotation": updated.get("rotation")}
            if isinstance(updated, dict) else {"x": nx, "y": ny, "rotation": nrot}
        )
        return {"designator": designator, "before": before, "after": after}


class AutoRoute(BaseTool):
    name = "auto_route"
    description = (
        "PCB 自动布线。注意：嘉立创EDA未开放一键自动布线的直接API，本工具会导出"
        "自动布线所需的 JSON(供外部布线器/JRouter 使用)，并提示在GUI内完成布线。无参数。"
    )

    def __init__(self, bridge: BridgeClient):
        self._bridge = bridge

    def run(self, params: dict[str, Any]) -> Any:
        info = _describe_blob(self._bridge.invoke("eda.pcb_ManufactureData.getAutoRouteJsonFile", timeout=60))
        return {
            **info,
            "note": (
                "嘉立创EDA没有可直接调用的「一键自动布线」API，已为你导出自动布线所需数据。"
                "如需真正完成布线，请在 PCB 编辑器中使用菜单「布线 → 自动布线」，或将导出的"
                "JSON 交给外部布线器(JRouter 等)处理。"
            ),
        }
