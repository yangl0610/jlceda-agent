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


class ReActParser:
    _ACTION_RE = re.compile(r"Action:\s*(\{.*\})", re.DOTALL)
    _FINAL_RE  = re.compile(r"Final Answer:\s*(.*)", re.DOTALL)

    def parse(self, text: str) -> AgentAction | FinalAnswer:
        if m := self._FINAL_RE.search(text):
            return FinalAnswer(text=m.group(1).strip())

        if m := self._ACTION_RE.search(text):
            try:
                data = json.loads(m.group(1))
                return AgentAction(tool=data["tool"], params=data.get("params", {}))
            except (json.JSONDecodeError, KeyError):
                pass

        # Fallback: treat entire text as a final answer
        return FinalAnswer(text=text.strip())
