"""Entry point for the JLCEDA Agent."""
from __future__ import annotations

import os
from dotenv import load_dotenv

from src.agent import AgentCore
from src.llm import LLMClient
from src.tools import ToolRegistry, GetSchematicInfo, SearchComponent, RunDRC, GenerateBOM
from bridge.client import BridgeClient

load_dotenv()


def build_agent() -> AgentCore:
    llm = LLMClient()
    bridge = BridgeClient()
    tools = ToolRegistry()
    tools.register(GetSchematicInfo(bridge))
    tools.register(SearchComponent(bridge))
    tools.register(RunDRC(bridge))
    tools.register(GenerateBOM(bridge))
    return AgentCore(llm=llm, tools=tools)


def main():
    agent = build_agent()
    print("JLCEDA Agent 已启动。输入 'quit' 退出。\n")
    while True:
        user_input = input("你: ").strip()
        if user_input.lower() in ("quit", "exit", "q"):
            break
        if not user_input:
            continue
        response = agent.run(user_input)
        print(f"\nAgent: {response}\n")


if __name__ == "__main__":
    main()
