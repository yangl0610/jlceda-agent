# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("MSYH",   "C:/Windows/Fonts/msyh.ttc",  subfontIndex=0))
pdfmetrics.registerFont(TTFont("SimHei", "C:/Windows/Fonts/simhei.ttf"))

W, H = A4
doc = SimpleDocTemplate(
    "C:/Users/Administrator/Desktop/New folder/开题报告_JLCEDA_Agent.pdf",
    pagesize=A4,
    leftMargin=2.5*cm, rightMargin=2.5*cm,
    topMargin=2.5*cm, bottomMargin=2.5*cm,
)
styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", "Normal")
    fn = kw.pop("fontName", "MSYH")
    return ParagraphStyle(name, parent=styles[base], fontName=fn, **kw)

normal  = S("CN",    fontSize=10.5, leading=18)
bold    = S("CNB",   fontSize=10.5, leading=18, fontName="SimHei")
title_s = S("CNT",   fontSize=16,   leading=28, fontName="SimHei", alignment=1, spaceAfter=6)
sub_s   = S("CNS",   fontSize=11,   leading=20, alignment=1, spaceAfter=8,  textColor=colors.HexColor("#444444"))
h1      = S("CNH1",  fontSize=13,   leading=22, fontName="SimHei", spaceBefore=14, spaceAfter=6,  textColor=colors.HexColor("#1a3c6e"))
h2      = S("CNH2",  fontSize=11.5, leading=20, fontName="SimHei", spaceBefore=10, spaceAfter=4,  textColor=colors.HexColor("#2a5298"))
h3      = S("CNH3",  fontSize=10.5, leading=18, fontName="SimHei", spaceBefore=6,  spaceAfter=3)
code_s  = S("CNC",   fontSize=9,    leading=14, backColor=colors.HexColor("#f5f5f5"),
             borderPadding=6, leftIndent=10, rightIndent=10)
bul_s   = S("CNBL",  fontSize=10.5, leading=18, leftIndent=16, bulletIndent=4)
cap_s   = S("CNCAP", fontSize=9,    leading=14, textColor=colors.grey, alignment=1)

def P(text, style=None): return Paragraph(text, style or normal)

def tbl(data, cw, hbg=colors.HexColor("#2a5298")):
    t = Table(data, colWidths=cw)
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0,0),(-1,0),  hbg),
        ("TEXTCOLOR",   (0,0),(-1,0),  colors.white),
        ("FONTNAME",    (0,0),(-1,0),  "SimHei"),
        ("FONTNAME",    (0,1),(-1,-1), "MSYH"),
        ("FONTSIZE",    (0,0),(-1,-1), 9.5),
        ("LEADING",     (0,0),(-1,-1), 16),
        ("ALIGN",       (0,0),(-1,-1), "LEFT"),
        ("VALIGN",      (0,0),(-1,-1), "MIDDLE"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, colors.HexColor("#f0f4ff")]),
        ("GRID",        (0,0),(-1,-1), 0.5, colors.HexColor("#bbbbbb")),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING", (0,0),(-1,-1), 7),
    ]))
    return t

story = []

# Title
story.append(Spacer(1, 0.4*cm))
story.append(P("开 题 报 告", title_s))
story.append(P("面向嘉立创EDA的AI Agent框架搭建", sub_s))
story.append(P("——让大模型“看懂原理图、会操作EDA”", sub_s))
story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2a5298")))
story.append(Spacer(1, 0.3*cm))

meta = [
    [P("<b>选题方向</b>",bold), P("选题一：AI Agent 框架搭建",normal)],
    [P("<b>课题名称</b>",bold), P("面向嘉立创EDA的AI Agent框架搭建",normal)],
    [P("<b>提交日期</b>",bold), P("2025年5月31日",normal)],
]
story.append(tbl(meta, [3.5*cm, 12*cm]))
story.append(Spacer(1, 0.6*cm))

# Section 1
story.append(P("一、选题背景与动机", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))
story.append(Spacer(1, 0.2*cm))
story.append(P(
    "嘉立创EDA（LCEDA/EasyEDA Pro）是国内使用最广泛的免费PCB设计工具之一，"
    "拥有丰富的扩展API生态（基于JavaScript的 pro-api-sdk）。"
    "然而，硬件工程师在使用EDA工具时，仍然面临大量重复性、"
    "经验依赖性的工作：元器件选型、网络连接检查、"
    "设计规则核验、BOM表生成……这些任务逻辑明确，却耗时耗力。",
    normal))
story.append(Spacer(1, 0.2*cm))
story.append(P(
    "B站上已有创作者演示将嘉立创EDA集成到VS Code并调用高级AI模型查看原理图，"
    "验证了这一方向的可行性。本项目以此为起点，"
    "尝试构建一个<b>面向EDA场景的完整AI Agent框架</b>——"
    "用户用自然语言描述意图，Agent自主选择工具、操作EDA、返回结果。",
    normal))

# Section 2
story.append(P("二、技术背景调研与文献分析", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))

story.append(P("2.1 技术现状：主流解决方案对比", h2))
story.append(P("(一) ReAct 范式 vs OpenAI Function Calling", h3))

