from __future__ import annotations

import base64
import mimetypes
from pathlib import Path
from typing import Any

from openai import OpenAI
from src.tools.base import BaseTool


class AnalyzeImage(BaseTool):
    name = "analyze_image"
    description = (
        "分析原理图截图或图片，识别元件、连接关系或设计问题。"
        "params: {image_path: 本地路径或 http(s) URL, question: 可选提问}"
    )

    def __init__(self, client: OpenAI, model: str = "MiniMax-VL-01"):
        self._client = client
        self._model = model

    def _to_image_url(self, image_path: str) -> str:
        """本地文件转 data URL；http(s) 链接直接透传。"""
        if image_path.startswith(("http://", "https://", "data:")):
            return image_path
        path = Path(image_path)
        if not path.is_file():
            raise FileNotFoundError(f"图片不存在: {image_path}")
        mime = mimetypes.guess_type(path.name)[0] or "image/png"
        data = base64.b64encode(path.read_bytes()).decode()
        return f"data:{mime};base64,{data}"

    def run(self, params: dict[str, Any]) -> Any:
        image_path = params["image_path"]
        question = params.get("question", "请描述这张原理图的主要内容、元件和连接关系")

        resp = self._client.chat.completions.create(
            model=self._model,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": self._to_image_url(image_path)}},
                    {"type": "text", "text": question},
                ],
            }],
        )
        return resp.choices[0].message.content
