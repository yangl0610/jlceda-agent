"""Entry point for the JLCEDA Agent."""
from __future__ import annotations

import os
from dotenv import load_dotenv

from src.agent import AgentCore
from src.llm import LLMClient
from src.llm.client import build_openai_client
from src.tools import (
    ToolRegistry,
    GetSchematicInfo,
    SearchComponent,
    RunDRC,
    InvokeEdaApi,
    AnalyzeImage,
)
from bridge.client import BridgeClient

load_dotenv()


def _register_eda_tools(tools: ToolRegistry) -> None:
    """根据 TOOL_BACKEND 选择 EDA 工具来源：

    - mcp   ：Agent 作为 MCP Client 连官方 mcp-hub，动态发现并注册它暴露的工具
              （真连真 EDA，推荐；需先装 mcp-bridge + mcp-hub，见 README）。
    - bridge：用本仓库自带的 WebSocket 桥（bridge/server.py + 自研扩展/mock）。
    """
    backend = os.getenv("TOOL_BACKEND", "bridge").lower()
    if backend == "mcp":
        from src.mcp_client import McpBackend, load_mcp_tools

        mcp = McpBackend()
        discovered = load_mcp_tools(mcp)
        for t in discovered:
            tools.register(t)
        names = ", ".join(t.name for t in discovered) or "(无)"
        print(f"[MCP] 已连接 mcp-hub，发现 {len(discovered)} 个工具：{names}")
        return

    bridge = BridgeClient()
    tools.register(GetSchematicInfo(bridge))
    tools.register(SearchComponent(bridge))
    tools.register(RunDRC(bridge))
    tools.register(InvokeEdaApi(bridge))


def build_agent() -> AgentCore:
    llm = LLMClient()
    tools = ToolRegistry()
    _register_eda_tools(tools)

    # 视觉工具单独使用一个多模态 provider（默认 OpenRouter→MiniMax，
    # 可用 VISION_PROVIDER / VISION_MODEL 覆盖）。仅在配置了对应 Key 时启用。
    vision_provider = os.getenv("VISION_PROVIDER", "openrouter")
    try:
        vision_client, default_vision_model = build_openai_client(vision_provider)
        vision_model = os.getenv("VISION_MODEL", default_vision_model)
        tools.register(AnalyzeImage(vision_client, model=vision_model))
    except RuntimeError as e:
        print(f"[提示] 视觉工具未启用：{e}")

    max_steps = int(os.getenv("MAX_STEPS", "10"))
    max_history = int(os.getenv("MAX_HISTORY", "20"))
    return AgentCore(llm=llm, tools=tools, max_steps=max_steps, max_history=max_history)


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