cmp = [
    [P("<b>维度</b>",bold), P("<b>ReAct 范式</b>",bold), P("<b>Function Calling</b>",bold)],
    [P("核心思路",normal), P("Prompt 中交替输出 Thought/Action",normal), P("输出结构化 JSON 由框架分发",normal)],
    [P("实现方式",normal), P("纯 Prompt 工程，无需 API 特殊支持",normal), P("依赖模型 API 的 tools 参数",normal)],
    [P("可移植性",normal), P("任意模型（含本地 Qwen）均可",normal), P("需模型厂商明确支持",normal)],
    [P("可解释性",normal), P("高，Thought 链路完整可见",normal), P("中，推理过程隐式",normal)],
    [P("适合场景",normal), P("教学、调试、多步推理",normal), P("生产环境、强格式要求",normal)],
]
story.append(tbl(cmp, [2.5*cm, 6.5*cm, 6.5*cm]))
story.append(Spacer(1, 0.3*cm))
story.append(P(
    "<b>本项目选择：</b>以 ReAct 范式为主体，"
    "结合 JSON 格式化输出，确保在 DeepSeek/通义千问等国内模型上均可运行，"
    "同时保留完整的推理可见性。",
    normal))

story.append(P("(二) EDA + LLM Agent 领域现状", h3))
papers = [
    ("ChatEDA (2024)", "使用 ReAct Prompting 让 LLM 生成EDA脚本，自动化 EDA 工具调用 (arXiv:2502.10857)"),
    ("AutoEDA (2025)", "基于微服务架构的多 LLM Agent 系统，将 EDA 流程拆分为多个子任务协同完成 (arXiv:2508.01012)"),
    ("Agentic EDA 综述 (2024)", "将 LLM+EDA 方案分为三层：Prompt-Based推理、微调专精、多 Agent 协作 (arXiv:2512.23189)"),
]
for t, d in papers:
    story.append(P(f"• <b>{t}</b>：{d}", bul_s))
story.append(Spacer(1, 0.2*cm))
story.append(P(
    "这些工作主要面向芯片设计，而面向 <b>PCB原理图/嘉立创EDA</b> 的 Agent 应用"
    "目前几乎是空白，具有较强的创新性。",
    normal))

story.append(P("(三) 嘉立创EDA扩展API能力边界", h3))
for item in [
    "读取/修改原理图元素（元件、网络、引脚）",
    "执行 DRC（设计规则检查）",
    "生成 BOM 表、网表",
    "操作 PCB 布局布线",
    "调用嘉立创元件库搜索",
]:
    story.append(P(f"• {item}", bul_s))

story.append(P("2.2 核心原理预研", h2))
story.append(P("Agent 如何通过 Prompt 约束输出格式？", h3))
story.append(P(
    "系统提示词（System Prompt）是控制输出格式的关键。"
    "以 ReAct 范式为例，要求模型每次严格按照 "
    "<b>Thought → Action（JSON）</b> 的格式输出，"
    "程序用正则或 JSON 解析提取 Action 字段后调用对应工具，"
    "将结果以 role:tool 消息追加回 messages，再次驱动 LLM 继续推理，"
    "直到输出 Final Answer。",
    normal))

story.append(P("执行循环核心逻辑（伪代码）：", h3))
story.append(P(
    "用户输入 → 拼接 System Prompt + 历史消息 → 调用LLM<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>"
    "解析输出：是否包含 Action？<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;├── 是 → 执行对应工具 → 结果追加 messages → 再次调用LLM<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;└── 否（Final Answer）→ 返回给用户，循环结束",
    code_s))
story.append(Spacer(1, 0.2*cm))
story.append(P("上下文长度管理：", h3))
story.append(P(
    "EDA 原理图数据量可能很大，需设计<b>滑动窗口</b>或<b>摘要压缩</b>策略："
    "仅保留最近 N 轮消息，或在超出 token 限制时用 LLM 自动摘要早期对话。",
    normal))

# Section 3
story.append(P("三、系统架构设计（预研）", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))
story.append(P(
    "┌────────────────────────┐<br/>"
    "│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户自然语言输入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>"
    "└────────────────────────┘<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>"
    "┌────────────────────────┐<br/>"
    "│&nbsp;&nbsp;&nbsp;&nbsp;│ Agent 核心（Python）&nbsp;&nbsp;│<br/>"
    "│ Prompt引擎 ⇔ 对话历史管理器 │<br/>"
    "│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ LLM（DeepSeek/通义）│<br/>"
    "│&nbsp;输出解析器（ReAct格式解析）│<br/>"
    "└────────────────────────┘<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>"
    "┌────────────────────────┐<br/>"
    "│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工具执行层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>"
    "│ 原理图读取 | 元件库搜索 | DRC检查 │<br/>"
    "│ BOM生成 | 图像识别（多模态LLM） │<br/>"
    "└────────────────────────┘",
    code_s))

