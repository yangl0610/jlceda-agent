from __future__ import annotations

import json
from typing import Any

from src.agent.parser import ReActParser, AgentAction, FinalAnswer
from src.agent.memory import HistoryManager
from src.llm.client import LLMClient
from src.tools import ToolRegistry


SYSTEM_PROMPT_TEMPLATE = """\
你是一个嘉立创EDA设计助手。你可以调用以下工具帮助用户完成PCB/原理图相关任务：

{tool_descriptions}

每次响应必须严格遵循以下格式之一：

格式A（需要调用工具时）：
Thought: <你的分析和下一步计划>
Action: {{"tool": "<工具名>", "params": {{<参数>}}}}

格式B（任务已完成时）：
Thought: <最终分析>
Final Answer: <给用户的完整回复>

规则：
- 每次只能输出一个 Action 或一个 Final Answer
- Action 的 JSON 必须格式正确
- 工具名必须是上面列出的工具之一
- 不要编造工具不存在的功能
"""


class AgentCore:
    def __init__(
        self,
        llm: LLMClient,
        tools: ToolRegistry,
        max_steps: int = 10,
        max_history: int = 20,
    ):
        self.llm = llm
        self.tools = tools
        self.max_steps = max_steps
        self.history = HistoryManager(max_history)
        self.parser = ReActParser()

    def _build_system_prompt(self) -> str:
        descriptions = "\n".join(
            f"- {t.name}: {t.description}" for t in self.tools.all()
        )
        return SYSTEM_PROMPT_TEMPLATE.format(tool_descriptions=descriptions)

    def run(self, user_input: str) -> str:
        self.history.add("user", user_input)

        for step in range(self.max_steps):
            messages = [
                {"role": "system", "content": self._build_system_prompt()},
                *self.history.get(),
            ]
            raw = self.llm.chat(messages)
            self.history.add("assistant", raw)

            parsed = self.parser.parse(raw)

            if isinstance(parsed, FinalAnswer):
                return parsed.text

            if isinstance(parsed, AgentAction):
                result = self._execute(parsed)
                observation = f"工具 {parsed.tool} 返回结果：\n{result}"
                self.history.add("user", observation)

        return "已达到最大步数限制，任务未能完成，请尝试更明确的指令。"

    def _execute(self, action: AgentAction) -> Any:
        try:
            return self.tools.run(action.tool, action.params)
        except Exception as e:
            return f"工具执行失败：{e}"
