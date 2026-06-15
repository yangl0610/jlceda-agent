from __future__ import annotations

import os
from openai import OpenAI


# 每个 provider 描述一个 OpenAI 兼容端点。
# base_url / api_key / model 都可被对应的环境变量覆盖，
# 因此即使默认值与你所在区域不符，也只需改 .env，无需改代码。
PROVIDERS = {
    "deepseek": {
        "base_url": "https://api.deepseek.com/v1",
        "base_url_env": "DEEPSEEK_BASE_URL",
        "api_key_env": "DEEPSEEK_API_KEY",
        "model": "deepseek-chat",
    },
    "qwen": {
        "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "base_url_env": "QWEN_BASE_URL",
        "api_key_env": "QWEN_API_KEY",
        "model": "qwen-max",
    },
    # OpenRouter：完全 OpenAI 兼容，可直接路由到 MiniMax 等模型。
    "openrouter": {
        "base_url": "https://openrouter.ai/api/v1",
        "base_url_env": "OPENROUTER_BASE_URL",
        "api_key_env": "OPENROUTER_API_KEY",
        "model": "minimax/minimax-01",
    },
    # MiniMax 官方 OpenAI 兼容端点（国内 api.minimax.chat / 国际 api.minimaxi.com）。
    "minimax": {
        "base_url": "https://api.minimax.chat/v1",
        "base_url_env": "MINIMAX_BASE_URL",
        "api_key_env": "MINIMAX_API_KEY",
        "model": "MiniMax-Text-01",
    },
    "local": {
        "base_url": "http://localhost:11434/v1",
        "base_url_env": "LOCAL_BASE_URL",
        "api_key_env": None,
        "model": "qwen2.5:7b",
    },
}


def build_openai_client(provider: str) -> tuple[OpenAI, str]:
    """根据 provider 名构造 OpenAI 兼容客户端，返回 (client, default_model)。"""
    if provider not in PROVIDERS:
        raise ValueError(f"未知 provider: {provider}。可选: {list(PROVIDERS)}")
    cfg = PROVIDERS[provider]

    base_url = os.getenv(cfg["base_url_env"], cfg["base_url"])
    api_key = os.getenv(cfg["api_key_env"]) if cfg["api_key_env"] else "ollama"
    if cfg["api_key_env"] and not api_key:
        raise RuntimeError(f"缺少环境变量 {cfg['api_key_env']}，请在 .env 中配置")

    return OpenAI(base_url=base_url, api_key=api_key), cfg["model"]


class LLMClient:
    def __init__(self, provider: str | None = None):
        provider = provider or os.getenv("LLM_PROVIDER", "deepseek")
        self._client, default_model = build_openai_client(provider)
        self._model = os.getenv("LLM_MODEL", default_model)

    def chat(self, messages: list[dict], **kwargs) -> str:
        resp = self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            **kwargs,
        )
        return resp.choices[0].message.content