# Section 4
story.append(P("四、团队分工细节", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))
story.append(Spacer(1, 0.2*cm))
story.append(P("本项目由一人独立完成，各模块按阶段顺序推进，具体分工如下：", normal))
story.append(Spacer(1, 0.2*cm))
team_data = [
    [P("<b>阶段</b>",bold), P("<b>负责模块</b>",bold), P("<b>具体职责</b>",bold)],
    [P("第一阶段",normal), P("环境搭建与调研",normal),
     P("申请 API Key，搭建 Python 开发环境；阅读嘉立创EDA pro-api-sdk 文档；验证 ReAct Prompt 格式化输出可靠性",normal)],
    [P("第二阶段",normal), P("Agent 核心框架",normal),
     P("设计 ReAct System Prompt；实现 LLM 调用、输出解析、多步执行循环；实现对话历史管理与 token 压缩策略",normal)],
    [P("第三阶段",normal), P("工具层开发",normal),
     P("封装嘉立创EDA扩展API工具集：原理图读取、元件库搜索、DRC 检查、BOM 生成、多模态图像识别",normal)],
    [P("第四阶段",normal), P("测试与交付",normal),
     P("设计端到端测试用例，进行模型横纵向对比实验；录制 Demo 视频；撰写最终报告，整理代码仓库",normal)],
]
story.append(tbl(team_data, [2.2*cm, 3.3*cm, 10*cm]))

# Section 5
story.append(P("五、任务进度表", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))

weeks = [
    ("第一周", "环境搭建与原理验证",
     "申请 DeepSeek/通义千问 API Key（或部署本地 Qwen2.5-3B）；搭建 Python 开发环境，跑通基础 LLM API 调用；阅读 pro-api-sdk 文档，跑通第一个扩展 Hello World；手动验证 ReAct Prompt 格式化输出可靠性",
     "可运行的 LLM 调用脚本 + EDA 扩展 Hello World"),
    ("第二周", "核心 Agent 框架开发",
     "实现 AgentCore 类：Prompt 组装、LLM 调用、ReAct 输出解析；实现基础工具层：get_schematic_info、search_component；实现 Agent 执行循环（最多10步防无限循环）；实现对话历史管理",
     "能完成“查询原理图元件列表”单轮任务的最小可用 Agent"),
    ("第三周", "工具扩展与多步任务验证",
     "新增工具：run_drc（DRC检查）、generate_bom（BOM生成）；新增图像识别工具（调用多模态模型）；测试多步任务；针对 LLM 输出格式不稳定问题做容错处理",
     "支持4+工具、能完成多步任务的完整 Agent"),
    ("第四周", "对比实验与结项交付",
     "横向对比：ReAct 范式 vs Function Calling 的成功率和响应速度；纵向对比：测试不同模型的效果差异；录制 Demo 视频，展示完整端到端流程；撰写最终报告，整理代码仓库",
     "完整代码仓库 + 实验对比报告 + Demo 视频"),
]
sched = [[P("<b>周次</b>",bold), P("<b>主题</b>",bold), P("<b>主要任务</b>",bold), P("<b>交付物</b>",bold)]]
for wk, th, ta, dl in weeks:
    sched.append([P(wk,normal), P(th,normal), P(ta,normal), P(dl,normal)])
story.append(tbl(sched, [1.8*cm, 3.2*cm, 8.5*cm, 4*cm]))

# Section 6
story.append(P("六、预期挑战与应对策略", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))

challenges = [
    ("LLM 输出格式不稳定，JSON 解析失败",
     "加入正则容错解析；在 Prompt 中给出格式错误示例并要求模型自纠"),
    ("嘉立创EDA API 为 JS 环境，Python Agent 难以直接调用",
     "方案A：通过 WebSocket/HTTP 本地桥接；方案B：用 Node.js 重写 Agent 调用层"),
    ("原理图数据量大，超出 LLM 上下文",
     "仅传递摘要（元件数量、关键网络），详细数据按需查询"),
    ("本地模型（Qwen2.5-3B）指令遵循能力弱",
     "优化 few-shot 示例数量；或切换到 7B 以上模型"),
]
chal_data = [[P("<b>挑战</b>",bold), P("<b>应对策略</b>",bold)]]
for c, s in challenges:
    chal_data.append([P(c,normal), P(s,normal)])
story.append(tbl(chal_data, [5.5*cm, 10*cm]))

# Section 7
story.append(P("七、参考资料", h1))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc")))
refs = [
    "[1] 嘉立创EDA专业版扩展API官方文档. https://prodocs.lceda.cn/cn/api/guide/",
    "[2] pro-api-sdk (GitHub). https://github.com/easyeda/pro-api-sdk",
    "[3] Yao S. et al. ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629, 2022.",
    "[4] The Dawn of Agentic EDA: A Survey. arXiv:2512.23189, 2024.",
    "[5] AutoEDA: Enabling EDA Flow Automation through LLM Agents. arXiv:2508.01012, 2025.",
    "[6] Divergent Thoughts toward One Goal: LLM-based Multi-Agent for EDA. arXiv:2502.10857, 2025.",
]
for r in refs:
    story.append(P(r, bul_s))

story.append(Spacer(1, 0.8*cm))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2a5298")))
story.append(P("本报告由小组全体成员共同撰写", cap_s))

doc.build(story)
print("PDF generated successfully.")