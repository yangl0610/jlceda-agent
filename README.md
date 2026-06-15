# JLCEDA Agent

> 一个面向嘉立创EDA的 AI Agent 框架——让大模型"看懂原理图、会操作EDA"

用自然语言驱动嘉立创EDA：Agent 自主选择工具、调用 EDA 扩展API、完成多步任务并返回结果。

## 功能特性

- **ReAct 范式**：模型交替输出 Thought / Action，推理链路完整可见
- **多工具支持**：原理图读取、元件库搜索、DRC 检查、BOM 生成、多模态图像识别
- **JS ↔ Python 桥接**：通过本地 WebSocket 连接嘉立创EDA扩展API
- **多模型兼容**：DeepSeek / 通义千问 / OpenRouter / MiniMax / 本地 Qwen2.5，`.env` 一键切换
- **上下文管理**：滑动窗口 + 自动摘要，避免超出 token 限制

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入你的 API Key
```

### 3. 启动桥接服务（`TOOL_BACKEND=bridge`，默认）

本项目 `bridge/server.py` 直接实现了嘉立创官方 **mcp-bridge** 插件的桥接协议，
**顶替了官方的 mcp-hub**。也就是说：你只需在 EDA 里装官方 mcp-bridge 插件，把它的
「桥接地址」指向本服务，插件即会拨入并执行 `eda.*` API——**无需自建/构建任何扩展**。

```
嘉立创EDA(官方 mcp-bridge 插件) ──ws /bridge/ws──▶ bridge/server.py ──/agent──▶ 本项目 Agent
```

先启动桥接服务（长驻，等插件拨入）：

```bash
python bridge/server.py
```

再接入 EDA 后端，二选一：

- **真实 EDA**：在嘉立创EDA专业版安装官方 **mcp-bridge** 插件，打开一个工程，在插件
  设置里把「桥接地址」改成 `ws://127.0.0.1:<BRIDGE_PORT>/bridge/ws`（与 `.env` 的
  `BRIDGE_PORT` 一致），确认 Bridge 显示已连接即可。
- **本地 Mock（无需打开EDA，可直接联调/演示）**：

```bash
python bridge/mock_bridge.py
```

> Mock 与真实插件说的是同一套协议（hello/welcome/role/ready/task/result），
> 因此 Agent 与服务端零改动即可在 Mock 与真实 EDA 之间切换。

> ⚠️ 端口：官方默认 `8765`，但本机被百度输入法占用，仓库已默认改为 `8799`；
> 只要 `.env` 的 `BRIDGE_PORT` 与插件「桥接地址」里的端口一致即可。

> 备选后端：若你用的是**独立 MCP Server**（如 hyl64/jlcmcp），可设
> `TOOL_BACKEND=mcp` 并配置 `MCP_*`，Agent 会作为 MCP Client 动态发现其工具。
> 早期自研扩展模板仍保留在 `bridge/extension/`（属可选的 method C，一般用不到）。

### 4. 运行 Agent

```bash
python src/main.py
```

或直接运行示例：

```bash
python examples/demo.py
```

## 项目结构

```
jlceda-agent/
├── src/
│   ├── agent/          # Agent 核心（循环、解析、历史管理）
│   ├── tools/          # 工具层（EDA API 封装）
│   ├── llm/            # LLM 客户端（DeepSeek/Qwen）
│   └── main.py         # 入口
├── bridge/
│   ├── extension/      # 嘉立创EDA JS 扩展插件
│   └── server.py       # Python WebSocket 桥接服务
├── prompts/            # System Prompt 模板
├── tests/              # 单元测试 & 集成测试
├── examples/           # 示例脚本
└── docs/               # 开题报告、架构文档
```

## 架构概览

```
用户自然语言
      ↓
  AgentCore
  ├── ReAct Prompt 引擎
  ├── LLM 调用（DeepSeek/通义）
  ├── 输出解析器
  └── 对话历史管理
      ↓
  工具执行层
  ├── get_schematic_info  → WebSocket → 嘉立创EDA
  ├── search_component    → WebSocket → 嘉立创EDA
  ├── run_drc             → WebSocket → 嘉立创EDA
  ├── generate_bom        → WebSocket → 嘉立创EDA
  └── analyze_image       → 多模态 LLM API
```

## 技术栈

| 层级 | 技术选型 |
|------|---------|
| LLM | DeepSeek / 通义千问 / OpenRouter / MiniMax / Qwen2.5（本地） |
| 多模态 | MiniMax 视觉模型（照片/原理图理解，OpenAI 兼容） |
| Agent 范式 | ReAct（手写，不依赖 LangChain） |
| EDA 接口 | 嘉立创EDA Pro Extension API（JavaScript） |
| 桥接层 | Python `websockets` + Node.js |
| 测试 | `pytest` |

## 参考资料

- [嘉立创EDA专业版扩展API文档](https://prodocs.lceda.cn/cn/api/guide/)
- [ReAct: Synergizing Reasoning and Acting in LMs](https://arxiv.org/abs/2210.03629)
- [AutoEDA: LLM Agents for EDA Automation](https://arxiv.org/abs/2508.01012)
