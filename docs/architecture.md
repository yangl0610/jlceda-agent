# 系统架构文档

## 总体设计思路

本项目采用 **ReAct（Reasoning + Acting）** 范式构建 Agent 框架，核心思想是让 LLM 在每一步交替输出"思考"和"动作"，由 Python 程序解析动作并执行对应工具，将结果回传给 LLM，循环直到任务完成。

## 模块划分

### 1. AgentCore（`src/agent/core.py`）

Agent 的驱动引擎，负责：
- 拼装 System Prompt + 对话历史 → 调用 LLM
- 判断输出类型（Action / Final Answer）
- 调度工具执行，将结果追加到 messages
- 控制最大循环步数（默认 10 步）

### 2. ReAct 解析器（`src/agent/parser.py`）

将 LLM 的原始文本输出解析为结构化对象：

```
Thought: 我需要先获取原理图中的元件列表
Action: {"tool": "get_schematic_info", "params": {}}
```

解析策略：优先 JSON 严格解析，失败则正则容错提取。

### 3. 历史管理器（`src/agent/memory.py`）

维护 `messages` 列表，处理上下文超限：
- 滑动窗口：保留最近 N 轮（默认 20）
- 摘要压缩：超限时调用 LLM 对早期对话自动摘要

### 4. LLM 客户端（`src/llm/client.py`）

统一封装多家模型 API，通过环境变量切换：

| `LLM_PROVIDER` | 说明 |
|----------------|------|
| `deepseek` | DeepSeek-Chat API |
| `qwen` | 通义千问 API |
| `local` | 本地 Ollama（Qwen2.5） |

### 5. 工具层（`src/tools/`）

每个工具继承 `BaseTool`，实现 `name`、`description`、`run(params)` 三个属性/方法。

| 工具 | 文件 | 说明 |
|------|------|------|
| `get_schematic_info` | `schematic.py` | 获取原理图元件列表、网络连接 |
| `search_component` | `component.py` | 在嘉立创元件库搜索指定型号 |
| `run_drc` | `drc.py` | 执行设计规则检查，返回错误列表 |
| `generate_bom` | `bom.py` | 生成物料清单（CSV/JSON） |
| `analyze_image` | `vision.py` | 多模态 LLM 分析原理图截图 |

### 6. JS ↔ Python 桥接层（`bridge/`）

嘉立创EDA的扩展API运行在编辑器内的 JavaScript 沙箱中，无法直接被 Python 调用。桥接方案：

```
Python Agent
    │  WebSocket（localhost:9527）
    ▼
bridge/server.py（Python WebSocket 服务端）
    │  消息格式：{"tool": "...", "params": {...}}
    ▼
bridge/extension/index.js（嘉立创EDA扩展插件）
    │  调用 EDA Pro API
    ▼
嘉立创EDA 编辑器
```

## 数据流

```
用户输入
  → AgentCore.run(user_input)
    → 拼接 messages + system_prompt
    → LLMClient.chat(messages)
    → ReActParser.parse(llm_output)
      ├── action → ToolRegistry.execute(tool, params)
      │             → BridgeClient.call(tool, params)  [EDA工具]
      │               或 LLMClient.vision(image)       [图像工具]
      │             → 结果追加 messages → 继续循环
      └── final_answer → 返回用户
```

## 关键设计决策

### 为什么不用 LangChain？

题目要求不使用高层框架，且手写实现更有助于理解 Agent 底层机制。本项目的 `AgentCore` 约 150 行代码即可实现完整的 ReAct 循环。

### 为什么选 WebSocket 而非 HTTP？

嘉立创EDA扩展运行在编辑器进程内，WebSocket 支持长连接和双向通信，延迟更低，且易于在扩展侧主动推送事件。
