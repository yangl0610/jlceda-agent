from __future__ import annotations

import base64
from pathlib import Path
from typing import Any

from openai import OpenAI
from src.tools.base import BaseTool


class AnalyzeImage(BaseTool):
    name = "analyze_image"
    description = "分析原理图截图或图片，识别元件、连接关系或设计问题。params: {image_path, question}"

    def __init__(self, client: OpenAI, model: str = "qwen-vl-max"):
        self._client = client
        self._model = model

    def run(self, params: dict[str, Any]) -> Any:
        image_path = params["image_path"]
        question = params.get("question", "请描述这张原理图的主要内容")

        data = base64.b64encode(Path(image_path).read_bytes()).decode()
        ext = Path(image_path).suffix.lstrip(".")
        resp = self._client.chat.completions.create(
            model=self._model,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": f"data:image/{ext};base64,{data}"}},
                    {"type": "text", "text": question},
                ],
            }],
        )
        return resp.choices[0].message.content
