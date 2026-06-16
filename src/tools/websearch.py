from __future__ import annotations

import json
import os
from typing import Any

from src.tools.base import BaseTool


class WebSearch(BaseTool):
    """联网搜索工具：复用项目的 McpBackend 连 MiniMax 的 coding-plan MCP，
    调它的 web_search（参见 platform.minimaxi.com/docs/token-plan/mcp-guide）。

    懒加载：首次调用时才拉起 `uvx minimax-coding-plan-mcp`，避免拖慢 Agent 启动、
    也避免未用到时无谓占用子进程。
    """

    name = "web_search"
    description = (
        "联网搜索开源设计、元器件数据手册、参考电路、布局布线最佳实践等外部资料。"
        "params: {query*: 搜索关键词(3-5个词最佳)}。返回若干结果(标题/链接/摘要)。"
    )

    def __init__(self):
        self._backend = None

    def _get_backend(self):
        if self._backend is None:
            from src.mcp_client.backend import McpBackend

            # MiniMax MCP 需要 MINIMAX_API_KEY(.env 已有) 与 MINIMAX_API_HOST
            os.environ.setdefault("MINIMAX_API_HOST", "https://api.minimaxi.com")
            import shlex

            command = os.getenv("MINIMAX_MCP_COMMAND", "uvx")
            args = shlex.split(os.getenv("MINIMAX_MCP_ARGS", "minimax-coding-plan-mcp -y"))
            self._backend = McpBackend(
                transport="stdio", command=command, args=args,
                connect_timeout=90, timeout=60,
            )
        return self._backend

    @staticmethod
    def _coerce(res: Any) -> dict | None:
        """MCP 返回可能是 dict({organic}) / JSON 字符串 / {type:text, text:'<json>'}，统一解析。"""
        if isinstance(res, str):
            try:
                return json.loads(res)
            except json.JSONDecodeError:
                return None
        if isinstance(res, dict):
            if "organic" in res:
                return res
            txt = res.get("text")
            if isinstance(txt, str):
                try:
                    return json.loads(txt)
                except json.JSONDecodeError:
                    return None
        return None

    def run(self, params: dict[str, Any]) -> Any:
        query = params.get("query") or params.get("q")
        if not query:
            raise ValueError("缺少参数 query（搜索关键词）")
        res = self._get_backend().call_tool("web_search", {"query": query})
        data = self._coerce(res)
        if data is None:
            return {"query": query, "raw": res if isinstance(res, str) else json.dumps(res, ensure_ascii=False)}
        organic = data.get("organic", [])
        return {
            "query": query,
            "results": [
                {"title": o.get("title"), "link": o.get("link"), "snippet": o.get("snippet")}
                for o in organic[:8]
            ],
            "related": [r.get("query") for r in (data.get("related_searches") or [])][:5],
        }
