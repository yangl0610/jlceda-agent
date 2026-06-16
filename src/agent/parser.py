from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import Any


@dataclass
class AgentAction:
    tool: str
    params: dict[str, Any]


@dataclass
class FinalAnswer:
    text: str


def _extract_balanced_json(text: str, start: int) -> str | None:
    """从 text[start:] 里第一个 '{' 开始，按括号配平截出完整 JSON 对象。

    比贪婪正则可靠：模型一次吐出多个 Action 块时，只取第一个完整对象，
    避免 `\\{.*\\}` 跨块匹配导致整体解析失败。
    """
    i = text.find("{", start)
    if i < 0:
        return None
    depth = 0
    in_str = False
    esc = False
    for j in range(i, len(text)):
        ch = text[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
            continue
        if ch == '"':
            in_str = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[i:j + 1]
    return None


class ReActParser:
    _ACTION_RE = re.compile(r"Action:\s*\{", re.DOTALL)
    _FINAL_RE = re.compile(r"Final Answer:\s*(.*)", re.DOTALL)

    def parse(self, text: str) -> AgentAction | FinalAnswer:
        # 有效 Action 优先：即便模型同时写了 Final Answer，也先执行第一个可解析的工具调用。
        if m := self._ACTION_RE.search(text):
            blob = _extract_balanced_json(text, m.start())
            if blob:
                try:
                    data = json.loads(blob)
                    if "tool" in data:
                        return AgentAction(tool=data["tool"], params=data.get("params", {}))
                except json.JSONDecodeError:
                    pass

        if m := self._FINAL_RE.search(text):
            return FinalAnswer(text=m.group(1).strip())

        # 兜底：整段当作最终回复
        return FinalAnswer(text=text.strip())
