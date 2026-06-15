"""验证 MCP 客户端封装（方案 A）：以 stdio 连一个真实的最小 MCP 服务，
跑通工具发现与调用，并验证 McpTool 适配器能把 MCP 工具变成 Agent 的 BaseTool。
"""
from __future__ import annotations

import os
import sys

import pytest

from src.mcp_client import McpBackend, load_mcp_tools


@pytest.fixture
def backend():
    server = os.path.join(os.path.dirname(__file__), "mcp_echo_server.py")
    be = McpBackend(transport="stdio", command=sys.executable, args=[server])
    yield be
    be.close()


def test_list_tools(backend):
    names = {t.name for t in backend.list_tools()}
    assert {"echo", "add"} <= names


def test_call_tool_echo(backend):
    result = backend.call_tool("echo", {"text": "hello"})
    assert "echo: hello" in str(result)


def test_call_tool_add(backend):
    result = backend.call_tool("add", {"a": 2, "b": 3})
    assert "5" in str(result)


def test_adapter_to_basetool(backend):
    tools = {t.name: t for t in load_mcp_tools(backend)}
    assert "echo" in tools
    # 描述里应带出参数提示，便于模型构造 params
    assert "text" in tools["echo"].description
    assert "echo: hi" in str(tools["echo"].run({"text": "hi"}))


def test_error_propagates(backend):
    with pytest.raises(RuntimeError):
        backend.call_tool("no_such_tool", {})
