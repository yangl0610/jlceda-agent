"""
持久化的 MCP 客户端后端（方案 A）。

Agent 作为 MCP Client，连官方 mcp-hub（如 sengbin/JLCEDA-MCP）暴露的 MCP 接口；
mcp-hub 再经它自己的 /bridge/ws 把指令转发给 EDA 里的 mcp-bridge 扩展，调真实 eda.* API。

本类把异步的 MCP 会话包成同步接口，方便现有同步 Agent 调用：
  - 后台开一个常驻事件循环线程，会话在其中保活（不是每次调用都重连）；
  - 同步方法用 run_coroutine_threadsafe 把协程投递到该循环。

支持两种传输（由 MCP_TRANSPORT 选择）：
  - stdio：把 hub 当子进程拉起（MCP_COMMAND / MCP_ARGS）；
  - http ：连一个常驻的 streamable-http MCP 服务（MCP_URL）。
"""
from __future__ import annotations

import asyncio
import os
import shlex
import threading
from contextlib import AsyncExitStack
from typing import Any

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


class McpBackend:
    def __init__(
        self,
        transport: str | None = None,
        *,
        command: str | None = None,
        args: list[str] | None = None,
        url: str | None = None,
        timeout: float = 60.0,
        connect_timeout: float = 30.0,
    ):
        self._transport = (transport or os.getenv("MCP_TRANSPORT", "stdio")).lower()
        self._command = command or os.getenv("MCP_COMMAND", "")
        if args is None:
            raw = os.getenv("MCP_ARGS", "")
            args = shlex.split(raw) if raw else []
        self._args = args
        self._url = url or os.getenv("MCP_URL", "")
        self._timeout = timeout

        self._session: ClientSession | None = None
        self._stack: AsyncExitStack | None = None
        self._tools: list[Any] = []

        # 后台常驻事件循环，保活 MCP 会话
        self._loop = asyncio.new_event_loop()
        self._thread = threading.Thread(target=self._loop.run_forever, daemon=True)
        self._thread.start()

        fut = asyncio.run_coroutine_threadsafe(self._connect(), self._loop)
        fut.result(timeout=connect_timeout)

    async def _connect(self) -> None:
        self._stack = AsyncExitStack()
        if self._transport == "stdio":
            if not self._command:
                raise RuntimeError("MCP_TRANSPORT=stdio 需要设置 MCP_COMMAND（启动 mcp-hub 的命令）")
            params = StdioServerParameters(
                command=self._command, args=self._args, env=os.environ.copy()
            )
            read, write = await self._stack.enter_async_context(stdio_client(params))
        elif self._transport in ("http", "streamable", "streamable-http"):
            if not self._url:
                raise RuntimeError("MCP_TRANSPORT=http 需要设置 MCP_URL（mcp-hub 的 MCP 地址）")
            from mcp.client.streamable_http import streamablehttp_client

            read, write, _ = await self._stack.enter_async_context(
                streamablehttp_client(self._url)
            )
        elif self._transport == "sse":
            if not self._url:
                raise RuntimeError("MCP_TRANSPORT=sse 需要设置 MCP_URL")
            from mcp.client.sse import sse_client

            read, write = await self._stack.enter_async_context(sse_client(self._url))
        else:
            raise RuntimeError(f"不支持的 MCP_TRANSPORT: {self._transport}")

        self._session = await self._stack.enter_async_context(ClientSession(read, write))
        await self._session.initialize()
        resp = await self._session.list_tools()
        self._tools = list(resp.tools)

    # ---- 同步接口 ----

    def list_tools(self) -> list[Any]:
        """返回 MCP 工具对象列表（含 .name / .description / .inputSchema）。"""
        return self._tools

    def call_tool(self, name: str, arguments: dict[str, Any]) -> Any:
        if self._session is None:
            raise RuntimeError("MCP 会话未建立")
        coro = self._session.call_tool(name, arguments=arguments or {})
        fut = asyncio.run_coroutine_threadsafe(coro, self._loop)
        result = fut.result(timeout=self._timeout)
        return self._unwrap(result)

    @staticmethod
    def _unwrap(result: Any) -> Any:
        """把 CallToolResult 拍平成 Agent 易读的内容。"""
        if getattr(result, "isError", False):
            text = McpBackend._join_text(result)
            raise RuntimeError(text or "MCP 工具返回错误")
        # 优先结构化输出
        structured = getattr(result, "structuredContent", None)
        if structured:
            return structured
        return McpBackend._join_text(result)

    @staticmethod
    def _join_text(result: Any) -> str:
        parts = []
        for block in getattr(result, "content", None) or []:
            text = getattr(block, "text", None)
            if text is not None:
                parts.append(text)
        return "\n".join(parts)

    def close(self) -> None:
        if self._stack is not None:
            try:
                asyncio.run_coroutine_threadsafe(self._stack.aclose(), self._loop).result(
                    timeout=10
                )
            except Exception:
                pass
        self._loop.call_soon_threadsafe(self._loop.stop)
