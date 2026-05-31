"""
Demo: 让 Agent 检查原理图并生成 BOM 表
运行前请确保：
1. 嘉立创EDA已打开并加载桥接扩展
2. bridge/server.py 已启动
3. .env 已配置 API Key
"""
from __future__ import annotations

import os
from dotenv import load_dotenv

load_dotenv()

from src.main import build_agent

agent = build_agent()

tasks = [
    "帮我查看当前原理图有哪些元件",
    "对原理图执行 DRC 检查，告诉我有没有错误",
    "生成 BOM 表并列出所有元件的型号和数量",
]

for task in tasks:
    print(f"\n{'='*50}")
    print(f"任务: {task}")
    print(f"{'='*50}")
    result = agent.run(task)
    print(f"结果: {result}")
