/**
 * 嘉立创EDA专业版扩展 - AI Agent 桥接插件
 * 安装方式：在嘉立创EDA扩展广场中加载本地扩展
 */

const BRIDGE_URL = "ws://localhost:9527";

let ws = null;

function connect() {
  ws = new WebSocket(BRIDGE_URL);

  ws.onopen = () => {
    // 告知服务器这是 EDA 扩展端
    ws.send(JSON.stringify({ type: "eda_extension" }));
    console.log("[JLCEDA Agent Bridge] Connected to Python bridge");
  };

  ws.onmessage = async (event) => {
    const req = JSON.parse(event.data);
    let result;
    try {
      result = await dispatch(req.tool, req.params);
    } catch (e) {
      ws.send(JSON.stringify({ id: req.id, error: String(e) }));
      return;
    }
    ws.send(JSON.stringify({ id: req.id, result }));
  };

  ws.onclose = () => {
    console.log("[JLCEDA Agent Bridge] Disconnected, retrying in 3s...");
    setTimeout(connect, 3000);
  };
}

async function dispatch(tool, params) {
  switch (tool) {
    case "get_schematic_info":
      return getSchematicInfo(params);
    case "search_component":
      return searchComponent(params);
    case "run_drc":
      return runDRC(params);
    case "generate_bom":
      return generateBOM(params);
    default:
      throw new Error(`Unknown tool: ${tool}`);
  }
}

function getSchematicInfo(_params) {
  // TODO: 调用嘉立创EDA Pro API 获取原理图数据
  // 参考文档: https://prodocs.lceda.cn/cn/api/reference/pro-api.html
  const schematic = editorApi.getSchematic();
  return {
    components: schematic.getComponents().map(c => ({
      id: c.id,
      name: c.name,
      value: c.value,
      package: c.package,
    })),
    nets: schematic.getNets().map(n => n.name),
  };
}

function searchComponent(params) {
  // TODO: 调用元件库搜索 API
  return editorApi.searchComponents(params.keyword, { limit: params.limit || 10 });
}

function runDRC(_params) {
  // TODO: 触发 DRC 并返回结果
  return editorApi.runDRC();
}

function generateBOM(params) {
  // TODO: 生成 BOM 表
  const fmt = params.format || "json";
  return editorApi.exportBOM({ format: fmt });
}

// 扩展入口
connect();
