# JLCEDA Agent

> 一个面向嘉立创EDA的 AI Agent 框架——让大模型"看懂原理图、会操作EDA"

用自然语言驱动嘉立创EDA：Agent 自主选择工具、调用 EDA 扩展API、完成多步任务并返回结果。

## 功能特性

- **ReAct 范式**：模型交替输出 Thought / Action，推理链路完整可见
- **多工具支持**：原理图读取、元件库搜索、DRC 检查、BOM 生成、多模态图像识别
- **JS ↔ Python 桥接**：通过本地 WebSocket 连接嘉立创EDA扩展API
- **多模型兼容**：DeepSeek / 通义千问 / 本地 Qwen2.5，一键切换
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

### 3. 启动 EDA 桥接服务

在嘉立创EDA专业版中安装 `bridge/extension`，然后：

```bash
python bridge/server.py
```

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
| LLM | DeepSeek-Chat / 通义千问 / Qwen2.5（本地） |
| Agent 范式 | ReAct（手写，不依赖 LangChain） |
| EDA 接口 | 嘉立创EDA Pro Extension API（JavaScript） |
| 桥接层 | Python `websockets` + Node.js |
| 测试 | `pytest` |

## 参考资料

- [嘉立创EDA专业版扩展API文档](https://prodocs.lceda.cn/cn/api/guide/)
- [ReAct: Synergizing Reasoning and Acting in LMs](https://arxiv.org/abs/2210.03629)
- [AutoEDA: LLM Agents for EDA Automation](https://arxiv.org/abs/2508.01012)
