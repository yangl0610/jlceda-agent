from __future__ import annotations


class HistoryManager:
    """Sliding-window conversation history."""

    def __init__(self, max_turns: int = 20):
        self.max_turns = max_turns
        self._messages: list[dict] = []

    def add(self, role: str, content: str) -> None:
        self._messages.append({"role": role, "content": content})
        # Keep only the last max_turns messages
        if len(self._messages) > self.max_turns:
            self._messages = self._messages[-self.max_turns:]

    def get(self) -> list[dict]:
        return list(self._messages)

    def clear(self) -> None:
        self._messages.clear()
