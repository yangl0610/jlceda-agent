from src.agent.memory import HistoryManager


def test_add_and_get():
    h = HistoryManager(max_turns=5)
    h.add("user", "hello")
    h.add("assistant", "hi")
    assert len(h.get()) == 2


def test_sliding_window():
    h = HistoryManager(max_turns=3)
    for i in range(5):
        h.add("user", f"msg {i}")
    msgs = h.get()
    assert len(msgs) == 3
    assert msgs[0]["content"] == "msg 2"


def test_clear():
    h = HistoryManager()
    h.add("user", "test")
    h.clear()
    assert h.get() == []
