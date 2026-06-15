"""
端到端集成测试：BridgeClient → server(/agent) → server(/bridge/ws) → mock-bridge → 回传。

验证我们的桥接服务端正确实现了官方 mcp-bridge 协议（握手/选主/就绪/任务往返），
且 Agent 侧通过 path/invoke 能拿到插件回传的结果。不依赖真实嘉立创EDA。
"""
from __future__ import annotations

import asyncio
import socket
import threading

import pytest
import websockets

import bridge.server as server
from bridge import mock_bridge
from bridge.client import BridgeClient

pytestmark = pytest.mark.filterwarnings("ignore::pytest.PytestUnraisableExceptionWarning")


def _free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


@pytest.fixture
def backend(monkeypatch):
    port = _free_port()
    monkeypatch.setenv("BRIDGE_PORT", str(port))
    monkeypatch.setenv("BRIDGE_HOST", "127.0.0.1")
    # 重置服务端全局状态，避免测试间串扰
    server._peers.clear()
    server._pending.clear()
    server._socket_to_client.clear()
    server._active_client_id = ""
    server._lease_term = 0
    server._active_event = None

    ready = threading.Event()
    holder: dict = {}

    def run() -> None:
        loop = asyncio.new_event_loop()
        holder["loop"] = loop
        asyncio.set_event_loop(loop)

        async def boot() -> None:
            await websockets.serve(server.router, "127.0.0.1", port)
            mock_ready = asyncio.Event()
            asyncio.ensure_future(mock_bridge.serve(f"ws://127.0.0.1:{port}/bridge/ws", ready=mock_ready))
            await mock_ready.wait()
            ready.set()
            await asyncio.Future()

        try:
            loop.run_until_complete(boot())
        except RuntimeError:
            pass

    t = threading.Thread(target=run, daemon=True)
    t.start()
    assert ready.wait(10), "桥接后端启动超时"
    yield port

    loop = holder["loop"]
    loop.call_soon_threadsafe(loop.stop)


def test_schematic_read(backend):
    result = BridgeClient().task("/bridge/jlceda/schematic/read", {})
    assert "components" in result and "nets" in result
    assert any(c["id"] == "U1" for c in result["components"])


def test_component_select(backend):
    result = BridgeClient().task(
        "/bridge/jlceda/component/select", {"keyword": "STM32", "limit": 5, "page": 1}
    )
    assert result["ok"] is True
    cands = result["selection"]["candidates"]
    assert cands and all("STM32" in c["name"] for c in cands)


def test_drc_via_invoke(backend):
    result = BridgeClient().invoke("eda.sch_Drc.check", False, False, True)
    assert result["apiFullName"] == "eda.sch_Drc.check"
    assert result["result"] == []


def test_generic_invoke(backend):
    result = BridgeClient().invoke("eda.sch_ManufactureData.getAllNets")
    assert result["apiFullName"] == "eda.sch_ManufactureData.getAllNets"


def test_unknown_path_propagates_error(backend):
    with pytest.raises(RuntimeError, match="不支持的桥接路径"):
        BridgeClient().task("/bridge/jlceda/no/such/path", {})
