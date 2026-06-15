/**
 * 嘉立创EDA专业版扩展 - AI Agent 桥接插件（真实 API 版）
 *
 * 它以 `eda_extension` 身份连上 Python 桥接服务（bridge/server.py，默认 9527），
 * 收到 { id, tool, params } 后调用真实的 eda.* API，回 { id, result } 或 { id, error }。
 * 对外协议与 bridge/mock_eda.py 完全一致，因此 Python 侧无需区分真假后端。
 *
 * 所用 API 方法名均依据官方类型定义 @jlceda/pro-api-types 核实：
 *   - eda.sch_PrimitiveComponent.getAll()         取原理图所有元件
 *   - 元件访问器 getState_Designator/Name/Footprint/ManufacturerId/...
 *   - eda.sch_ManufactureData.getAllNets()        取网络列表（{net, wires}）
 *   - eda.sch_Drc.check(strict, ui, verbose)      运行 DRC
 *   - eda.lib_Device.search(keyword)              搜索元件库
 *
 * 安装/构建：把本目录放进官方 SDK 模板（https://github.com/easyeda/pro-api-sdk）的 src/，
 *   npm install && npm run build → 生成 ./build/dist/*.eext，在 EDA 扩展管理中加载，
 *   并在扩展设置里开启「允许外部交互」。
 *
 * 注意：`eda` 是 EDA 运行时注入的全局对象。下列字段映射在真实工程上可能需微调，
 *   每个字段都做了防御性容错（取不到不致整体失败），首次接入请在 EDA 内验证一次。
 */

const BRIDGE_URL = "ws://localhost:9527";

let ws = null;
let manualClose = false;

function connect() {
  manualClose = false;
  ws = new WebSocket(BRIDGE_URL);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "eda_extension" }));
    console.log("[JLCEDA Agent Bridge] connected to", BRIDGE_URL);
  };

  ws.onmessage = async (event) => {
    const req = JSON.parse(event.data);
    try {
      const result = await dispatch(req.tool, req.params || {});
      ws.send(JSON.stringify({ id: req.id, result }));
    } catch (e) {
      ws.send(JSON.stringify({ id: req.id, error: String((e && e.message) || e) }));
    }
  };

  ws.onclose = () => {
    if (manualClose) return;
    console.log("[JLCEDA Agent Bridge] disconnected, retrying in 3s...");
    setTimeout(connect, 3000);
  };

  ws.onerror = (e) => console.error("[JLCEDA Agent Bridge] error", e);
}

// 由 extension.json 菜单触发（registerFn）
export function activateBridge() {
  connect();
}

export function deactivateBridge() {
  manualClose = true;
  if (ws) ws.close();
}

// 扩展加载即自动连接（如不需要可删掉这一行，改用菜单手动连接）
connect();

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

// ---- 真实 API 实现（返回结构与 bridge/mock_eda.py 对齐）----

function call(obj, method, ...args) {
  return obj && typeof obj[method] === "function" ? obj[method](...args) : undefined;
}

function mapComponent(c) {
  return {
    id: call(c, "getState_Designator") || "",
    name: call(c, "getState_Name") || "",
    value: (call(c, "getState_OtherProperty") || {}).Value || "",
    // getState_Footprint() 返回 {uuid, libraryUuid}，封装名需另行解析，先给 uuid 占位
    package: (call(c, "getState_Footprint") || {}).uuid || "",
    manufacturerId: call(c, "getState_ManufacturerId") || "",
    supplierId: call(c, "getState_SupplierId") || "",
  };
}

async function getComponents() {
  const list = (await eda.sch_PrimitiveComponent.getAll()) || [];
  return list.map(mapComponent);
}

async function getSchematicInfo(_params) {
  const components = await getComponents();
  let nets = [];
  try {
    nets = ((await eda.sch_ManufactureData.getAllNets()) || []).map((n) => n.net);
  } catch (e) {
    nets = [];
  }
  return { components, nets };
}

async function searchComponent(params) {
  const limit = params.limit || 10;
  const items = (await eda.lib_Device.search(params.keyword)) || [];
  return {
    keyword: params.keyword || "",
    results: items.slice(0, limit).map((it) => ({
      name: it.name,
      package: it.footprintName || (it.footprint && it.footprint.name) || "",
      description: it.description || "",
      uuid: it.uuid,
    })),
  };
}

async function runDRC(_params) {
  // includeVerboseError=true → 返回问题明细数组
  const issues = (await eda.sch_Drc.check(false, false, true)) || [];
  return {
    errors: issues,
    warnings: [],
    summary: `${issues.length} issues`,
  };
}

async function generateBOM(params) {
  const fmt = params.format || "json";
  const comps = await getComponents();
  const groups = {};
  for (const c of comps) {
    const key = `${c.name}||${c.package}`;
    (groups[key] = groups[key] || []).push(c.id);
  }
  const rows = Object.entries(groups).map(([key, refs]) => {
    const [name, pkg] = key.split("||");
    return { name, package: pkg, qty: refs.length, refs: refs.sort().join(",") };
  });
  return { format: fmt, rows, total_lines: rows.length, total_parts: comps.length };
}
