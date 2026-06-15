"""测试用的最小 MCP 服务（stdio）。

不依赖嘉立创EDA，仅用于验证 src/mcp_client 的客户端封装（list_tools / call_tool）
是否能正确连上一个真实的 MCP 服务并跑通工具调用。相当于 MCP 版的 mock_eda。
"""
from __future__ import annotations

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("jlceda-agent-test-echo")


@mcp.tool()
def echo(text: str) -> str:
    """原样回显传入的文本。"""
    return f"echo: {text}"


@mcp.tool()
def add(a: int, b: int) -> int:
    """返回 a 与 b 的和。"""
    return a + b


if __name__ == "__main__":
    mcp.run()  # 默认 stdio 传输
