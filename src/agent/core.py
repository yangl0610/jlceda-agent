from __future__ import annotations

import json
import re
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
- 每次**只输出一个** Thought + 一个 Action（或一个 Final Answer），然后**立即停止**，
  等待系统返回工具结果后再继续。**绝不要**在一次回复里脑补/预演后续的多个步骤。
- Action 的 JSON 必须格式正确，tool 必须是上面列出的工具之一。
- 优先使用上面列出的专用工具；不要凭空编造 eda.* API 名。只有在没有合适专用工具时，
  才用 invoke_eda_api 兜底。
- 工具分原理图侧（get_schematic_info / generate_bom / get_netlist / run_drc 等）与 PCB 侧
  （run_pcb_drc / export_gerber / export_pick_place / auto_route）。若工具返回"文档类型不支持"，
  说明当前激活的不是该工具所需的页面，应如实告知用户切换到对应的原理图或 PCB 页面。
- 嘉立创EDA没有一键自动布线的直接 API，被问到自动布线时使用 auto_route 工具并如实说明。
- 需要外部资料（元器件数据手册、引脚定义、参考电路、开源设计、布局布线规范等）时，
  用 web_search 联网检索，并在回答中引用来源链接；分析原理图/PCB 截图用 analyze_image。

【PCB 布局辅助工作流】当用户要你帮忙调整器件位置/布局时，严格按此步骤：
  1) 先 get_pcb_layout 读取当前布局；必要时 analyze_image 看截图、web_search 查布局规范；
  2) 给出**具体的移动建议清单**（哪个位号 → 目标坐标/相对位移/旋转，并说明理由）；
  3) **每一次实际移动前都必须先得到用户明确确认**，确认后才调用 move_component 执行一个；
     绝不在用户未确认时擅自调用 move_component 批量移动器件。
"""


_THOUGHT_RE = re.compile(r"Thought:\s*(.*?)(?=\n\s*(?:Action|Final Answer)\s*:|$)", re.DOTALL)


class AgentCore:
    def __init__(
        self,
        llm: LLMClient,
        tools: ToolRegistry,
        max_steps: int = 10,
        max_history: int = 20,
        verbose: bool = False,
    ):
        self.llm = llm
        self.tools = tools
        self.max_steps = max_steps
        self.history = HistoryManager(max_history)
        self.parser = ReActParser()
        self.verbose = verbose

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
            self._trace(step, raw, parsed)

            if isinstance(parsed, FinalAnswer):
                return parsed.text

            if isinstance(parsed, AgentAction):
                result = self._execute(parsed)
                observation = f"工具 {parsed.tool} 返回结果：\n{result}"
                self.history.add("user", observation)
                self._trace_observation(result)

        return "已达到最大步数限制，任务未能完成，请尝试更明确的指令。"

    def _trace(self, step: int, raw: str, parsed: AgentAction | FinalAnswer) -> None:
        """打印一步的思考与决策（仅 verbose 时）。"""
        if not self.verbose:
            return
        print(f"\n──── Step {step + 1}/{self.max_steps} ────")
        if m := _THOUGHT_RE.search(raw):
            thought = m.group(1).strip()
            if thought:
                print(f"🤔 Thought: {thought}")
        if isinstance(parsed, AgentAction):
            params = json.dumps(parsed.params, ensure_ascii=False)
            print(f"🔧 Action: {parsed.tool}({params})")
        elif isinstance(parsed, FinalAnswer):
            print("✅ Final Answer")

    def _trace_observation(self, result: Any) -> None:
        if not self.verbose:
            return
        text = result if isinstance(result, str) else json.dumps(result, ensure_ascii=False)
        if len(text) > 500:
            text = text[:500] + f" …(共 {len(text)} 字，已截断)"
        print(f"👀 Observation: {text}")

    def _execute(self, action: AgentAction) -> Any:
        try:
            return self.tools.run(action.tool, action.params)
        except Exception as e:
            return f"工具执行失败：{e}"
