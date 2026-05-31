from __future__ import annotations

import os
from openai import OpenAI


PROVIDERS = {
    "deepseek": {
        "base_url": "https://api.deepseek.com",
        "api_key_env": "DEEPSEEK_API_KEY",
        "model": "deepseek-chat",
    },
    "qwen": {
        "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "api_key_env": "QWEN_API_KEY",
        "model": "qwen-max",
    },
    "local": {
        "base_url": "http://localhost:11434/v1",
        "api_key_env": None,
        "model": "qwen2.5:7b",
    },
}


class LLMClient:
    def __init__(self, provider: str | None = None):
        provider = provider or os.getenv("LLM_PROVIDER", "deepseek")
        cfg = PROVIDERS[provider]

        api_key = (
            os.getenv(cfg["api_key_env"]) if cfg["api_key_env"] else "ollama"
        )
        self._client = OpenAI(base_url=cfg["base_url"], api_key=api_key)
        self._model = os.getenv("LLM_MODEL", cfg["model"])

    def chat(self, messages: list[dict], **kwargs) -> str:
        resp = self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            **kwargs,
        )
        return resp.choices[0].message.content
