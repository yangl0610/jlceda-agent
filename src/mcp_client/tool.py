"""把 mcp-hub 动态发现的每个 MCP 工具适配成 Agent 的 BaseTool。

工具名、描述、参数 schema 都来自 hub 的运行时声明（list_tools），
因此无需在我们这边硬编码 hub 的工具名——hub 升级新增工具会自动出现在 Agent 里。
"""
from __future__ import annotations

from typing import Any

from src.tools.base import BaseTool
from src.mcp_client.backend import McpBackend


class McpTool(BaseTool):
    def __init__(self, backend: McpBackend, name: str, description: str, schema: dict | None):
        self._backend = backend
        self._name = name
        self._description = _with_params(description, schema)

    @property
    def name(self) -> str:
        return self._name

    @property
    def description(self) -> str:
        return self._description

    def run(self, params: dict[str, Any]) -> Any:
        return self._backend.call_tool(self._name, params or {})


def _with_params(description: str, schema: dict | None) -> str:
    """把 inputSchema 的参数名/必填提示拼进描述，帮模型正确构造 params。"""
    description = (description or "").strip()
    props = (schema or {}).get("properties") or {}
    if not props:
        return description
    required = set((schema or {}).get("required") or [])
    fields = []
    for key, spec in props.items():
        typ = spec.get("type", "any") if isinstance(spec, dict) else "any"
        mark = "*" if key in required else ""
        fields.append(f"{key}{mark}:{typ}")
    hint = "参数: " + ", ".join(fields) + "（*为必填）"
    return f"{description}（{hint}）" if description else hint


def load_mcp_tools(backend: McpBackend) -> list[McpTool]:
    tools = []
    for t in backend.list_tools():
        schema = getattr(t, "inputSchema", None)
        tools.append(McpTool(backend, t.name, getattr(t, "description", "") or "", schema))
    return tools
