"""Agent 能力回测脚本（手动联调用，非 pytest）。

依次用一组「从易到难」的真实设计提示词驱动 agent.run()，打印每条的
Thought/Action/Observation 全过程与最终回复，用于判断：
  - agent 是否选对了工具
  - 现有工具是否覆盖该需求（缺失时 agent 会幻觉 API 或答非所问）

用法（必须在 conda 环境 jlceda 里，确保 EDA 桥接已连）：
    python -m tests.agent_eval
    python -m tests.agent_eval 5      # 只跑第 5 条
"""
from __future__ import annotations

import os
import sys

from dotenv import load_dotenv

load_dotenv()

from src.main import build_agent

# (编号, 难度, 提示词)；从易到难，覆盖真实 EDA 设计流程
PROMPTS = [
    ("E1", "易", "当前原理图一共有多少个元件？多少个网络？"),
    ("E2", "易", "原理图里有没有 STM32 或主控芯片？型号是什么？"),
    ("E3", "易", "帮我在元件库里搜索 100nF 0402 贴片电容，给几个候选。"),
    ("M1", "中", "对当前原理图跑一次 DRC 检查，有没有错误？"),
    ("M2", "中", "把当前原理图的元件按型号+封装归并，生成一份 BOM 物料清单，告诉我有多少种料、每种几个。"),
    ("M3", "中", "导出当前原理图的网表（netlist），列出主要电源网络都连了哪些元件。"),
    ("H1", "难", "对当前 PCB 跑 DRC，检查有没有未布线的飞线或间距违规。"),
    ("H2", "难", "帮我对当前 PCB 做自动布线。"),
    ("H3", "难", "导出当前 PCB 的 Gerber 制造文件，用于发给嘉立创打样。"),
    ("H4", "难", "导出贴片坐标文件（pick and place），用于 SMT 贴片。"),
]


def main() -> None:
    only = sys.argv[1] if len(sys.argv) > 1 else None
    agent = build_agent()  # verbose 默认开
    print(f"\n模型: {agent.llm._model} | 已注册工具: {[t.name for t in agent.tools.all()]}\n")

    for pid, level, prompt in PROMPTS:
        if only and only not in (pid, level):
            continue
        print("\n" + "=" * 78)
        print(f"【{pid} · {level}】{prompt}")
        print("=" * 78)
        agent.history.clear()  # 每条独立，互不污染
        try:
            answer = agent.run(prompt)
        except Exception as e:  # noqa: BLE001
            answer = f"<运行异常> {e!r}"
        print(f"\n>>> 最终回复: {answer}")


if __name__ == "__main__":
    main()
