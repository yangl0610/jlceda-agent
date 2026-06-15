import * as React__default from 'react';
import React__default__default, { CSSProperties, ReactNode, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare global {
	/**
	 * 文档树项目类型
	 *
	 * @public
	 */
	enum EDMT_ItemType {
	    /** 工作区 */
	    WORKSPACE = "Workspace",
	    /** 团队 */
	    TEAM = "Team",
	    /** 文件夹 */
	    FOLDER = "Folder",
	    /** 工程 */
	    PROJECT = "Project",
	    /** 复用模块工程 */
	    CBB_PROJECT = "CBB Project",
	    /** 板子 */
	    BOARD = "Board",
	    /** 原理图 */
	    SCHEMATIC = "Schematic",
	    /** 复用模块原理图 */
	    CBB_SCHEMATIC = "CBB Schematic",
	    /** 原理图图页 */
	    SCHEMATIC_PAGE = "Schematic Page",
	    /** PCB */
	    PCB = "PCB",
	    /** 复用模块 PCB */
	    CBB_PCB = "CBB PCB",
	    /** 面板 */
	    PANEL = "Panel"
	}
	/**
	 * 编辑器文档类型
	 *
	 * @public
	 */
	enum EDMT_EditorDocumentType {
	    /** 开始页 */
	    HOME = -1,
	    /** 空白页 */
	    BLANK = 0,
	    /** 工程 */
	    PROJECT = 5,
	    /** 原理图图页 */
	    SCHEMATIC_PAGE = 1,
	    /** PCB */
	    PCB = 3,
	    /** PCB 2D 预览 */
	    PCB_2D_PREVIEW = 12,
	    /** PCB 3D 预览 */
	    PCB_3D_PREVIEW = 15,
	    /** 面板 */
	    PANEL = 26,
	    /** 面板 3D 预览 */
	    PANEL_3D_PREVIEW = 27,
	    /** 元件符号 */
	    SYMBOL_COMPONENT = 2,
	    /** 网络标识符号 */
	    SYMBOL_NET_FLAG = 18,
	    /** 网络端口符号 */
	    SYMBOL_NET_PORT = 19,
	    /** 图纸符号 */
	    SYMBOL_DRAWING = 20,
	    /** 无电气符号 */
	    SYMBOL_NON_ELECTRICAL = 21,
	    /** 短接标识符号 */
	    SYMBOL_SHORT_CIRCUIT_FLAG = 22,
	    /** 跨页连接标识符号 */
	    SYMBOL_OFF_PAGE_CONNECTOR_FLAG = 25,
	    /** 复用模块符号 */
	    SYMBOL_CBB = 17,
	    /** 封装 */
	    FOOTPRINT = 4,
	    /** 面板库 */
	    PANEL_LIBRARY = 29,
	    /** 仿真原理图图页：NGspice */
	    SIMULATION_SCHEMATIC_PAGE_NGSPICE = 8,
	    /** 仿真原理图图页：SimulIDE */
	    SIMULATION_SCHEMATIC_PAGE_SIMULIDE = 9,
	    /** 仿真元件符号：NGspice */
	    SIMULATION_SYMBOL_COMPONENT_NGSPICE = 7,
	    /** 仿真元件符号：SimulIDE */
	    SIMULATION_SYMBOL_COMPONENT_SIMULIDE = 32
	}
	/**
	 * 编辑器文档对象
	 *
	 * @public
	 */
	interface IDMT_EditorDocumentItem {
	    /** 文档类型 */
	    documentType: EDMT_EditorDocumentType;
	    /** 文档 UUID */
	    uuid: string;
	    /** 文档的标签页 ID */
	    tabId: string;
	    /** 文档所属工程 UUID */
	    parentProjectUuid?: string;
	    /** 库文档所属库 UUID */
	    parentLibraryUuid?: string;
	}
	/**
	 * 文档树 / 选择控制类
	 *
	 * @public
	 * @remarks 在文档树内进行选择焦点的查询、控制
	 */
	class DMT_SelectControl {
	    /**
	     * 获取当前文档的属性
	     *
	     * @beta
	     * @remarks 将会获取当前打开且拥有最后输入焦点的文档的文档类型、UUID、所属工程的 UUID 或所属库的 UUID
	     * @returns 文档类型、UUID、所属工程的 UUID、所属库的 UUID 组成的对象，如若为 `undefined` 则获取失败
	     */
	    getCurrentDocumentInfo(): Promise<IDMT_EditorDocumentItem | undefined>;
	}

	/**
	 * PCB 属性
	 *
	 * @public
	 */
	interface IDMT_PcbItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.PCB | EDMT_ItemType.CBB_PCB;
	    /** PCB UUID */
	    uuid: string;
	    /** PCB 名称 */
	    name: string;
	    /** 所属工程 UUID */
	    parentProjectUuid: string;
	    /** 所属板子名称 */
	    parentBoardName?: string;
	}
	/**
	 * 文档树 / PCB 管理类
	 *
	 * @public
	 * @remarks 在当前打开的工程内进行 PCB 管理的相关操作
	 */
	class DMT_Pcb {
	    /**
	     * 创建 PCB
	     *
	     * @public
	     * @param boardName - 所属板子名称，如若不指定则为游离 PCB
	     * @returns PCB UUID，如若为 `undefined` 则创建失败
	     */
	    createPcb(boardName?: string): Promise<string | undefined>;
	    /**
	     * 修改 PCB 名称
	     *
	     * @public
	     * @remarks 如若 PCB 已关联复用模块（在工程库内存在同名的复用模块符号），则修改名称时将同步修改复用模块符号名称与关联原理图名称
	     * @param pcbUuid - PCB UUID
	     * @param pcbName - PCB 名称
	     * @returns 是否修改成功
	     */
	    modifyPcbName(pcbUuid: string, pcbName: string): Promise<boolean>;
	    /**
	     * 复制 PCB
	     *
	     * @public
	     * @remarks 即使此处 PCB 已关联复用模块（在工程库内存在同名的复用模块符号），也不新建复用模块符号，此操作逻辑与当前编辑器前端保持一致
	     * @param pcbUuid - 源 PCB UUID
	     * @param boardName - 新 PCB 所属板子名称，如若不指定则为游离 PCB
	     * @returns 新 PCB UUID，如若为 `undefined` 则复制失败
	     */
	    copyPcb(pcbUuid: string, boardName?: string): Promise<string | undefined>;
	    /**
	     * 获取 PCB 的详细属性
	     *
	     * @public
	     * @param pcbUuid - PCB UUID
	     * @returns PCB 的详细属性，如若为 `undefined` 则获取失败
	     */
	    getPcbInfo(pcbUuid: string): Promise<IDMT_PcbItem | undefined>;
	    /**
	     * 获取工程内所有 PCB 的详细属性
	     *
	     * @public
	     * @returns 所有 PCB 的详细属性的数组
	     */
	    getAllPcbsInfo(): Promise<Array<IDMT_PcbItem>>;
	    /**
	     * 获取当前 PCB 的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前打开且拥有最后输入焦点的 PCB 的详细属性
	     * @returns PCB 的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentPcbInfo(): Promise<IDMT_PcbItem | undefined>;
	    /**
	     * 删除 PCB
	     *
	     * @public
	     * @remarks 如若 PCB 已关联复用模块（在工程库内存在同名的复用模块符号），则删除 PCB 时将同步删除关联的原理图和复用模块符号，复用模块符号不可删除则跳过
	     * @param pcbUuid - PCB UUID
	     * @returns 操作是否成功
	     */
	    deletePcb(pcbUuid: string): Promise<boolean>;
	}

	/**
	 * 综合库库类型
	 *
	 * @public
	 */
	enum ELIB_LibraryType {
	    /** 器件 */
	    DEVICE = "3",
	    /** 符号 */
	    SYMBOL = "2",
	    /** 封装 */
	    FOOTPRINT = "4",
	    /** 复用模块 */
	    CBB = "1",
	    /** 3D 模型 */
	    MODEL = "5",
	    /** 面板库 */
	    PANEL_LIBRARY = "29"
	}
	/**
	 * 分类索引
	 *
	 * @public
	 * @deprecated since EDA v3.2; dropped EDA v3.3
	 * @remarks 本分类索引用于索引指定库内的分类，其中库 UUID 和库类型仅作针对于本索引的识别用途，防止将不同库内的索引互相引用从而引发错误
	 */
	interface ILIB_ClassificationIndex {
	    /** 库 UUID */
	    libraryUuid: string;
	    /** 库类型 */
	    libraryType: ELIB_LibraryType;
	    /** 一级分类 UUID */
	    primaryClassificationUuid: string;
	    /** 二级分类 UUID */
	    secondaryClassificationUuid?: string;
	}
	/**
	 * 综合库 / 库分类索引类
	 *
	 * @public
	 */
	class LIB_Classification {
	    /**
	     * 创建一级分类
	     *
	     * @beta
	     * @deprecated since EDA v3.2; dropped EDA v3.3
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @param primaryClassificationName - 一级分类名称
	     * @returns 分类索引
	     */
	    createPrimary(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationName: string): Promise<ILIB_ClassificationIndex | undefined>;
	    /**
	     * 创建二级分类
	     *
	     * @beta
	     * @deprecated since EDA v3.2; dropped EDA v3.3
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @param primaryClassificationUuid - 一级分类 UUID
	     * @param secondaryClassificationName - 二级分类名称
	     * @returns 分类索引
	     */
	    createSecondary(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationUuid: string, secondaryClassificationName: string): Promise<ILIB_ClassificationIndex | undefined>;
	    /**
	     * 获取指定名称的分类的分类索引
	     *
	     * @beta
	     * @deprecated since EDA v3.2; dropped EDA v3.3
	     * @remarks 分类索引内包含分类的 UUID，具体可查阅 {@link ILIB_ClassificationIndex}
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @param primaryClassificationName - 一级分类名称
	     * @param secondaryClassificationName - 二级分类名称
	     * @returns 分类索引
	     */
	    getIndexByName(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationName: string, secondaryClassificationName?: string): Promise<ILIB_ClassificationIndex | undefined>;
	    /**
	     * 获取指定 UUID 的分类的名称
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @param primaryClassificationUuid - 一级分类 UUID
	     * @param secondaryClassificationUuid - 二级分类 UUID，如若不指定，则只获取一级分类的信息
	     * @returns 两级分类的名称
	     */
	    getNameByUuid(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationUuid: string, secondaryClassificationUuid?: string): Promise<{
	        primaryClassificationName: string;
	        secondaryClassificationName?: string | undefined;
	    } | undefined>;
	    /**
	     * 获取指定索引的分类的名称
	     *
	     * @beta
	     * @deprecated since EDA v3.2; dropped EDA v3.3
	     * @param classificationIndex - 分类索引
	     * @returns 两级分类的名称
	     */
	    getNameByIndex(classificationIndex: ILIB_ClassificationIndex): Promise<{
	        primaryClassificationName: string;
	        secondaryClassificationName?: string | undefined;
	    } | undefined>;
	    /**
	     * 获取所有分类信息组成的树
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @returns 分类信息组成的树结构数据
	     */
	    getAllClassificationTree(libraryUuid: string, libraryType: ELIB_LibraryType): Promise<Array<{
	        name: string;
	        uuid: string;
	        children?: Array<{
	            name: string;
	            uuid: string;
	        }> | undefined;
	    }>>;
	    /**
	     * 删除指定 UUID 的分类
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID
	     * @param libraryType - 库类型
	     * @param primaryClassificationUuid - 一级分类 UUID
	     * @param secondaryClassificationUuid - 二级分类 UUID
	     * @returns 操作是否成功
	     */
	    deleteByUuid(libraryUuid: string, classificationUuid: string): Promise<boolean>;
	    /**
	     * 删除指定索引的分类
	     *
	     * @beta
	     * @deprecated since EDA v3.2; dropped EDA v3.3
	     * @param classificationIndex - 分类索引
	     * @returns 操作是否成功
	     */
	    deleteByIndex(classificationIndex: ILIB_ClassificationIndex): Promise<boolean>;
	}

	/**
	 * 符号类型
	 *
	 * @public
	 */
	enum ELIB_SymbolType {
	    /** 元件符号 */
	    COMPONENT = 2,
	    /** 网络标识 */
	    NET_FLAG = 18,
	    /** 网络端口 */
	    NET_PORT = 19,
	    /** 图纸 */
	    DRAWING = 20,
	    /** 无电气 */
	    NON_ELECTRICAL = 21,
	    /** 短接标识 */
	    SHORT_CIRCUIT_FLAG = 22,
	    /** 跨页连接标识 */
	    OFF_PAGE_CONNECTOR = 25,
	    /** 差分对标识 */
	    DIFFERENTIAL_PAIRS_FLAG = 31,
	    /** 复用模块符号 */
	    CBB_SYMBOL = 17
	}
	/**
	 * 符号属性
	 *
	 * @public
	 */
	interface ILIB_SymbolItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.SYMBOL;
	    /** 符号 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 所属复用模块 UUID，仅复用模块符号存在该属性 */
	    cbbUuid?: string;
	    /** 符号名称 */
	    name: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 符号类型 */
	    type: ELIB_SymbolType;
	    /** 描述 */
	    description?: string;
	    /** 子部件名称数组 */
	    subPartNames: [];
	}
	/**
	 * 搜索到的符号属性
	 *
	 * @public
	 */
	interface ILIB_SymbolSearchItem {
	    /** 符号 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 符号名称 */
	    name: string;
	    /** 符号类型 */
	    type: ELIB_SymbolType;
	    /** 描述 */
	    description?: string;
	    /** 更新时间戳 */
	    updateTimestamp: number;
	    /** 归属 */
	    ascription: string;
	    /** 前次修改者 */
	    lastModifiedBy: string;
	}
	/**
	 * 可用于精确搜索的符号参数
	 *
	 * @public
	 */
	interface ILIB_SymbolPropertiesForSearch {
	    /** 符号名称 */
	    name?: string;
	}
	/**
	 * 综合库 / 符号类
	 *
	 * @public
	 */
	class LIB_Symbol {
	    /**
	     * 创建符号
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param symbolName - 符号名称
	     * @param classification - 分类
	     * @param symbolType - 符号类型
	     * @param description - 描述
	     * @returns 符号 UUID
	     */
	    create(libraryUuid: string, symbolName: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, description?: string): Promise<string | undefined>;
	    /**
	     * 删除符号
	     *
	     * @beta
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(symbolUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改符号
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param symbolName - 符号名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 操作是否成功
	     */
	    modify(symbolUuid: string, libraryUuid: string, symbolName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>;
	    /**
	     * 更新符号的文档源码
	     *
	     * @beta
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param documentSource - 文档源码
	     * @returns 是否更新成功
	     */
	    updateDocumentSource(symbolUuid: string, libraryUuid: string, documentSource: string): Promise<boolean | undefined>;
	    /**
	     * 获取符号的所有属性
	     *
	     * @beta
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 符号属性
	     */
	    get(symbolUuid: string, libraryUuid?: string): Promise<ILIB_SymbolItem | undefined>;
	    /**
	     * 复制符号
	     *
	     * @beta
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newSymbolName - 新符号名称，如若目标库内存在重名符号将导致复制失败
	     * @returns 目标库内新符号的 UUID
	     */
	    copy(symbolUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newSymbolName?: string): Promise<string | undefined>;
	    /**
	     * 搜索符号
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param symbolType - 符号类型，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的符号属性列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_SymbolSearchItem>>;
	    /**
	     * 使用属性精确搜索符号
	     *
	     * @alpha
	     * @param properties - 属性
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 搜索到的符号属性的列表
	     */
	    searchByProperties(properties: ILIB_SymbolPropertiesForSearch, libraryUuid?: string): Promise<Array<ILIB_SymbolSearchItem>>;
	    /**
	     * 在编辑器打开文档
	     *
	     * @beta
	     * @param symbolUuid - 符号 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param splitScreenId - 分屏 ID，不填写则默认在最后输入焦点的分屏内打开，可以使用 {@link DMT_EditorControl} 内的接口获取
	     * @returns 标签页 ID，对应 {@link IDMT_EditorTabItem.tabId}，可使用 {@link DMT_EditorControl.getSplitScreenIdByTabId} 获取到分屏 ID
	     */
	    openInEditor(symbolUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>;
	    /**
	     * 获取符号渲染图
	     *
	     * @beta
	     * @param symbol - 符号的索引
	     * @returns 符号渲染图
	     */
	    getRenderImage(source: {
	        symbolUuid: string;
	        libraryUuid: string;
	        subPartName?: string;
	    }): Promise<Blob | undefined>;
	}

	/**
	 * 原理图属性
	 *
	 * @public
	 */
	interface IDMT_SchematicItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.SCHEMATIC | EDMT_ItemType.CBB_SCHEMATIC;
	    /** 原理图 UUID */
	    uuid: string;
	    /** 原理图名称 */
	    name: string;
	    /** 下属原理图图页 */
	    page: Array<IDMT_SchematicPageItem>;
	    /** 所属工程 UUID */
	    parentProjectUuid: string;
	    /** 所属板子名称 */
	    parentBoardName?: string;
	    /** 复用模块原理图关联的模块符号 */
	    cbbSymbol?: ILIB_SymbolItem;
	}
	/**
	 * 原理图图页属性
	 *
	 * @public
	 */
	interface IDMT_SchematicPageItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.SCHEMATIC_PAGE;
	    /** 原理图图页 UUID */
	    uuid: string;
	    /** 原理图图页名称 */
	    name: string;
	    /** 所属原理图 UUID */
	    parentSchematicUuid: string;
	    /** 是否显示明细表 */
	    showTitleBlock: boolean;
	    /** 明细表数据 */
	    titleBlockData: {
	        [key: string]: {
	            showTitle: boolean;
	            showValue: boolean;
	            value: any;
	        };
	    };
	}
	/**
	 * 文档树 / 原理图管理类
	 *
	 * @public
	 * @remarks 在当前打开的工程内进行原理图管理的相关操作
	 */
	class DMT_Schematic {
	    /**
	     * 创建原理图
	     *
	     * @beta
	     * @param boardName - 所属板子名称，如若不指定则为游离原理图
	     * @returns 原理图 UUID，如若为 `undefined` 则创建失败
	     */
	    createSchematic(boardName?: string): Promise<string | undefined>;
	    /**
	     * 创建原理图图页
	     *
	     * @beta
	     * @param schematicUuid - 所属原理图 UUID
	     * @returns 原理图图页 UUID，如若为 `undefined` 则创建失败
	     */
	    createSchematicPage(schematicUuid: string): Promise<string | undefined>;
	    /**
	     * 修改原理图名称
	     *
	     * @beta
	     * @remarks 如若原理图已关联复用模块（在工程库内存在同名的复用模块符号），则修改名称时将同步修改复用模块符号名称与关联 PCB 名称
	     * @param schematicUuid - 原理图 UUID
	     * @param schematicName - 原理图名称
	     * @returns 是否修改成功
	     */
	    modifySchematicName(schematicUuid: string, schematicName: string): Promise<boolean>;
	    /**
	     * 修改原理图图页名称
	     *
	     * @beta
	     * @param schematicPageUuid - 原理图图页 UUID
	     * @param schematicPageName - 原理图图页名称
	     * @returns 是否修改成功
	     */
	    modifySchematicPageName(schematicPageUuid: string, schematicPageName: string): Promise<boolean>;
	    /**
	     * 修改原理图图页明细表
	     *
	     * @beta
	     * @remarks `titleBlockData` 仅需要传入任何需要修改的明细项作为 `key`，并传入其需要修改的值，任何无法识别的明细项将被忽略，任何未传入的项和值将保持默认状态
	     * @param showTitleBlock - 是否显示明细表，不定义将保持当前状态
	     * @param titleBlockData - 需要修改的明细项及其修改的值
	     * @returns 修改操作是否成功，如若未传入 `showTitleBlock` 和 `titleBlockData` 将返回 `false`；请注意，如若存在无法识别的明细项但程序并未出错，将返回 `true` 的结果，因为无法识别的明细项被忽略
	     */
	    modifySchematicPageTitleBlock(showTitleBlock?: boolean, titleBlockData?: {
	        [key: string]: {
	            showTitle?: boolean;
	            showValue?: boolean;
	            value?: any;
	        };
	    }): Promise<boolean>;
	    /**
	     * 复制原理图
	     *
	     * @beta
	     * @remarks 如若原理图已关联复用模块（在工程库内存在同名的复用模块符号），则复制原理图时将同步新建复用模块符号
	     * @param schematicUuid - 源原理图 UUID
	     * @param boardName - 新原理图所属板子名称，如若不指定则为游离原理图
	     * @returns 新原理图 UUID，如若为 `undefined` 则复制失败
	     */
	    copySchematic(schematicUuid: string, boardName?: string): Promise<string | undefined>;
	    /**
	     * 复制原理图图页
	     *
	     * @beta
	     * @param schematicPageUuid - 源原理图图页 UUID
	     * @param schematicUuid - 目标原理图 UUID，如若不指定则为当前原理图
	     * @returns 新原理图图页 UUID，如若为 `undefined` 则复制失败
	     */
	    copySchematicPage(schematicPageUuid: string, schematicUuid?: string): Promise<string | undefined>;
	    /**
	     * 获取原理图的详细属性
	     *
	     * @beta
	     * @param schematicUuid - 原理图 UUID
	     * @returns 原理图的详细属性，如若为 `undefined` 则获取失败
	     */
	    getSchematicInfo(schematicUuid: string): Promise<IDMT_SchematicItem | undefined>;
	    /**
	     * 获取原理图图页的详细属性
	     *
	     * @beta
	     * @param schematicPageUuid - 原理图图页 UUID
	     * @returns 原理图图页的详细属性，如若为 `undefined` 则获取失败
	     */
	    getSchematicPageInfo(schematicPageUuid: string): Promise<IDMT_SchematicPageItem | undefined>;
	    /**
	     * 获取工程内所有原理图的详细属性
	     *
	     * @beta
	     * @returns 所有原理图的详细属性的数组
	     */
	    getAllSchematicsInfo(): Promise<Array<IDMT_SchematicItem>>;
	    /**
	     * 获取工程内所有原理图图页的详细属性
	     *
	     * @beta
	     * @returns 所有原理图图页的详细属性的数组
	     */
	    getAllSchematicPagesInfo(): Promise<Array<IDMT_SchematicPageItem>>;
	    /**
	     * 获取当前原理图内所有原理图图页的详细属性
	     *
	     * @beta
	     * @returns 所有原理图图页的详细属性的数组
	     */
	    getCurrentSchematicAllSchematicPagesInfo(): Promise<Array<IDMT_SchematicPageItem>>;
	    /**
	     * 获取当前原理图的详细属性
	     *
	     * @beta
	     * @remarks 将会获取当前打开且拥有最后输入焦点的原理图图页所关联的原理图的详细属性
	     * @returns 原理图的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentSchematicInfo(): Promise<IDMT_SchematicItem | undefined>;
	    /**
	     * 获取当前原理图图页的详细属性
	     *
	     * @beta
	     * @remarks 将会获取当前打开且拥有最后输入焦点的原理图图页的详细属性
	     * @returns 原理图图页的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentSchematicPageInfo(): Promise<IDMT_SchematicPageItem | undefined>;
	    /**
	     * 重新排序原理图图页
	     *
	     * @beta
	     * @remarks 此处源原理图图页属性的数组需要通过 {@link DMT_Schematic.getAllSchematicPagesInfo} 或其它上游方法取得，完成数组排序后传入
	     * @param schematicUuid - 执行排序的图页所关联的原理图 UUID
	     * @param schematicPageItemsArray - 所有原理图图页属性的数组
	     * @returns 排序操作是否成功
	     */
	    reorderSchematicPages(schematicUuid: string, schematicPageItemsArray: Array<IDMT_SchematicPageItem>): Promise<boolean>;
	    /**
	     * 删除原理图
	     *
	     * @beta
	     * @remarks 如若原理图已关联复用模块（在工程库内存在同名的复用模块符号），则删除原理图时将同步删除关联的 PCB 和复用模块符号，复用模块符号不可删除则跳过
	     * @param schematicUuid - 原理图 UUID
	     * @returns 操作是否成功
	     */
	    deleteSchematic(schematicUuid: string): Promise<boolean>;
	    /**
	     * 删除原理图图页
	     *
	     * @beta
	     * @param schematicPageUuid - 原理图图页 UUID
	     * @returns 操作是否成功
	     */
	    deleteSchematicPage(schematicPageUuid: string): Promise<boolean>;
	}

	/**
	 * 板子属性
	 *
	 * @public
	 */
	interface IDMT_BoardItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.BOARD;
	    /** 板子名称 */
	    name: string;
	    /** 下属原理图 */
	    schematic: IDMT_SchematicItem;
	    /** 下属 PCB */
	    pcb: IDMT_PcbItem;
	    /** 所属工程 UUID */
	    parentProjectUuid: string;
	}
	/**
	 * 文档树 / 板子管理类
	 *
	 * @public
	 * @remarks 在当前打开的工程内进行板子管理的相关操作
	 */
	class DMT_Board {
	    /**
	     * 创建板子
	     *
	     * @beta
	     * @param schematicUuid - 关联原理图 UUID
	     * @param pcbUuid - 关联 PCB UUID
	     * @returns 板子名称，如若为 `undefined` 则创建失败
	     */
	    createBoard(schematicUuid?: string, pcbUuid?: string): Promise<string | undefined>;
	    /**
	     * 修改板子名称
	     *
	     * @public
	     * @param originalBoardName - 原板子名称
	     * @param boardName - 新板子名称
	     * @returns 是否修改成功
	     */
	    modifyBoardName(originalBoardName: string, boardName: string): Promise<boolean>;
	    /**
	     * 复制板子
	     *
	     * @public
	     * @param sourceBoardName - 源板子名称
	     * @returns 新板子名称，如若为 `undefined` 则复制失败
	     */
	    copyBoard(sourceBoardName: string): Promise<string | undefined>;
	    /**
	     * 获取板子的详细属性
	     *
	     * @public
	     * @param boardName - 板子名称
	     * @returns 板子的详细属性，如若为 `undefined` 则获取失败
	     */
	    getBoardInfo(boardName: string): Promise<IDMT_BoardItem | undefined>;
	    /**
	     * 获取工程内所有板子的详细属性
	     *
	     * @public
	     * @returns 所有板子的详细属性的数组
	     */
	    getAllBoardsInfo(): Promise<Array<IDMT_BoardItem>>;
	    /**
	     * 获取当前板子的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前打开且拥有最后输入焦点的原理图、PCB 所关联的板子的详细属性
	     * @returns 板子的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentBoardInfo(): Promise<IDMT_BoardItem | undefined>;
	    /**
	     * 删除板子
	     *
	     * @public
	     * @remarks 如若指定板子不存在，接口将返回 `false` 的结果，表示操作失败
	     * @param boardName - 板子名称
	     * @returns 操作是否成功
	     */
	    deleteBoard(boardName: string): Promise<boolean>;
	}

	/**
	 * 编辑器分屏方向
	 *
	 * @public
	 */
	enum EDMT_EditorSplitScreenDirection {
	    /** 水平 */
	    HORIZONTAL = "horizontal",
	    /** 垂直 */
	    VERTICAL = "vertical"
	}
	/**
	 * 指示标记类型
	 *
	 * @public
	 */
	enum EDMT_IndicatorMarkerType {
	    /** 点 */
	    POINT = "point",
	    /** 圆形 */
	    CIRCLE = "circle",
	    /** 线段 */
	    LINE = "line",
	    /** 圆弧 */
	    ARC = "arc",
	    /** 矩形 */
	    RECTANGLE = "rectangle"
	}
	/**
	 * 指示标记外形
	 *
	 * @public
	 */
	interface IDMT_IndicatorMarkerShape {
	    /** 类型 */
	    type: EDMT_IndicatorMarkerType;
	    /**
	     * 点：坐标 X
	     *
	     * 圆形：圆心 X
	     */
	    x?: number;
	    /**
	     * 点：坐标 Y
	     *
	     * 圆形：圆心 Y
	     */
	    y?: number;
	    /**
	     * 圆形：半径
	     */
	    r?: number;
	    /**
	     * 线段 | 圆弧：起始点 X
	     */
	    startX?: number;
	    /**
	     * 线段 | 圆弧：起始点 Y
	     */
	    startY?: number;
	    /**
	     * 线段 | 圆弧：终止点 X
	     */
	    endX?: number;
	    /**
	     * 线段 | 圆弧：终止点 Y
	     */
	    endY?: number;
	    /**
	     * 矩形：上 Y
	     */
	    top?: number;
	    /**
	     * 矩形：下 Y
	     */
	    bottom?: number;
	    /**
	     * 矩形：左 X
	     */
	    left?: number;
	    /**
	     * 矩形：右 X
	     */
	    right?: number;
	    /**
	     * 圆弧：角度
	     */
	    angle?: number;
	}
	/**
	 * 编辑器分屏属性
	 *
	 * @public
	 * @remarks {@link IDMT_EditorSplitScreenItem.tabs | tabs} 和 {@link IDMT_EditorSplitScreenItem.children | children} 并不同时存在，当 {@link IDMT_EditorSplitScreenItem.tabs | tabs} 存在时，代表不存在分屏，{@link IDMT_EditorSplitScreenItem.children | children} 将为 `undefined`
	 */
	interface IDMT_EditorSplitScreenItem {
	    /** 分屏 ID */
	    id: string;
	    /** 父级分屏 ID */
	    fatherId?: string;
	    /** 分屏内标签页 */
	    tabs?: Array<IDMT_EditorTabItem>;
	    /** 分屏方向 */
	    direction?: EDMT_EditorSplitScreenDirection;
	    /** 子分屏 */
	    children?: Array<IDMT_EditorSplitScreenItem>;
	}
	/**
	 * 编辑器标签页
	 *
	 * @public
	 */
	interface IDMT_EditorTabItem {
	    /** 标签页标题 */
	    title: string;
	    /** 标签页 ID */
	    tabId: string;
	    /** 文档类型 */
	    documentType: EDMT_EditorDocumentType;
	    /** 标签页是否可拖动 */
	    draggable: boolean;
	    /** 标签页是否可关闭 */
	    isAbleDelete: boolean;
	    /**
	     * 标签页是否不使用 I18n 功能（内部功能）
	     *
	     * @internal
	     */
	    notUseI18n?: boolean;
	}
	/**
	 * 文档树 / 编辑器控制类
	 *
	 * @public
	 * @remarks 此处编辑器控制基于当前已打开的工程设计下的图页，其它任何 `documentUuid` 都将被认为是不存在的文档页
	 */
	class DMT_EditorControl {
	    /**
	     * 打开文档
	     *
	     * @public
	     * @param documentUuid - 文档 UUID，此处支持 {@link IDMT_SchematicItem.uuid}、{@link IDMT_SchematicPageItem.uuid}、{@link IDMT_PcbItem.uuid}、{@link IDMT_PanelItem.uuid} 作为输入
	     * @param splitScreenId - 分屏 ID，即 {@link DMT_EditorControl.getSplitScreenTree} 方法获取到的 {@link IDMT_EditorSplitScreenItem.id}
	     * @returns 标签页 ID，如若为 `undefined`，则打开文档失败
	     */
	    openDocument(documentUuid: string, splitScreenId?: string): Promise<string | undefined>;
	    /**
	     * 打开库符号、封装文档
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param libraryType - 库类型，支持符号和封装
	     * @param uuid - 符号、封装 UUID
	     * @param splitScreenId - 分屏 ID，即 {@link DMT_EditorControl.getSplitScreenTree} 方法获取到的 {@link IDMT_EditorSplitScreenItem.id}
	     * @returns 标签页 ID，如若为 `undefined`，则打开文档失败
	     */
	    openLibraryDocument(libraryUuid: string, libraryType: ELIB_LibraryType.SYMBOL | ELIB_LibraryType.FOOTPRINT, uuid: string, splitScreenId?: string): Promise<string | undefined>;
	    /**
	     * 关闭文档
	     *
	     * @public
	     * @remarks 如若文档尚未保存，执行此操作将会直接丢失所有未保存的数据，请在修改操作完成后首先执行 {@link SCH_Document.save}、{@link PCB_Document.save}、{@link PNL_Document.save} 保存数据
	     * @param tabId - 标签页 ID，此处支持 {@link IDMT_SchematicPageItem.uuid}、{@link IDMT_PcbItem.uuid}、{@link IDMT_PanelItem.uuid} 作为输入
	     * @returns 操作是否成功
	     */
	    closeDocument(tabId: string): Promise<boolean>;
	    /**
	     * 获取编辑器分屏属性树
	     *
	     * @public
	     * @returns 编辑器分屏属性树，如若为 `undefined`，则数据获取失败
	     */
	    getSplitScreenTree(): Promise<IDMT_EditorSplitScreenItem | undefined>;
	    /**
	     * 使用标签页 ID 获取分屏 ID
	     *
	     * @public
	     * @param tabId - 标签页 ID
	     * @returns 分屏 ID
	     */
	    getSplitScreenIdByTabId(tabId: string): Promise<string | undefined>;
	    /**
	     * 获取指定分屏 ID 下的所有标签页
	     *
	     * @public
	     * @remarks 如果指定分屏下不存在直接标签页（即它属下还存在 {@link IDMT_EditorSplitScreenItem.children | children}），则返回空数组
	     * @param splitScreenId - 分屏 ID
	     * @returns 标签页列表
	     */
	    getTabsBySplitScreenId(splitScreenId: string): Promise<Array<IDMT_EditorTabItem>>;
	    /**
	     * 创建分屏
	     *
	     * @public
	     * @remarks 请确认 {@link DMT_EditorControl.createSplitScreen | tabId} 对应的分屏存在两个以上的标签页，否则分屏将不会执行，并返回 `undefined`
	     * @param splitScreenType - 分屏类型，`horizontal` 水平、`vertical` 垂直
	     * @param tabId - 标签页 ID，该标签页将会被移入新的分屏中
	     * @returns 分屏 ID，`sourceSplitScreenId` 代表源分屏，`newSplitScreenId` 代表新分屏
	     */
	    createSplitScreen(splitScreenType: EDMT_EditorSplitScreenDirection, tabId: string): Promise<{
	        sourceSplitScreenId: string;
	        newSplitScreenId: string;
	    } | undefined>;
	    /**
	     * 将文档移动到指定分屏
	     *
	     * @public
	     * @remarks 移动文档后，编辑器分屏属性树可能会出现变化
	     * @param tabId - 标签页 ID
	     * @param splitScreenId - {@link IDMT_EditorSplitScreenItem.id | 分屏 ID}
	     * @returns 操作是否成功
	     */
	    moveDocumentToSplitScreen(tabId: string, splitScreenId: string): Promise<boolean>;
	    /**
	     * 激活文档
	     *
	     * @public
	     * @remarks 切换到指定文档的标签页，并将输入焦点置于其中
	     * @param tabId - 标签页 ID
	     * @returns 操作是否成功
	     */
	    activateDocument(tabId: string): Promise<boolean>;
	    /**
	     * 激活分屏
	     *
	     * @public
	     * @remarks 使输入焦点
	     * @param splitScreenId - 分屏 ID
	     * @returns 操作是否成功
	     */
	    activateSplitScreen(splitScreenId: string): Promise<boolean>;
	    /**
	     * 平铺所有文档
	     *
	     * @public
	     * @remarks 仅当不存在子分屏时可用，将会自动为所有已打开的文档标签页创建分屏
	     * @returns 操作是否成功
	     */
	    tileAllDocumentToSplitScreen(): Promise<boolean>;
	    /**
	     * 合并所有分屏
	     *
	     * @public
	     * @remarks 仅当存在子分屏时可用，将会取消所有子分屏，并将所有文档标签页合并到初始分屏内
	     * @returns 操作是否成功
	     */
	    mergeAllDocumentFromSplitScreen(): Promise<boolean>;
	    /**
	     * 获取画布渲染区域图像
	     *
	     * @beta
	     * @param tabId - 标签页 ID，如若未传入，则获取最后输入焦点的画布
	     * @returns - 画布渲染区域的 Blob 格式图像数据
	     */
	    getCurrentRenderedAreaImage(tabId?: string): Promise<Blob | undefined>;
	    /**
	     * 缩放到区域
	     *
	     * @beta
	     * @remarks 在原理图、符号画布坐标单位跨度为 0.01inch，在 PCB、封装画布坐标单位跨度为 mil
	     * @param left - 矩形框第一 X 坐标
	     * @param right - 矩形框第二 X 坐标
	     * @param top - 矩形框第一 Y 坐标
	     * @param bottom - 矩形框第二 Y 坐标
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 操作是否成功
	     */
	    zoomToRegion(left: number, right: number, top: number, bottom: number, tabId?: string): Promise<boolean>;
	    /**
	     * 缩放到坐标
	     *
	     * @beta
	     * @remarks 在原理图、符号画布坐标单位跨度为 0.01inch，在 PCB、封装画布坐标单位跨度为 mil
	     * @param x - 中心坐标 X，如若不传入则不改变当前 X 坐标
	     * @param y - 中心坐标 Y，如若不传入则不改变当前 Y 坐标
	     * @param scaleRatio - 缩放比，如若不传入则不改变当前缩放比，单位跨度为 `1/100`，如若传入 `200`，则表示缩放比为 `200%`
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 缩放到的区域数据，`false` 表示画布不支持该缩放操作或 `tabId` 不存在
	     */
	    zoomTo(x?: number, y?: number, scaleRatio?: number, tabId?: string): Promise<{
	        left: number;
	        right: number;
	        top: number;
	        bottom: number;
	    } | false>;
	    /**
	     * 缩放到所有图元（适应全部）
	     *
	     * @beta
	     * @remarks 在返回数据中，原理图、符号画布坐标单位跨度为 0.01inch，PCB、封装画布坐标单位跨度为 mil
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 缩放到的区域数据，`false` 表示画布不支持该缩放操作或 `tabId` 不存在
	     */
	    zoomToAllPrimitives(tabId?: string): Promise<{
	        left: number;
	        right: number;
	        top: number;
	        bottom: number;
	    } | false>;
	    /**
	     * 缩放到已选中图元（适应选中）
	     *
	     * @beta
	     * @remarks 在返回数据中，原理图、符号画布坐标单位跨度为 0.01inch，PCB、封装画布坐标单位跨度为 mil
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 缩放到的区域数据，`false` 表示画布不支持该缩放操作或 `tabId` 不存在
	     */
	    zoomToSelectedPrimitives(tabId?: string): Promise<{
	        left: number;
	        right: number;
	        top: number;
	        bottom: number;
	    } | false>;
	    /**
	     * 生成指示标记
	     *
	     * @beta
	     * @remarks 指示标记外形数据中，原理图、符号画布坐标单位跨度为 0.01inch，PCB、封装画布坐标单位跨度为 mil
	     * @param markers - 指示标记外形对象数组
	     * @param color - 指示标记颜色
	     * @param lineWidth - 线宽
	     * @param zoom - 是否定位并缩放
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 指示标记生成是否成功，`false` 表示画布不支持该操作或 `tabId` 不存在
	     */
	    generateIndicatorMarkers(markers: Array<IDMT_IndicatorMarkerShape>, color?: {
	        r: number;
	        g: number;
	        b: number;
	        alpha: number;
	    }, lineWidth?: number, zoom?: boolean, tabId?: string): Promise<boolean>;
	    /**
	     * 移除指示标记
	     *
	     * @beta
	     * @remarks 本接口会移除所有已生成的指示标记
	     * @param tabId - 标签页 ID，如若未传入，则为最后输入焦点的画布
	     * @returns 指示标记移除是否成功，`false` 表示画布不支持该操作或 `tabId` 不存在
	     */
	    removeIndicatorMarkers(tabId?: string): Promise<boolean>;
	}

	/**
	 * 编辑器标签页事件类型
	 *
	 * @public
	 * @remarks 在类型为 {@link EDMT_EditorTabEventType.CLOSE | 关闭} 或 {@link EDMT_EditorTabEventType.OPEN | 打开} 时，均会同时触发 {@link EDMT_EditorTabEventType.TOGGLE | 切换} 事件
	 */
	enum EDMT_EditorTabEventType {
	    /** 切换 */
	    TOGGLE = "toggle",
	    /** 关闭 */
	    CLOSE = "close",
	    /** 打开 */
	    OPEN = "open"
	}
	/**
	 * 编辑器标签页事件触发原因
	 *
	 * @public
	 */
	/**
	 * 文档树 / 事件类
	 *
	 * @public
	 * @remarks 注册事件回调
	 */
	class DMT_Event {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 新增编辑器标签页事件监听
	     *
	     * @alpha
	     * @remarks
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     *
	     * 在 {@link EDMT_EditorTabEventType | 标签页事件类型} 为 {@link EDMT_EditorTabEventType.CLOSE | 关闭} 或 {@link EDMT_EditorTabEventType.OPEN | 打开} 时，均会同时触发 {@link EDMT_EditorTabEventType.TOGGLE | 切换} 事件
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addEditorTabEventListener(id: string, eventType: 'all' | EDMT_EditorTabEventType, callFn: (eventType: EDMT_EditorTabEventType, props: {
	        documentType: EDMT_EditorDocumentType;
	        title: string;
	        tabId: string;
	    }) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 移除事件监听
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 是否移除指定事件监听
	     */
	    removeEventListener(id: string): boolean;
	    /**
	     * 查询事件监听是否存在
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 事件监听是否存在
	     */
	    isEventListenerAlreadyExist(id: string): boolean;
	}

	/**
	 * 文件夹属性
	 *
	 * @public
	 */
	interface IDMT_FolderItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.FOLDER;
	    /** 文件夹 UUID */
	    uuid: string;
	    /** 文件夹名称 */
	    name: string;
	    /** 所属团队 UUID */
	    teamUuid: string;
	    /** 文件夹描述 */
	    description?: string;
	    /** 父文件夹 UUID */
	    parentFolderUuid: string;
	    /** 子文件夹 UUID 列表 */
	    childrenFoldersUuid?: Array<string>;
	}
	/**
	 * 文档树 / 文件夹类
	 *
	 * @public
	 */
	class DMT_Folder {
	    /**
	     * 创建文件夹
	     *
	     * @beta
	     * @param folderName - 文件夹名称
	     * @param teamUuid - 团队 UUID
	     * @param parentFolderUuid - 父文件夹 UUID，如若不指定，则为根文件夹
	     * @param description - 文件夹描述
	     * @returns 文件夹 UUID，如若为 `undefined` 则创建失败
	     */
	    createFolder(folderName: string, teamUuid: string, parentFolderUuid?: string, description?: string): Promise<string | undefined>;
	    /**
	     * 修改文件夹名称
	     *
	     * @public
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID
	     * @param folderName - 文件夹名称
	     * @returns 是否修改成功
	     */
	    modifyFolderName(teamUuid: string, folderUuid: string, folderName: string): Promise<boolean>;
	    /**
	     * 修改文件夹描述
	     *
	     * @beta
	     * @remarks 修改文件夹描述需要与工作区系统进行交互，修改操作存在延迟，需要短暂等待后才会呈现效果
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID
	     * @param description - 文件夹描述，如若为 `undefined` 则清空工程现有描述
	     * @returns 是否修改成功
	     */
	    modifyFolderDescription(teamUuid: string, folderUuid: string, description?: string): Promise<boolean>;
	    /**
	     * 移动文件夹
	     *
	     * @public
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID
	     * @param parentFolderUuid - 父文件夹 UUID，如若不指定，则默认为根文件夹
	     * @returns 是否移动成功
	     */
	    moveFolderToFolder(teamUuid: string, folderUuid: string, parentFolderUuid?: string): Promise<boolean>;
	    /**
	     * 获取所有文件夹的 UUID
	     *
	     * @public
	     * @remarks 本接口忽略层级信息，将会返回所有层级的文件夹的 UUID 并放置于一维数组中
	     * @param teamUuid - 团队 UUID
	     * @returns 文件夹 UUID 数组
	     */
	    getAllFoldersUuid(teamUuid: string): Promise<Array<string>>;
	    /**
	     * 获取文件夹详细属性
	     *
	     * @public
	     * @remarks 当 {@link IDMT_FolderItem.parentFolderUuid | parentFolderUuid} 等于 {@link IDMT_FolderItem.teamUuid | teamUuid} 时，代表当前文件夹为指定团队下的一级文件夹
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID
	     * @returns 文件夹属性，如若为 `undefined` 则获取失败
	     */
	    getFolderInfo(teamUuid: string, folderUuid: string): Promise<IDMT_FolderItem | undefined>;
	    /**
	     * 删除文件夹
	     *
	     * @public
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID
	     * @returns 操作是否成功
	     */
	    deleteFolder(teamUuid: string, folderUuid: string): Promise<boolean>;
	}

	/**
	 * 面板属性
	 *
	 * @public
	 */
	interface IDMT_PanelItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.PANEL;
	    /** 面板 UUID */
	    uuid: string;
	    /** 面板名称 */
	    name: string;
	    /** 所属工程 UUID */
	    parentProjectUuid: string;
	}
	/**
	 * 文档树 / 面板管理类
	 *
	 * @public
	 * @remarks 在当前打开的工程内进行面板管理的相关操作
	 */
	class DMT_Panel {
	    /**
	     * 创建面板
	     *
	     * @beta
	     * @returns 面板 UUID，如若为 `undefined` 则创建失败
	     */
	    createPanel(): Promise<string | undefined>;
	    /**
	     * 修改面板名称
	     *
	     * @public
	     * @param panelUuid - 面板 UUID
	     * @param panelName - 面板名称
	     * @returns 是否修改成功
	     */
	    modifyPanelName(panelUuid: string, panelName: string): Promise<boolean>;
	    /**
	     * 复制面板
	     *
	     * @public
	     * @param panelUuid - 源面板 UUID
	     * @returns 新面板 UUID，如若为 `undefined` 则复制失败
	     */
	    copyPanel(panelUuid: string): Promise<string | undefined>;
	    /**
	     * 获取面板的详细属性
	     *
	     * @public
	     * @param panelUuid - 面板 UUID
	     * @returns 面板的详细属性，如若为 `undefined` 则获取失败
	     */
	    getPanelInfo(panelUuid: string): Promise<IDMT_PanelItem | undefined>;
	    /**
	     * 获取工程内所有面板的详细属性
	     *
	     * @public
	     * @returns 所有面板的详细属性的数组
	     */
	    getAllPanelsInfo(): Promise<Array<IDMT_PanelItem>>;
	    /**
	     * 获取当前面板的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前打开且拥有最后输入焦点的面板的详细属性
	     * @returns 面板的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentPanelInfo(): Promise<IDMT_PanelItem | undefined>;
	    /**
	     * 删除面板
	     *
	     * @public
	     * @param panelUuid - 面板 UUID
	     * @returns 操作是否成功
	     */
	    deletePanel(panelUuid: string): Promise<boolean>;
	}

	/**
	 * 工程协作模式
	 *
	 * @public
	 */
	enum EDMT_ProjectCollaborationMode {
	    /** 严格 */
	    STRICT = 3,
	    /** 自由 */
	    FREE = 1
	}
	/**
	 * 简略工程属性
	 *
	 * @public
	 */
	interface IDMT_BriefProjectItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.PROJECT | EDMT_ItemType.CBB_PROJECT;
	    /** 工程 UUID */
	    uuid: string;
	    /** 工程友好名称 */
	    friendlyName: string;
	    /** 所属团队 UUID */
	    teamUuid: string;
	    /** 所属文件夹 UUID */
	    folderUuid?: string;
	}
	/**
	 * 工程属性
	 *
	 * @public
	 */
	interface IDMT_ProjectItem extends IDMT_BriefProjectItem {
	    /** 工程链接名称 */
	    name: string;
	    /** 描述 */
	    description?: string;
	    /** 工程内文档数据 */
	    data: Array<IDMT_BoardItem | IDMT_SchematicItem | IDMT_PcbItem | IDMT_PanelItem>;
	    /** 工程协作模式 */
	    collaborationMode?: EDMT_ProjectCollaborationMode;
	}
	/**
	 * 文档树 / 工程管理类
	 *
	 * @public
	 */
	class DMT_Project {
	    /**
	     * 打开工程
	     *
	     * @public
	     * @remarks 本操作将会在 EDA 前端打开指定工程，如若原先已打开其它工程且有未保存的变更，执行本操作将直接丢失所有未保存的数据
	     * @param projectUuid - 工程 UUID
	     * @returns 是否成功打开工程
	     */
	    openProject(projectUuid: string): Promise<boolean>;
	    /**
	     * 创建工程
	     *
	     * @beta
	     * @param projectFriendlyName - 工程友好名称
	     * @param projectName - 工程名称，不可重复，仅支持字母 `a-zA-Z`、数字 `0-9`、中划线 `-`，如若不指定，则根据工程友好名称自动生成
	     * @param teamUuid - 团队 UUID，如若不指定，则默认为个人；在不存在个人工程的环境下必须指定团队 UUID
	     * @param folderUuid - 文件夹 UUID，如若不指定，则为根文件夹
	     * @param description - 工程描述
	     * @param collaborationMode - 工程协作模式，如若团队权限无需工程设置协作模式，则该参数将被忽略
	     * @returns 工程 UUID，如若为 `undefined` 则创建失败
	     */
	    createProject(projectFriendlyName: string, projectName?: string, teamUuid?: string, folderUuid?: string, description?: string, collaborationMode?: EDMT_ProjectCollaborationMode): Promise<string | undefined>;
	    /**
	     * 修改工程友好名称
	     *
	     * @internal
	     * @param projectUuid - 工程 UUID
	     * @param projectFriendlyName - 工程友好名称
	     * @returns 是否修改成功
	     */
	    modifyProjectFriendlyName(projectUuid: string, projectFriendlyName: string): boolean;
	    /**
	     * 修改工程描述
	     *
	     * @internal
	     * @param projectUuid - 工程 UUID
	     * @param description - 工程描述，如若为 `undefined` 则清空工程现有描述
	     * @returns 是否修改成功
	     */
	    modifyProjectDescription(projectUuid: string, description?: string): boolean;
	    /**
	     * 修改工程协作模式
	     *
	     * @internal
	     * @remarks 如若团队权限无需工程设置协作模式，则将返回 `false`
	     * @param projectUuid - 工程 UUID
	     * @param collaborationMode - 工程协作模式
	     * @returns 是否修改成功
	     */
	    modifyProjectCollaborationMode(projectUuid: string, collaborationMode: EDMT_ProjectCollaborationMode): boolean;
	    /**
	     * 移动工程
	     *
	     * @internal
	     * @param projectUuid - 工程 UUID
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID，如若为 `undefined` 则移动到根文件夹
	     * @returns 是否移动成功
	     */
	    moveProject(projectUuid: string, teamUuid: string, folderUuid?: string): boolean;
	    /**
	     * 移动工程到文件夹
	     *
	     * @public
	     * @param projectUuid - 工程 UUID
	     * @param folderUuid - 文件夹 UUID，只能为当前工程所在团队或个人下的文件夹，如若为 `undefined` 则移动到当前团队的根文件夹
	     * @returns 是否移动成功
	     */
	    moveProjectToFolder(projectUuid: string, folderUuid?: string): Promise<boolean>;
	    /**
	     * 复制工程
	     *
	     * @internal
	     * @param sourceProjectUuid - 源工程 UUID
	     * @param targetTeamUuid - 目标团队 UUID，如若不指定，则默认为个人，在私有化部署等不存在个人工程的情况下不存在默认值
	     * @param targetFolderUuid - 目标文件夹 UUID，如若不指定，则默认为根文件夹
	     * @param newProjectFriendlyName - 新工程的友好名称，如若不指定，则根据源工程名称自动生成
	     * @param newProjectName - 新工程名称，仅支持字母 `a-zA-Z`、数字 `0-9`、中划线 `-`，如若不指定，则根据工程友好名称自动生成
	     * @returns 新工程 UUID，如若为 `undefined` 则复制失败
	     */
	    copyProject(sourceProjectUuid: string, targetTeamUuid?: string, targetFolderUuid?: string, newProjectFriendlyName?: string, newProjectName?: string): string | undefined;
	    /**
	     * 获取所有工程的 UUID
	     *
	     * @public
	     * @remarks
	     * 如若指定 `teamUuid`，则获取指定团队下的所有工程；
	     *
	     * 如若指定 `folderUuid`，则获取指定文件夹下的所有工程；
	     *
	     * `teamUuid`、`folderUuid` 需要且仅允许指定其一，如若都指定则只取 `folderUuid`；
	     *
	     * 如若指定 `workspaceUuid`，则在指定 Workspace 下获取指定团队/文件夹下的所有工程
	     * @param teamUuid - 团队 UUID
	     * @param folderUuid - 文件夹 UUID，如若不指定，则默认为团队的根文件夹
	     * @param workspaceUuid - 工作区 UUID
	     * @returns 工程 UUID 数组
	     */
	    getAllProjectsUuid(teamUuid?: string, folderUuid?: string, workspaceUuid?: string): Promise<Array<string>>;
	    /**
	     * 获取工程属性
	     *
	     * @public
	     * @remarks 本接口只能读取简略的工程属性，如需详细的工程树，请使用 {@link DMT_Project.getCurrentProjectInfo | getCurrentProjectInfo} 接口
	     * @param projectUuid - 工程 UUID
	     * @returns 简略的工程属性，如若为 `undefined` 则获取失败
	     */
	    getProjectInfo(projectUuid: string): Promise<IDMT_BriefProjectItem | undefined>;
	    /**
	     * 获取当前工程的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前打开且拥有最后输入焦点的原理图、PCB、面板所关联的工程的详细属性
	     * @returns 工程属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentProjectInfo(): Promise<IDMT_ProjectItem | undefined>;
	    /**
	     * 删除工程
	     *
	     * @internal
	     * @param projectUuid - 工程 UUID
	     * @returns 操作是否成功
	     */
	    deleteProject(projectUuid: string): boolean;
	}

	/**
	 * 团队属性
	 *
	 * @public
	 */
	interface IDMT_TeamItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.TEAM;
	    /** 团队名称 */
	    name: string;
	    /** 团队 UUID */
	    uuid: string;
	    /** 当前用户在团队内的身份（权限组）ID */
	    identity: number;
	}
	/**
	 * 文档树 / 团队类
	 *
	 * @public
	 */
	class DMT_Team {
	    /**
	     * 获取所有直接团队的详细属性
	     *
	     * @public
	     * @remarks 个人本质上也是一个名为 **个人** 的团队
	     * @returns 所有团队的详细属性
	     */
	    getAllTeamsInfo(): Promise<Array<IDMT_TeamItem>>;
	    /**
	     * 获取所有参与的团队的详细属性
	     *
	     * @public
	     * @returns 所有参与的团队的详细属性
	     */
	    getAllInvolvedTeamInfo(): Promise<Array<IDMT_TeamItem>>;
	    /**
	     * 获取当前团队的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前打开且拥有最后输入焦点的原理图、PCB、面板所关联的工程的所属团队的详细属性
	     * @returns 团队的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentTeamInfo(): Promise<IDMT_TeamItem | undefined>;
	}

	/**
	 * 工作区属性
	 *
	 * @public
	 */
	interface IDMT_WorkspaceItem {
	    /** 项目类型 */
	    readonly itemType: EDMT_ItemType.WORKSPACE;
	    /** 工作区名称 */
	    name: string;
	    /** 工作区 UUID */
	    uuid: string;
	}
	/**
	 * 文档树 / 工作区类
	 *
	 * @public
	 */
	class DMT_Workspace {
	    /**
	     * 获取所有工作区的详细属性
	     *
	     * @public
	     * @returns 所有工作区的详细属性
	     */
	    getAllWorkspacesInfo(): Promise<Array<IDMT_WorkspaceItem>>;
	    /**
	     * 切换到工作区
	     *
	     * @public
	     * @param workspaceUuid - 工作区 UUID，如若不指定，则将切换到个人工作区
	     * @returns 切换操作是否成功
	     */
	    toggleToWorkspace(workspaceUuid?: string): Promise<boolean>;
	    /**
	     * 获取当前工作区的详细属性
	     *
	     * @public
	     * @remarks 将会获取当前工作区的详细属性
	     * @returns 工作区的详细属性，如若为 `undefined` 则获取失败
	     */
	    getCurrentWorkspaceInfo(): Promise<IDMT_WorkspaceItem | undefined>;
	}

	/**
	 * 单位
	 *
	 * @public
	 */
	enum ESYS_Unit {
	    /** 毫米 */
	    MILLIMETER = "mm",
	    /** 厘米 */
	    CENTIMETER = "cm",
	    /** 分米 */
	    DECIMETER = "dm",
	    /** 米 */
	    METER = "m",
	    /** 英寸 */
	    INCH = "inch",
	    /** 英尺 */
	    IN = "in",
	    /** 密尔 */
	    MIL = "mil"
	}
	/**
	 * 系统 / 单位类
	 *
	 * @public
	 * @remarks 控制系统数据单位与单位转换基础函数，当前原理图数据单位跨度等效为 `10mil` 或 `0.01inch`，PCB 数据单位跨度等效为 `mil`
	 */
	class SYS_Unit {
	    /**
	     * 获取 EDA 前端数据单位跨度
	     *
	     * @beta
	     * @remarks 此处指的是前端用户可以切换的单位，需要同时兼容原理图和 PCB 画布
	     * @returns 单位
	     */
	    getFrontendDataUnit(): Promise<ESYS_Unit | undefined>;
	    /**
	     * 单位转换：密尔到毫米
	     *
	     * @public
	     * @param mil - 输入密尔数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出毫米数
	     */
	    milToMm(mil: number, numberOfDecimals?: number): number;
	    /**
	     * 单位转换：密尔到英寸
	     *
	     * @public
	     * @param mil - 输入密尔数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出英寸数
	     */
	    milToInch(mil: number, numberOfDecimals?: number): number;
	    /**
	     * 单位转换：毫米到密尔
	     *
	     * @public
	     * @param mm - 输入毫米数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出密尔数
	     */
	    mmToMil(mm: number, numberOfDecimals?: number): number;
	    /**
	     * 单位转换：毫米到英寸
	     *
	     * @public
	     * @param mm - 输入毫米数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出英寸数
	     */
	    mmToInch(mm: number, numberOfDecimals?: number): number;
	    /**
	     * 单位转换：英寸到密尔
	     *
	     * @public
	     * @param inch - 输入英寸数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出密尔数
	     */
	    inchToMil(inch: number, numberOfDecimals?: number): number;
	    /**
	     * 单位转换：英寸到毫米
	     *
	     * @public
	     * @param inch - 输入英寸数
	     * @param numberOfDecimals - 保留小数位数，默认为 `4`
	     * @returns 输出毫米数
	     */
	    inchToMm(inch: number, numberOfDecimals?: number): number;
	}

	/**
	 * 3D 模型属性
	 *
	 * @public
	 */
	interface ILIB_3DModelItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.MODEL;
	    /** 3D 模型 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 3D 模型名称 */
	    name: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 描述 */
	    description?: string;
	}
	/**
	 * 搜索到的 3D 模型属性
	 *
	 * @public
	 */
	interface ILIB_3DModelSearchItem {
	    /** 3D 模型 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 3D 模型名称 */
	    name: string;
	    /** 描述 */
	    description?: string;
	    /** 更新时间戳 */
	    updateTimestamp: number;
	    /** 归属 */
	    ascription: string;
	    /** 前次修改者 */
	    lastModifiedBy: string;
	}
	/**
	 * 综合库 / 3D 模型类
	 *
	 * @public
	 */
	class LIB_3DModel {
	    /**
	     * 创建 3D 模型
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param modelName - 3D 模型名称
	     * @param modelFile - 3D 模型文件数据
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 3D 模型 UUID
	     */
	    create(libraryUuid: string, modelFile: Blob, classification?: ILIB_ClassificationIndex | Array<string>, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.METER | ESYS_Unit.MIL | ESYS_Unit.INCH): Promise<string[] | undefined>;
	    /**
	     * 删除 3D 模型
	     *
	     * @beta
	     * @param modelUuid - 3D 模型 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(modelUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改 3D 模型
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param modelUuid - 3D 模型 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param modelName - 3D 模型名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 操作是否成功
	     */
	    modify(modelUuid: string, libraryUuid: string, modelName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>;
	    /**
	     * 获取 3D 模型的所有属性
	     *
	     * @beta
	     * @param modelUuid - 3D 模型 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 3D 模型属性
	     */
	    get(modelUuid: string, libraryUuid?: string): Promise<ILIB_3DModelItem | undefined>;
	    /**
	     * 复制 3D 模型
	     *
	     * @beta
	     * @param modelUuid - 3D 模型 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newModelName - 新 3D 模型名称，如若目标库内存在重名 3D 模型将导致复制失败
	     * @returns 目标库内新 3D 模型的 UUID
	     */
	    copy(modelUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newModelName?: string): Promise<string | undefined>;
	    /**
	     * 搜索 3D 模型
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的 3D 模型属性列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_3DModelSearchItem>>;
	}

	/**
	 * 复用模块属性
	 *
	 * @public
	 */
	interface ILIB_CbbItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.CBB;
	    /** 复用模块 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 复用模块名称 */
	    name: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 描述 */
	    description?: string;
	    /** 下属板子 */
	    boards: Array<IDMT_BoardItem>;
	}
	/**
	 * 搜索到的复用模块属性
	 *
	 * @public
	 */
	interface ILIB_CbbSearchItem {
	    /** 复用模块 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 复用模块名称 */
	    name: string;
	    /** 描述 */
	    description?: string;
	    /** 更新时间戳 */
	    updateTimestamp: number;
	    /** 归属 */
	    ascription: string;
	    /** 前次修改者 */
	    lastModifiedBy: string;
	}
	/**
	 * 综合库 / 复用模块类
	 *
	 * @public
	 */
	class LIB_Cbb {
	    /**
	     * 创建复用模块
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param cbbName - 复用模块名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 复用模块 UUID
	     */
	    create(libraryUuid: string, cbbName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>;
	    /**
	     * 删除复用模块
	     *
	     * @beta
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(cbbUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改复用模块
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param cbbName - 复用模块名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 操作是否成功
	     */
	    modify(cbbUuid: string, libraryUuid: string, cbbName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>;
	    /**
	     * 获取复用模块的所有属性
	     *
	     * @beta
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 复用模块属性
	     */
	    get(cbbUuid: string, libraryUuid?: string): Promise<ILIB_CbbItem | undefined>;
	    /**
	     * 复制复用模块
	     *
	     * @beta
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newCbbName - 新复用模块名称，如若目标库内存在重名复用模块将导致复制失败
	     * @returns 目标库内新复用模块的 UUID
	     */
	    copy(cbbUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newCbbName?: string): Promise<string | undefined>;
	    /**
	     * 搜索复用模块
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的复用模块属性列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_CbbSearchItem>>;
	    /**
	     * 在编辑器打开复用模块工程
	     *
	     * @beta
	     * @remarks 本操作将会在 EDA 前端打开模块工程，如若原先已打开其它工程且有未保存的变更，执行本操作将直接丢失所有未保存的数据
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     */
	    openProjectInEditor(cbbUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 在编辑器打开复用模块符号
	     *
	     * @beta
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param splitScreenId - 分屏 ID，不填写则默认在最后输入焦点的分屏内打开，可以使用 {@link DMT_EditorControl} 内的接口获取
	     * @returns 标签页 ID，对应 {@link IDMT_EditorTabItem.tabId}，可使用 {@link DMT_EditorControl.getSplitScreenIdByTabId} 获取到分屏 ID
	     */
	    openSymbolInEditor(cbbUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>;
	}

	/**
	 * 嘉立创贴片库类别
	 *
	 * @public
	 */
	enum ELIB_DeviceJlcLibraryCategory {
	    /** 基础库 */
	    STANDARD = "standard",
	    /** 扩展库 */
	    EXTEND = "extend"
	}
	/**
	 * 器件关联符号、封装属性
	 *
	 * @public
	 */
	interface ILIB_DeviceAssociationItem {
	    /**
	     * 符号类型
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代
	     */
	    symbolType: ELIB_SymbolType;
	    /**
	     * 符号 UUID
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代
	     */
	    symbolUuid: string;
	    /** 符号 */
	    symbol: {
	        type: ELIB_SymbolType;
	        uuid: string;
	        libraryUuid: string;
	    };
	    /**
	     * 封装 UUID
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代
	     */
	    footprintUuid: string;
	    /** 封装 */
	    footprint?: {
	        uuid: string;
	        libraryUuid: string;
	    };
	    images?: Array<string>;
	}
	/**
	 * 器件扩展属性
	 *
	 * @public
	 */
	interface ILIB_DeviceExtendPropertyItem {
	    /** 名称 */
	    name?: string;
	    /** 位号 */
	    designator?: string;
	    /** 加入 BOM */
	    addIntoBom?: boolean;
	    /** 转到 PCB */
	    addIntoPcb?: boolean;
	    /** 网络 */
	    net?: string;
	    /** 制造商 */
	    manufacturer?: string;
	    /** 制造商编号 */
	    manufacturerId?: string;
	    /** 供应商 */
	    supplier?: string;
	    /** 供应商编号 */
	    supplierId?: string;
	    /** 其它属性 */
	    otherProperty?: {
	        [key: string]: boolean | number | string | undefined;
	    };
	}
	/**
	 * 器件属性
	 *
	 * @public
	 */
	interface ILIB_DeviceItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.DEVICE;
	    /** 器件 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 器件名称 */
	    name: string;
	    /** 器件分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 关联 */
	    association: ILIB_DeviceAssociationItem;
	    /** 描述 */
	    description?: string;
	    /** 扩展属性 */
	    property: ILIB_DeviceExtendPropertyItem;
	    /** 子部件名称数组 */
	    subPartNames: [];
	}
	/**
	 * 搜索到的器件属性
	 *
	 * @public
	 */
	interface ILIB_DeviceSearchItem {
	    /** 器件 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 器件分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 器件名称 */
	    name: string;
	    /**
	     * 关联符号名称
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代
	     */
	    symbolName: string;
	    /**
	     * 关联符号 UUID
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代
	     */
	    symbolUuid: string;
	    /** 关联符号 */
	    symbol: {
	        name: string;
	        uuid: string;
	        libraryUuid: string;
	    };
	    /**
	     * 关联封装名称
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代
	     */
	    footprintName?: string;
	    /**
	     * 关联封装 UUID
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代
	     */
	    footprintUuid: string;
	    /** 关联封装 */
	    footprint?: {
	        name: string;
	        uuid: string;
	        libraryUuid: string;
	    };
	    /**
	     * 关联 3D 模型名称
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.model3D | model3D} 替代
	     */
	    model3DName?: string;
	    /**
	     * 关联 3D 模型 UUID
	     *
	     * @deprecated 请使用 {@link ILIB_DeviceSearchItem.model3D | model3D} 替代
	     */
	    model3DUuid: string;
	    /** 关联 3D 模型 */
	    model3D?: {
	        name: string;
	        uuid: string;
	        libraryUuid: string;
	    };
	    /** 关联图片 UUID */
	    imageUuid?: string | string[];
	    /** 描述 */
	    description?: string;
	    /**
	     * 制造商
	     *
	     * @deprecated 在 `otherProperty` 中替代
	     */
	    /**
	     * 制造商编号
	     *
	     * @deprecated 在 `otherProperty` 中替代
	     */
	    /**
	     * 供应商
	     *
	     * @deprecated 在 `otherProperty` 中替代
	     */
	    /**
	     * 供应商编号
	     *
	     * @deprecated 在 `otherProperty` 中替代
	     */
	    /**
	     * 立创商城库存
	     */
	    /**
	     * 立创商城价格
	     */
	    /**
	     * 嘉立创库存
	     */
	    /**
	     * 嘉立创价格
	     */
	    /**
	     * 嘉立创库类别
	     */
	    /** 其它属性 */
	    otherProperty?: {
	        [key: string]: boolean | number | string | undefined;
	    };
	}
	/**
	 * 可用于精确搜索的器件参数
	 *
	 * @public
	 */
	interface ILIB_DevicePropertiesForSearch {
	    /** 器件名称 */
	    name?: string;
	    /** 值 */
	    value?: string;
	    /** 关联符号名称 */
	    symbolName?: string;
	    /** 关联封装名称 */
	    footprintName?: string;
	    /** 供应商封装名称 */
	    supplierFootprint?: string;
	    /** 供应商编号 */
	    supplierId?: string;
	    /** 料号 */
	    partNumber?: string;
	    /** 元件编码 */
	    partCode?: string;
	}
	/**
	 * 综合库 / 器件类
	 *
	 * @public
	 */
	class LIB_Device {
	    /**
	     * 创建器件
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param deviceName - 器件名称
	     * @param classification - 分类
	     * @param association - 关联符号、封装、图像，指定 `symbolType` 则创建新符号，无需新建符号则无需指定 `symbolType`，但请注意，如若不新建符号也不指定符号的关联信息将无法创建器件
	     * @param description - 描述
	     * @param property - 其它属性，仅 `designator`、`addIntoBom`、`addIntoPcb` 存在默认值
	     * @returns 器件 UUID
	     */
	    create(libraryUuid: string, deviceName: string, classification?: ILIB_ClassificationIndex | Array<string>, association?: {
	        symbolType?: ELIB_SymbolType;
	        symbolUuid?: string;
	        symbol?: {
	            uuid: string;
	            libraryUuid: string;
	        };
	        footprintUuid?: string;
	        footprint?: {
	            uuid: string;
	            libraryUuid: string;
	        };
	        model3D?: {
	            uuid: string;
	            libraryUuid: string;
	        };
	        imageData?: File | Blob;
	    }, description?: string, property?: ILIB_DeviceExtendPropertyItem): Promise<string | undefined>;
	    /**
	     * 删除器件
	     *
	     * @beta
	     * @param deviceUuid - 器件 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(deviceUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改器件
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param deviceUuid - 器件 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param deviceName - 器件名称
	     * @param classification - 分类
	     * @param association - 关联符号、封装、图像
	     * @param description - 描述
	     * @param property - 其它属性
	     * @returns 操作是否成功
	     */
	    modify(deviceUuid: string, libraryUuid: string, deviceName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, association?: {
	        symbolUuid?: string;
	        symbol?: {
	            uuid: string;
	            libraryUuid: string;
	        };
	        footprintUuid?: string | null;
	        footprint?: {
	            uuid: string;
	            libraryUuid: string;
	        } | null;
	        model3D?: {
	            uuid: string;
	            libraryUuid: string;
	        } | null;
	        imageData?: File | Blob | null;
	    }, description?: string | null, property?: {
	        name?: string | null;
	        designator?: string;
	        addIntoBom?: boolean;
	        addIntoPcb?: boolean;
	        net?: string;
	        manufacturer?: string | null;
	        manufacturerId?: string | null;
	        supplier?: string | null;
	        supplierId?: string | null;
	        otherProperty?: {
	            [key: string]: boolean | number | string | undefined | null;
	        };
	    }): Promise<boolean>;
	    /**
	     * 获取器件的所有属性
	     *
	     * @beta
	     * @param deviceUuid - 器件 UUID
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 器件属性
	     */
	    get(deviceUuid: string, libraryUuid?: string): Promise<ILIB_DeviceItem | undefined>;
	    /**
	     * 复制器件
	     *
	     * @beta
	     * @param deviceUuid - 器件 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newDeviceName - 新器件名称，如若目标库内存在重名器件将导致复制失败
	     * @returns 目标库内新器件的 UUID
	     */
	    copy(deviceUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newDeviceName?: string): Promise<string | undefined>;
	    /**
	     * 搜索器件
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param symbolType - 符号类型，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的器件属性的列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_DeviceSearchItem>>;
	    /**
	     * 使用属性精确搜索器件
	     *
	     * @alpha
	     * @param properties - 属性
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     *
	     * ADD since EDA v4
	     * @param symbolType - 符号类型，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的器件属性的列表
	     */
	    searchByProperties(properties: ILIB_DevicePropertiesForSearch, libraryUuid?: string, classification?: Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_DeviceSearchItem>>;
	    /**
	     * 使用立创 C 编号获取器件
	     *
	     * @beta
	     * @remarks
	     * 默认情况下，如果在同一个库内匹配到多个相同 C 编号的器件，将只会返回第一个结果；
	     *
	     * 如果希望返回多个结果，请将 `allowMultiMatch` 置为 `true`；
	     *
	     * 私有化部署环境暂无法使用本接口
	     * @param lcscIds - 立创 C 编号
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param allowMultiMatch - 是否允许单个立创 C 编号匹配多个结果
	     * @returns 搜索到的器件属性
	     */
	    getByLcscIds<T extends boolean>(lcscIds: string, libraryUuid?: string, allowMultiMatch?: T): Promise<T extends true ? ILIB_DeviceSearchItem | undefined : Array<ILIB_DeviceSearchItem>>;
	    /**
	     * 使用立创 C 编号批量获取器件
	     *
	     * @beta
	     * @remarks
	     * 默认情况下，如果在同一个库内匹配到多个相同 C 编号的器件，将只会返回第一个结果；
	     *
	     * 如果希望返回多个结果，请将 `allowMultiMatch` 置为 `true`；
	     *
	     * 私有化部署环境暂无法使用本接口
	     * @param lcscIds - 立创 C 编号数组
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param allowMultiMatch - 是否允许单个立创 C 编号匹配多个结果
	     * @returns 搜索到的器件属性的列表
	     */
	    getByLcscIds(lcscIds: Array<string>, libraryUuid?: string, allowMultiMatch?: boolean): Promise<Array<ILIB_DeviceSearchItem>>;
	}

	/**
	 * 封装属性
	 *
	 * @public
	 */
	interface ILIB_FootprintItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.FOOTPRINT;
	    /** 封装 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 封装名称 */
	    name: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 描述 */
	    description?: string;
	}
	/**
	 * 搜索到的封装属性
	 *
	 * @public
	 */
	interface ILIB_FootprintSearchItem {
	    /** 封装 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 封装名称 */
	    name: string;
	    /** 描述 */
	    description?: string;
	    /** 更新时间戳 */
	    updateTimestamp: number;
	    /** 归属 */
	    ascription: string;
	    /** 前次修改者 */
	    lastModifiedBy: string;
	}
	/**
	 * 可用于精确搜索的封装参数
	 *
	 * @public
	 */
	interface ILIB_FootprintPropertiesForSearch {
	    /** 封装名称 */
	    name?: string;
	}
	/**
	 * 综合库 / 封装类
	 *
	 * @public
	 */
	class LIB_Footprint {
	    /**
	     * 创建封装
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param footprintName - 封装名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 封装 UUID
	     */
	    create(libraryUuid: string, footprintName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>;
	    /**
	     * 删除封装
	     *
	     * @beta
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(footprintUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改封装
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param footprintName - 封装名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 操作是否成功
	     */
	    modify(footprintUuid: string, libraryUuid: string, footprintName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>;
	    /**
	     * 更新封装的文档源码
	     *
	     * @beta
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param documentSource - 文档源码
	     * @returns 是否更新成功
	     */
	    updateDocumentSource(footprintUuid: string, libraryUuid: string, documentSource: string): Promise<boolean | undefined>;
	    /**
	     * 获取封装的所有属性
	     *
	     * @beta
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 封装属性
	     */
	    get(footprintUuid: string, libraryUuid?: string): Promise<ILIB_FootprintItem | undefined>;
	    /**
	     * 复制封装
	     *
	     * @beta
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newFootprintName - 新封装名称，如若目标库内存在重名封装将导致复制失败
	     * @returns 目标库内新封装的 UUID
	     */
	    copy(footprintUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newFootprintName?: string): Promise<string | undefined>;
	    /**
	     * 搜索封装
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的封装属性列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_FootprintSearchItem>>;
	    /**
	     * 使用属性精确搜索封装
	     *
	     * @alpha
	     * @param properties - 属性
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 搜索到的封装属性的列表
	     */
	    searchByProperties(properties: ILIB_FootprintPropertiesForSearch, libraryUuid?: string): Promise<Array<ILIB_FootprintSearchItem>>;
	    /**
	     * 在编辑器打开文档
	     *
	     * @beta
	     * @param footprintUuid - 封装 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param splitScreenId - 分屏 ID，不填写则默认在最后输入焦点的分屏内打开，可以使用 {@link DMT_EditorControl} 内的接口获取
	     * @returns 标签页 ID，对应 {@link IDMT_EditorTabItem.tabId}，可使用 {@link DMT_EditorControl.getSplitScreenIdByTabId} 获取到分屏 ID
	     */
	    openInEditor(footprintUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>;
	    /**
	     * 获取封装渲染图
	     *
	     * @beta
	     * @param footprint - 封装的索引
	     * @returns 封装渲染图
	     */
	    getRenderImage(source: {
	        footprintUuid: string;
	        libraryUuid: string;
	    }): Promise<Blob | undefined>;
	}

	/**
	 * 库信息
	 *
	 * @public
	 * @remarks 包含库的名称以及它的 UUID
	 */
	interface ILIB_LibraryInfo {
	    /** 库名称 */
	    name: string;
	    /** 库 UUID */
	    uuid: string;
	}
	/**
	 * 外部库元素索引
	 *
	 * @public
	 * @remarks
	 * 支持外部库使用名称或 UUID 作为元素的唯一 ID 索引
	 *
	 * 正常情况下，希望每个库都拥有 UUID，但可能部分系统开发时不存在 UUID 字段（或可以做类似用途的字段）
	 *
	 * 此处仅传入 `name` 字段时，将把 `name` 做唯一 ID 用途，不可有重名的数据
	 *
	 * 如若传入 `uuid` 和 `name` 字段，则只有 `uuid` 不可重复
	 */
	interface ILIB_ExtendLibraryItemIndex {
	    /** 库 UUID */
	    uuid?: string;
	    /** 库名称 */
	    name: string;
	}
	/**
	 * 外部库元素
	 *
	 * @public
	 * @remarks
	 * 此处需要传递 `url` 或 `data` 字段，如若同时传入，则取 `data` 的数据，忽略 `url` 字段
	 *
	 * 如若仅传入 `url` 字段，将会对其发起请求并尝试获取其库文件
	 *
	 * `data` 的数据可为 Blob 格式或 DataURL 格式
	 */
	interface ILIB_ExtendLibraryItem extends ILIB_ExtendLibraryItemIndex {
	    /** 库文件地址 */
	    url?: string;
	    /** 库文件数据 */
	    data?: string | Blob;
	}
	/**
	 * 预览视图类型
	 *
	 * @public
	 */
	enum ELIB_PreviewType {
	    /** 符号预览 */
	    SYMBOL = "S",
	    /** 封装预览 */
	    FOOTPRINT = "F",
	    /** 产品实物预览 */
	    PRODUCT = "P",
	    /** 3D 预览 */
	    MODEL_3D = "3D"
	}
	/**
	 * 外部库搜索参数
	 *
	 * @public
	 */
	interface ILIB_ExtendLibrarySearchProperty<T> {
	    /** 页数 */
	    page?: number;
	    /** 单页条目数 */
	    pageSize?: number;
	    /** 查询参数 */
	    query: T & {
	        wd?: string;
	        listByTitles?: Array<string>;
	        classification?: ILIB_ExtendLibraryClassificationIndex | Array<string>;
	    };
	}
	/**
	 * 外部库搜索结果
	 *
	 * @public
	 */
	interface ILIB_ExtendLibrarySearchResult<T> {
	    /** 总条目数 */
	    count: number;
	    /** 结果列表 */
	    lists: Array<T>;
	    /** 当前页数 */
	    page: number;
	    /** 单页条目数 */
	    pageSize: number;
	    /** 总页数 */
	    totalPage: number;
	}
	/**
	 * 外部库搜索结果数据行
	 *
	 * @public
	 */
	interface ILIB_ExtendLibrarySearchResultDataLine {
	    classification?: ILIB_ExtendLibraryClassificationIndex | Array<string>;
	    description?: string;
	    version?: string;
	    updateTime?: number;
	    createTime?: number;
	    creator?: ILIB_ExtendLibraryUserIndex;
	    modifier?: ILIB_ExtendLibraryUserIndex;
	    owner?: ILIB_ExtendLibraryUserIndex;
	}
	/**
	 * 外部库用户索引
	 *
	 * @public
	 * @remarks
	 * 支持外部库使用名称或关联的嘉立创 EDA 系统内用户 UUID 作为用户的唯一 ID 索引
	 *
	 * 如若希望关联嘉立创 EDA 的用户，请传入该用户的 UUID，将会自动读取用户的名称（如若用户存在）
	 *
	 * 如若仅希望显示用户名称，可以传入 `name` 字段
	 */
	interface ILIB_ExtendLibraryUserIndex {
	    /** 用户名称 */
	    name?: string;
	    /** 嘉立创 EDA 系统内的用户 UUID */
	    uuid?: string;
	}
	/**
	 * 外部库分类索引
	 *
	 * @public
	 * @deprecated since EDA v3.2; dropped EDA v3.3
	 * @remarks
	 * 支持外部库使用名称或 UUID 作为分类的唯一 ID 索引
	 */
	interface ILIB_ExtendLibraryClassificationIndex {
	    /** 一级分类名称 */
	    primaryClassificationName?: string;
	    /** 一级分类 UUID */
	    primaryClassificationUuid?: string;
	    /** 二级分类名称 */
	    secondaryClassificationName?: string;
	    /** 二级分类 UUID */
	    secondaryClassificationUuid?: string;
	}
	/**
	 * 外部库方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibraryFunctions {
	    /**
	     * 获取详细信息
	     *
	     * @param uuid - UUID（或以 name 作为 uuid，由外部库扩展开发者实现）
	     * @returns 库元素详细信息
	     */
	    getDetail: (uuid: string) => Promise<any>;
	    /**
	     * 获取分类树
	     *
	     * @returns 分类树
	     */
	    getClassificationTree: () => Promise<Array<{
	        name: string;
	        uuid?: string;
	        children?: Array<{
	            name: string;
	            uuid?: string;
	        }> | undefined;
	    }>>;
	    /**
	     * 获取列表
	     *
	     * @param props - 搜索参数
	     * @returns 库元素列表
	     */
	    getList: (props: ILIB_ExtendLibrarySearchProperty<any>) => Promise<ILIB_ExtendLibrarySearchResult<any>>;
	}
	/**
	 * 外部库器件方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibraryDeviceFunctions extends ILIB_ExtendLibraryFunctions {
	    getList: (props: ILIB_ExtendLibrarySearchProperty<{
	        attributes?: {
	            [key: string]: string;
	        };
	        symbolType?: ELIB_SymbolType;
	    }>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItemIndex & {
	        classification?: ILIB_ExtendLibraryClassificationIndex | Array<string>;
	        symbol?: ILIB_ExtendLibraryItem & {
	            symbolType: ELIB_SymbolType;
	        };
	        footprint?: ILIB_ExtendLibraryItem;
	        model3d?: ILIB_ExtendLibraryItemIndex & {
	            adjustment?: {
	                size?: {
	                    x: number;
	                    y: number;
	                    z: number;
	                };
	                rotation?: {
	                    x: number;
	                    y: number;
	                    z: number;
	                };
	                offset?: {
	                    x: number;
	                    y: number;
	                    z: number;
	                };
	            };
	        };
	        /**
	         * @deprecated - 使用 attributes['Value'] 替代
	         */
	        value?: string;
	        /**
	         * @deprecated - 使用 attributes['Supplier Part'] 替代
	         */
	        supplierPart?: string;
	        /**
	         * @deprecated - 使用 attributes['Manufacturer'] 替代
	         */
	        manufacturer?: string;
	        description?: string;
	        updateTime?: number;
	        createTime?: number;
	        attributes?: {
	            [key: string]: string;
	        };
	    }>>;
	    /**
	     * 获取支持的符号类型
	     *
	     * @returns 符号类型数组
	     */
	    getSupportedSymbolTypes: () => Promise<Array<ELIB_SymbolType>>;
	    /**
	     * 获取支持的预览类型
	     *
	     * @returns 预览类型数组
	     */
	    getSupportedPreviewTypes: () => Promise<Array<ELIB_PreviewType>>;
	}
	/**
	 * 外部库符号方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibrarySymbolFunctions extends ILIB_ExtendLibraryFunctions {
	    getList: (props: ILIB_ExtendLibrarySearchProperty<{
	        symbolType?: ELIB_SymbolType;
	    }>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine & {
	        symbolType: ELIB_SymbolType;
	    }>>;
	    /**
	     * 获取支持的符号类型
	     *
	     * @returns 符号类型数组
	     */
	    getSupportedSymbolTypes: () => Promise<Array<ELIB_SymbolType>>;
	}
	/**
	 * 外部库封装方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibraryFootprintFunctions extends ILIB_ExtendLibraryFunctions {
	    getList: (props: ILIB_ExtendLibrarySearchProperty<{}>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine>>;
	}
	/**
	 * 外部库复用模块方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibraryCbbFunctions extends ILIB_ExtendLibraryFunctions {
	    getList: (props: any) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine & {
	        schematics?: Array<{
	            uuid: string;
	            name: string;
	            updateTime: string;
	            description?: string;
	        }>;
	        pcbs?: Array<{
	            uuid: string;
	            name: string;
	            updateTime: number;
	            thumb?: string;
	            createTime?: number;
	            creator?: ILIB_ExtendLibraryUserIndex;
	            modifier?: ILIB_ExtendLibraryUserIndex;
	            description?: string;
	        }>;
	        boards?: Array<{
	            pcbUuid: string;
	            schUuid: string;
	            name: string;
	        }>;
	        sheets?: Array<{
	            uuid: string;
	            name: string;
	            belongSchematicUuid: string;
	            updateTime: number;
	            thumb?: string;
	            createTime?: number;
	            creator?: ILIB_ExtendLibraryUserIndex;
	            modifier?: ILIB_ExtendLibraryUserIndex;
	            description?: string;
	        }>;
	    }>>;
	}
	/**
	 * 外部库 3D 模型方法
	 *
	 * @public
	 */
	interface ILIB_ExtendLibrary3DModelFunctions extends ILIB_ExtendLibraryFunctions {
	    getList: (props: ILIB_ExtendLibrarySearchProperty<{}>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItemIndex & ILIB_ExtendLibrarySearchResultDataLine & {
	        modelType: 'step';
	    }>>;
	}
	/**
	 * 综合库 / 库列表类
	 *
	 * @public
	 * @remarks 此处所有接口都基于编辑器当前工作区环境，如需切换到其他工作区，请使用 {@link DMT_Workspace.toggleToWorkspace} 接口切换工作区
	 */
	class LIB_LibrariesList {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 获取系统库的 UUID
	     *
	     * @public
	     * @returns 系统库的 UUID
	     */
	    getSystemLibraryUuid(): Promise<string | undefined>;
	    /**
	     * 获取个人库的 UUID
	     *
	     * @public
	     * @remarks 将会获取当前编辑器工作区下的个人库的 UUID，在私有部署环境下不存在个人库，此接口将永远返回 `undefined`
	     * @returns 个人库的 UUID
	     */
	    getPersonalLibraryUuid(): Promise<string | undefined>;
	    /**
	     * 获取工程库的 UUID
	     *
	     * @public
	     * @remarks 在未打开工程的情况下调用将返回 `undefined`
	     * @returns 工程库的 UUID
	     */
	    getProjectLibraryUuid(): Promise<string | undefined>;
	    /**
	     * 获取收藏库的 UUID
	     *
	     * @public
	     * @remarks 将会获取当前编辑器工作区下的收藏库的 UUID
	     * @returns 收藏库的 UUID
	     */
	    getFavoriteLibraryUuid(): Promise<string | undefined>;
	    /**
	     * 获取所有库的列表
	     *
	     * @public
	     * @remarks 此处不会获取到系统库、个人库、工程库、收藏库的信息，如需获取它们的信息，请使用 {@link LIB_LibrariesList.getSystemLibraryUuid | getSystemLibraryUuid}、{@link LIB_LibrariesList.getPersonalLibraryUuid | getPersonalLibraryUuid}、{@link LIB_LibrariesList.getProjectLibraryUuid | getProjectLibraryUuid}、{@link LIB_LibrariesList.getFavoriteLibraryUuid | getFavoriteLibraryUuid} 接口
	     * @returns 库信息列表
	     */
	    getAllLibrariesList(): Promise<Array<ILIB_LibraryInfo>>;
	    /**
	     * 注册外部库
	     *
	     * @alpha
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param title - 标题
	     * @param libFunctions - 库方法
	     * @returns 库 UUID
	     */
	    registerExtendLibrary(title: string, libraryFunctions: {
	        device?: ILIB_ExtendLibraryDeviceFunctions;
	        symbol?: ILIB_ExtendLibrarySymbolFunctions;
	        footprint?: ILIB_ExtendLibraryFootprintFunctions;
	        cbb?: ILIB_ExtendLibraryCbbFunctions;
	        model3d?: ILIB_ExtendLibrary3DModelFunctions;
	    }): Promise<string | undefined>;
	}

	/**
	 * 面板库属性
	 *
	 * @public
	 */
	interface ILIB_PanelLibraryItem {
	    /** 库类型 */
	    readonly libraryType: ELIB_LibraryType.PANEL_LIBRARY;
	    /** 面板库 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 面板库名称 */
	    name: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 描述 */
	    description?: string;
	}
	/**
	 * 搜索到的面板库属性
	 *
	 * @public
	 */
	interface ILIB_PanelLibrarySearchItem {
	    /** 面板库 UUID */
	    uuid: string;
	    /** 所属库 UUID */
	    libraryUuid: string;
	    /** 分类 */
	    classification?: ILIB_ClassificationIndex | Array<string>;
	    /** 排序 */
	    ordinal: number;
	    /** 面板库名称 */
	    name: string;
	    /** 描述 */
	    description?: string;
	    /** 更新时间戳 */
	    updateTimestamp: number;
	    /** 归属 */
	    ascription: string;
	    /** 前次修改者 */
	    lastModifiedBy: string;
	}
	/**
	 * 综合库 / 面板库类
	 *
	 * @public
	 */
	class LIB_PanelLibrary {
	    /**
	     * 创建面板库
	     *
	     * @beta
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param panelLibraryName - 面板库名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 面板库 UUID
	     */
	    create(libraryUuid: string, panelLibraryName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>;
	    /**
	     * 删除面板库
	     *
	     * @beta
	     * @param panelLibraryUuid - 面板库 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 操作是否成功
	     */
	    delete(panelLibraryUuid: string, libraryUuid: string): Promise<boolean>;
	    /**
	     * 修改面板库
	     *
	     * @beta
	     * @remarks 如希望清除某些属性，则将其的值设置为 `null`
	     * @param panelLibraryUuid - 面板库 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param panelLibraryName - 面板库名称
	     * @param classification - 分类
	     * @param description - 描述
	     * @returns 操作是否成功
	     */
	    modify(panelLibraryUuid: string, libraryUuid: string, panelLibraryName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>;
	    /**
	     * 获取面板库的所有属性
	     *
	     * @beta
	     * @param panelLibraryUuid - 面板库 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @returns 面板库属性
	     */
	    get(panelLibraryUuid: string, libraryUuid?: string): Promise<ILIB_PanelLibraryItem | undefined>;
	    /**
	     * 复制面板库
	     *
	     * @beta
	     * @param panelLibraryUuid - 面板库 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param targetLibraryUuid - 目标库 UUID
	     * @param targetClassification - 目标库内的分类
	     * @param newPanelLibraryName - 新面板库名称，如若目标库内存在重名面板库将导致复制失败
	     * @returns 目标库内新面板库的 UUID
	     */
	    copy(panelLibraryUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newPanelLibraryName?: string): Promise<string | undefined>;
	    /**
	     * 搜索面板库
	     *
	     * @beta
	     * @param key - 搜索关键字
	     * @param libraryUuid - 库 UUID，默认为系统库，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param classification - 分类，默认为全部
	     * @param itemsOfPage - 一页搜索结果的数量
	     * @param page - 页数
	     * @returns 搜索到的面板库属性列表
	     */
	    search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_PanelLibrarySearchItem>>;
	    /**
	     * 在编辑器打开文档
	     *
	     * @beta
	     * @param panelLibraryUuid - 面板库 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取
	     * @param splitScreenId - 分屏 ID，不填写则默认在最后输入焦点的分屏内打开，可以使用 {@link DMT_EditorControl} 内的接口获取
	     * @returns 标签页 ID，对应 {@link IDMT_EditorTabItem.tabId}，可使用 {@link DMT_EditorControl.getSplitScreenIdByTabId} 获取到分屏 ID
	     */
	    openInEditor(panelLibraryUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>;
	}

	/**
	 * 库属性
	 *
	 * @public
	 */
	interface ILIB_LibraryItem {
	    /** UUID */
	    uuid: string;
	    /** 库类型 */
	    libraryType: ELIB_LibraryType;
	    /** 所属库 UUID */
	    libraryUuid?: string;
	}
	/**
	 * 综合库 / 选择控制类
	 *
	 * @public
	 */
	class LIB_SelectControl {
	    /**
	     * 获取当前底部库选中行的信息
	     *
	     * @beta
	     * @remarks 将会获取当前底部库选中行的库类型、UUID、所属库 UUID
	     * @returns 库属性对象，如若为 `undefined` 则获取失败
	     */
	    getSelectedLibraryRowInfo(): Promise<ILIB_LibraryItem | undefined>;
	}

	/**
	 * 图层 ID
	 *
	 * @public
	 */
	enum EPCB_LayerId {
	    /** 顶层 */
	    TOP = 1,
	    /** 顶层丝印层 */
	    TOP_SILKSCREEN = 3,
	    /** 顶层阻焊层 */
	    TOP_SOLDER_MASK = 5,
	    /** 顶层锡膏（助焊）层 */
	    TOP_PASTE_MASK = 7,
	    /** 顶层装配层 */
	    TOP_ASSEMBLY = 9,
	    /** 顶层 FPC 补强层 */
	    TOP_STIFFENER = 58,
	    /** 底层 */
	    BOTTOM = 2,
	    /** 底层丝印层 */
	    BOTTOM_SILKSCREEN = 4,
	    /** 底层阻焊层 */
	    BOTTOM_SOLDER_MASK = 6,
	    /** 底层锡膏（助焊）层 */
	    BOTTOM_PASTE_MASK = 8,
	    /** 底层装配层 */
	    BOTTOM_ASSEMBLY = 10,
	    /** 底层 FPC 补强层 */
	    BOTTOM_STIFFENER = 59,
	    /** 板框层 */
	    BOARD_OUTLINE = 11,
	    /** 多层 */
	    MULTI = 12,
	    /** 文档层 */
	    DOCUMENT = 13,
	    /** 机械层 */
	    MECHANICAL = 14,
	    /** 飞线层 */
	    RATLINE = 57,
	    /** 内层 1 */
	    INNER_1 = 15,
	    /** 内层 2 */
	    INNER_2 = 16,
	    /** 内层 3 */
	    INNER_3 = 17,
	    /** 内层 4 */
	    INNER_4 = 18,
	    /** 内层 5 */
	    INNER_5 = 19,
	    /** 内层 6 */
	    INNER_6 = 20,
	    /** 内层 7 */
	    INNER_7 = 21,
	    /** 内层 8 */
	    INNER_8 = 22,
	    /** 内层 9 */
	    INNER_9 = 23,
	    /** 内层 10 */
	    INNER_10 = 24,
	    /** 内层 11 */
	    INNER_11 = 25,
	    /** 内层 12 */
	    INNER_12 = 26,
	    /** 内层 13 */
	    INNER_13 = 27,
	    /** 内层 14 */
	    INNER_14 = 28,
	    /** 内层 15 */
	    INNER_15 = 29,
	    /** 内层 16 */
	    INNER_16 = 30,
	    /** 内层 17 */
	    INNER_17 = 31,
	    /** 内层 18 */
	    INNER_18 = 32,
	    /** 内层 19 */
	    INNER_19 = 33,
	    /** 内层 20 */
	    INNER_20 = 34,
	    /** 内层 21 */
	    INNER_21 = 35,
	    /** 内层 22 */
	    INNER_22 = 36,
	    /** 内层 23 */
	    INNER_23 = 37,
	    /** 内层 24 */
	    INNER_24 = 38,
	    /** 内层 25 */
	    INNER_25 = 39,
	    /** 内层 26 */
	    INNER_26 = 40,
	    /** 内层 27 */
	    INNER_27 = 41,
	    /** 内层 28 */
	    INNER_28 = 42,
	    /** 内层 29 */
	    INNER_29 = 43,
	    /** 内层 30 */
	    INNER_30 = 44,
	    /** 内层 31 */
	    /** 内层 32 */
	    /** 自定义层 1 */
	    CUSTOM_1 = 71,
	    /** 自定义层 2 */
	    CUSTOM_2 = 72,
	    /** 自定义层 3 */
	    CUSTOM_3 = 73,
	    /** 自定义层 4 */
	    CUSTOM_4 = 74,
	    /** 自定义层 5 */
	    CUSTOM_5 = 75,
	    /** 自定义层 6 */
	    CUSTOM_6 = 76,
	    /** 自定义层 7 */
	    CUSTOM_7 = 77,
	    /** 自定义层 8 */
	    CUSTOM_8 = 78,
	    /** 自定义层 9 */
	    CUSTOM_9 = 79,
	    /** 自定义层 10 */
	    CUSTOM_10 = 80,
	    /** 自定义层 11 */
	    CUSTOM_11 = 81,
	    /** 自定义层 12 */
	    CUSTOM_12 = 82,
	    /** 自定义层 13 */
	    CUSTOM_13 = 83,
	    /** 自定义层 14 */
	    CUSTOM_14 = 84,
	    /** 自定义层 15 */
	    CUSTOM_15 = 85,
	    /** 自定义层 16 */
	    CUSTOM_16 = 86,
	    /** 自定义层 17 */
	    CUSTOM_17 = 87,
	    /** 自定义层 18 */
	    CUSTOM_18 = 88,
	    /** 自定义层 19 */
	    CUSTOM_19 = 89,
	    /** 自定义层 20 */
	    CUSTOM_20 = 90,
	    /** 自定义层 21 */
	    CUSTOM_21 = 91,
	    /** 自定义层 22 */
	    CUSTOM_22 = 92,
	    /** 自定义层 23 */
	    CUSTOM_23 = 93,
	    /** 自定义层 24 */
	    CUSTOM_24 = 94,
	    /** 自定义层 25 */
	    CUSTOM_25 = 95,
	    /** 自定义层 26 */
	    CUSTOM_26 = 96,
	    /** 自定义层 27 */
	    CUSTOM_27 = 97,
	    /** 自定义层 28 */
	    CUSTOM_28 = 98,
	    /** 自定义层 29 */
	    CUSTOM_29 = 99,
	    /** 自定义层 30 */
	    CUSTOM_30 = 100,
	    /** 夹层（介电基板）1 */
	    SUBSTRATE_1 = 101,
	    /** 孔层（焊盘、过孔的内孔） */
	    HOLE = 47,
	    /** 元件外形层 */
	    COMPONENT_SHAPE = 48,
	    /** 元件标识层 */
	    COMPONENT_MARKING = 49,
	    /** 引脚焊接层 */
	    PIN_SOLDERING = 50,
	    /** 引脚悬空层 */
	    PIN_FLOATING = 51,
	    /** 元件模型层 */
	    COMPONENT_MODEL = 52,
	    /** 3D 外壳边框层 */
	    SHELL_3D_OUTLINE = 53,
	    /** 3D 外壳顶层 */
	    SHELL_3D_TOP = 54,
	    /** 3D 外壳底层 */
	    SHELL_3D_BOTTOM = 55,
	    /** 钻孔图层 */
	    DRILL_DRAWING = 56
	}
	/**
	 * 层状态
	 */
	enum EPCB_LayerStatus {
	    /** 不使用 */
	    NOT_USED = 0,
	    /** 使用并展示 */
	    SHOW = 1,
	    /** 使用但不展示 */
	    HIDDEN = 2
	}
	/**
	 * 可选中图层
	 *
	 * @public
	 * @remarks 此处为所有在编辑器图层菜单中可以选中并设置可见性的图层
	 */
	type TPCB_LayersInTheSelectable = TPCB_LayersOfInner | TPCB_LayersOfCustom | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.TOP_STIFFENER | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOTTOM_STIFFENER | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.MULTI | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING | EPCB_LayerId.RATLINE | EPCB_LayerId.COMPONENT_SHAPE | EPCB_LayerId.COMPONENT_MARKING | EPCB_LayerId.PIN_SOLDERING | EPCB_LayerId.PIN_FLOATING | EPCB_LayerId.SHELL_3D_OUTLINE | EPCB_LayerId.SHELL_3D_TOP | EPCB_LayerId.SHELL_3D_BOTTOM;
	/**
	 * 内层
	 *
	 * @public
	 */
	type TPCB_LayersOfInner = EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30;
	/**
	 * 自定义层
	 *
	 * @public
	 */
	type TPCB_LayersOfCustom = EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30;
	/**
	 * 器件所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfComponent = EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;
	/**
	 * 铜箔所属层
	 *
	 * @public
	 * @remarks 此处为方便单层铜箔层设计，不包含 {@link EPCB_LayerId.MULTI}
	 */
	type TPCB_LayersOfCopper = TPCB_LayersOfInner | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;
	/**
	 * 焊盘所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfPad = EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM | EPCB_LayerId.MULTI;
	/**
	 * 线所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfLine = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING;
	/**
	 * 尺寸标注所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfDimension = TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL;
	/**
	 * 复杂多边形图（SVG 图像、文本）所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfImage = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING;
	/**
	 * 填充所属层
	 *
	 * @public
	 * @remarks 填充所属层为 {@link EPCB_LayerId.MULTI} 时代表挖槽区域
	 */
	type TPCB_LayersOfFill = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.MULTI;
	/**
	 * 区域所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfRegion = TPCB_LayersOfCopper | EPCB_LayerId.MULTI;
	/**
	 * 二进制内嵌对象所属层
	 *
	 * @public
	 */
	type TPCB_LayersOfObject = EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT;
	/**
	 * 图层颜色配置
	 *
	 * @public
	 */
	enum EPCB_LayerColorConfiguration {
	    /** 嘉立创 EDA */
	    JLCEDA = 1,
	    /** EasyEDA */
	    EASYEDA = 1,
	    /** Altium Designer */
	    ALTIUM_DESIGNER = 2,
	    /** PADS */
	    PADS = 3,
	    /** KiCAD */
	    KICAD = 4
	}
	/**
	 * PCB 板材类型
	 *
	 * @public
	 */
	enum EPCB_PcbPlateType {
	    /** 普通板材 */
	    NORMAL = 1,
	    /** FPC 软板 */
	    FPC = 2
	}
	/**
	 * 图层类型
	 *
	 * @public
	 */
	enum EPCB_LayerType {
	    /** 信号层 */
	    SIGNAL = "SIGNAL",
	    /** 内电层 */
	    INTERNAL_ELECTRICAL = "PLANE",
	    /** 丝印层 */
	    SILKSCREEN = "SILKSCREEN",
	    /** 阻焊层 */
	    SOLDER_MASK = "SOLDER_MASK",
	    /** 锡膏（助焊）层 */
	    PASTE_MASK = "PASTE_MASK",
	    /** 装配层 */
	    ASSEMBLY = "ASSEMBLY",
	    /** 其它 */
	    OTHER = "OTHER",
	    /** 自定义层 */
	    CUSTOM = "CUSTOM"
	}
	/**
	 * 内层允许设置的图层类型
	 *
	 * @public
	 */
	type TPCB_LayerTypesOfInnerLayer = EPCB_LayerType.SIGNAL | EPCB_LayerType.INTERNAL_ELECTRICAL;
	/**
	 * 图层属性
	 *
	 * @public
	 */
	interface IPCB_LayerItem {
	    /** 图层 ID */
	    id: EPCB_LayerId;
	    /** 名称 */
	    name: string;
	    /** 类型 */
	    type: EPCB_LayerType;
	    /** 颜色（RGB HEX 格式） */
	    color: string;
	    /** 透明度（%） */
	    transparency: number;
	    /** 非激活颜色（RGB HEX 格式） */
	    inactiveColor: string;
	    /** 非激活透明度（%） */
	    inactiveTransparency: number;
	    /** 层状态 */
	    layerStatus: EPCB_LayerStatus;
	    /** 是否锁定 */
	    locked: boolean;
	}
	/**
	 * 非激活层展示模式
	 *
	 * @public
	 */
	enum EPCB_InactiveLayerDisplayMode {
	    /** 正常亮度 */
	    NORMAL_BRIGHTNESS = 0,
	    /** 置灰 */
	    TURN_GRAY = 1,
	    /** 隐藏 */
	    HIDE = 2
	}
	/**
	 * PCB & 封装 / 图层操作类
	 *
	 * @public
	 */
	class PCB_Layer {
	    /**
	     * 获取当前图层的详细属性
	     *
	     * @alpha
	     * @returns 当前图层的详细属性
	     */
	    getCurrentLayer(): IPCB_LayerItem | undefined;
	    /**
	     * 选中图层
	     *
	     * @public
	     * @param layer - 层
	     * @returns 操作是否成功，不存在指定层将返回 `false`
	     */
	    selectLayer(layer: TPCB_LayersInTheSelectable): Promise<boolean>;
	    /**
	     * 将层设置为可见
	     *
	     * @beta
	     * @param layer - 层，如若不指定任何层则默认为所有层
	     * @param setOtherLayerInvisible - 是否将其它层设置为不可见
	     * @returns 操作是否成功
	     */
	    setLayerVisible(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>, setOtherLayerInvisible?: boolean): Promise<boolean>;
	    /**
	     * 将层设置为不可见
	     *
	     * @beta
	     * @param layer - 层，如若不指定任何层则默认为所有层
	     * @param setOtherLayerVisible - 是否将其它层设置为可见
	     * @returns 操作是否成功
	     */
	    setLayerInvisible(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>, setOtherLayerVisible?: boolean): Promise<boolean>;
	    /**
	     * 锁定层
	     *
	     * @beta
	     * @param layer - 层，如若不指定任何层则默认为所有层
	     * @returns 操作是否成功
	     */
	    lockLayer(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>): Promise<boolean>;
	    /**
	     * 取消锁定层
	     *
	     * @beta
	     * @param layer  - 层，如若不指定任何层则默认为所有层
	     * @returns 操作是否成功
	     */
	    unlockLayer(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>): Promise<boolean>;
	    /**
	     * 设置铜箔层数
	     *
	     * @beta
	     * @remarks 新建的 PCB 文档默认拥有两层铜箔层
	     * @param numberOfLayers - 层数
	     * @returns 操作是否成功
	     */
	    setTheNumberOfCopperLayers(numberOfLayers: 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32): Promise<boolean>;
	    /**
	     * 获取铜箔层数
	     *
	     * @alpha
	     * @returns 层数
	     */
	    getTheNumberOfCopperLayers(): Promise<number>;
	    /**
	     * 设置层颜色配置
	     *
	     * @beta
	     * @param colorConfiguration - 颜色配置
	     * @returns 操作是否成功
	     */
	    setLayerColorConfiguration(colorConfiguration: EPCB_LayerColorConfiguration): Promise<boolean>;
	    /**
	     * 设置非激活层透明度
	     *
	     * @beta
	     * @param transparency - 透明度，范围 `0-100`
	     * @returns 操作是否成功
	     */
	    setInactiveLayerTransparency(transparency: number): Promise<boolean>;
	    /**
	     * 设置 PCB 类型
	     *
	     * @beta
	     * @remarks
	     * 此处主要是为了适配 FPC 软板的设计，如若将 PCB 类型设置为 FPC 软板，将会新增 FPC 补强层图层。
	     *
	     * 请注意：
	     *
	     * 1. 嘉立创暂不支持超过 2 层铜箔层的 FPC 软板生产；
	     *
	     * 2. 将 PCB 类型从 FPC 软板切换为普通板材时需要预先删除 FPC 补强层上的任何图元，否则将无法切换并返回 `false` 的结果。
	     * @param pcbType - PCB 类型
	     * @returns 操作是否成功
	     */
	    setPcbType(pcbType: EPCB_PcbPlateType): Promise<boolean>;
	    /**
	     * 新增自定义层
	     *
	     * @beta
	     * @returns 新增的自定义层的图层 ID，如若为 `undefined` 则为新增失败，可能是自定义层数量已达到上限
	     */
	    addCustomLayer(): Promise<TPCB_LayersOfCustom | undefined>;
	    /**
	     * 移除层
	     *
	     * @beta
	     * @remarks 当前仅支持移除自定义层
	     * @param layer - 层
	     * @returns 操作是否成功
	     */
	    removeLayer(layer: TPCB_LayersOfCustom): Promise<boolean>;
	    /**
	     * 修改图层属性
	     *
	     * @beta
	     * @remarks 仅内层和自定义层允许修改名称；仅内层允许修改类型, 透明度仅支持0-100之间的数
	     * @param layer - 层
	     * @param property - 属性
	     * @returns 修改后的图层属性，如若为 `undefined` 则代表修改失败或图层不存在
	     */
	    modifyLayer(layer: TPCB_LayersInTheSelectable, property: {
	        name?: string;
	        type?: TPCB_LayerTypesOfInnerLayer;
	        color?: string;
	        transparency?: number;
	    }): Promise<boolean>;
	    /**
	     * 获取所有图层的详细属性
	     *
	     * @beta
	     * @returns 所有图层的详细属性
	     */
	    getAllLayers(): Promise<Array<IPCB_LayerItem>>;
	    /**
	     * 设置非激活层展示模式
	     *
	     * @beta
	     * @param displayMode - 展示模式
	     * @returns 是否设置成功
	     */
	    setInactiveLayerDisplayMode(displayMode?: EPCB_InactiveLayerDisplayMode): Promise<boolean>;
	    /**
	     * 获取当前物理叠层配置名称
	     *
	     * @alpha
	     * @returns 当前物理叠层配置名称，`undefined` 为获取失败
	     */
	    getCurrentPhysicalStackingConfigurationName(): Promise<string | undefined>;
	    /**
	     * 获取当前物理叠层配置
	     *
	     * @alpha
	     * @returns 当前物理叠层配置，`undefined` 为获取失败
	     */
	    getCurrentPhysicalStackingConfiguration(): {
	        [key: string]: any;
	    } | undefined;
	    /**
	     * 获取指定物理叠层配置
	     *
	     * @alpha
	     * @param configurationName - 配置名称
	     * @returns 物理叠层配置，`undefined` 为不存在该物理叠层
	     */
	    getPhysicalStackingConfiguration(configurationName: string): Promise<{
	        [key: string]: any;
	    } | undefined>;
	    /**
	     * 获取所有物理叠层配置
	     *
	     * @alpha
	     * @returns 所有物理叠层配置
	     */
	    getAllPhysicalStackingConfigurations(): Promise<Array<{
	        [key: string]: any;
	    }>>;
	    /**
	     * 保存物理叠层配置
	     *
	     * @alpha
	     * @param physicalStackingConfiguration - 物理叠层配置
	     * @param configurationName - 配置名称
	     * @param allowOverwrite - 是否允许覆写同名物理叠层配置，`false` 则将在遇到同名物理叠层配置时返回 `false`，请注意可能的数据丢失风险
	     * @returns 保存是否成功
	     */
	    savePhysicalStackingConfiguration(physicalStackingConfiguration: {
	        [key: string]: any;
	    }, configurationName: string, allowOverwrite?: boolean): Promise<boolean>;
	    /**
	     * 重命名物理叠层配置
	     *
	     * @alpha
	     * @param originalConfigurationName - 原物理叠层配置名称
	     * @param configurationName - 新物理叠层配置名称
	     * @returns 重命名是否成功
	     */
	    renamePhysicalStackingConfiguration(originalConfigurationName: string, configurationName: string): Promise<boolean>;
	    /**
	     * 删除物理叠层配置
	     *
	     * @alpha
	     * @param configurationName - 配置名称
	     * @returns 删除是否成功
	     */
	    deletePhysicalStackingConfiguration(configurationName: string): Promise<boolean>;
	    /**
	     * 获取新建 PCB 默认物理叠层配置的名称
	     *
	     * @alpha
	     * @returns 默认物理叠层配置的名称，`undefined` 为获取失败
	     */
	    getDefaultPhysicalStackingConfigurationName(): Promise<string | undefined>;
	    /**
	     * 设置为新建 PCB 默认物理叠层配置
	     *
	     * @alpha
	     * @remarks 返回值为结果导向，重复设置相同的物理叠层为默认物理叠层也将返回 `true`
	     * @param configurationName - 配置名称
	     * @returns 设置是否成功
	     */
	    setAsDefaultPhysicalStackingConfiguration(configurationName: string): Promise<boolean>;
	    /**
	     * 覆写当前物理叠层配置
	     *
	     * @alpha
	     * @remarks 将会覆写 PCB 当前的物理叠层配置，请注意数据丢失风险
	     * @param ruleConfiguration - 物理叠层配置
	     * @returns 覆写是否成功
	     */
	    overwriteCurrentPhysicalStackingConfiguration(physicalStackingConfiguration: {
	        [key: string]: any;
	    }): boolean;
	}

	/**
	 * 单多边形源数组
	 *
	 * @public
	 * @remarks
	 * 单多边形为首尾重合的一条不间断的线所描述的区域，如果首尾不重合将会自动重合。
	 *
	 * 单多边形的数据格式举例：
	 *
	 * `[300, 200, 'L', 400, 200, 'ARC', 400, 220, 15, 'C', 200, 500, 400, 300, 100, 100]`
	 *
	 * `['R', 100, 200, 300, 300, 0, 0]`
	 *
	 * `['CIRCLE', 100, 200, 5]`
	 *
	 * 单多边形的数据由以下几种模式组合而成：
	 *
	 * ① L 直线模式
	 *
	 * `x1 y1 L x2 y3 x3 y3 ...`
	 *
	 * - `{number}` `x` - 直线点的 X 坐标
	 *
	 * - `{number}` `y` - 直线点的 Y 坐标
	 *
	 * ② ARC/CARC 圆弧模式
	 *
	 * `ARC` 为两点交互，`CARC` 为中心圆弧交互
	 *
	 * `startX startY ARC arcAngle endX endY`
	 *
	 * `startX startY CARC arcAngle endX endY`
	 *
	 * - `{number}` `startX` - 起始 X
	 *
	 * - `{number}` `startY` - 起始 Y
	 *
	 * - `{number}` `arcAngle` - 圆弧角（负值为顺时针旋转；角度制）
	 *
	 * - `{number}` `endX` - 终止 X
	 *
	 * - `{number}` `endY` - 终止 Y
	 *
	 * ③ C 三阶贝塞尔模式
	 *
	 * `x1 y1 C x2 y2 x3 y3 x4 y4 ...`
	 *
	 * - `{number}` `x` - 控制点 X
	 *
	 * - `{number}` `y` - 控制点 Y
	 *
	 * ④ R 矩形模式
	 *
	 * `R x y width height rot round`
	 *
	 * - `{number}` `x` - 左上点 X
	 *
	 * - `{number}` `y` - 左上点 Y
	 *
	 * - `{number}` `width` - 宽
	 *
	 * - `{number}` `height` - 高
	 *
	 * - `{number}` `rotation` - 旋转角度
	 *
	 * - `{number}` `round` - 圆角半径
	 *
	 * ⑤ CIRCLE 圆形模式
	 *
	 * `CIRCLE cx cy radius`
	 *
	 * - `{number}` `cx` - 中心点 X
	 *
	 * - `{number}` `xy` - 中心点 Y
	 *
	 * - `{number}` `radius` - 半径
	 */
	type TPCB_PolygonSourceArray = Array<'L' | 'ARC' | 'CARC' | 'C' | 'R' | 'CIRCLE' | number>;
	/**
	 * 离散化点
	 *
	 * @public
	 */
	interface IPCB_DiscretizedPoint {
	    /** X 坐标 */
	    x: number;
	    /** Y 坐标 */
	    y: number;
	}
	/**
	 * 离散化选项
	 *
	 * @public
	 */
	interface IPCB_DiscretizeOptions {
	    /**
	     * 离散步长，即相邻离散点之间的最大距离
	     *
	     * @remarks 步长越小，离散点越密集，精度越高；步长单位与多边形坐标单位一致
	     */
	    step?: number;
	}
	/**
	 * PCB & 封装 / 多边形数学类
	 *
	 * @public
	 */
	class PCB_MathPolygon {
	    /**
	     * 创建单多边形
	     *
	     * @public
	     * @param polygon - 单多边形数据
	     * @returns 单多边形对象，`undefined` 表示数据不合法
	     */
	    createPolygon(polygon: TPCB_PolygonSourceArray): IPCB_Polygon | undefined;
	    /**
	     * 创建复杂多边形
	     *
	     * @public
	     * @param complexPolygon - 复杂多边形数据
	     * @returns 复杂多边形对象，`undefined` 表示数据不合法
	     */
	    createComplexPolygon(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | Array<IPCB_Polygon>): IPCB_ComplexPolygon | undefined;
	    /**
	     * 拆分单多边形
	     *
	     * @public
	     * @param complexPolygons - 复杂多边形
	     * @returns 单多边形数组
	     */
	    splitPolygon(...complexPolygons: Array<IPCB_ComplexPolygon>): Array<IPCB_Polygon>;
	    /**
	     * 将单多边形离散化为点数据
	     *
	     * @alpha
	     * @remarks 将单多边形的边界离散化为一系列点
	     *
	     * @param polygon - 单多边形对象
	     * @param options - 离散化选项
	     * @returns 离散化点数据
	     */
	    discretize(polygon: IPCB_Polygon | TPCB_PolygonSourceArray, options?: IPCB_DiscretizeOptions): Array<IPCB_DiscretizedPoint>;
	    /**
	     * 计算复杂多边形 BBox 宽度
	     *
	     * @beta
	     * @param complexPolygon - 复杂多边形
	     * @returns BBox 宽度
	     */
	    calculateWidth(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon): number;
	    /**
	     * 计算复杂多边形 BBox 高度
	     *
	     * @beta
	     * @param complexPolygon - 复杂多边形
	     * @returns BBox 高度
	     */
	    calculateHeight(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon): number;
	    calculateBBoxHeight(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>): number;
	    /**
	     * 将图像转换为复杂多边形对象
	     *
	     * @beta
	     * @param imageBlob - 图像 Blob 文件，可以使用 {@link SYS_FileSystem.openReadFileDialog} 方法从文件系统读取文件
	     * @param imageWidth - 图像宽度
	     * @param imageHeight - 图像高度
	     * @param tolerance - 容差，取值范围 `0`-`1`
	     * @param simplification - 简化，取值范围 `0`-`1`
	     * @param smoothing - 平滑，取值范围 `0`-`1.33`
	     * @param despeckling - 去斑，取值范围 `0`-`5`
	     * @param whiteAsBackgroundColor - 是否白色作为背景色
	     * @param inversion - 是否反相
	     * @returns 复杂多边形对象
	     */
	    convertImageToComplexPolygon(imageBlob: Blob, imageWidth: number, imageHeight: number, tolerance?: number, simplification?: number, smoothing?: number, despeckling?: number, whiteAsBackgroundColor?: boolean, inversion?: boolean): Promise<IPCB_ComplexPolygon | undefined>;
	    private calculateBBoxWidth;
	}
	/**
	 * 单多边形
	 *
	 * @public
	 */
	class IPCB_Polygon {
	    private polygon;
	    /** @internal */
	    constructor(polygon: TPCB_PolygonSourceArray);
	    /**
	     * 获取单多边形数据
	     *
	     * @public
	     * @returns 单多边形数据
	     */
	    getSource(): TPCB_PolygonSourceArray;
	    /**
	     * 获取单多边形中心点
	     *
	     * @beta
	     * @returns 单多边形中心点
	     */
	    getCenter(): Promise<{
	        x: number;
	        y: number;
	    }>;
	    /**
	     * 将单多边形离散化为点数据
	     *
	     * @alpha
	     * @remarks 将单多边形的边界离散化为一系列点
	     *
	     * @param options - 离散化选项
	     * @returns 离散化点数据
	     */
	    discretize(options?: IPCB_DiscretizeOptions): Array<IPCB_DiscretizedPoint>;
	    /**
	     * 校验单多边形
	     *
	     * @beta
	     * @remarks 校验并整理输入数据，如数据有误，则抛出错误
	     * @returns 单多边形数据
	     */
	    private validateSource;
	}
	/**
	 * 复杂多边形
	 *
	 * @public
	 * @remarks
	 * 复杂多边形可以包含多个单多边形，通过 {@link https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule | fill-rule} 将其组合，以实现多边形的布尔运算。
	 * 目前嘉立创 EDA 专业版固定使用 {@link https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule#nonzero | nonzero} 这个 fill-rule。
	 */
	class IPCB_ComplexPolygon {
	    private complexPolygon;
	    /** @internal */
	    constructor(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | Array<IPCB_Polygon>);
	    /**
	     * 添加多边形数据
	     *
	     * @public
	     * @param complexPolygon - 复杂多边形数据
	     * @returns 复杂多边形对象
	     */
	    addSource(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | Array<IPCB_Polygon>): IPCB_ComplexPolygon;
	    /**
	     * 获取多边形数据
	     *
	     * @public
	     * @remarks 如遇仅包含单一的单多边形，将会化简最外层的数组
	     * @returns 单多边形或复杂多边形数据
	     */
	    getSource(): TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>;
	    /**
	     * 获取复杂多边形数据
	     *
	     * @public
	     * @remarks 强制返回复杂多边形格式数据，即使它仅包含单一的单多边形
	     * @returns 复杂多边形数据
	     */
	    getSourceStrictComplex(): Array<TPCB_PolygonSourceArray>;
	    /**
	     * 获取复杂多边形中心点
	     *
	     * @alpha
	     * @returns 复杂多边形中心点
	     */
	    getCenter(): {
	        x: number;
	        y: number;
	    };
	    /**
	     * 拆分为单多边形数组
	     *
	     * @public
	     * @remarks 将复杂多边形拆分为单多边形对象数组
	     * @returns 单多边形数组
	     */
	    toPolygon(): Array<IPCB_Polygon>;
	    /**
	     * 校验复杂多边形
	     *
	     * @beta
	     * @returns 复杂多边形数据
	     */
	    private validateSource;
	}

	/**
	 * 图元类型
	 *
	 * @public
	 */
	enum EPCB_PrimitiveType {
	    /** 圆弧线 */
	    ARC = "Arc",
	    /** 器件 */
	    COMPONENT = "Component",
	    /** 焊盘 */
	    PAD = "Pad",
	    /** 器件焊盘 */
	    COMPONENT_PAD = "ComponentPad",
	    /** 折线 */
	    POLYLINE = "Polyline",
	    /** 覆铜边框 */
	    POUR = "Pour",
	    /** 填充 */
	    FILL = "Fill",
	    /** 区域 */
	    REGION = "Region",
	    /** 直线 */
	    LINE = "Line",
	    /** 过孔 */
	    VIA = "Via",
	    /** 尺寸标注 */
	    DIMENSION = "Dimension",
	    /** 图像 */
	    IMAGE = "Image",
	    /** 二进制内嵌对象 */
	    OBJECT = "Object",
	    /** 覆铜填充 */
	    POURED = "Poured",
	    /** 文本 */
	    STRING = "String",
	    /** 属性 */
	    ATTRIBUTE = "Attribute"
	}
	/**
	 * 阻焊/助焊扩展
	 *
	 * @public
	 * @remarks
	 * 本参数设置包含以下三类情况：
	 *
	 * 1. 当图元为顶层/底层贴片焊盘时，允许设置对应层的阻焊/助焊扩展，其余设置不生效
	 *
	 * 2. 当图元为通孔焊盘时，允许设置顶层/底层的阻焊扩展，助焊扩展的设置不生效
	 *
	 * 3. 当图元为过孔时，允许设置顶层/底层的阻焊扩展，助焊扩展的设置不生效，如若为盲孔，则视其暴露层生效其阻焊扩展设置
	 *
	 * 助焊扩展在一般情况下仅用于钢网生产等特定用途，不了解其作用请安心地忽略其参数设置
	 */
	interface IPCB_PrimitiveSolderMaskAndPasteMaskExpansion {
	    /** 顶层阻焊扩展 */
	    topSolderMask?: number;
	    /** 底层阻焊扩展 */
	    bottomSolderMask?: number;
	    /** 顶层助焊扩展 */
	    topPasteMask?: number;
	    /** 底层助焊扩展 */
	    bottomPasteMask?: number;
	}
	/**
	 * PCB & 封装 / 图元类
	 *
	 * @public
	 * @remarks 图元的统一操作
	 */
	class PCB_Primitive {
	    /**
	     * 获取指定 ID 的图元的图元类型
	     *
	     * @alpha
	     * @param id - 图元 ID
	     * @returns 图元类型
	     */
	    getPrimitiveTypeByPrimitiveId(id: string): Promise<EPCB_PrimitiveType | undefined>;
	    /**
	     * 获取指定 ID 的图元的所有属性
	     *
	     * @alpha
	     * @param id - 图元 ID
	     * @returns 图元的所有属性
	     */
	    getPrimitiveByPrimitiveId(id: string): Promise<IPCB_Primitive | undefined>;
	    /**
	     * 获取指定所有 ID 的图元的所有属性
	     *
	     * @alpha
	     * @param ids - 图元 ID 数组
	     * @returns 所有图元的所有属性
	     */
	    getPrimitivesByPrimitiveId(ids: Array<string>): Promise<Array<IPCB_Primitive>>;
	    /**
	     * 获取图元的 BBox
	     *
	     * @beta
	     * @param primitiveIds - 图元 ID 数组或图元对象数组
	     * @returns 图元的 BBox，如若图元不存在或没有 BBox，将会返回 `undefined` 的结果
	     */
	    getPrimitivesBBox(primitiveIds: Array<string | IPCB_Primitive>): Promise<{
	        minX: number;
	        minY: number;
	        maxX: number;
	        maxY: number;
	    } | undefined>;
	    /**
	     * 获取图元的边框线
	     *
	     * @alpha
	     * @param primitiveId - 图元 ID
	     * @param layers - 需要计算的层，在计算器件、焊盘、过孔时能够精确计算指定多个层的边框线的并集
	     * @returns 复杂多边形，如果图元 ID 未匹配或图元在指定层上不存在，则返回 `undefined`
	     */
	    getPrimitiveBoardLine(primitiveId: string, layers?: Array<EPCB_LayerId>): IPCB_ComplexPolygon | undefined;
	}

	/**
	 * PCB 图元接口
	 *
	 * @public
	 */
	interface IPCB_PrimitiveAPI {
	    create: (...args: any[]) => IPCB_Primitive | undefined | Promise<IPCB_Primitive> | Promise<IPCB_Primitive | undefined>;
	    delete: (primitiveIds: string | any | Array<string> | Array<any>) => boolean | Promise<boolean>;
	    modify: (primitiveId: string | any, ...args: any[]) => IPCB_Primitive | undefined | Promise<IPCB_Primitive> | Promise<IPCB_Primitive | undefined>;
	    get: {
	        (primitiveIds: string): IPCB_Primitive | undefined | Promise<IPCB_Primitive | undefined>;
	        (primitiveIds: Array<string>): Array<IPCB_Primitive> | Promise<Array<IPCB_Primitive>>;
	    };
	    getAllPrimitiveId: (...args: any[]) => Array<string> | Promise<Array<string>>;
	    getAll: (...args: any[]) => Array<IPCB_Primitive> | Promise<Array<IPCB_Primitive>>;
	}
	/**
	 * PCB 图元
	 *
	 * @public
	 */
	interface IPCB_Primitive {
	    getState_PrimitiveType: () => EPCB_PrimitiveType;
	    getState_PrimitiveId: () => string;
	    create: () => IPCB_Primitive | Promise<IPCB_Primitive>;
	    toAsync: () => IPCB_Primitive;
	    toSync: () => IPCB_Primitive;
	    isAsync: () => boolean;
	    reset: () => IPCB_Primitive | Promise<IPCB_Primitive>;
	    done: () => IPCB_Primitive | Promise<IPCB_Primitive>;
	}

	/**
	 * 文档飞线计算功能状态
	 *
	 * @public
	 */
	enum EPCB_DocumentRatlineCalculatingActiveStatus {
	    /** 启用 */
	    ACTIVE = "active",
	    /** 停用 */
	    INACTIVE = "inactive"
	}
	/**
	 * PCB & 封装 / 文档操作类
	 *
	 * @public
	 * @remarks 对设计文档总体进行的操作
	 */
	class PCB_Document {
	    /**
	     * 从原理图导入变更
	     *
	     * @public
	     * @param uuid - 原理图 UUID，默认为关联在同一个 Board 下的原理图
	     * @returns 导入操作是否成功，导入失败或未传入原理图 UUID 的游离 PCB 将返回 `false`
	     */
	    importChanges(uuid?: string): Promise<boolean>;
	    /**
	     * 导入自动布线文件（JSON）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.openReadFileDialog} 读入文件
	     * @param autoRouteFile - 欲导入的 JSON 文件
	     * @returns 导入操作是否成功
	     */
	    importAutoRouteJsonFile(autoRouteFile: File): Promise<boolean>;
	    /**
	     * 导入自动布线文件（SES）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.openReadFileDialog} 读入文件
	     * @param autoRouteFile - 欲导入的 SES 文件
	     * @returns 导入操作是否成功
	     */
	    importAutoRouteSesFile(autoRouteFile: File): Promise<boolean>;
	    /**
	     * 导入自动布局文件（JSON）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.openReadFileDialog} 读入文件
	     * @param autoLayoutFile - 欲导入的 JSON 文件
	     * @returns 导入操作是否成功
	     */
	    importAutoLayoutJsonFile(autoLayoutFile: File): Promise<boolean>;
	    /**
	     * 保存文档
	     *
	     * @public
	     * @returns 保存操作是否成功，保存失败、上传失败等错误均返回 `false`
	     */
	    save(uuid: string): Promise<boolean>;
	    /**
	     * 获取当前飞线计算功能状态
	     *
	     * @public
	     * @returns 功能状态
	     */
	    getCalculatingRatlineStatus(): Promise<EPCB_DocumentRatlineCalculatingActiveStatus>;
	    /**
	     * 启动飞线计算功能
	     *
	     * @public
	     * @remarks 在启动时将会触发一次飞线计算
	     * @returns 操作是否成功
	     */
	    startCalculatingRatline(): Promise<boolean>;
	    /**
	     * 停止飞线计算功能
	     *
	     * @public
	     * @returns 操作是否成功
	     */
	    stopCalculatingRatline(): Promise<boolean>;
	    /**
	     * 输入画布坐标返回该坐标对应的数据坐标
	     *
	     * @public
	     * @remarks 嘉立创 EDA 前端显示的坐标均为画布原点；嘉立创 EDA API 使用的均为数据原点；在创建 PCB 时，默认画布原点等于数据原点
	     * @param canvasOriginX - 画布原点 X
	     * @param canvasOriginY - 画布原点 Y
	     * @returns 数据原点坐标
	     */
	    convertCanvasOriginToDataOrigin(x: number, y: number): Promise<{
	        x: number;
	        y: number;
	    }>;
	    /**
	     * 输入数据坐标返回该坐标对应的画布坐标
	     *
	     * @public
	     * @remarks 嘉立创 EDA 前端显示的坐标均为画布原点；嘉立创 EDA API 使用的均为数据原点；在创建 PCB 时，默认画布原点等于数据原点
	     * @param x - 数据原点 X
	     * @param y - 数据原点 Y
	     * @returns 画布原点坐标
	     */
	    convertDataOriginToCanvasOrigin(x: number, y: number): Promise<{
	        x: number;
	        y: number;
	    }>;
	    /**
	     * 获取画布原点相对于数据原点的偏移坐标
	     *
	     * @public
	     * @remarks
	     * 嘉立创 EDA 专业版前端显示的坐标均为画布原点；
	     *
	     * 嘉立创 EDA 专业版 API 使用的均为数据原点；
	     *
	     * 如果返回的数据为 `{ canvasOriginOffsetX: 100, canvasOriginOffsetY: 200 }`，
	     * 则代表画布原点在数据原点的向右 100 单位且向上 200 单位的位置；
	     *
	     * 此处的单位为数据层面单位，在跨度上等同于画布层面的 mil
	     * @returns 画布原点相对于数据原点的偏移坐标
	     */
	    getCanvasOrigin(): Promise<{
	        offsetX: number;
	        offsetY: number;
	    }>;
	    /**
	     * 设置画布原点相对于数据原点的偏移坐标
	     *
	     * @public
	     * @remarks
	     * 嘉立创 EDA 专业版前端显示的坐标均为画布原点；
	     *
	     * 嘉立创 EDA 专业版 API 使用的均为数据原点；
	     *
	     * 如果希望在 API 操作时前端画布坐标能与数据一致，
	     * 建议调用本方法并设置偏移量为零，
	     * 即 `setCanvasOrigin(0, 0)`；
	     *
	     * 此处的单位为数据层面单位，在跨度上等同于画布层面的 mil
	     * @param offsetX - 画布原点相对于数据原点的 X 坐标偏移
	     * @param offsetY - 画布原点相对于数据原点的 Y 坐标偏移
	     * @returns 操作是否成功
	     */
	    setCanvasOrigin(offsetX: number, offsetY: number): Promise<boolean>;
	    /**
	     * 定位到画布坐标
	     *
	     * @public
	     * @remarks
	     * 本接口在前端画布上定位到指定的数据层面坐标；
	     *
	     * 如果希望在进行本操作时前端画布坐标能与传入数据一致，
	     * 建议调用 {@link PCB_Document.setCanvasOrigin} 方法并设置偏移量为零；
	     *
	     * 此处的单位为数据层面单位，在跨度上等同于画布层面的 mil
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @returns 操作是否成功
	     */
	    navigateToCoordinates(x: number, y: number): Promise<boolean>;
	    /**
	     * 定位到画布区域
	     *
	     * @beta
	     * @remarks
	     * 本接口在前端画布上定位到指定的区域，区域数据为相对于数据原点的偏移；
	     *
	     * 例如：传入数据为 `{left: 0, right: 60, top: 100, bottom: -20}` =\> `navigateToRegion(0, 60, 100, -20)`，
	     * 则画布将会定位到以 `[30, 40]` 为中心的，`x` 轴方向长度为 `60`，`y` 轴方向长度为 `120` 的矩形范围；
	     *
	     * 本接口不进行缩放操作，但会生成指示定位中心及表示区域范围的矩形框；
	     *
	     * 此处的单位为数据层面单位，在跨度上等同于画布层面的 mil
	     * @param left - 矩形框第一 X 坐标
	     * @param right - 矩形框第二 X 坐标
	     * @param top - 矩形框第一 Y 坐标
	     * @param bottom - 矩形框第二 Y 坐标
	     * @returns 操作是否成功
	     */
	    navigateToRegion(left: number, right: number, top: number, bottom: number): Promise<boolean>;
	    /**
	     * 获取坐标点的图元
	     *
	     * @beta
	     * @remarks 本操作和前端鼠标点击操作类似，将会获取指定坐标点上的图元
	     * @param x - 坐标点 X
	     * @param y - 坐标点 Y
	     * @returns 坐标点的图元，如若坐标点无法找到图元，将返回 `undefined`
	     */
	    getPrimitiveAtPoint(x: number, y: number): Promise<IPCB_Primitive | undefined>;
	    /**
	     * 获取区域内所有图元
	     *
	     * @beta
	     * @param left - 矩形框第一 X 坐标
	     * @param right - 矩形框第二 X 坐标
	     * @param top - 矩形框第一 Y 坐标
	     * @param bottom - 矩形框第二 Y 坐标
	     * @param leftToRight - 是否仅获取完全框选的图元，`false` 则触碰即获取
	     * @returns 区域内所有图元
	     */
	    getPrimitivesInRegion(left: number, right: number, top: number, bottom: number, leftToRight?: boolean): Promise<Array<IPCB_Primitive>>;
	    /**
	     * 缩放到板框（适应板框）
	     *
	     * @beta
	     * @returns 操作是否成功
	     */
	    zoomToBoardOutline(): Promise<boolean>;
	    /**
	     * 获取当前画布过滤器配置
	     *
	     * @beta
	     * @returns 当前画布过滤器配置，`undefined` 为获取失败
	     */
	    getCurrentFilterConfiguration(): Promise<{
	        [key: string]: any;
	    } | undefined>;
	    /**
	     * 清除布线
	     *
	     * @alpha
	     * @param type - 清除类型，如若需要指定清除类型，请提前选择指定图元
	     */
	    clearRouting(type?: 'all' | 'net' | 'connection'): Promise<boolean>;
	}

	/**
	 * 网络类属性
	 *
	 * @public
	 */
	interface IPCB_NetClassItem {
	    /** 网络类名称 */
	    name: string;
	    /** 网络名称数组 */
	    nets: Array<string>;
	    /** 网络类颜色 */
	    color: {
	        r: number;
	        g: number;
	        b: number;
	        alpha: number;
	    } | null;
	}
	/**
	 * 差分对属性
	 *
	 * @public
	 */
	interface IPCB_DifferentialPairItem {
	    /** 差分对名称 */
	    name: string;
	    /** 正网络 */
	    positiveNet: string;
	    /** 负网络 */
	    negativeNet: string;
	}
	/**
	 * 等长网络组属性
	 *
	 * @public
	 */
	interface IPCB_EqualLengthNetGroupItem {
	    /** 等长网络组名称 */
	    name: string;
	    /** 网络名称数组 */
	    nets: Array<string>;
	    /** 等长网络组颜色 */
	    color: {
	        r: number;
	        g: number;
	        b: number;
	        alpha: number;
	    } | null;
	}
	/**
	 * 焊盘对组属性
	 *
	 * @public
	 */
	interface IPCB_PadPairGroupItem {
	    /** 焊盘对组名称 */
	    name: string;
	    /** 焊盘对数组 */
	    padPairs: Array<[string, string]>;
	}
	/**
	 * 焊盘对最短导线长度属性
	 *
	 * @public
	 */
	interface IPCB_PadPairMinWireLengthItem {
	    /** 焊盘对数组 */
	    padPair: [string, string];
	    /** 最短导线长度 */
	    minWireLength: number;
	}
	/**
	 * PCB & 封装 / 设计规则检查（DRC）类
	 *
	 * @public
	 * @remarks 检查、设定 DRC 规则
	 */
	class PCB_Drc {
	    /**
	     * 检查 DRC
	     *
	     * @beta
	     * @param strict - 是否严格检查，当前 PCB 统一为严格检查模式
	     * @param userInterface - 是否显示 UI（呼出底部 DRC 窗口）
	     * @param includeVerboseError - 是否在返回值中包含详细错误信息，如若为 `true`，则返回值将始终为数组
	     * @returns DRC 检查是否通过
	     */
	    check(strict: boolean, userInterface: boolean, includeVerboseError: false): Promise<boolean>;
	    /**
	     * 检查 DRC
	     *
	     * @beta
	     * @param strict - 是否严格检查，当前 PCB 统一为严格检查模式
	     * @param userInterface - 是否显示 UI（呼出底部 DRC 窗口）
	     * @param includeVerboseError - 是否在返回值中包含详细错误信息，如若为 `true`，则返回值将始终为数组
	     * @returns DRC 检查的详细结果
	     */
	    check(strict: boolean, userInterface: boolean, includeVerboseError: true): Promise<Array<any>>;
	    /**
	     * 获取实时 DRC 检查状态
	     *
	     * @alpha
	     * @returns 实时 DRC 检查状态，实时 DRC 已停止、不处于 PCB 或获取失败均返回 `false`
	     */
	    getRealTimeDrcStatus(): boolean;
	    /**
	     * 开始实时 DRC 检查
	     *
	     * @alpha
	     * @remarks 本接口返回值为结果导向，调用本接口前已启用实时 DRC 检查也将返回 `true`
	     * @returns 是否成功启用实时 DRC 检查
	     */
	    startRealTimeDrc(): boolean;
	    /**
	     * 停止实时 DRC 检查
	     *
	     * @alpha
	     * @remarks 本接口返回值为结果导向，调用本接口前已停用实时 DRC 检查也将返回 `true`
	     * @returns 是否成功停用实时 DRC 检查
	     */
	    stopRealTimeDrc(): boolean;
	    /**
	     * 获取当前设计规则配置名称
	     *
	     * @public
	     * @returns 当前设计规则配置名称，`undefined` 为获取失败
	     */
	    getCurrentRuleConfigurationName(): Promise<string | undefined>;
	    /**
	     * 获取当前设计规则配置
	     *
	     * @beta
	     * @returns 当前设计规则配置，`undefined` 为获取失败
	     */
	    getCurrentRuleConfiguration(): Promise<{
	        [key: string]: any;
	    } | undefined>;
	    /**
	     * 获取指定设计规则配置
	     *
	     * @public
	     * @param configurationName - 配置名称
	     * @returns 设计规则配置，`undefined` 为不存在该设计规则
	     */
	    getRuleConfiguration(configurationName: string): Promise<{
	        [key: string]: any;
	    } | undefined>;
	    /**
	     * 获取所有设计规则配置
	     *
	     * @beta
	     * @param includeSystem - 是否获取系统设计规则配置
	     * @returns 所有设计规则配置
	     */
	    getAllRuleConfigurations(includeSystem?: boolean): Promise<Array<{
	        [key: string]: any;
	    }>>;
	    /**
	     * 保存设计规则配置
	     *
	     * @beta
	     * @remarks 只有自定义配置可以覆盖保存，系统配置不允许修改和覆盖
	     * @param ruleConfiguration - 设计规则配置
	     * @param configurationName - 配置名称
	     * @param allowOverwrite - 是否允许覆写同名设计规则配置，`false` 则将在遇到同名设计规则配置时返回 `false`，请注意可能的数据丢失风险
	     * @returns 保存是否成功
	     */
	    saveRuleConfiguration(ruleConfiguration: {
	        [key: string]: any;
	    }, configurationName: string, allowOverwrite?: boolean): Promise<boolean>;
	    /**
	     * 重命名设计规则配置
	     *
	     * @beta
	     * @remarks 只有自定义配置可以重命名，系统配置不允许重命名
	     * @param originalConfigurationName - 原设计规则配置名称
	     * @param configurationName - 新设计规则配置名称
	     * @returns 重命名是否成功
	     */
	    renameRuleConfiguration(originalConfigurationName: string, configurationName: string): Promise<boolean>;
	    /**
	     * 删除设计规则配置
	     *
	     * @beta
	     * @remarks 系统配置不允许删除
	     * @param configurationName - 配置名称
	     * @returns 删除是否成功
	     */
	    deleteRuleConfiguration(configurationName: string): Promise<boolean>;
	    /**
	     * 获取新建 PCB 默认设计规则配置的名称
	     *
	     * @beta
	     * @returns 默认设计规则配置的名称，`undefined` 为获取失败
	     */
	    getDefaultRuleConfigurationName(): Promise<string | undefined>;
	    /**
	     * 设置为新建 PCB 默认设计规则配置
	     *
	     * @beta
	     * @remarks 返回值为结果导向，重复设置相同的设计规则为默认设计规则也将返回 `true`
	     * @param configurationName - 配置名称
	     * @returns 设置是否成功
	     */
	    setAsDefaultRuleConfiguration(configurationName: string): Promise<boolean>;
	    /**
	     * 覆写当前设计规则配置
	     *
	     * @beta
	     * @remarks 将会覆写 PCB 当前的设计规则配置，请注意数据丢失风险
	     * @param ruleConfiguration - 设计规则配置
	     * @returns 覆写是否成功
	     */
	    overwriteCurrentRuleConfiguration(ruleConfiguration: {
	        [key: string]: any;
	    }): Promise<boolean>;
	    /**
	     * 获取网络规则
	     *
	     * @beta
	     * @returns 当前 PCB 的所有网络规则
	     */
	    getNetRules(): Promise<Array<{
	        [key: string]: any;
	    }>>;
	    /**
	     * 覆写网络规则
	     *
	     * @beta
	     * @remarks 将会覆写当前 PCB 的所有网络规则，请注意数据丢失风险
	     * @param netRules - 网络规则
	     * @returns 覆写是否成功
	     */
	    overwriteNetRules(netRules: Array<{
	        [key: string]: any;
	    }>): Promise<boolean>;
	    /**
	     * 获取网络-网络规则
	     *
	     * @beta
	     * @returns 当前 PCB 的所有网络-网络规则
	     */
	    getNetByNetRules(): Promise<{
	        [key: string]: any;
	    }>;
	    /**
	     * 覆写网络-网络规则
	     *
	     * @beta
	     * @remarks 将会覆写当前 PCB 的所有网络-网络规则，请注意数据丢失风险
	     * @param netByNetRules - 网络-网络规则
	     * @returns 覆写是否成功
	     */
	    overwriteNetByNetRules(netByNetRules: {
	        [key: string]: any;
	    }): Promise<boolean>;
	    /**
	     * 获取区域规则
	     *
	     * @beta
	     * @returns - 当前 PCB 的所有区域规则
	     */
	    getRegionRules(): Promise<Array<{
	        [key: string]: any;
	    }>>;
	    /**
	     * 覆写区域规则
	     *
	     * @beta
	     * @remarks 将会覆写当前 PCB 的所有区域规则，请注意数据丢失风险
	     * @param regionRules - 区域规则
	     * @returns 覆写是否成功
	     */
	    overwriteRegionRules(regionRules: Array<{
	        [key: string]: any;
	    }>): Promise<boolean>;
	    /**
	     * 创建网络类
	     *
	     * @beta
	     * @param netClassName - 网络类名称
	     * @param nets - 网络名称数组
	     * @param color - 网络类颜色
	     * @returns 操作是否成功
	     */
	    createNetClass(netClassName: string, nets: Array<string>, color: IPCB_EqualLengthNetGroupItem['color']): Promise<boolean>;
	    /**
	     * 删除网络类
	     *
	     * @beta
	     * @param netClassName - 网络类名称
	     * @returns 操作是否成功
	     */
	    deleteNetClass(netClassName: string): Promise<boolean>;
	    /**
	     * 修改网络类的名称
	     *
	     * @beta
	     * @param originalNetClassName - 原网络类名称
	     * @param netClassName - 新网络类名称
	     * @returns 操作是否成功
	     */
	    modifyNetClassName(originalNetClassName: string, netClassName: string): Promise<boolean>;
	    /**
	     * 将网络添加到网络类
	     *
	     * @beta
	     * @param netClassName - 网络类名称
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    addNetToNetClass(netClassName: string, net: string | Array<string>): Promise<boolean>;
	    /**
	     * 从网络类中移除网络
	     *
	     * @beta
	     * @param netClassName - 网络类名称
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    removeNetFromNetClass(netClassName: string, net: string | Array<string>): Promise<boolean>;
	    /**
	     * 获取所有网络类的详细属性
	     *
	     * @beta
	     * @returns 所有网络类的详细属性
	     */
	    getAllNetClasses(): Promise<Array<IPCB_NetClassItem>>;
	    /**
	     * 创建差分对
	     *
	     * @beta
	     * @param differentialPairName - 差分对名称
	     * @param positiveNet - 正网络名称
	     * @param negativeNet - 负网络名称
	     * @returns 操作是否成功
	     */
	    createDifferentialPair(differentialPairName: string, positiveNet: string, negativeNet: string): Promise<boolean>;
	    /**
	     * 删除差分对
	     *
	     * @beta
	     * @param differentialPairName - 差分对名称
	     * @returns 操作是否成功
	     */
	    deleteDifferentialPair(differentialPairName: string): Promise<boolean>;
	    /**
	     * 修改差分对的名称
	     *
	     * @beta
	     * @param originalDifferentialPairName - 原差分对名称
	     * @param differentialPairName - 新差分对名称
	     * @returns 操作是否成功
	     */
	    modifyDifferentialPairName(originalDifferentialPairName: string, differentialPairName: string): Promise<boolean>;
	    /**
	     * 修改差分对正网络
	     *
	     * @beta
	     * @param differentialPairName - 差分对名称
	     * @param positiveNet - 正网络名称
	     * @returns 操作是否成功
	     */
	    modifyDifferentialPairPositiveNet(differentialPairName: string, positiveNet: string): Promise<boolean>;
	    /**
	     * 修改差分对负网络
	     *
	     * @beta
	     * @param differentialPairName - 差分对名称
	     * @param negativeNet - 负网络名称
	     * @returns 操作是否成功
	     */
	    modifyDifferentialPairNegativeNet(differentialPairName: string, negativeNet: string): Promise<boolean>;
	    /**
	     * 获取所有差分对的详细属性
	     *
	     * @beta
	     * @remarks
	     * BREAKING CHANGE since EDA v3.4
	     *
	     * - 返回值类型更改为对象
	     * @returns 所有差分对的详细属性
	     */
	    getAllDifferentialPairs(): Promise<Array<IPCB_DifferentialPairItem> | {
	        [key: string]: any;
	    }>;
	    /**
	     * 创建等长网络组
	     *
	     * @beta
	     * @param equalLengthNetGroupName - 等长网络组名称
	     * @param nets - 网络名称数组
	     * @param color - 等长网络组颜色
	     * @returns 操作是否成功
	     */
	    createEqualLengthNetGroup(equalLengthNetGroupName: string, nets: Array<string>, color: IPCB_EqualLengthNetGroupItem['color']): Promise<boolean>;
	    /**
	     * 删除等长网络组
	     *
	     * @beta
	     * @param equalLengthNetGroupName - 等长网络组名称
	     * @returns 操作是否成功
	     */
	    deleteEqualLengthNetGroup(equalLengthNetGroupName: string): Promise<boolean>;
	    /**
	     * 修改等长网络组的名称
	     *
	     * @beta
	     * @param originalEqualLengthNetGroupName - 原等长网络组名称
	     * @param equalLengthNetGroupName - 新等长网络组名称
	     * @returns 操作是否成功
	     */
	    modifyEqualLengthNetGroupName(originalEqualLengthNetGroupName: string, equalLengthNetGroupName: string): Promise<boolean>;
	    /**
	     * 将网络添加到等长网络组
	     *
	     * @beta
	     * @param equalLengthNetGroupName - 等长网络组名称
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    addNetToEqualLengthNetGroup(equalLengthNetGroupName: string, net: string | Array<string>): Promise<boolean>;
	    /**
	     * 从等长网络组中移除网络
	     *
	     * @beta
	     * @param equalLengthNetGroupName - 等长网络组名称
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    removeNetFromEqualLengthNetGroup(equalLengthNetGroupName: string, net: string | Array<string>): Promise<boolean>;
	    /**
	     * 获取所有等长网络组的详细属性
	     *
	     * @beta
	     * @returns 所有等长网络组的详细属性
	     */
	    getAllEqualLengthNetGroups(): Promise<Array<IPCB_EqualLengthNetGroupItem>>;
	    /**
	     * 创建焊盘对组
	     *
	     * @beta
	     * @param padPairGroupName - 焊盘对组名称
	     * @param padPairs - 焊盘对数组
	     * @returns 操作是否成功
	     * @example 有三种不同的用法，确保画布上已有对应的焊盘。 分别是 一，游离焊盘-游离焊盘；二，器件焊盘 - 器件焊盘；三，器件焊盘 - 游离焊盘
	     * await eda.pcb_Drc.createPadPairGroup('test',[['e0','e1']]) // 游离焊盘-游离焊盘
	     * await eda.pcb_Drc.createPadPairGroup('test',[['R1:1','R1:2'],['R2:1','R2:2']]) // 器件焊盘 - 器件焊盘
	     * await eda.pcb_Drc.createPadPairGroup('test',[['R1:1','e0'],['R1:2','e1']]) // 器件焊盘 - 游离焊盘
	     */
	    createPadPairGroup(padPairGroupName: string, padPairs: Array<[string, string]>): Promise<boolean>;
	    /**
	     * 删除焊盘对组
	     *
	     * @beta
	     * @param padPairGroupName - 焊盘对组名称
	     * @returns 操作是否成功
	     */
	    deletePadPairGroup(padPairGroupName: string): Promise<boolean>;
	    /**
	     * 修改焊盘对组的名称
	     *
	     * @beta
	     * @param originalPadPairGroupName - 原焊盘对组名称
	     * @param padPairGroupName - 新焊盘对组名称
	     * @returns 操作是否成功
	     */
	    modifyPadPairGroupName(originalPadPairGroupName: string, padPairGroupName: string): Promise<boolean>;
	    /**
	     * 将焊盘对添加到焊盘对组
	     *
	     * @beta
	     * @param padPairGroupName - 焊盘对组名称
	     * @param padPair - 焊盘对
	     * @returns 操作是否成功
	     * @example 有三种不同的用法，确保画布上已有对应的焊盘。 分别是 一，游离焊盘-游离焊盘；二，器件焊盘 - 器件焊盘；三，器件焊盘 - 游离焊盘
	     * await eda.pcb_Drc.addPadPairToPadPairGroup('test',['e0','e1']) // 游离焊盘-游离焊盘
	     * await eda.pcb_Drc.addPadPairToPadPairGroup('test',['R1:1','R1:2']) // 器件焊盘 - 器件焊盘
	     * await eda.pcb_Drc.addPadPairToPadPairGroup('test',['R1:1','e1']) // 器件焊盘 - 游离焊盘
	     */
	    addPadPairToPadPairGroup(padPairGroupName: string, padPair: [string, string] | Array<[string, string]>): Promise<boolean>;
	    /**
	     * 从焊盘对组中移除焊盘对
	     *
	     * @beta
	     * @param padPairGroupName - 焊盘对组名称
	     * @param padPair - 焊盘对
	     * @returns 操作是否成功
	     * @example 有三种不同的用法，确保画布上已有对应的焊盘。 分别是 一，游离焊盘-游离焊盘；二，器件焊盘 - 器件焊盘；三，器件焊盘 - 游离焊盘
	     * await eda.pcb_Drc.removePadPairFromPadPairGroup('test',['e0','e1']) // 游离焊盘-游离焊盘
	     * await eda.pcb_Drc.removePadPairFromPadPairGroup('test',['R1:1','R1:2']) // 器件焊盘 - 器件焊盘
	     * await eda.pcb_Drc.removePadPairFromPadPairGroup('test',['R1:2','e1']) // 器件焊盘 - 游离焊盘
	     */
	    removePadPairFromPadPairGroup(padPairGroupName: string, padPair: [string, string] | Array<[string, string]>): Promise<boolean>;
	    /**
	     * 获取所有焊盘对组的详细属性
	     *
	     * @beta
	     * @returns 所有焊盘对组的详细属性
	     */
	    getAllPadPairGroups(): Promise<Array<IPCB_PadPairGroupItem>>;
	    /**
	     * 获取焊盘对组最短导线长度
	     *
	     * @beta
	     * @param padPairGroupName - 焊盘对组名称
	     * @returns 所有焊盘对的最短导线长度
	     */
	    getPadPairGroupMinWireLength(padPairGroupName: string): Promise<Array<IPCB_PadPairMinWireLengthItem>>;
	}

	/**
	 * 鼠标事件类型
	 *
	 * @public
	 */
	enum EPCB_MouseEventType {
	    /** 选中 */
	    SELECTED = "selected",
	    /** 取消选中 */
	    CLEAR_SELECTED = "clearSelected",
	    /** 移动 */
	    MOVE = "move"
	}
	/**
	 * 图元事件类型
	 *
	 * @public
	 */
	enum EPCB_PrimitiveEventType {
	    /** 删除 */
	    DELETE = "delete",
	    /** 创建 */
	    CREATE = "add",
	    /** 属性变更 */
	    MODIFY = "modify"
	}
	/**
	 * 网络事件类型
	 *
	 * @public
	 */
	enum EPCB_NetEventType {
	    /** 新增 */
	    ADD = "add",
	    /** 移除 */
	    REMOVE = "remove",
	    /** 选中（仅当选中整个网络时触发） */
	    SELECTED = "selected"
	}
	/**
	 * PCB & 封装 / 事件类
	 *
	 * @public
	 * @remarks 注册事件回调
	 */
	class PCB_Event {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 新增鼠标事件监听
	     *
	     * @beta
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addMouseEventListener(id: string, eventType: 'all' | EPCB_MouseEventType, callFn: (eventType: EPCB_MouseEventType, props: [
	        {
	            primitiveId: string;
	            primitiveType: EPCB_PrimitiveType;
	            net?: string;
	            designator?: string;
	            parentComponentPrimitiveId?: string;
	            parentComponentDesignator?: string;
	        }
	    ]) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 新增图元事件监听
	     *
	     * @beta
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addPrimitiveEventListener(id: string, eventType: 'all' | EPCB_PrimitiveEventType, callFn: (eventType: EPCB_PrimitiveEventType, props: [
	        {
	            primitiveId: string;
	            primitiveType: EPCB_PrimitiveType;
	            net?: string;
	            designator?: string;
	            parentComponentPrimitiveId?: string;
	            parentComponentDesignator?: string;
	        }
	    ]) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 新增网络事件监听
	     *
	     * @beta
	     * @remarks
	     * 网络选中事件仅
	     *
	     * ①在过滤面板选中网络选项并在画布选中网络时
	     *
	     * ②在工程设计 -\> 网络内选中网络时
	     *
	     * 会被触发
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addNetEventListener(id: string, eventType: 'all' | EPCB_NetEventType, callFn: (eventType: EPCB_NetEventType, props: [{
	        net: string;
	    }]) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 新增交叉选择事件监听
	     *
	     * @beta
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param callFn - 事件触发时的回调函数
	     */
	    addCrossProbeSelectEventListener(id: string, callFn: (props: any) => void | Promise<void>): void;
	    /**
	     * 新增实时 DRC 结果事件监听
	     *
	     * @beta
	     * @remarks
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     */
	    addRealTimeDrcResultEventListener(id: string, eventType: 'all', callFn: (eventType: undefined, props: [{
	        drcResult: any;
	    }]) => void | Promise<void>): void;
	    /**
	     * 新增光线追踪引擎 3D 预览点击材质事件监听
	     *
	     * @alpha
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     *
	     * ADD since EDA v4
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addRayTracerEngine3DViewClickMaterialEventListener(id: string, callFn: (props: {
	        materialId: number;
	        material: any;
	    }) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 新增光线追踪引擎 3D 预览相机变动（拖动 3D 模型）事件监听
	     *
	     * @alpha
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     *
	     * ADD since EDA v4
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addRayTracerEngine3DViewCameraChangeEventListener(id: string, callFn: (props: {
	        position: {
	            x: number;
	            y: number;
	            z: number;
	        };
	        rotation: {
	            x: number;
	            y: number;
	            z: number;
	        };
	        focalLength: number;
	    }) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 移除事件监听
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 是否移除指定事件监听
	     */
	    removeEventListener(id: string): boolean;
	    /**
	     * 查询事件监听是否存在
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 事件监听是否存在
	     */
	    isEventListenerAlreadyExist(id: string): boolean;
	}

	/**
	 * 网表类型
	 *
	 * @public
	 */
	enum ESYS_NetlistType {
	    /** Allegro */
	    ALLEGRO = "Allegro",
	    /** PADS */
	    PADS = "PADS",
	    /** Protel 2 */
	    PROTEL2 = "Protel2",
	    /** 嘉立创 EDA 专业版 */
	    JLCEDA_PRO = "JLCEDA",
	    /** EasyEDA Pro Edition */
	    EASYEDA_PRO = "EasyEDA",
	    /** Altium Designer */
	    ALTIUM_DESIGNER = "Protel2",
	    /** 数字化工业软件联盟 */
	    DISA = "DISA",
	    /** 数字化工业软件联盟仿真 */
	    DISA_SIMULATION = "DSNET"
	}
	/**
	 * 导入工程导入选项
	 *
	 * @public
	 */
	enum ESYS_ImportProjectImportOption {
	    /** 导入文档 */
	    IMPORT_DOCUMENT = "ImportDocument",
	    /** 提取库文件 */
	    EXTRACT_LIBRARIES = "ExtractLibraries",
	    /** 导入文档并提取库 */
	    IMPORT_DOCUMENT_EXTRACT_LIBRARIES = "ImportDocumentExtractLibraries"
	}
	/**
	 * 导入工程原理图图元样式
	 *
	 * @public
	 */
	enum ESYS_ImportProjectSchematicObjectStyle {
	    /** 使用系统主题 */
	    USE_SYSTEM_THEME = "system",
	    /** 使用源文件样式 */
	    USE_SOURCE_FILE_STYLE = "custom"
	}
	/**
	 * 导入工程过孔阻焊扩展
	 *
	 * @public
	 * @remarks 仅 `fileType` 为 `Altium Designer` 或 `Protel` 时才可以指定该属性，否则将被忽略
	 */
	enum ESYS_ImportProjectViaSolderMaskExpansion {
	    /** 全部盖油 */
	    ALL_COVER_OIL = "cover",
	    /** 跟随源设置 */
	    FOLLOW_ORIGINAL_SETTING = "custom"
	}
	/**
	 * 导入工程板边框来源
	 *
	 * @public
	 * @remarks 仅 `fileType` 为 `Altium Designer` 或 `Protel` 时才可以指定该属性，否则将被忽略
	 */
	enum ESYS_ImportProjectBoardOutlineSource {
	    /** 从 Keepout 层 */
	    FROM_KEEPOUT_LAYER = "keepout",
	    /** 从机械层 1 */
	    FROM_MECHANICAL_LAYER_1 = "mechanical"
	}
	/**
	 * 系统 / 文件管理类
	 *
	 * @public
	 */
	class SYS_FileManager {
	    /**
	     * 获取工程文件
	     *
	     * @public
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **工程管理 \> 下载工程** 权限，没有权限调用将始终 `throw Error`
	     *
	     * @param fileName - 文件名
	     * @param password - 加密密码
	     * @param fileType - 文件格式
	     * @returns 工程文件数据，`undefined` 表示当前未打开工程或数据获取失败
	     */
	    getProjectFile(fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>;
	    /**
	     * 获取文档文件
	     *
	     * @public
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **工程设计图 \> 文件导出** 权限，没有权限调用将始终 `throw Error`
	     * @param fileName - 文件名
	     * @param password - 加密密码
	     * @param fileType - 文件格式
	     * @returns 文档文件数据，`undefined` 表示当前未打开文档或数据获取失败
	     */
	    getDocumentFile(fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>;
	    /**
	     * 获取文档源码
	     *
	     * @beta
	     * @returns 文档源码数据，`undefined` 表示当前未打开文档或数据获取失败
	     */
	    getDocumentSource(): Promise<string | undefined>;
	    /**
	     * 获取文档封装源码
	     *
	     * @beta
	     * @returns 文档封装源码数据，数据获取失败将返回空数组
	     */
	    getDocumentFootprintSources(): Promise<Array<{
	        footprintUuid: string;
	        documentSource: string;
	    }>>;
	    /**
	     * 修改文档源码
	     *
	     * @beta
	     * @param source - 文档源码
	     * @returns 是否修改成功，如果输入的文档源码格式错误，将返回 `false` 的结果
	     */
	    setDocumentSource(source: string): Promise<boolean>;
	    /**
	     * 使用工程 UUID 获取工程文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **工程管理 \> 下载工程** 权限，没有权限调用将始终 `throw Error`
	     * @param projectUuid - 工程 UUID
	     * @param fileName - 文件名
	     * @param password - 加密密码
	     * @param fileType - 文件格式
	     * @returns 工程文件数据，`undefined` 表示当前未打开工程或数据获取失败
	     */
	    getProjectFileByProjectUuid(projectUuid: string, fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>;
	    /**
	     * 使用器件 UUID 获取器件文件
	     *
	     * @public
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **团队库 \> 下载库** 权限，没有权限调用将始终 `throw Error`
	     *
	     * @param deviceUuid - 器件 UUID 或器件 UUID 列表
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取，如若不传入，则为系统库
	     * @returns 器件文件数据，`undefined` 表示数据获取失败
	     */
	    getDeviceFileByDeviceUuid(deviceUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>;
	    /**
	     * 使用符号 UUID 获取符号文件
	     *
	     * @alpha
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **团队库 \> 下载库** 权限，没有权限调用将始终 `throw Error`
	     * @param symbolUuid - 符号 UUID 或符号 UUID 列表
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取，如若不传入，则为系统库
	     * @returns 符号文件数据，`undefined` 表示数据获取失败
	     */
	    getSymbolFileBySymbolUuid(symbolUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>;
	    /**
	     * 使用封装 UUID 获取封装文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **团队库 \> 下载库** 权限，没有权限调用将始终 `throw Error`
	     * @param footprintUuid - 封装 UUID 或封装 UUID 列表
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取，如若不传入，则为系统库
	     * @returns 封装文件数据，`undefined` 表示数据获取失败
	     */
	    getFootprintFileByFootprintUuid(footprintUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>;
	    /**
	     * 使用复用模块 UUID 获取复用模块文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **团队模块 \> 下载模块** 权限，没有权限调用将始终 `throw Error`
	     * @param cbbUuid - 复用模块 UUID
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取，如若不传入，则为系统库
	     * @param fileName - 复用模块名
	     * @param password - 加密密码
	     * @returns 复用模块文件数据，`undefined` 表示数据获取失败
	     */
	    getCbbFileByCbbUuid(cbbUuid: string, libraryUuid?: string, props?: {
	        fileName?: string;
	        password?: string;
	        fileType?: 'epro' | 'epro2';
	        templateSchematicUuid?: string;
	        templatePcbUuid?: string;
	    }): Promise<File | undefined>;
	    /**
	     * 使用面板库 UUID 获取面板库文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * 注意：本接口需要启用 **团队库 \> 下载库** 权限，没有权限调用将始终 `throw Error`
	     * @param panelLibraryUuid - 面板库 UUID 或面板库 UUID 列表
	     * @param libraryUuid - 库 UUID，可以使用 {@link LIB_LibrariesList} 内的接口获取，如若不传入，则为系统库
	     * @returns 面板库文件数据，`undefined` 表示数据获取失败
	     */
	    getPanelLibraryFileByPanelLibraryUuid(panelLibraryUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>;
	    /**
	     * 使用工程文件导入工程
	     *
	     * @beta
	     * @remarks 暂不支持提取库的相关配置，如果需求提取库，将会按照默认配置提取
	     * @param projectFile - 工程文件
	     * @param fileType - 文件类型
	     * @param props - 导入参数，参考 EDA 前端 **导入** 窗口内的配置项
	     * @param saveTo - 保存到工程参数
	     * @returns 导入的工程的简略工程属性
	     */
	    importProjectByProjectFile(projectFile: File, fileType?: 'JLCEDA' | 'JLCEDA Pro' | 'EasyEDA' | 'EasyEDA Pro' | 'Allegro' | 'OrCAD' | 'EAGLE' | 'KiCad' | 'PADS' | 'LTspice', props?: {
	        importOption?: ESYS_ImportProjectImportOption;
	        schematicObjectStyle?: ESYS_ImportProjectSchematicObjectStyle;
	        associateFootprint?: boolean;
	        associate3DModel?: boolean;
	        importFootprintNotesLayer?: boolean;
	    }, saveTo?: {
	        operation: 'New Project';
	        newProjectOwnerTeamUuid: IDMT_TeamItem['uuid'];
	        newProjectOwnerFolderUuid?: IDMT_FolderItem['uuid'];
	        newProjectName?: string;
	        newProjectFriendlyName?: string;
	        newProjectDescription?: string;
	        newProjectCollaborationMode?: EDMT_ProjectCollaborationMode;
	    } | {
	        operation: 'Existing Project';
	        existingProjectUuid: IDMT_BriefProjectItem['uuid'];
	    }, librariesImportSetting?: {
	        ownerTeamUuid: IDMT_TeamItem['uuid'];
	        deviceClassification?: Array<string>;
	        symbolClassification?: Array<string>;
	        footprintClassification?: Array<string>;
	        createDeviceForSingleSymbol?: boolean;
	        updateExistingLibrariesWithTheSameName?: boolean;
	    }): Promise<IDMT_BriefProjectItem | undefined>;
	    /**
	     * 使用工程文件导入工程
	     *
	     * @beta
	     * @remarks 暂不支持提取库的相关配置，如果需求提取库，将会按照默认配置提取
	     * @param projectFile - 工程文件
	     * @param fileType - 文件类型
	     * @param props - 导入参数，参考 EDA 前端 **导入** 窗口内的配置项
	     * @param saveTo - 保存到工程参数
	     * @returns 导入的工程的简略工程属性
	     */
	    importProjectByProjectFile(projectFile: File, fileType?: 'Altium Designer' | 'Protel', props?: {
	        importOption?: ESYS_ImportProjectImportOption;
	        viaSolderMaskExpansion?: ESYS_ImportProjectViaSolderMaskExpansion;
	        boardOutlineSource?: ESYS_ImportProjectBoardOutlineSource;
	        schematicObjectStyle?: ESYS_ImportProjectSchematicObjectStyle;
	        associateFootprint?: boolean;
	        associate3DModel?: boolean;
	        importFootprintNotesLayer?: boolean;
	    }, saveTo?: {
	        operation: 'New Project';
	        newProjectOwnerTeamUuid: IDMT_TeamItem['uuid'];
	        newProjectOwnerFolderUuid?: IDMT_FolderItem['uuid'];
	        newProjectName?: string;
	        newProjectFriendlyName?: string;
	        newProjectDescription?: string;
	        newProjectCollaborationMode?: EDMT_ProjectCollaborationMode;
	    } | {
	        operation: 'Existing Project';
	        existingProjectUuid: IDMT_BriefProjectItem['uuid'];
	    }, librariesImportSetting?: {
	        ownerTeamUuid: IDMT_TeamItem['uuid'];
	        deviceClassification?: Array<string>;
	        symbolClassification?: Array<string>;
	        footprintClassification?: Array<string>;
	        createDeviceForSingleSymbol?: boolean;
	        updateExistingLibrariesWithTheSameName?: boolean;
	    }): Promise<IDMT_BriefProjectItem | undefined>;
	    /**
	     * 提取文件内的工程配置信息
	     *
	     * @public
	     * @param data - 工程文件
	     * @returns 工程配置信息
	     */
	    extractProjectInfo(data: File): Promise<any>;
	    /**
	     * 提取文件内的库配置信息
	     *
	     * @public
	     * @param data - 库文件
	     * @returns 库配置信息
	     */
	    extractLibInfo(data: File | Array<File>): Promise<any>;
	}

	/**
	 * BOM 列的属性及排序规则
	 *
	 * @public
	 */
	interface IPCB_BomPropertiesTableColumns {
	    /** 属性 */
	    property: string;
	    /** 显示名称 */
	    title?: string;
	    /** 排序规则 */
	    sort?: null | 'asc' | 'desc';
	    /** 是否分组 */
	    group?: null | 'Yes' | 'No';
	    /** 排列权重（大权重优先在 BOM 的左侧） */
	    orderWeight?: number;
	}
	/**
	 * PDF 输出方式
	 *
	 * @public
	 */
	enum EPCB_PdfOutputMethod {
	    /** 单个多页 PDF */
	    MULTI_PAGE_PDF = "A Multi Page PDF",
	    /** 多个单页 PDF（将会输出包含所有分解图层 PDF 文件的压缩包） */
	    MULTIPLE_SINGLE_PAGE_PDF = "Multiple Single Page PDF",
	    /** 单个单页 PDF（将会输出包含每层一个 PDF 文件的压缩包） */
	    SINGLE_PAGE_PDF = "A Single Page PDF"
	}
	/**
	 * PCB & 封装 / 生产资料类
	 *
	 * @public
	 * @remarks 获取当前 PCB 的生产资料文件及快捷下单
	 */
	class PCB_ManufactureData {
	    /**
	     * 获取 PCB 制版文件（Gerber）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param colorSilkscreen - 是否生成彩色丝印制造文件（嘉立创专用文件）
	     * @param unit - 单位
	     * @param digitalFormat - 数字格式
	     * @param other - 其它
	     * @param layers - 导出层，默认则按照嘉立创生产需求导出
	     * @param objects - 导出对象，默认则按照嘉立创生产需求导出
	     * @returns PCB 制版文件数据
	     * @example
	     * ```javascript
	     * // 导出默认的 Gerber 文件
	     * const gerberFile = await eda.pcb_ManufactureData.getGerberFile('MyBoard_Gerber');
	     * if (gerberFile) {
	     *     console.log('Gerber 文件已生成:', gerberFile);
	     * }
	     *
	     * // 导出并保存到本地
	     * const gerberFile = await eda.pcb_ManufactureData.getGerberFile(
	     *     'MyBoard_Gerber',
	     *     false,
	     *     ESYS_Unit.MILLIMETER,
	     *     { integerNumber: 2, decimalNumber: 6 }
	     * );
	     * if (gerberFile) {
	     *     await eda.sys_FileSystem.saveFile(gerberFile,'Gerber.zip');
	     * }
	     *
	     * // 自定义导出层和对象
	     * const gerberFile = await eda.pcb_ManufactureData.getGerberFile(
	     *     'Custom_Gerber',
	     *     false,
	     *     ESYS_Unit.INCH,
	     *     { integerNumber: 3, decimalNumber: 5 },
	     *     { metallicDrillingInformation: true, nonMetallicDrillingInformation: true, drillTable: false, flyingProbeTestingFile: false },
	     *     [{ layerId: 1, isMirror: false }, { layerId: 2, isMirror: false }, { layerId: 11, isMirror: false }],
	     *     ['Pad', 'Via', 'Track', 'BoardOutline']
	     * );
	     * ```
	     */
	    getGerberFile(fileName?: string, colorSilkscreen?: boolean, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.INCH, digitalFormat?: {
	        integerNumber: number;
	        decimalNumber: number;
	    }, other?: {
	        metallicDrillingInformation: boolean;
	        nonMetallicDrillingInformation: boolean;
	        drillTable: boolean;
	        flyingProbeTestingFile: boolean;
	    }, layers?: Array<{
	        layerId: number;
	        isMirror: boolean;
	    }>, objects?: Array<'Pad' | 'Via' | 'Track' | 'Text' | 'Image' | 'Dimension' | 'BoardOutline' | 'BoardCutout' | 'CopperFilled' | 'SolidRegion' | 'FPCStiffener' | 'Line' | 'PlaneZone' | 'ComponentProperty' | 'ComponentSilkscreen' | 'TearDrop'>): Promise<File | undefined>;
	    /**
	     * 获取 3D 模型文件
	     *
	     * @beta
	     * @remarks
	     * 请注意：只有以 STEP 格式导入的元件模型，才能在导出的 STEP 文件中体现
	     *
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @param element - 导出对象
	     * @param modelMode - 导出模式，`Outfit` = 装配体，`Parts` = 零件
	     * @param autoGenerateModels - 是否为未绑定 3D 模型的元件自动生成 3D 模型（根据元件的"高度"属性）
	     * @returns 3D 模型文件数据
	     * @example
	     * ```javascript
	     * // 导出装配体模式的 STEP 文件（包含元件模型）
	     * const stepFile = await eda.pcb_ManufactureData.get3DFile(
	     *     'MyBoard_3D',
	     *     'step',
	     *     ['Component Model'],
	     *     'Outfit',
	     *     true
	     * );
	     * if (stepFile) {
	     *     await eda.sys_FileSystem.saveFile(stepFile);
	     * }
	     *
	     * // 导出包含多种对象的完整 3D 模型
	     * const full3DFile = await eda.pcb_ManufactureData.get3DFile(
	     *     'Complete_3D_Model',
	     *     'step',
	     *     ['Component Model', 'Via', 'Silkscreen', 'Wire In Signal Layer'],
	     *     'Outfit',
	     *     true
	     * );
	     *
	     * // 导出零件模式 OBJ 文件
	     * const objFile = await eda.pcb_ManufactureData.get3DFile(
	     *     'MyBoard_OBJ',
	     *     'obj',
	     *     ['Component Model'],
	     *     'Parts',
	     *     false
	     * );
	     * ```
	     */
	    get3DFile(fileName?: string, fileType?: 'step' | 'obj', element?: Array<'Component Model' | 'Via' | 'Silkscreen' | 'Wire In Signal Layer'>, modelMode?: 'Outfit' | 'Parts', autoGenerateModels?: boolean): Promise<File | undefined>;
	    /**
	     * 获取 3D 外壳文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @returns 3D 外壳文件数据
	     * @example
	     * ```javascript
	     * // 导出 STL 格式 3D 外壳
	     * const stlFile = await eda.pcb_ManufactureData.get3DShellFile('Board_Shell', 'stl');
	     * if (stlFile) {
	     *     await eda.sys_FileSystem.saveFile(stlFile);
	     * }
	     *
	     * // 导出 STEP 格式 3D 外壳
	     * const stepShellFile = await eda.pcb_ManufactureData.get3DShellFile('Board_Shell_STEP', 'step');
	     * if (stepShellFile) {
	     *     await eda.sys_FileSystem.saveFile(stepShellFile);
	     * }
	     * ```
	     */
	    get3DShellFile(fileName?: string, fileType?: 'stl' | 'step' | 'obj'): Promise<File | undefined>;
	    /**
	     * 获取坐标文件（PickAndPlace）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @param unit - 单位
	     * @returns 坐标文件数据
	     * @example
	     * ```javascript
	     * // 导出毫米单位的 Excel 格式坐标文件
	     * const pnpFile = await eda.pcb_ManufactureData.getPickAndPlaceFile(
	     *     'PickAndPlace',
	     *     'xlsx',
	     *     ESYS_Unit.MILLIMETER
	     * );
	     * if (pnpFile) {
	     *     await eda.sys_FileSystem.saveFile(pnpFile);
	     * }
	     *
	     * ```
	     */
	    getPickAndPlaceFile(fileName?: string, fileType?: 'xlsx' | 'csv', unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.MIL): Promise<File | undefined>;
	    /**
	     * 获取飞针测试文件
	     *
	     * @beta
	     * @param fileName - 文件名
	     * @returns 飞针测试文件数据
	     * @example
	     * ```javascript
	     * // 保存飞针测试文件到本地
	     * const flyingProbeFile = await eda.pcb_ManufactureData.getFlyingProbeTestFile('FlyingProbe_Test');
	     * if (flyingProbeFile) {
	     *     await eda.sys_FileSystem.saveFile(flyingProbeFile);
	     * }
	     * ```
	     */
	    getFlyingProbeTestFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 BOM 模板列表
	     *
	     * @beta
	     * @returns BOM 模板列表
	     * @example
	     * ```javascript
	     * // 获取所有可用的 BOM 模板
	     * const templates = await eda.pcb_ManufactureData.getBomTemplates();
	     * console.log('可用的 BOM 模板:', templates);
	     * templates.forEach((template, index) => {
	     *     console.log(`${index + 1}. ${template}`);
	     * });
	     * ```
	     */
	    getBomTemplates(): Promise<Array<string>>;
	    /**
	     * 上传 BOM 模板文件
	     *
	     * @beta
	     * @param templateFile - BOM 模板文件
	     * @param template - BOM 模板名称，如若为 `undefined` 则自动从 `templateFile` 中取值
	     * @returns BOM 模板名称
	     * @example
	     * ```javascript
	     * // 从文件选择器读取模板文件
	     * const templateFile = await eda.sys_FileSystem.openReadFileDialog('.xlsx');
	     * if (templateFile) {
	     *     const templateName = await eda.pcb_ManufactureData.uploadBomTemplateFile(
	     *         templateFile,
	     *         'MyCustomTemplate'
	     *     );
	     *     if (templateName) {
	     *         console.log('模板上传成功:', templateName);
	     *     }
	     * }
	     * ```
	     */
	    uploadBomTemplateFile(templateFile: File, template?: string): Promise<string | undefined>;
	    /**
	     * 获取 BOM 模板文件
	     *
	     * @beta
	     * @param template - BOM 模板名称
	     * @returns BOM 模板文件
	     * @example
	     * ```javascript
	     * // 获取指定模板的文件
	     * const templateFile = await eda.pcb_ManufactureData.getBomTemplateFile('MyCustomTemplate');
	     * if (templateFile) {
	     *     await eda.sys_FileSystem.saveFile(templateFile);
	     * }
	     * ```
	     */
	    getBomTemplateFile(template: string): Promise<File | undefined>;
	    /**
	     * 删除 BOM 模板
	     *
	     * @beta
	     * @param template - BOM 模板名称
	     * @returns 操作是否成功
	     * @example
	     * ```javascript
	     * // 删除指定的 BOM 模板
	     * const success = await eda.pcb_ManufactureData.deleteBomTemplate('MyCustomTemplate');
	     * if (success) {
	     *     console.log('BOM 模板删除成功');
	     * } else {
	     *     console.log('删除失败，可能是默认模板或模板不存在');
	     * }
	     * ```
	     */
	    deleteBomTemplate(template: string): Promise<boolean>;
	    /**
	     * 获取 BOM 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @param template - 模板名称
	     * @param filterOptions - 过滤规则，仅应包含需要启用的规则，`property` 为规则名称，`includeValue` 为匹配的值
	     * @param statistics - 统计，包含所有需要启用的统计项的名称
	     * @param property - 属性，包含所有需要启用的属性的名称
	     * @param columns - 列的属性及排序，`title`、`sort`、`group`、`orderWeight` 不传入则取默认值，`null` 代表 **无** 或 **空**
	     * @returns BOM 文件数据
	     * @example
	     * ```javascript
	     * // 使用默认配置导出 BOM
	     * const bomFile = await eda.pcb_ManufactureData.getBomFile('MyBOM', 'xlsx');
	     * if (bomFile) {
	     *     await eda.sys_FileSystem.saveFile(bomFile);
	     * }
	     *
	     * // 自定义 BOM 过滤和列配置
	     * const bomFile = await eda.pcb_ManufactureData.getBomFile(
	     *     'Custom_Production_BOM',
	     *     'xlsx',
	     *     undefined,
	     *     [
	     *         { property: 'Add into BOM', includeValue: 'yes' },
	     *         { property: 'Convert to PCB', includeValue: 'yes' }
	     *     ],
	     *     ['No.', 'Quantity', 'Comment'],
	     *     ['Name', 'Device', 'Designator', 'Supplier'],
	     *     [
	     *         { property: 'Designator', title: '位号', sort: 'asc', group: 'No', orderWeight: 10 },
	     *         { property: 'Quantity', title: '数量', sort: 'desc', group: 'Yes', orderWeight: 9 }
	     *     ]
	     * );
	     *
	     * // 导出 CSV 格式 BOM
	     * const csvBomFile = await eda.pcb_ManufactureData.getBomFile(
	     *     'Simple_BOM',
	     *     'csv',
	     *     undefined,
	     *     [{ property: 'Add into BOM', includeValue: 'yes' }],
	     *     ['No.', 'Quantity'],
	     *     ['Designator', 'Footprint', 'Value']
	     * );
	     * ```
	     */
	    getBomFile(fileName?: string, fileType?: 'xlsx' | 'csv', template?: string, filterOptions?: Array<{
	        property: string;
	        includeValue: boolean | string;
	    }>, statistics?: Array<string>, property?: Array<string>, columns?: Array<IPCB_BomPropertiesTableColumns>): Promise<File | undefined>;
	    /**
	     * 获取测试点报告文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @returns 测试点报告文件数据
	     * @example
	     * ```javascript
	     * // 保存测试点报告文件到本地
	     * const testPointFile = await eda.pcb_ManufactureData.getTestPointFile('Test_Point_Report', 'xlsx');
	     * if (testPointFile) {
	     *     await eda.sys_FileSystem.saveFile(testPointFile);
	     * }
	     * ```
	     */
	    getTestPointFile(fileName?: string, fileType?: 'xlsx' | 'csv'): Promise<File | undefined>;
	    /**
	     * 获取网表文件（Netlist）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param netlistType - 网表类型
	     * @returns 网表文件数据
	     * @example
	     * ```javascript
	     * // 导出嘉立创 EDA 专业版格式网表
	     * const netlistFile = await eda.pcb_ManufactureData.getNetlistFile(
	     *     'MyNetlist',
	     *     ESYS_NetlistType.JLCEDA_PRO
	     * );
	     * if (netlistFile) {
	     *     await eda.sys_FileSystem.saveFile(netlistFile);
	     * }
	     *
	     * // 导出 Altium Designer 格式
	     * const altiumNetlist = await eda.pcb_ManufactureData.getNetlistFile(
	     *     'Netlist_Altium',
	     *     ESYS_NetlistType.ALTIUM_DESIGNER
	     * );
	     *
	     * // 导出 PADS 格式
	     * const padsNetlist = await eda.pcb_ManufactureData.getNetlistFile(
	     *     'Netlist_PADS',
	     *     ESYS_NetlistType.PADS
	     * );
	     * ```
	     */
	    getNetlistFile(fileName?: string, netlistType?: ESYS_NetlistType): Promise<File | undefined>;
	    /**
	     * 获取 DXF 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param layers - 导出层
	     * @param objects - 导出对象
	     * @returns DXF 文件数据
	     */
	    getDxfFile(fileName?: string, layers?: Array<{
	        layerId: number;
	        mirror: boolean;
	    }>, objects?: Array<string>): Promise<File | undefined>;
	    /**
	     * 获取 PDF 文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     *
	     * `outputMethod`、`contentConfig`、`watermark`、`graphPageConfig` 参数暂不可用，等待后期规划
	     * @param fileName - 文件名
	     * @param outputMethod - 输出方式
	     * @param contentConfig - 内容配置
	     * @param watermark - 水印
	     * @param graphPageConfig - 图页配置
	     * @returns PDF 文件数据（或压缩包）
	     * @example
	     * ```javascript
	     * // 导出多页 PDF（包含所有图层）
	     * const pdfFile = await eda.pcb_ManufactureData.getPdfFile(
	     *     'PCB_Documentation',
	     *     EPCB_PdfOutputMethod.MULTI_PAGE_PDF
	     * );
	     * if (pdfFile) {
	     *     await eda.sys_FileSystem.saveFile(pdfFile);
	     * }
	     * ```
	     */
	    getPdfFile(fileName?: string, outputMethod?: EPCB_PdfOutputMethod, contentConfig?: {
	        displayAttributesAsMenu: boolean;
	        showOutlineOnly: boolean;
	    }, watermark?: {
	        show?: boolean;
	        content?: string;
	        styleConfig?: {
	            color: string;
	            transparency: 'Opaque' | '75%' | '50%' | '25%';
	            font: string;
	            fontSize: string;
	            style: {
	                blood: boolean;
	                italic: boolean;
	                underline: boolean;
	            };
	            slope: 0 | 45 | 90;
	            denseness: 'Single' | 'Sparse' | 'Std' | 'Dense';
	        };
	    }, graphPageConfig?: Array<{
	        [key: string]: any;
	    }>): Promise<File | undefined>;
	    /**
	     * 获取 IPC-D-356A 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns IPC-D-356A 文件数据
	     * @example
	     * ```javascript
	     * const ipcFile = await eda.pcb_ManufactureData.getIpcD356AFile('IPC_D356A_Test');
	     * if (ipcFile) {
	     *     await eda.sys_FileSystem.saveFile(ipcFile);
	     * }
	     * ```
	     */
	    getIpcD356AFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 IPC-2581C 文件
	     *
	     * @alpha
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns IPC-2581C 文件数据
	     */
	    getIpc2581CFile(fileName?: string, fileType?: 'xml' | 'cvg' | '2581', unit?: ESYS_Unit.INCH | ESYS_Unit.MILLIMETER, oemNumber?: 'Device' | 'Manufacturer Part' | 'Supplier Part' | 'Comment'): Promise<File | undefined>;
	    /**
	     * 获取 ODB++ 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param unit - 单位
	     * @param otherData - 其它
	     * @param layers - 导出层，默认则按照嘉立创生产需求导出
	     * @param objects - 导出对象，默认则按照嘉立创生产需求导出
	     * @returns ODB++ 文件数据
	     * @example
	     * ```javascript
	     * // 导出 ODB++ 文件，自定义单位和选项
	     * const odbFile = await eda.pcb_ManufactureData.getOpenDatabaseDoublePlusFile(
	     *     'MyBoard_ODB',
	     *     ESYS_Unit.INCH,
	     *     {
	     *         metallizedDrilledHoles: true,
	     *         nonMetallizedDrilledHoles: true,
	     *         drillTable: true,
	     *         flyingProbeTestFile: false
	     *     }
	     * );
	     * if (odbFile) {
	     *     await eda.sys_FileSystem.saveFile(odbFile);
	     * }
	     * ```
	     */
	    getOpenDatabaseDoublePlusFile(fileName?: string, unit?: ESYS_Unit.INCH, otherData?: {
	        metallizedDrilledHoles?: boolean;
	        nonMetallizedDrilledHoles?: boolean;
	        drillTable?: boolean;
	        flyingProbeTestFile?: boolean;
	    }, layers?: Array<{
	        layerId: number;
	        mirror: boolean;
	    }>, objects?: Array<{
	        objectName: string;
	    }>): Promise<File | undefined>;
	    /**
	     * 获取交互式 BOM 文件
	     *
	     * @internal
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns 交互式 BOM 文件数据
	     */
	    getInteractiveBomFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取自动布线文件（DSN）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns 自动布线 DSN 文件数据
	     * @example
	     * ```javascript
	     * const dsnFile = await eda.pcb_ManufactureData.getDsnFile('AutoRoute_DSN');
	     * if (dsnFile) {
	     *     await eda.sys_FileSystem.saveFile(dsnFile);
	     * }
	     * ```
	     */
	    getDsnFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取自动布线文件（JSON）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns 自动布线 JSON 文件数据
	     * @example
	     * ```javascript
	     * const autoRouteJson = await eda.pcb_ManufactureData.getAutoRouteJsonFile('AutoRoute_Json');
	     * if (autoRouteJson) {
	     *     await eda.sys_FileSystem.saveFile(autoRouteJson);
	     * }
	     * ```
	     */
	    getAutoRouteJsonFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 JRouter 专用自动布线文件（JSON）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns 自动布线 JSON 文件数据
	     */
	    getAutoRouteJsonFileForJRouter(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取自动布局文件（JSON）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件���统
	     * @param fileName - 文件名
	     * @returns 自动布局 JSON 文件数据
	     * @example
	     * ```javascript
	     * const autoLayoutJson = await eda.pcb_ManufactureData.getAutoLayoutJsonFile('AutoLayout_Json');
	     * if (autoLayoutJson) {
	     *     await eda.sys_FileSystem.saveFile(autoLayoutJson);
	     * }
	     * ```
	     */
	    getAutoLayoutJsonFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 Altium Designer 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns Altium Designer 文件数据
	     * @example
	     * ```javascript
	     * //获取 Altium Designer 格式文件
	     * const adFile = await eda.pcb_ManufactureData.getAltiumDesignerFile('Converted_To_AD');
	     * if (adFile) {
	     *     await eda.sys_FileSystem.saveFile(adFile);
	     * }
	     * ```
	     */
	    getAltiumDesignerFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 PADS 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns PADS 文件数据
	     * @example
	     * ```javascript
	     * // 获取 PADS 格式文件
	     * const padsFile = await eda.pcb_ManufactureData.getPadsFile('Converted_To_PADS');
	     * if (padsFile) {
	     *     await eda.sys_FileSystem.saveFile(padsFile);
	     * }
	     * ```
	     */
	    getPadsFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 PCB 信息文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @returns PCB 信息文件
	     * @example
	     * ```javascript
	     * const pcbInfoFile = await eda.pcb_ManufactureData.getPcbInfoFile('Board_Information');
	     * if (pcbInfoFile) {
	     *     await eda.sys_FileSystem.saveFile(pcbInfoFile);
	     * }
	     * ```
	     */
	    getPcbInfoFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 获取 IDX 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @returns IDX 文件
	     * @example
	     * ```javascript
	     * const idxFile = await eda.pcb_ManufactureData.getIdxFile('Design_Exchange');
	     * if (idxFile) {
	     *     await eda.sys_FileSystem.saveFile(idxFile);
	     * }
	     * ```
	     */
	    getIdxFile(fileName?: string): Promise<File | undefined>;
	    /**
	     * 元件下单
	     *
	     * @beta
	     * @remarks 本接口暂时只支持交互式检查，入参暂无作用，预留后续开发
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    placeComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	    /**
	     * SMT 元件下单
	     *
	     * @beta
	     * @remarks 本接口暂时只支持交互式检查，入参暂无作用，预留后续开发
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    placeSmtComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	    /**
	     * PCB 下单
	     *
	     * @beta
	     * @remarks 本接口暂时只支持交互式检查，入参暂无作用，预留后续开发
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    placePcbOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	    /**
	     * 3D 外壳下单
	     *
	     * @beta
	     * @remarks 本接口暂时只支持交互式检查，入参暂无作用，预留后续开发
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    place3DShellOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	    /**
	     * 导出制造文件
	     *
	     * @beta
	     * @remarks
	     * 本接口对应私有化部署版本一键导出制造文件功能
	     *
	     * 将根据前端一键导出制造文件弹窗的配置获取其文件数据
	     *
	     * 注意：本接口仅私有化部署版本有效，如若在其他版本调用将始终 `throw Error`
	     * @returns 制造文件
	     */
	    getManufactureData(): Promise<File | undefined>;
	}

	/**
	 * 网络属性
	 *
	 * @public
	 */
	interface IPCB_NetInfo {
	    /** 网络名称 */
	    net: string;
	    /** 颜色 */
	    color: {
	        r: number;
	        g: number;
	        b: number;
	        alpha: number;
	    } | null;
	    /** 长度 */
	    length: number;
	}
	/**
	 * PCB & 封装 / 网络类
	 *
	 * @public
	 */
	class PCB_Net {
	    /**
	     * 获取所有网络的详细信息
	     *
	     * @beta
	     * @returns 所有网络的详细信息
	     */
	    getAllNets(): Promise<Array<IPCB_NetInfo>>;
	    /**
	     * 获取指定网络的详细信息
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 网络的详细信息, `undefined` 为不存在该网络
	     */
	    getNet(net: string): Promise<IPCB_NetInfo | undefined>;
	    /**
	     * 获取所有网络的网络名称
	     *
	     * @public
	     * @returns 网络名称数组
	     */
	    getAllNetsName(): Promise<Array<string>>;
	    /**
	     * 获取所有网络的网络名称
	     *
	     * @public
	     * @deprecated 请使用 {@link PCB_Net.getAllNetsName | getAllNetsName} 替代
	     * @returns 网络名称数组
	     */
	    getAllNetName(): Promise<Array<string>>;
	    /**
	     * 获取指定网络的长度
	     *
	     * @public
	     * @param net - 网络名称
	     * @returns 网络长度，`undefined` 为不存在该网络，`0` 为网络无长度
	     */
	    getNetLength(net: string): Promise<number | undefined>;
	    /**
	     * 获取指定网络的颜色
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 网络颜色，`undefined` 为不存在该网络
	     */
	    getNetColor(net: string): Promise<IPCB_NetInfo['color'] | undefined>;
	    /**
	     * 设置指定网络的颜色
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param color - 网络颜色
	     * @returns 是否设置成功, `false` 为不存在该网络
	     */
	    setNetColor(net: string, color: IPCB_NetInfo['color']): Promise<boolean>;
	    /**
	     * 获取关联指定网络的所有图元
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param primitiveTypes - 图元类型数组，如若指定图元类型不存在网络属性，返回的数据将恒为空
	     * @returns 图元对象数组
	     */
	    getAllPrimitivesByNet(net: string, primitiveTypes?: Array<EPCB_PrimitiveType>): Promise<Array<IPCB_Primitive>>;
	    /**
	     * 选中网络
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    selectNet(net: string): Promise<boolean>;
	    /**
	     * 取消选中网络
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    unselectNet(net: string): Promise<boolean>;
	    /**
	     * 取消选中所有网络
	     *
	     * @beta
	     * @remarks 如果希望取消选中所有图元，请使用 {@link PCB_SelectControl.clearSelected} 接口
	     * @returns 操作是否成功
	     */
	    unselectAllNets(): Promise<boolean>;
	    /**
	     * 高亮网络
	     *
	     * @beta
	     * @remarks 本接口的返回值为结果导向，如果该网络原先已高亮，也将返回 `true`
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    highlightNet(net: string): Promise<boolean>;
	    /**
	     * 取消高亮网络
	     *
	     * @beta
	     * @remarks 本接口的返回值为结果导向，如果该网络原先未高亮，也将返回 `true`
	     * @param net - 网络名称
	     * @returns 操作是否成功
	     */
	    unhighlightNet(net: string): Promise<boolean>;
	    /**
	     * 取消高亮所有网络
	     *
	     * @beta
	     * @returns 操作是否成功
	     */
	    unhighlightAllNets(): Promise<boolean>;
	    /**
	     * 获取网表
	     *
	     * @public
	     * @param type - 网表格式
	     * @returns 网表数据
	     */
	    getNetlist(type?: ESYS_NetlistType): Promise<string>;
	    /**
	     * 更新网表
	     *
	     * @public
	     * @param type - 网表格式
	     * @param netlist - 网表数据
	     */
	    setNetlist(type: ESYS_NetlistType | undefined, netlist: string): Promise<boolean>;
	}

	/**
	 * 过孔类型
	 *
	 * @public
	 */
	enum EPCB_PrimitiveViaType {
	    /** 通孔 */
	    VIA = 0,
	    /** 盲埋孔 */
	    BLIND = 1,
	    /** 缝合孔 */
	    SUTURE = 2
	}
	/**
	 * PCB & 封装 / 过孔图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveVia implements IPCB_PrimitiveAPI {
	    /**
	     * 创建过孔
	     *
	     * @public
	     * @param net - 网络名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param holeDiameter - 孔径
	     * @param diameter - 外径
	     * @param viaType - 过孔类型
	     * @param designRuleBlindViaName - 盲埋孔设计规则项名称，定义过孔的开始层与结束层，`null` 表示非盲埋孔
	     * @param solderMaskExpansion - 阻焊/助焊扩展，`null` 表示跟随规则
	     * @param primitiveLock - 是否锁定
	     * @returns 过孔图元对象
	     */
	    create(net: string, x: number, y: number, holeDiameter: number, diameter: number, viaType?: EPCB_PrimitiveViaType, designRuleBlindViaName?: string | null, solderMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, primitiveLock?: boolean): Promise<IPCB_PrimitiveVia | undefined>;
	    /**
	     * 删除过孔
	     *
	     * @beta
	     * @param primitiveIds - 过孔的图元 ID 或过孔图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveVia | Array<string> | Array<IPCB_PrimitiveVia>): Promise<boolean>;
	    /**
	     * 修改过孔
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 过孔图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveVia, property: {
	        net?: string;
	        x?: number;
	        y?: number;
	        holeDiameter?: number;
	        diameter?: number;
	        viaType?: EPCB_PrimitiveViaType;
	        designRuleBlindViaName?: string | null;
	        solderMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveVia | undefined>;
	    /**
	     * 获取过孔
	     *
	     * @beta
	     * @param primitiveIds - 过孔的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 过孔图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveVia | undefined>;
	    /**
	     * 获取过孔
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 过孔的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 过孔图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveVia>>;
	    /**
	     * 获取所有过孔图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 过孔的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有过孔
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 过孔图元对象数组
	     */
	    getAll(net?: string, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveVia>>;
	}
	/**
	 * 过孔图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveVia implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 网络名称 */
	    private net;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 孔径 */
	    private holeDiameter;
	    /** 外径 */
	    private diameter;
	    /** 过孔类型 */
	    private viaType;
	    /** 盲埋孔设计规则项名称 */
	    private designRuleBlindViaName;
	    /** 阻焊/助焊扩展 */
	    private solderMaskExpansion;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(net: string, x: number, y: number, holeDiameter: number, diameter: number, viaType?: EPCB_PrimitiveViaType, designRuleBlindViaName?: string | null, solderMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 过孔图元对象
	     */
	    create(): Promise<IPCB_PrimitiveVia>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：孔径
	     *
	     * @public
	     * @returns 孔径
	     */
	    getState_HoleDiameter(): number;
	    /**
	     * 获取属性状态：外径
	     *
	     * @public
	     * @returns 外径
	     */
	    getState_Diameter(): number;
	    /**
	     * 获取属性状态：过孔类型
	     *
	     * @public
	     * @returns 过孔类型
	     */
	    getState_ViaType(): EPCB_PrimitiveViaType;
	    /**
	     * 获取属性状态：盲埋孔设计规则项名称
	     *
	     * @public
	     * @returns 盲埋孔设计规则项名称
	     */
	    getState_DesignRuleBlindViaName(): string | null;
	    /**
	     * 获取属性状态：阻焊/助焊扩展
	     *
	     * @public
	     * @returns 阻焊/助焊扩展
	     */
	    getState_SolderMaskExpansion(): IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 过孔图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 过孔图元对象
	     */
	    setState_X(x: number): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 过孔图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：孔径
	     *
	     * @beta
	     * @param holeDiameter - 孔径
	     * @returns 过孔图元对象
	     */
	    setState_HoleDiameter(holeDiameter: number): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：外径
	     *
	     * @beta
	     * @param diameter - 外径
	     * @returns 过孔图元对象
	     */
	    setState_Diameter(diameter: number): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：过孔类型
	     *
	     * @beta
	     * @param viaType - 过孔类型
	     * @returns 过孔图元对象
	     */
	    setState_ViaType(viaType: EPCB_PrimitiveViaType): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：盲埋孔设计规则项名称
	     *
	     * @beta
	     * @param designRuleBlindViaName - 盲埋孔设计规则项名称
	     * @returns 过孔图元对象
	     */
	    setState_DesignRuleBlindViaName(designRuleBlindViaName: string | null): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：阻焊/助焊扩展
	     *
	     * @beta
	     * @param solderMaskExpansion - 阻焊/助焊扩展
	     * @returns 过孔图元对象
	     */
	    setState_SolderMaskExpansion(solderMaskExpansion: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null): IPCB_PrimitiveVia;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 过孔图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveVia;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 过孔图元对象
	     */
	    toAsync(): IPCB_PrimitiveVia;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 过孔图元对象
	     */
	    toSync(): IPCB_PrimitiveVia;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 过孔图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveVia>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 过孔图元对象
	     */
	    done(): Promise<IPCB_PrimitiveVia>;
	    /**
	     * 获取相邻的图元对象
	     *
	     * @beta
	     * @remarks 将会获取与过孔直接相连的导线、圆弧线图元对象
	     * @returns 相邻的导线、圆弧线图元对象
	     */
	    getAdjacentPrimitives(): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc>>;
	}

	/**
	 * PCB & 封装 / 直线图元类
	 *
	 * @public
	 * @remarks 直线和圆弧线均为导线，对应画布的线条走线和圆弧走线
	 */
	class PCB_PrimitiveLine implements IPCB_PrimitiveAPI {
	    /**
	     * 创建直线
	     *
	     * @public
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param startX - 起始位置 X
	     * @param startY - 起始位置 Y
	     * @param endX - 终止位置 X
	     * @param endY - 终止位置 Y
	     * @param lineWidth - 线宽
	     * @param primitiveLock - 是否锁定
	     * @returns 直线图元对象
	     */
	    create(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveLine | undefined>;
	    /**
	     * 删除直线
	     *
	     * @beta
	     * @param primitiveIds - 直线的图元 ID 或直线图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveLine | Array<string> | Array<IPCB_PrimitiveLine>): Promise<boolean>;
	    /**
	     * 修改直线
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 直线图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveLine, property: {
	        net?: string;
	        layer?: TPCB_LayersOfLine;
	        startX?: number;
	        startY?: number;
	        endX?: number;
	        endY?: number;
	        lineWidth?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveLine | undefined>;
	    /**
	     * 获取直线
	     *
	     * @beta
	     * @param primitiveIds - 直线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 直线图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveLine | undefined>;
	    /**
	     * 获取直线
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 直线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 直线图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveLine>>;
	    /**
	     * 获取所有直线的图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 折线的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有直线
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 直线图元对象数组
	     */
	    getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveLine>>;
	}
	/**
	 * 直线图元
	 *
	 * @public
	 * @remarks 直线和圆弧线均为导线，对应画布的线条走线和圆弧走线
	 */
	class IPCB_PrimitiveLine implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 网络名称 */
	    private net;
	    /** 层 */
	    private layer;
	    /** 起始位置 X */
	    private startX;
	    /** 起始位置 Y */
	    private startY;
	    /** 终止位置 X */
	    private endX;
	    /** 终止位置 Y */
	    private endY;
	    /** 线宽 */
	    private lineWidth;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, lineWidth?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 直线图元对象
	     */
	    create(): Promise<IPCB_PrimitiveLine>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfLine;
	    /**
	     * 获取属性状态：起始位置 X
	     *
	     * @public
	     * @returns 起始位置 X
	     */
	    getState_StartX(): number;
	    /**
	     * 获取属性状态：起始位置 Y
	     *
	     * @public
	     * @returns 起始位置 Y
	     */
	    getState_StartY(): number;
	    /**
	     * 获取属性状态：终止位置 X
	     *
	     * @public
	     * @returns 终止位置 X
	     */
	    getState_EndX(): number;
	    /**
	     * 获取属性状态：终止位置 Y
	     *
	     * @public
	     * @returns 终止位置 Y
	     */
	    getState_EndY(): number;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 直线图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 直线图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfLine): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：起始位置 X
	     *
	     * @beta
	     * @param startX - 起始位置 X
	     * @returns 直线图元对象
	     */
	    setState_StartX(startX: number): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：起始位置 Y
	     *
	     * @beta
	     * @param startY - 起始位置 Y
	     * @returns 直线图元对象
	     */
	    setState_StartY(startY: number): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：终止位置 X
	     *
	     * @beta
	     * @param endX - 终止位置 X
	     * @returns 直线图元对象
	     */
	    setState_EndX(endX: number): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：终止位置 Y
	     *
	     * @beta
	     * @param endY - 终止位置 Y
	     * @returns 直线图元对象
	     */
	    setState_EndY(endY: number): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 直线图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveLine;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 直线图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveLine;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 直线图元对象
	     */
	    toAsync(): IPCB_PrimitiveLine;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 直线图元对象
	     */
	    toSync(): IPCB_PrimitiveLine;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 直线图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveLine>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 直线图元对象
	     */
	    done(): Promise<IPCB_PrimitiveLine>;
	    /**
	     * 获取相邻的图元对象
	     *
	     * @beta
	     * @remarks 将会获取与直线两端直接相连的直线、过孔、圆弧线图元对象
	     * @returns 相邻的直线、过孔、圆弧线图元对象
	     */
	    getAdjacentPrimitives(): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveVia | IPCB_PrimitiveArc>>;
	    /**
	     * 获取整段导线
	     *
	     * @beta
	     * @param includeVias - 是否包含导线两端的过孔
	     * @returns 整段导线内的所有直线和圆弧线
	     */
	    getEntireTrack(includeVias: false): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc>>;
	    /**
	     * 获取整段导线
	     *
	     * @beta
	     * @param includeVias - 是否包含导线两端的过孔
	     * @returns 整段导线内的所有直线、圆弧线，以及两端连接的过孔（如果有）
	     */
	    getEntireTrack(includeVias: true): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc | IPCB_PrimitiveVia>>;
	}

	/**
	 * 圆弧交互模式
	 *
	 * @public
	 */
	enum EPCB_PrimitiveArcInteractiveMode {
	    /** 两点圆弧交互 */
	    TWO_POINT_ARC = 1,
	    /** 中心圆弧交互 */
	    CENTER_ARC = 2
	}
	/**
	 * PCB & 封装 / 圆弧线图元类
	 *
	 * @public
	 * @remarks 直线和圆弧线均为导线，对应画布的线条走线和圆弧走线
	 */
	class PCB_PrimitiveArc implements IPCB_PrimitiveAPI {
	    /**
	     * 创建圆弧线
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param startX - 起始位置 X
	     * @param startY - 起始位置 Y
	     * @param endX - 终止位置 X
	     * @param endY - 终止位置 Y
	     * @param arcAngle - 圆弧角度
	     * @param lineWidth - 线宽
	     * @param interactiveMode - 交互模式
	     * @param primitiveLock - 是否锁定
	     * @returns 圆弧线图元对象
	     */
	    create(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, arcAngle: number, lineWidth?: number, interactiveMode?: EPCB_PrimitiveArcInteractiveMode, primitiveLock?: boolean): Promise<IPCB_PrimitiveArc | undefined>;
	    /**
	     * 删除圆弧线
	     *
	     * @beta
	     * @param primitiveIds - 圆弧线的图元 ID 或圆弧线图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveArc | Array<string> | Array<IPCB_PrimitiveArc>): Promise<boolean>;
	    /**
	     * 修改圆弧线
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 圆弧线图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveArc, property: {
	        net?: string;
	        layer?: TPCB_LayersOfLine;
	        startX?: number;
	        startY?: number;
	        endX?: number;
	        endY?: number;
	        arcAngle?: number;
	        lineWidth?: number;
	        interactiveMode?: EPCB_PrimitiveArcInteractiveMode;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveArc | undefined>;
	    /**
	     * 获取圆弧线
	     *
	     * @beta
	     * @param primitiveIds - 圆弧线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆弧线图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveArc | undefined>;
	    /**
	     * 获取圆弧线
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 圆弧线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆弧线图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveArc>>;
	    /**
	     * 获取所有圆弧线的图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 圆弧线的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有圆弧线
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 圆弧线图元对象数组
	     */
	    getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveArc>>;
	}
	/**
	 * 圆弧线图元
	 *
	 * @public
	 * @remarks 直线和圆弧线均为导线，对应画布的线条走线和圆弧走线
	 */
	class IPCB_PrimitiveArc implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 网络名称 */
	    private net;
	    /** 层 */
	    private layer;
	    /** 起始位置 X */
	    private startX;
	    /** 起始位置 Y */
	    private startY;
	    /** 终止位置 X */
	    private endX;
	    /** 终止位置 Y */
	    private endY;
	    /** 圆弧角度 */
	    private arcAngle;
	    /** 线宽 */
	    private lineWidth;
	    /** 交互模式 */
	    private interactiveMode;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, arcAngle: number, lineWidth?: number, interactiveMode?: EPCB_PrimitiveArcInteractiveMode, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 圆弧线图元对象
	     */
	    create(): Promise<IPCB_PrimitiveArc>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfLine;
	    /**
	     * 获取属性状态：起始位置 X
	     *
	     * @public
	     * @returns 起始位置 X
	     */
	    getState_StartX(): number;
	    /**
	     * 获取属性状态：起始位置 Y
	     *
	     * @public
	     * @returns 起始位置 Y
	     */
	    getState_StartY(): number;
	    /**
	     * 获取属性状态：终止位置 X
	     *
	     * @public
	     * @returns 终止位置 X
	     */
	    getState_EndX(): number;
	    /**
	     * 获取属性状态：终止位置 Y
	     *
	     * @public
	     * @returns 终止位置 Y
	     */
	    getState_EndY(): number;
	    /**
	     * 获取属性状态：圆弧角度
	     *
	     * @public
	     * @returns 圆弧角度
	     */
	    getState_ArcAngle(): number;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：交互模式
	     *
	     * @public
	     * @returns 交互模式
	     */
	    getState_InteractiveMode(): EPCB_PrimitiveArcInteractiveMode;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 圆弧线图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 圆弧线图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfLine): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：起始位置 X
	     *
	     * @beta
	     * @param startX - 起始位置 X
	     * @returns 圆弧线图元对象
	     */
	    setState_StartX(startX: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：起始位置 Y
	     *
	     * @beta
	     * @param startY - 起始位置 Y
	     * @returns 圆弧线图元对象
	     */
	    setState_StartY(startY: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：终止位置 X
	     *
	     * @beta
	     * @param endX - 终止位置 X
	     * @returns 圆弧线图元对象
	     */
	    setState_EndX(endX: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：终止位置 Y
	     *
	     * @beta
	     * @param endY - 终止位置 Y
	     * @returns 圆弧线图元对象
	     */
	    setState_EndY(endY: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：圆弧角度
	     *
	     * @beta
	     * @param arcAngle - 圆弧角度
	     * @returns 圆弧线图元对象
	     */
	    setState_ArcAngle(arcAngle: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 圆弧线图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：交互模式
	     *
	     * @beta
	     * @param interactiveMode - 交互模式
	     * @returns 圆弧线图元对象
	     */
	    setState_InteractiveMode(interactiveMode: EPCB_PrimitiveArcInteractiveMode): IPCB_PrimitiveArc;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 圆弧线图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveArc;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toAsync(): IPCB_PrimitiveArc;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toSync(): IPCB_PrimitiveArc;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 圆弧线图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveArc>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 圆弧线图元对象
	     */
	    done(): Promise<IPCB_PrimitiveArc>;
	    /**
	     * 获取相邻的图元对象
	     *
	     * @beta
	     * @remarks 将会获取与圆弧线直接相连的直线、过孔、圆弧线图元对象
	     * @returns 相邻的直线、过孔、圆弧线图元对象
	     */
	    getAdjacentPrimitives(): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveVia | IPCB_PrimitiveArc>>;
	    /**
	     * 获取整段导线
	     *
	     * @beta
	     * @param includeVias - 是否包含导线两端的过孔
	     * @returns 整段导线内的所有直线和圆弧线
	     */
	    getEntireTrack(includeVias: false): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc>>;
	    /**
	     * 获取整段导线
	     *
	     * @beta
	     * @param includeVias - 是否包含导线两端的过孔
	     * @returns 整段导线内的所有直线、圆弧线，以及两端连接的过孔（如果有）
	     */
	    getEntireTrack(includeVias: true): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc | IPCB_PrimitiveVia>>;
	}

	/**
	 * 文本对齐模式
	 *
	 * @public
	 */
	enum EPCB_PrimitiveStringAlignMode {
	    /** 左上 */
	    LEFT_TOP = 1,
	    /** 左中 */
	    LEFT_MIDDLE = 2,
	    /** 左下 */
	    LEFT_BOTTOM = 3,
	    /** 中上 */
	    CENTER_TOP = 4,
	    /** 中心 */
	    CENTER = 5,
	    /** 中下 */
	    CENTER_BOTTOM = 6,
	    /** 右上 */
	    RIGHT_TOP = 7,
	    /** 右中 */
	    RIGHT_MIDDLE = 8,
	    /** 右下 */
	    RIGHT_BOTTOM = 9
	}
	/**
	 * PCB & 封装 / 文本图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveString implements IPCB_PrimitiveAPI {
	    /**
	     * 创建文本
	     *
	     * @alpha
	     * @param layer - 层
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param text - 文本内容
	     * @param fontFamily - 字体，需要预先导入嘉立创 EDA
	     * @param fontSize - 字号
	     * @param lineWidth - 线宽
	     * @param alignMode - 对齐模式
	     * @param rotation - 旋转角度
	     * @param reverse - 是否反相
	     * @param expansion - 反相扩展
	     * @param mirror - 是否镜像
	     * @param primitiveLock - 是否锁定
	     * @returns 文本图元对象
	     */
	    create(layer: TPCB_LayersOfImage, x: number, y: number, text: string, fontFamily: string, fontSize: number, lineWidth: number, alignMode: EPCB_PrimitiveStringAlignMode, rotation: number, reverse: boolean, expansion: number, mirror: boolean, primitiveLock: boolean): Promise<IPCB_PrimitiveString | undefined>;
	    /**
	     * 删除文本
	     *
	     * @alpha
	     * @param primitiveIds - 文本的图元 ID 或文本图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveString | Array<string> | Array<IPCB_PrimitiveString>): Promise<boolean>;
	    /**
	     * 修改文本
	     *
	     * @alpha
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 文本图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveString, property: {
	        layer?: TPCB_LayersOfImage;
	        x?: number;
	        y?: number;
	        text?: string;
	        fontFamily?: string;
	        fontSize?: number;
	        lineWidth?: number;
	        alignMode?: EPCB_PrimitiveStringAlignMode;
	        rotation?: number;
	        reverse?: boolean;
	        expansion?: number;
	        mirror?: boolean;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveString | undefined>;
	    /**
	     * 获取文本
	     *
	     * @alpha
	     * @param primitiveIds - 文本的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 文本图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveString | undefined>;
	    /**
	     * 获取文本
	     *
	     * @alpha
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 文本的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 文本图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveString>>;
	    /**
	     * 获取所有文本的图元 ID
	     *
	     * @alpha
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 文本的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有文本
	     *
	     * @alpha
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 文本图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveString>>;
	}
	/**
	 * 文本图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveString implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 层 */
	    private layer;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 文本内容 */
	    private text;
	    /** 字体 */
	    private fontFamily;
	    /** 字号 */
	    private fontSize;
	    /** 线宽 */
	    private lineWidth;
	    /** 对齐模式 */
	    private alignMode;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否反相 */
	    private reverse;
	    /** 反相扩展 */
	    private expansion;
	    /** 是否镜像 */
	    private mirror;
	    /** 是否锁定 */
	    private primitiveLock;
	    constructor(layer: TPCB_LayersOfImage, x: number, y: number, text: string, fontFamily?: string, fontSize?: number, lineWidth?: number, alignMode?: EPCB_PrimitiveStringAlignMode, rotation?: number, reverse?: boolean, expansion?: number, mirror?: boolean, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 文本图元对象
	     */
	    create(): Promise<IPCB_PrimitiveString>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfImage;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：文本内容
	     *
	     * @public
	     * @returns 文本内容
	     */
	    getState_Text(): string;
	    /**
	     * 获取属性状态：字体
	     *
	     * @public
	     * @returns 字体
	     */
	    getState_FontFamily(): string;
	    /**
	     * 获取属性状态：字号
	     *
	     * @public
	     * @returns 字号
	     */
	    getState_FontSize(): number;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：对齐模式
	     *
	     * @public
	     * @returns 对齐模式
	     */
	    getState_AlignMode(): EPCB_PrimitiveStringAlignMode;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否反相
	     *
	     * @public
	     * @returns 是否反相
	     */
	    getState_Reverse(): boolean;
	    /**
	     * 获取属性状态：反相扩展
	     *
	     * @public
	     * @returns 反相扩展
	     */
	    getState_Expansion(): number;
	    /**
	     * 获取属性状态：是否镜像
	     *
	     * @public
	     * @returns 是否镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 文本图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfImage): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 文本图元对象
	     */
	    setState_X(x: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 文本图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：文本内容
	     *
	     * @beta
	     * @param text - 文本内容
	     * @returns 文本图元对象
	     */
	    setState_Text(text: string): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：字体
	     *
	     * @beta
	     * @param fontFamily - 字体
	     * @returns 文本图元对象
	     */
	    setState_FontFamily(fontFamily: string): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：字号
	     *
	     * @beta
	     * @param fontSize - 字号
	     * @returns 文本图元对象
	     */
	    setState_FontSize(fontSize: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 文本图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：对齐模式
	     *
	     * @beta
	     * @param alignMode - 对齐模式
	     * @returns 文本图元对象
	     */
	    setState_AlignMode(alignMode: EPCB_PrimitiveStringAlignMode): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 文本图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：是否反相
	     *
	     * @beta
	     * @remarks 默认字体不支持反相
	     * @param reverse - 是否反相
	     * @returns 文本图元对象
	     */
	    setState_Reverse(reverse: boolean): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：反相扩展
	     *
	     * @beta
	     * @param expansion - 反相扩展
	     * @returns 文本图元对象
	     */
	    setState_Expansion(expansion: number): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：是否镜像
	     *
	     * @beta
	     * @param mirror - 是否镜像
	     * @returns 文本图元对象
	     */
	    setState_Mirror(mirror: boolean): IPCB_PrimitiveString;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 文本图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveString;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 文本图元对象
	     */
	    toAsync(): IPCB_PrimitiveString;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 文本图元对象
	     */
	    toSync(): IPCB_PrimitiveString;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 文本图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveString>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @alpha
	     * @returns 文本图元对象
	     */
	    done(): Promise<IPCB_PrimitiveString>;
	}

	/**
	 * PCB & 封装 / 属性图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveAttribute implements IPCB_PrimitiveAPI {
	    /**
	     * 创建属性
	     *
	     * @internal
	     * @remarks 属性图元不支持新建，本接口调用将不会有任何效果
	     * @returns `undefined`
	     */
	    create(): undefined;
	    /**
	     * 删除属性
	     *
	     * @alpha
	     * @param primitiveIds - 属性的图元 ID 或文本图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveAttribute | Array<string> | Array<IPCB_PrimitiveAttribute>): Promise<boolean>;
	    /**
	     * 修改文本
	     *
	     * @alpha
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 文本图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveAttribute, property: {
	        layer?: TPCB_LayersOfImage;
	        x?: number;
	        y?: number;
	        key?: string;
	        value?: string;
	        keyVisible?: boolean;
	        valueVisible?: boolean;
	        fontFamily?: string;
	        fontSize?: number;
	        lineWidth?: number;
	        alignMode?: EPCB_PrimitiveStringAlignMode;
	        rotation?: number;
	        reverse?: boolean;
	        expansion?: number;
	        mirror?: boolean;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveAttribute | undefined>;
	    /**
	     * 获取属性
	     *
	     * @alpha
	     * @param primitiveIds - 属性的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 属性图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveAttribute | undefined>;
	    /**
	     * 获取属性
	     *
	     * @alpha
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 属性的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 属性图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveAttribute>>;
	    /**
	     * 获取所有属性的图元 ID
	     *
	     * @alpha
	     * @param parentPrimitiveId - 关联的父图元 ID
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 属性的图元 ID 数组
	     */
	    getAllPrimitiveId(parentPrimitiveId?: string, layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有属性
	     *
	     * @alpha
	     * @param parentPrimitiveId - 关联的父图元 ID
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 属性图元对象数组
	     */
	    getAll(parentPrimitiveId?: string, layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveAttribute>>;
	}
	/**
	 * 属性图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveAttribute implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId;
	    /** 关联的父图元 ID */
	    private parentPrimitiveId;
	    /** 层 */
	    private layer;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** Key */
	    private key;
	    /** Value */
	    private value;
	    /** Key 是否可见 */
	    private keyVisible;
	    /** Value 是否可见 */
	    private valueVisible;
	    /** 字体 */
	    private fontFamily;
	    /** 字号 */
	    private fontSize;
	    /** 线宽 */
	    private lineWidth;
	    /** 对齐模式 */
	    private alignMode;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否反相 */
	    private reverse;
	    /** 反相扩展 */
	    private expansion;
	    /** 是否镜像 */
	    private mirror;
	    /** 是否锁定 */
	    private primitiveLock;
	    constructor(layer: TPCB_LayersOfImage, x: number | null, y: number | null, key: string, value: string, keyVisible: boolean, valueVisible: boolean, fontFamily: string, fontSize: number, lineWidth: number, alignMode: EPCB_PrimitiveStringAlignMode, rotation: number, reverse: boolean, expansion: number, mirror: boolean, primitiveLock: boolean, primitiveId: string, parentPrimitiveId: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @remarks 属性图元不支持新建，本接口调用将不会有任何效果
	     * @returns 属性图元对象
	     */
	    create(): IPCB_PrimitiveAttribute;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：关联的父图元 ID
	     *
	     * @public
	     * @returns 关联的父图元 ID
	     */
	    getState_ParentPrimitiveId(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfImage;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number | null;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number | null;
	    /**
	     * 获取属性状态：Key
	     *
	     * @public
	     * @returns Key
	     */
	    getState_Key(): string;
	    /**
	     * 获取属性状态：Value
	     *
	     * @public
	     * @returns Value
	     */
	    getState_Value(): string;
	    /**
	     * 获取属性状态：Key 是否可见
	     *
	     * @public
	     * @returns Key 是否可见
	     */
	    getState_KeyVisible(): boolean;
	    /**
	     * 获取属性状态：Value 是否可见
	     *
	     * @public
	     * @returns Value 是否可见
	     */
	    getState_ValueVisible(): boolean;
	    /**
	     * 获取属性状态：字体
	     *
	     * @public
	     * @returns 字体
	     */
	    getState_FontFamily(): string;
	    /**
	     * 获取属性状态：字号
	     *
	     * @public
	     * @returns 字号
	     */
	    getState_FontSize(): number;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：对齐模式
	     *
	     * @public
	     * @returns 对齐模式
	     */
	    getState_AlignMode(): EPCB_PrimitiveStringAlignMode;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否反相
	     *
	     * @public
	     * @returns 是否反相
	     */
	    getState_Reverse(): boolean;
	    /**
	     * 获取属性状态：反相扩展
	     *
	     * @public
	     * @returns 反相扩展
	     */
	    getState_Expansion(): number;
	    /**
	     * 获取属性状态：是否镜像
	     *
	     * @public
	     * @returns 是否镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 属性图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfImage): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 属性图元对象
	     */
	    setState_X(x: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 属性图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：Key
	     *
	     * @beta
	     * @param key - Key
	     * @returns 属性图元对象
	     */
	    setState_Key(key: string): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：Value
	     *
	     * @beta
	     * @param value - Value
	     * @returns 属性图元对象
	     */
	    setState_Value(value: string): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：Key 是否可见
	     *
	     * @beta
	     * @param keyVisible - Key 是否可见
	     * @returns 属性图元对象
	     */
	    setState_KeyVisible(keyVisible: boolean): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：Value 是否可见
	     *
	     * @beta
	     * @param valueVisible - Value 是否可见
	     * @returns 属性图元对象
	     */
	    setState_ValueVisible(valueVisible: boolean): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：字体
	     *
	     * @beta
	     * @param fontFamily - 字体
	     * @returns 属性图元对象
	     */
	    setState_FontFamily(fontFamily: string): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：字号
	     *
	     * @beta
	     * @param fontSize - 字号
	     * @returns 属性图元对象
	     */
	    setState_FontSize(fontSize: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 属性图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：对齐模式
	     *
	     * @beta
	     * @param alignMode - 对齐模式
	     * @returns 属性图元对象
	     */
	    setState_AlignMode(alignMode: EPCB_PrimitiveStringAlignMode): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 属性图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否反相
	     *
	     * @beta
	     * @remarks 默认字体不支持反相
	     * @param reverse - 是否反相
	     * @returns 属性图元对象
	     */
	    setState_Reverse(reverse: boolean): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：反相扩展
	     *
	     * @beta
	     * @param expansion - 反相扩展
	     * @returns 属性图元对象
	     */
	    setState_Expansion(expansion: number): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否镜像
	     *
	     * @beta
	     * @param mirror - 是否镜像
	     * @returns 属性图元对象
	     */
	    setState_Mirror(mirror: boolean): IPCB_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 属性图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveAttribute;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 属性图元对象
	     */
	    toAsync(): IPCB_PrimitiveAttribute;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 属性图元对象
	     */
	    toSync(): IPCB_PrimitiveAttribute;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 属性图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveAttribute>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @alpha
	     * @returns 属性图元对象
	     */
	    done(): Promise<IPCB_PrimitiveAttribute>;
	}

	/**
	 * 覆铜填充区域
	 *
	 * @public
	 */
	interface IPCB_PrimitivePouredPourFill {
	    /** 复杂多边形 */
	    path: IPCB_ComplexPolygon;
	    /** 线宽 */
	    lineWidth: number;
	    /** 是否填充 */
	    fill: boolean;
	    /** ID */
	    id: string;
	}
	/**
	 * PCB & 封装 / 覆铜填充图元类
	 *
	 * @public
	 */
	class PCB_PrimitivePoured implements IPCB_PrimitiveAPI {
	    /**
	     * 创建覆铜填充
	     *
	     * @internal
	     * @remarks 覆铜填充图元不支持新建，本接口调用将不会有任何效果
	     * @returns `undefined`
	     */
	    create(): undefined;
	    /**
	     * 删除覆铜填充
	     *
	     * @beta
	     * @param primitiveIds - 覆铜填充的图元 ID 或覆铜填充图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitivePoured | Array<string> | Array<IPCB_PrimitivePoured>): Promise<boolean>;
	    /**
	     * 修改覆铜填充
	     *
	     * @internal
	     * @remarks 覆铜填充图元不支持修改，本接口调用将不会有任何效果
	     * @returns `undefined`
	     */
	    modify(): undefined;
	    /**
	     * 获取覆铜填充
	     *
	     * @beta
	     * @param primitiveIds - 覆铜填充的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 覆铜填充图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitivePoured | undefined>;
	    /**
	     * 获取覆铜填充
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 覆铜填充的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 覆铜填充图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePoured>>;
	    /**
	     * 获取所有覆铜填充的图元 ID
	     *
	     * @beta
	     * @returns 覆铜填充的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有覆铜填充图元
	     *
	     * @beta
	     * @returns 覆铜填充图元对象数组
	     */
	    getAll(): Promise<Array<IPCB_PrimitivePoured>>;
	}
	/**
	 * 覆铜填充图元
	 *
	 * @public
	 */
	class IPCB_PrimitivePoured implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 覆铜边框图元 ID */
	    private pourPrimitiveId;
	    /** 覆铜填充区域 */
	    private pourFills;
	    /** 图元 ID */
	    private primitiveId;
	    /** @internal */
	    constructor(pourPrimitiveId: string, pourFills: Array<IPCB_PrimitivePouredPourFill>, primitiveId: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @remarks 覆铜填充图元不支持新建，本接口调用将不会有任何效果
	     * @returns 覆铜填充图元对象
	     */
	    create(): IPCB_PrimitivePoured;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：覆铜边框图元 ID
	     *
	     * @public
	     * @returns 覆铜边框图元 ID
	     */
	    getState_PourPrimitiveId(): string;
	    /**
	     * 获取属性状态：覆铜填充区域
	     *
	     * @public
	     * @returns 覆铜填充区域
	     */
	    getState_PourFills(): Array<IPCB_PrimitivePouredPourFill>;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @internal
	     * @remarks 覆铜填充图元不可编辑，本接口为格式接口，无作用
	     * @returns 覆铜填充图元对象
	     */
	    toAsync(): IPCB_PrimitivePoured;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @internal
	     * @remarks 覆铜填充图元不可编辑，本接口为格式接口，无作用
	     * @returns 覆铜填充图元对象
	     */
	    toSync(): IPCB_PrimitivePoured;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @internal
	     * @remarks 覆铜填充图元不可编辑，本接口为格式接口，无作用
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 覆铜填充图元对象
	     */
	    reset(): Promise<IPCB_PrimitivePoured>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @internal
	     * @remarks 覆铜填充图元不支持更改，本接口调用将不会有任何效果
	     * @returns 覆铜填充图元对象
	     */
	    done(): IPCB_PrimitivePoured;
	    /**
	     * 转换到：填充图元
	     *
	     * @beta
	     * @returns 填充图元对象，无法转换或 ID 错误将返回 `undefined`
	     */
	    convertToFill(pourFillId: IPCB_PrimitivePouredPourFill['id']): Promise<IPCB_PrimitiveFill | undefined>;
	    /**
	     * 添加：阻焊区域
	     *
	     * @beta
	     * @returns 阻焊区域填充图元对象，无法转换或 ID 错误将返回 `undefined`
	     */
	    addSolderMaskFill(pourFillId: IPCB_PrimitivePouredPourFill['id']): Promise<IPCB_PrimitiveFill | undefined>;
	    /**
	     * 删除覆铜填充区域
	     *
	     * @beta
	     * @param pourFillIds - 覆铜填充区域 ID
	     * @returns 删除操作是否成功
	     */
	    deletePourFills(pourFillIds: IPCB_PrimitivePouredPourFill['id'] | Array<IPCB_PrimitivePouredPourFill['id']>): Promise<boolean>;
	}

	/**
	 * 区域图元区域规则类型
	 *
	 * @public
	 * @remarks {@link EPCB_PrimitiveRegionRuleType.FOLLOW_REGION_RULE | FOLLOW_REGION_RULE} 即为约束区域
	 */
	enum EPCB_PrimitiveRegionRuleType {
	    /** 禁止元件 */
	    NO_COMPONENTS = 2,
	    /** 禁止过孔 */
	    /** 禁止布线 */
	    NO_WIRES = 5,
	    /** 禁止填充 */
	    NO_FILLS = 6,
	    /** 禁止覆铜 */
	    NO_POURS = 7,
	    /** 禁止内电层 */
	    NO_INNER_ELECTRICAL_LAYERS = 8,
	    /** 约束区域 */
	    FOLLOW_REGION_RULE = 9
	}
	/**
	 * PCB & 封装 / 禁止区域和约束区域图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveRegion implements IPCB_PrimitiveAPI {
	    /**
	     * 创建区域
	     *
	     * @beta
	     * @param layer - 层
	     * @param complexPolygon - 复杂多边形对象
	     * @param ruleType - 区域规则类型
	     * @param regionName - 区域名称
	     * @param lineWidth - 线宽
	     * @param primitiveLock - 是否锁定
	     * @returns 区域图元对象
	     */
	    create(layer: TPCB_LayersOfRegion, complexPolygon: IPCB_Polygon, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, regionName?: string, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveRegion | undefined>;
	    /**
	     * 删除区域
	     *
	     * @beta
	     * @param primitiveIds - 区域的图元 ID 或区域图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveRegion | Array<string> | Array<IPCB_PrimitiveRegion>): Promise<boolean>;
	    /**
	     * 修改区域
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 区域图元对象，`undefined` 表示修改失败
	     */
	    modify(primitiveId: string | IPCB_PrimitiveRegion, property: {
	        layer?: TPCB_LayersOfRegion;
	        complexPolygon?: IPCB_Polygon;
	        ruleType?: Array<EPCB_PrimitiveRegionRuleType>;
	        regionName?: string;
	        lineWidth?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveRegion | undefined>;
	    /**
	     * 获取区域
	     *
	     * @beta
	     * @param primitiveIds - 区域的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 区域图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveRegion | undefined>;
	    /**
	     * 获取区域
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 区域的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 区域图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveRegion>>;
	    /**
	     * 获取所有区域的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param ruleType - 区域规则类型，只会匹配所有规则类型均一致的图元
	     * @param primitiveLock - 是否锁定
	     * @returns 区域的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfRegion, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有区域
	     *
	     * @beta
	     * @param layer - 层
	     * @param ruleType - 区域规则类型，只会匹配所有规则类型均一致的图元
	     * @param primitiveLock - 是否锁定
	     * @returns 区域图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfRegion, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveRegion>>;
	}
	/**
	 * 区域图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveRegion implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 层 */
	    private layer;
	    /** 复杂多边形 */
	    private complexPolygon;
	    /** 区域规则类型 */
	    private ruleType;
	    /** 区域名称 */
	    private regionName?;
	    /** 线宽 */
	    private lineWidth?;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(layer: TPCB_LayersOfRegion, complexPolygon: IPCB_Polygon, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, regionName?: string, lineWidth?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 禁止区域图元对象 | 约束区域图元对象
	     */
	    create(): Promise<IPCB_PrimitiveRegion>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfRegion;
	    /**
	     * 获取属性状态：复杂多边形
	     *
	     * @public
	     * @returns 复杂多边形
	     */
	    getState_ComplexPolygon(): IPCB_Polygon;
	    /**
	     * 获取属性状态：区域规则类型
	     *
	     * @public
	     * @returns 区域规则类型
	     */
	    getState_RuleType(): Array<EPCB_PrimitiveRegionRuleType>;
	    /**
	     * 获取属性状态：区域名称
	     *
	     * @public
	     * @returns 区域名称
	     */
	    getState_RegionName(): string | undefined;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 区域图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfRegion): IPCB_PrimitiveRegion;
	    /**
	     * 设置属性状态：复杂多边形
	     *
	     * @beta
	     * @param complexPolygon - 复杂多边形
	     * @returns 区域图元对象
	     */
	    setState_ComplexPolygon(complexPolygon: IPCB_Polygon): IPCB_PrimitiveRegion;
	    /**
	     * 设置属性状态：区域规则类型
	     *
	     * @beta
	     * @param ruleType - 区域规则类型
	     * @returns 区域图元对象
	     */
	    setState_RuleType(ruleType: Array<EPCB_PrimitiveRegionRuleType>): IPCB_PrimitiveRegion;
	    /**
	     * 设置属性状态：区域名称
	     *
	     * @beta
	     * @remarks
	     * 仅当 `ruleType` 为 {@link EPCB_PrimitiveRegionRuleType.FOLLOW_REGION_RULE} 时有效，用于匹配区域 DRC 规则
	     *
	     * 如若 `ruleType` 为 {@link EPCB_PrimitiveRegionRuleType.FOLLOW_REGION_RULE} 但 `regionName` 为空，则系统将会自动分配名称
	     * @param regionName - 区域名称
	     * @returns 区域图元对象
	     */
	    setState_RegionName(regionName?: string): IPCB_PrimitiveRegion;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 区域图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveRegion;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 区域图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveRegion;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 区域图元对象
	     */
	    toAsync(): IPCB_PrimitiveRegion;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 区域图元对象
	     */
	    toSync(): IPCB_PrimitiveRegion;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 区域图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveRegion>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 区域图元对象
	     */
	    done(): Promise<IPCB_PrimitiveRegion>;
	    /**
	     * 转换到：填充图元
	     *
	     * @beta
	     * @returns 填充图元对象
	     */
	    convertToFill(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 转换到：折线图元
	     *
	     * @beta
	     * @returns 折线图元对象
	     */
	    convertToPolyline(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 转换到：覆铜边框图元
	     *
	     * @beta
	     * @returns 覆铜边框图元对象
	     */
	    convertToPour(): Promise<IPCB_PrimitivePour>;
	}

	/**
	 * 覆铜填充方法
	 *
	 * @public
	 */
	enum EPCB_PrimitivePourFillMethod {
	    /** 45 度网格 */
	    GRID45 = "45grid",
	    /** 90 度网格 */
	    GRID = "90grid",
	    /** 实心填充 */
	    SOLID = "solid"
	}
	/**
	 * PCB & 封装 / 覆铜边框图元类
	 *
	 * @public
	 */
	class PCB_PrimitivePour implements IPCB_PrimitiveAPI {
	    /**
	     * 创建覆铜边框
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param complexPolygon - 复杂多边形对象
	     * @param pourFillMethod - 覆铜填充方法
	     * @param preserveSilos - 是否保留孤岛
	     * @param pourName - 覆铜名称
	     * @param pourPriority - 覆铜优先级
	     * @param lineWidth - 线宽
	     * @param primitiveLock - 是否锁定
	     * @returns 覆铜边框图元对象
	     */
	    create(net: string, layer: TPCB_LayersOfCopper, complexPolygon: IPCB_Polygon, pourFillMethod?: EPCB_PrimitivePourFillMethod, preserveSilos?: boolean, pourName?: string, pourPriority?: number, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitivePour | undefined>;
	    /**
	     * 删除覆铜边框
	     *
	     * @beta
	     * @param primitiveIds - 覆铜边框的图元 ID 或覆铜边框图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitivePour | Array<string> | Array<IPCB_PrimitivePour>): Promise<boolean>;
	    /**
	     * 修改覆铜边框
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 覆铜边框图元对象，`undefined` 表示修改失败
	     */
	    modify(primitiveId: string | IPCB_PrimitivePour, property: {
	        net?: string;
	        layer?: TPCB_LayersOfCopper;
	        complexPolygon?: IPCB_Polygon;
	        pourFillMethod?: EPCB_PrimitivePourFillMethod;
	        preserveSilos?: boolean;
	        pourName?: string;
	        pourPriority?: number;
	        lineWidth?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitivePour | undefined>;
	    /**
	     * 获取覆铜边框
	     *
	     * @beta
	     * @param primitiveIds - 覆铜边框的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 覆铜边框图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitivePour | undefined>;
	    /**
	     * 获取覆铜边框
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 覆铜边���的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 覆铜边框图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePour>>;
	    /**
	     * 获取所有覆铜边框的图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 覆铜边框的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfCopper, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有覆铜边框图元
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 覆铜边框图元对象数组
	     */
	    getAll(net?: string, layer?: TPCB_LayersOfCopper, primitiveLock?: boolean): Promise<Array<IPCB_PrimitivePour>>;
	}
	/**
	 * 覆铜边框图元
	 *
	 * @public
	 */
	class IPCB_PrimitivePour implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 网络名称 */
	    private net;
	    /** 层 */
	    private layer;
	    /** 复杂多边形 */
	    private complexPolygon;
	    /** 覆铜填充方法 */
	    private pourFillMethod;
	    /** 是否保留孤岛 */
	    private preserveSilos;
	    /** 覆铜边框名称 */
	    private pourName?;
	    /** 覆铜优先级 */
	    private pourPriority?;
	    /** 线宽 */
	    private lineWidth?;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(net: string, layer: TPCB_LayersOfCopper, complexPolygon: IPCB_Polygon, pourFillMethod?: EPCB_PrimitivePourFillMethod, preserveSilos?: boolean, pourName?: string, pourPriority?: number, lineWidth?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 覆铜边框图元对象
	     */
	    create(): Promise<IPCB_PrimitivePour>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfCopper;
	    /**
	     * 获取属性状态：复杂多边形
	     *
	     * @public
	     * @returns 复杂多边形
	     */
	    getState_ComplexPolygon(): IPCB_Polygon;
	    /**
	     * 获取属性状态：覆铜填充方法
	     *
	     * @public
	     * @returns 覆铜填充方法
	     */
	    getState_PourFillMethod(): any;
	    /**
	     * 获取属性状态：是否保留孤岛
	     *
	     * @public
	     * @returns 是否保留孤岛
	     */
	    getState_PreserveSilos(): boolean;
	    /**
	     * 获取属性状态：覆铜边框名称
	     *
	     * @public
	     * @returns 覆铜边框名称
	     */
	    getState_PourName(): string;
	    /**
	     * 获取属性状态：覆铜优先级
	     *
	     * @public
	     * @returns 覆铜优先级
	     */
	    getState_PourPriority(): number;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 覆铜边框图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 覆铜边框图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfCopper): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：复杂多边形
	     *
	     * @beta
	     * @param complexPolygon - 复杂多边形
	     * @returns 覆铜边框图元对象
	     */
	    setState_ComplexPolygon(complexPolygon: IPCB_Polygon): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：覆铜填充方法
	     *
	     * @beta
	     * @param pourFillMethod - 覆铜填充方法
	     * @returns 覆铜边框图元对象
	     */
	    setState_PourFillMethod(pourFillMethod: EPCB_PrimitivePourFillMethod): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：是否保留孤岛
	     *
	     * @beta
	     * @param preserveSilos - 是否保留孤岛
	     * @returns 覆铜边框图元对象
	     */
	    setState_PreserveSilos(preserveSilos: boolean): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：覆铜边框名称
	     *
	     * @beta
	     * @param pourName - 覆铜边框名称
	     * @returns 覆铜边框图元对象
	     */
	    setState_PourName(pourName: string): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：覆铜优先级
	     *
	     * @beta
	     * @param pourPriority - 覆铜优先级
	     * @returns 覆铜边框图元对象
	     */
	    setState_PourPriority(pourPriority: number): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 覆铜边框图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitivePour;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 覆铜边框图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitivePour;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 覆铜边框图元对象
	     */
	    toAsync(): IPCB_PrimitivePour;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 覆铜边框图元对象
	     */
	    toSync(): IPCB_PrimitivePour;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 覆铜边框图元对象
	     */
	    reset(): Promise<IPCB_PrimitivePour>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 覆铜边框图元对象
	     */
	    done(): Promise<IPCB_PrimitivePour>;
	    /**
	     * 获取铺铜区域覆铜填充图元
	     *
	     * @alpha
	     * @returns 覆铜填充图元，如若不存在关联的覆铜填充图元则返回 `undefined`
	     */
	    getCopperRegion(): Promise<IPCB_PrimitivePoured | undefined>;
	    /**
	     * 重建铺铜区域覆铜填充
	     *
	     * @alpha
	     * @returns 覆铜填充图元，如若未重建出覆铜填充图元则返回 `undefined`
	     */
	    rebuildCopperRegion(): Promise<IPCB_PrimitivePoured | undefined>;
	    /**
	     * 转换到：填充图元(默认是填充区域)
	     *
	     * @beta
	     * @returns 填充图元对象
	     */
	    convertToFill(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 转换到：折线图元(默认是线条)
	     *
	     * @beta
	     * @returns 折线图元对象
	     */
	    convertToPolyline(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 转换到：区域图元(默认是禁止区域)
	     *
	     * @beta
	     * @returns 区域图元对象
	     */
	    convertToRegion(): Promise<IPCB_PrimitiveRegion>;
	}

	/**
	 * PCB & 封装 / 折线图元类
	 *
	 * @public
	 */
	class PCB_PrimitivePolyline implements IPCB_PrimitiveAPI {
	    /**
	     * 创建折线
	     *
	     * @public
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param polygon - 单多边形对象
	     * @param lineWidth - 线宽
	     * @param primitiveLock - 是否锁定
	     * @returns 折线图元对象
	     */
	    create(net: string, layer: TPCB_LayersOfLine, polygon: IPCB_Polygon, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitivePolyline | undefined>;
	    /**
	     * 删除折线
	     *
	     * @beta
	     * @param primitiveIds - 折线的图元 ID 或折线图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitivePolyline | Array<string> | Array<IPCB_PrimitivePolyline>): Promise<boolean>;
	    /**
	     * 修改折线
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 折线图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitivePolyline, property: {
	        net?: string;
	        layer?: TPCB_LayersOfLine;
	        polygon?: IPCB_Polygon;
	        lineWidth?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitivePolyline | undefined>;
	    /**
	     * 获取折线
	     *
	     * @beta
	     * @param primitiveIds - 折线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 折线图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitivePolyline | undefined>;
	    /**
	     * 获取折线
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 折线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 折线图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePolyline>>;
	    /**
	     * 获取所有折线的图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 折线的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有折线
	     *
	     * @beta
	     * @param net - 网络名称
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 折线图元对象数组
	     */
	    getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitivePolyline>>;
	}
	/**
	 * 折线图元
	 *
	 * @public
	 */
	class IPCB_PrimitivePolyline implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 网络名称 */
	    private net;
	    /** 层 */
	    private layer;
	    /** 单多边形 */
	    private polygon;
	    /** 线宽 */
	    private lineWidth;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(net: string, layer: TPCB_LayersOfLine, polygon: IPCB_Polygon, lineWidth?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 折线图元对象
	     */
	    create(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfLine;
	    /**
	     * 获取属性状态：单多边形
	     *
	     * @public
	     * @returns 单多边形
	     */
	    getState_Polygon(): IPCB_Polygon;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 折线图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitivePolyline;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 折线图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfLine): IPCB_PrimitivePolyline;
	    /**
	     * 设置属性状态：单多边形
	     *
	     * @beta
	     * @param polygon - 单多边形
	     * @returns 折线图元对象
	     */
	    setState_Polygon(polygon: IPCB_Polygon): IPCB_PrimitivePolyline;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 折线图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitivePolyline;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 折线图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitivePolyline;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 折线图元对象
	     */
	    toAsync(): IPCB_PrimitivePolyline;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 折线图元对象
	     */
	    toSync(): IPCB_PrimitivePolyline;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 折线图元对象
	     */
	    reset(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 折线图元对象
	     */
	    done(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 转换到：填充图元
	     *
	     * @beta
	     * @returns 填充图元对象
	     */
	    convertToFill(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 转换到：覆铜边框图元
	     *
	     * @beta
	     * @returns 覆铜边框图元对象
	     */
	    convertToPour(): Promise<IPCB_PrimitivePour>;
	    /**
	     * 转换到：区域图元
	     *
	     * @beta
	     * @returns 区域图元对象
	     */
	    convertToRegion(): Promise<IPCB_PrimitiveRegion>;
	}

	/**
	 * 填充图元填充模式
	 *
	 * @public
	 * @remarks 网格填充和内电层填充为预留配置
	 */
	enum EPCB_PrimitiveFillMode {
	    /** 实心填充 */
	    SOLID = 0,
	    /** 网格填充 */
	    MESH = 1,
	    /** 内电层填充 */
	    INNER_ELECTRICAL_LAYER = 2
	}
	/**
	 * PCB & 封装 / 填充图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveFill implements IPCB_PrimitiveAPI {
	    /**
	     * 创建填充
	     *
	     * @beta
	     * @param layer - 层
	     * @param complexPolygon - 复杂多边形对象
	     * @param net - 网络名称
	     * @param fillMode - 填充模式
	     * @param lineWidth - 线宽
	     * @param primitiveLock - 是否锁定
	     * @returns 填充图元对象
	     */
	    create(layer: TPCB_LayersOfFill, complexPolygon: IPCB_Polygon, net?: string, fillMode?: EPCB_PrimitiveFillMode, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveFill | undefined>;
	    /**
	     * 删除填充
	     *
	     * @beta
	     * @param primitiveIds - 填充的图元 ID 或填充图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveFill | Array<string> | Array<IPCB_PrimitiveFill>): Promise<boolean>;
	    /**
	     * 修改填充
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 填充图元对象，`undefined` 表示修改失败
	     */
	    modify(primitiveId: string | IPCB_PrimitiveFill, property: {
	        layer?: TPCB_LayersOfFill;
	        complexPolygon?: IPCB_Polygon;
	        net?: string;
	        fillMode?: EPCB_PrimitiveFillMode;
	        lineWidth?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveFill | undefined>;
	    /**
	     * 获取填充
	     *
	     * @beta
	     * @param primitiveIds - 填充的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 填充图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveFill | undefined>;
	    /**
	     * 获取填充
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 填充的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 填充图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveFill>>;
	    /**
	     * 获取所有填充的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 填充的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfFill, net?: string, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有填充
	     *
	     * @beta
	     * @param layer - 层
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 填充图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfFill, net?: string, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveFill>>;
	}
	/**
	 * 填充图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveFill implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 层 */
	    private layer;
	    /** 复杂多边形 */
	    private complexPolygon;
	    /** 网络名称 */
	    private net?;
	    /** 填充模式 */
	    private fillMode?;
	    /** 线宽 */
	    private lineWidth?;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(layer: TPCB_LayersOfFill, complexPolygon: IPCB_Polygon, net?: string, fillMode?: EPCB_PrimitiveFillMode, lineWidth?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 填充图元对象
	     */
	    create(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string | undefined;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfFill;
	    /**
	     * 获取属性状态：复杂多边形
	     *
	     * @public
	     * @returns 复杂多边形
	     */
	    getState_ComplexPolygon(): IPCB_Polygon;
	    /**
	     * 获取属性状态：填充模式
	     *
	     * @public
	     * @returns 填充模式
	     */
	    getState_FillMode(): EPCB_PrimitiveFillMode | undefined;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 填充图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfFill): IPCB_PrimitiveFill;
	    /**
	     * 设置属性状态：复杂多边形
	     *
	     * @beta
	     * @param complexPolygon - 复杂多边形
	     * @returns 填充图元对象
	     */
	    setState_ComplexPolygon(complexPolygon: IPCB_Polygon): IPCB_PrimitiveFill;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 填充图元对象
	     */
	    setState_Net(net: string): IPCB_PrimitiveFill;
	    /**
	     * 设置属性状态：填充模式
	     *
	     * @beta
	     * @param fillMode - 填充模式
	     * @returns 填充图元对象
	     */
	    setState_FillMode(fillMode: EPCB_PrimitiveFillMode): IPCB_PrimitiveFill;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 填充图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveFill;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 填充图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveFill;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 填充图元对象
	     */
	    toAsync(): IPCB_PrimitiveFill;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 填充图元对象
	     */
	    toSync(): IPCB_PrimitiveFill;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 填充图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 填充图元对象
	     */
	    done(): Promise<IPCB_PrimitiveFill>;
	    /**
	     * 转换到：折线图元
	     *
	     * @beta
	     * @returns 折线图元对象
	     */
	    convertToPolyline(): Promise<IPCB_PrimitivePolyline>;
	    /**
	     * 转换到：覆铜边框图元
	     *
	     * @beta
	     * @returns 覆铜边框图元对象
	     */
	    convertToPour(): Promise<IPCB_PrimitivePour>;
	    /**
	     * 转换到：区域图元(默认是禁止区域)
	     *
	     * @beta
	     * @returns 区域图元对象
	     */
	    convertToRegion(): Promise<IPCB_PrimitiveRegion>;
	}

	/**
	 * 焊盘外形种类
	 *
	 * @public
	 */
	enum EPCB_PrimitivePadShapeType {
	    /** 圆形 */
	    ELLIPSE = "ELLIPSE",
	    /** 长圆形 */
	    OBLONG = "OVAL",
	    /** 矩形 */
	    RECTANGLE = "RECT",
	    /** 正多边形 */
	    REGULAR_POLYGON = "NGON",
	    /** 折线复杂多边形 */
	    POLYLINE_COMPLEX_POLYGON = "POLYGON"
	}
	/**
	 * 焊盘钻孔类型
	 *
	 * @public
	 */
	enum EPCB_PrimitivePadHoleType {
	    /** 圆形 */
	    ROUND = "ROUND",
	    /** 矩形（暂未开发） */
	    RECTANGLE = "RECT",
	    /** 插槽 */
	    SLOT = "SLOT"
	}
	/**
	 * 焊盘热焊连接方式
	 *
	 * @public
	 */
	enum EPCB_PrimitivePadHeatWeldingConnectionMethod {
	    /** 发散 */
	    DIVERGENT = "Divergent",
	    /** 直连 */
	    DIRECT_CONNECTED = "Direct-connected",
	    /** 无连接 */
	    NON_CONNECTED = "Non-connected"
	}
	/**
	 * 焊盘类型
	 *
	 * @public
	 */
	enum EPCB_PrimitivePadType {
	    /** 焊盘 */
	    NORMAL = 0,
	    /** 测试点 */
	    TEST = 1,
	    /** 标识点 */
	    MARK_POINT = 2
	}
	/**
	 * 焊盘外形
	 *
	 * @public
	 * @remarks
	 * 焊盘当前存在以下四种 {@link EPCB_PrimitivePadShapeType | 外形种类}：
	 *
	 * ① 圆形
	 *
	 * `[EPCB_PrimitivePadShapeType.ELLIPSE, width, height]`
	 *
	 * - `{number}` `width` - 宽
	 *
	 * - `{number}` `height` - 高
	 *
	 * ② 矩形
	 *
	 * `[EPCB_PrimitivePadShapeType.RECTANGLE, width, height, round]`
	 *
	 * - `{number}` `width` - 宽
	 *
	 * - `{number}` `height` - 高
	 *
	 * - `{number}` `round` - 圆角半径
	 *
	 * ③ 正多边形
	 *
	 * `[EPCB_PrimitivePadShapeType.REGULAR_POLYGON, diameter, numberOfSides]`
	 *
	 * - `{number}` `diameter` - 直径
	 *
	 * - `{number}` `numberOfSides` - 边数（＞ 2）
	 *
	 * ④ 折线复杂多边形
	 *
	 * `[EPCB_PrimitivePadShapeType.POLYLINE_COMPLEX_POLYGON, complexPolygon]`
	 *
	 * - `{TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>}` `complexPolygon` - 复杂多边形源数组，可以使用 {@link IPCB_ComplexPolygon.getSource} 获取
	 */
	type TPCB_PrimitivePadShape = [EPCB_PrimitivePadShapeType.ELLIPSE | EPCB_PrimitivePadShapeType.OBLONG | EPCB_PrimitivePadShapeType.REGULAR_POLYGON, number, number] | [EPCB_PrimitivePadShapeType.RECTANGLE, number, number, number] | [EPCB_PrimitivePadShapeType.POLYLINE_COMPLEX_POLYGON, TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>];
	/**
	 * 特殊焊盘外形
	 *
	 * @public
	 * @remarks
	 * `Array<[startLayer, endLayer, TPCB_PrimitivePadShape]>`
	 *
	 * - `{number}` `startLayer` - 起始层
	 *
	 * - `{number}` `endLayer` - 结束层
	 */
	type TPCB_PrimitiveSpecialPadShape = Array<[number, number, TPCB_PrimitivePadShape]>;
	/**
	 * 焊盘钻孔
	 *
	 * @public
	 * @remarks
	 * 焊盘钻孔当前存在以下两种 {@link EPCB_PrimitivePadHoleType | 类型}：
	 *
	 * ① 圆形
	 *
	 * `[EPCB_PrimitivePadHoleType.ROUND, diameter]`
	 *
	 * - `{number}` `diameter` - 直径
	 *
	 * ② 插槽
	 *
	 * `[EPCB_PrimitivePadHoleType.SLOT, diameter, length]`
	 *
	 * - `{number}` `length` - 长度，长度不能小于直径,长度小于直径的话长度的值跟随直径
	 *
	 * - `{number}` `diameter` - 直径
	 */
	type TPCB_PrimitivePadHole = [EPCB_PrimitivePadHoleType.ROUND, number] | [EPCB_PrimitivePadHoleType.SLOT, number, number];
	/**
	 * 焊盘热焊优化参数
	 *
	 * @public
	 * @remarks
	 * 当连接方式（{@link IPCB_PrimitivePadHeatWelding.connectionMethod | connectionMethod}）为直连（{@link EPCB_PrimitivePadHeatWeldingConnectionMethod.DIRECT_CONNECTED | DIRECT_CONNECTED}）、无连接（{@link EPCB_PrimitivePadHeatWeldingConnectionMethod.NON_CONNECTED | NON_CONNECTED}）时，发散间距、发散线宽、发散角度的设置将被忽略
	 */
	interface IPCB_PrimitivePadHeatWelding {
	    /** 连接方式 */
	    connectionMethod: EPCB_PrimitivePadHeatWeldingConnectionMethod;
	    /** 发散间距 */
	    divergenceSpacing?: number;
	    /** 发散线宽 */
	    divergenceLineWidth?: number;
	    /** 发散角度 */
	    divergenceAngle?: number;
	}
	/**
	 * PCB & 封装 / 焊盘图元类
	 *
	 * @public
	 */
	class PCB_PrimitivePad implements IPCB_PrimitiveAPI {
	    /**
	     * 创建焊盘
	     *
	     * @public
	     * @param layer - 层
	     * @param padNumber - 焊盘编号
	     * @param x - 位置 X
	     * @param y - 位置 Y
	     * @param rotation - 旋转角度
	     * @param pad - 焊盘外形，在特殊焊盘外形实现前，该参数必传
	     * @param net - 网络名称
	     * @param hole - 孔，`null` 标识无孔
	     * @param holeOffsetX - 孔偏移 X
	     * @param holeOffsetY - 孔偏移 Y
	     * @param holeRotation - 孔相对于焊盘的旋转角度
	     * @param metallization - 是否金属化孔壁
	     * @param padType - 焊盘类型
	     * @param specialPad - 特殊焊盘外形，当前暂未实现，请勿使用
	     * @param solderMaskAndPasteMaskExpansion - 阻焊/助焊扩展，`null` 表示遵循规则
	     * @param heatWelding - 热焊优化参数
	     * @param primitiveLock - 是否锁定
	     * @returns 焊盘图元对象
	     */
	    create(layer: TPCB_LayersOfPad, padNumber: string, x: number, y: number, rotation?: number, pad?: TPCB_PrimitivePadShape, net?: string, hole?: TPCB_PrimitivePadHole | null, holeOffsetX?: number, holeOffsetY?: number, holeRotation?: number, metallization?: boolean, padType?: EPCB_PrimitivePadType, specialPad?: TPCB_PrimitiveSpecialPadShape, solderMaskAndPasteMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, heatWelding?: IPCB_PrimitivePadHeatWelding | null, primitiveLock?: boolean): Promise<IPCB_PrimitivePad | undefined>;
	    /**
	     * 删除焊盘
	     *
	     * @beta
	     * @param primitiveIds - 焊盘的图元 ID 或焊盘图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitivePad | Array<string> | Array<IPCB_PrimitivePad>): Promise<boolean>;
	    /**
	     * 修改焊盘
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 焊盘图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitivePad, property: {
	        layer?: TPCB_LayersOfPad;
	        padNumber?: string;
	        x?: number;
	        y?: number;
	        rotation?: number;
	        pad?: TPCB_PrimitivePadShape;
	        net?: string;
	        hole?: TPCB_PrimitivePadHole | null;
	        holeOffsetX?: number;
	        holeOffsetY?: number;
	        holeRotation?: number;
	        metallization?: boolean;
	        specialPad?: TPCB_PrimitiveSpecialPadShape;
	        solderMaskAndPasteMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null;
	        heatWelding?: IPCB_PrimitivePadHeatWelding | null;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitivePad | undefined>;
	    /**
	     * 获取焊盘
	     *
	     * @beta
	     * @param primitiveIds - 焊盘的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 焊盘图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitivePad | undefined>;
	    /**
	     * 获取焊盘
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 焊盘的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 焊盘图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePad>>;
	    /**
	     * 获取所有焊盘的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 焊盘的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfPad, net?: string, primitiveLock?: boolean, padType?: EPCB_PrimitivePadType): Promise<Array<string>>;
	    /**
	     * 获取所有焊盘
	     *
	     * @beta
	     * @param layer - 层
	     * @param net - 网络名称
	     * @param primitiveLock - 是否锁定
	     * @returns 焊盘图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfPad, net?: string, primitiveLock?: boolean, padType?: EPCB_PrimitivePadType): Promise<Array<IPCB_PrimitivePad>>;
	}
	/**
	 * 焊盘图元
	 *
	 * @public
	 */
	class IPCB_PrimitivePad implements IPCB_Primitive {
	    /** 异步 */
	    protected async: boolean;
	    /** 图元类型 */
	    protected readonly primitiveType: EPCB_PrimitiveType;
	    /** 图元 ID */
	    protected primitiveId?: string;
	    /** 层 */
	    protected layer: TPCB_LayersOfPad;
	    /** 焊盘编号 */
	    protected padNumber: string;
	    /** 位置 X */
	    protected x: number;
	    /** 位置 Y */
	    protected y: number;
	    /** 旋转角度 */
	    protected rotation: number;
	    /** 焊盘外形 */
	    protected pad?: TPCB_PrimitivePadShape;
	    /** 网络名称 */
	    protected net?: string;
	    /** 孔 */
	    protected hole: TPCB_PrimitivePadHole | null;
	    /** 孔偏移 X */
	    protected holeOffsetX: number;
	    /** 孔偏移 Y */
	    protected holeOffsetY: number;
	    /** 孔相对于焊盘的旋转角度 */
	    protected holeRotation: number;
	    /** 是否金属化孔壁 */
	    protected metallization: boolean;
	    /** 焊盘类型 */
	    protected padType: EPCB_PrimitivePadType;
	    /** 特殊焊盘外形 */
	    protected specialPad?: TPCB_PrimitiveSpecialPadShape;
	    /** 阻焊/助焊扩展 */
	    protected solderMaskAndPasteMaskExpansion: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null;
	    /** 热焊优化参数 */
	    protected heatWelding: IPCB_PrimitivePadHeatWelding | null;
	    /** 是否锁定 */
	    protected primitiveLock: boolean;
	    /** @internal */
	    constructor(layer: TPCB_LayersOfPad, padNumber: string, x: number, y: number, rotation?: number, pad?: TPCB_PrimitivePadShape, net?: string, hole?: TPCB_PrimitivePadHole | null, holeOffsetX?: number, holeOffsetY?: number, holeRotation?: number, metallization?: boolean, padType?: EPCB_PrimitivePadType, specialPad?: TPCB_PrimitiveSpecialPadShape, solderMaskAndPasteMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, heatWelding?: IPCB_PrimitivePadHeatWelding | null, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @beta
	     * @returns 焊盘图元对象
	     */
	    create(): Promise<IPCB_PrimitivePad>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfPad;
	    /**
	     * 获取属性状态：焊盘编号
	     *
	     * @public
	     * @returns 焊盘编号
	     */
	    getState_PadNumber(): string;
	    /**
	     * 获取属性状态：位置 X
	     *
	     * @public
	     * @returns 位置 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：位置 Y
	     *
	     * @public
	     * @returns 位置 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：焊盘外形
	     *
	     * @public
	     * @returns 焊盘外形
	     */
	    getState_Pad(): TPCB_PrimitivePadShape | undefined;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string | undefined;
	    /**
	     * 获取属性状态：孔
	     *
	     * @public
	     * @returns 孔
	     */
	    getState_Hole(): TPCB_PrimitivePadHole | null;
	    /**
	     * 获取属性状态：孔偏移 X
	     *
	     * @public
	     * @returns 孔偏移 X
	     */
	    getState_HoleOffsetX(): number;
	    /**
	     * 获取属性状态：孔偏移 Y
	     *
	     * @public
	     * @returns 孔偏移 Y
	     */
	    getState_HoleOffsetY(): number;
	    /**
	     * 获取属性状态：孔相对于焊盘的旋转角度
	     *
	     * @public
	     * @returns 孔相对于焊盘的旋转角度
	     */
	    getState_HoleRotation(): number;
	    /**
	     * 获取属性状态：是否金属化孔壁
	     *
	     * @public
	     * @returns 是否金属化孔壁
	     */
	    getState_Metallization(): boolean;
	    /**
	     * 获取属性状态：焊盘类型
	     *
	     * @public
	     * @returns 焊盘类型
	     */
	    getState_PadType(): EPCB_PrimitivePadType;
	    /**
	     * 获取属性状态：特殊焊盘外形
	     *
	     * @public
	     * @returns 特殊焊盘外形
	     */
	    getState_SpecialPad(): TPCB_PrimitiveSpecialPadShape | undefined;
	    /**
	     * 获取属性状态：阻焊/助焊扩展
	     *
	     * @public
	     * @returns 阻焊/助焊扩展
	     */
	    getState_SolderMaskAndPasteMaskExpansion(): IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null;
	    /**
	     * 获取属性状态：热焊优化参数
	     *
	     * @public
	     * @returns 热焊优化参数
	     */
	    getState_HeatWelding(): IPCB_PrimitivePadHeatWelding | null;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @remarks
	     * 设置层时将会联动设置部分其它属性状态：
	     *
	     * 1. 顶层与底层切换时：阻焊/助焊扩展属性将会跟随切换，数据值不变
	     *
	     * 2. 多层切换到单层时：判断切换到顶层还是底层，阻焊/助焊扩展属性将只保留指定层对应的数据；如若存在特殊焊盘，将转换为普通焊盘属性，并且只保留指定层对应的数据；与孔有关的属性将被重置到默认值
	     *
	     * 3. 单层切换到多层时：阻焊/助焊扩展属性将只保留阻焊扩展，并复制原数据应用于顶层和底层；焊盘钻孔属性将被赋指定值，长宽均为焊盘直径（焊盘为长圆形或正多边形）、宽（焊盘为矩形）的 60% 的长圆形（数据层面上是长圆形，实则是正圆形），如若焊盘为折线复杂多边形，则通过专用算法计算得出数据（通常比较抽象，建议后期修改）
	     *
	     * @param layer - 层
	     * @returns 焊盘图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfPad): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：焊盘编号
	     *
	     * @beta
	     * @param padNumber - 焊盘编号
	     * @returns 焊盘图元对象
	     */
	    setState_PadNumber(padNumber: string): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：位置 X
	     *
	     * @beta
	     * @param x - 位置 X
	     * @returns 焊盘图元对象
	     */
	    setState_X(x: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：位置 Y
	     *
	     * @beta
	     * @param y - 位置 Y
	     * @returns 焊盘图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 焊盘图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：焊盘外形
	     *
	     * @beta
	     * @remarks
	     * 设置焊盘外形时将会联动设置部分其它属性状态：
	     *
	     * 1. 特殊焊盘外形属性将被清空
	     *
	     * @param pad - 焊盘外形
	     * @returns 焊盘图元对象
	     */
	    setState_Pad(pad: TPCB_PrimitivePadShape): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：网络
	     *
	     * @beta
	     * @remarks 本接口仅在 PCB 编辑器可用，空字符串与 `undefined` 均被视为空网络
	     * @param net - 网络名称
	     * @returns 焊盘图元对象
	     */
	    setState_Net(net?: string): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：孔
	     *
	     * @beta
	     * @remarks
	     * 设置孔时将会联动设置部分其它属性状态：
	     *
	     * 1. 层将会强制切换到多层
	     *
	     * 本接口无法将孔设置为 `null`，如果想要移除孔属性，请使用 {@link IPCB_PrimitivePad.setState_Layer | setState_Layer} 方法切换层为顶层或底层
	     *
	     * @param hole - 焊盘钻孔
	     * @returns 焊盘图元对象
	     */
	    setState_Hole(hole: TPCB_PrimitivePadHole): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：孔偏移 X
	     *
	     * @beta
	     * @remarks 如若孔不存在，则属性将不会被修改
	     * @param holeOffsetX - 孔偏移 X
	     * @returns 焊盘图元对象
	     */
	    setState_HoleOffsetX(holeOffsetX: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：孔偏移 Y
	     *
	     * @beta
	     * @remarks 如若孔不存在，则属性将不会被修改
	     * @param holeOffsetY - 孔偏移 Y
	     * @returns 焊盘图元对象
	     */
	    setState_HoleOffsetY(holeOffsetY: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：孔相对于焊盘的旋转角度
	     *
	     * @beta
	     * @remarks 如若孔不存在，则属性将不会被修改
	     * @param holeRotation - 孔相对于焊盘的旋转角度
	     * @returns 焊盘图元对象
	     */
	    setState_HoleRotation(holeRotation: number): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：是否金属化孔壁
	     *
	     * @beta
	     * @remarks 如若孔不存在，则属性将不会被修改
	     * @param metallization - 是否金属化孔壁
	     * @returns 焊盘图元对象
	     */
	    setState_Metallization(metallization: boolean): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：特殊焊盘外形
	     *
	     * @beta
	     * @remarks
	     * 设置特殊焊盘外形时将会联动设置部分其它属性状态：
	     *
	     * 1. 焊盘外形属性将被清空
	     *
	     * @param pad - 特殊焊盘外形
	     * @returns 焊盘图元对象
	     */
	    setState_SpecialPad(specialPad: TPCB_PrimitiveSpecialPadShape): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：阻焊/助焊扩展
	     *
	     * @beta
	     * @param solderMaskAndPasteMaskExpansion - 阻焊/助焊扩展
	     * @returns 焊盘图元对象
	     */
	    setState_SolderMaskAndPasteMaskExpansion(solderMaskAndPasteMaskExpansion: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：热焊优化参数
	     *
	     * @beta
	     * @param heatWelding - 热焊优化参数
	     * @returns 焊盘图元对象
	     */
	    setState_HeatWelding(heatWelding: IPCB_PrimitivePadHeatWelding | null): IPCB_PrimitivePad;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 焊盘图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitivePad;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 焊盘图元对象
	     */
	    toAsync(): IPCB_PrimitivePad;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 焊盘图元对象
	     */
	    toSync(): IPCB_PrimitivePad;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 焊盘图元对象
	     */
	    reset(): Promise<IPCB_PrimitivePad>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 尺寸标注图元对象
	     */
	    done(): Promise<IPCB_PrimitivePad>;
	    /**
	     * 设置属性状态：焊盘类型
	     *
	     * @beta
	     * @param padType - 焊盘类型
	     * @returns 焊盘图元对象
	     */
	    private setState_PadType;
	}
	/**
	 * 器件焊盘图元
	 *
	 * @public
	 * @remarks
	 * 器件焊盘图元是一个特殊的图元，它指的是在 PCB 画布上关联到封装的焊盘
	 *
	 * 你只能通过 {@link PCB_PrimitiveComponent.getAllPinsByPrimitiveId | 器件类的 getAllPinsByPrimitiveId 方法} 或 {@link IPCB_PrimitiveComponent.getAllPins | 器件图元的 getAllPads 方法} 获取到器件焊盘图元
	 */
	class IPCB_PrimitiveComponentPad extends IPCB_PrimitivePad {
	    /** 图元类型 */
	    protected readonly primitiveType: EPCB_PrimitiveType.COMPONENT_PAD;
	    /** 父器件图元 ID */
	    private parentComponentPrimitiveId;
	    /** @internal */
	    constructor(primitiveId: string, parentComponentPrimitiveId: string, layer: TPCB_LayersOfPad, padNumber: string, x: number, y: number, rotation: number, hole: TPCB_PrimitivePadHole | null, holeOffsetX: number, holeOffsetY: number, holeRotation: number, metallization: boolean, padType: EPCB_PrimitivePadType, solderMaskAndPasteMaskExpansion: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, heatWelding: IPCB_PrimitivePadHeatWelding | null, primitiveLock: boolean, net?: string, pad?: TPCB_PrimitivePadShape, specialPad?: TPCB_PrimitiveSpecialPadShape);
	    /**
	     * 获取属性状态：父器件图元 ID
	     *
	     * @public
	     * @returns 父器件图元 ID
	     */
	    getState_ParentComponentPrimitiveId(): string;
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @remarks 本器件焊盘图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件焊盘图元对象
	     */
	    create(): Promise<IPCB_PrimitiveComponentPad>;
	    /**
	     * 设置属性状态：层
	     *
	     * @internal
	     * @remarks 本器件焊盘图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件焊盘图元对象
	     */
	    setState_Layer(): IPCB_PrimitiveComponentPad;
	    /**
	     * 设置属性状态：焊盘编号
	     *
	     * @internal
	     * @remarks 本器件焊盘图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件焊盘图元对象
	     */
	    setState_PadNumber(): IPCB_PrimitiveComponentPad;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @internal
	     * @remarks 本器件焊盘图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件焊盘图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveComponentPad>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 器件焊盘图元对象
	     */
	    done(): Promise<IPCB_PrimitiveComponentPad>;
	    /**
	     * 获取连接的图元
	     *
	     * @beta
	     * @remarks 本接口可以获取到与焊盘直接接触的图元
	     * @param onlyCentreConnection - 是否仅中心连接，如若为 `true` 则仅获取中心连接的图元（直线、圆弧线、过孔），如若为 `false` 则获取所有接触的图元
	     */
	    getConnectedPrimitives(onlyCentreConnection: true): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc | IPCB_PrimitiveVia>>;
	    getConnectedPrimitives(onlyCentreConnection: false): Promise<Array<IPCB_PrimitiveLine | IPCB_PrimitiveArc | IPCB_PrimitiveVia | IPCB_PrimitivePolyline | IPCB_PrimitiveFill>>;
	    /**
	     * 设置属性状态：父器件图元 ID
	     *
	     * @public
	     * @remarks 本器件焊盘图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件焊盘图元对象
	     */
	    setState_ParentComponentPrimitiveId(): IPCB_PrimitiveComponentPad;
	}

	/**
	 * PCB & 封装 / 器件图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveComponent implements IPCB_PrimitiveAPI {
	    /**
	     * 创建器件
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @param layer - 层
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param primitiveLock - 是否锁定
	     * @returns 器件图元对象
	     */
	    create(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem | {
	        libraryType: ELIB_LibraryType.FOOTPRINT;
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_FootprintItem | ILIB_FootprintSearchItem, layer: TPCB_LayersOfComponent, x: number, y: number, rotation?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveComponent | undefined>;
	    /**
	     * 删除器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID 或器件图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveComponent | Array<string> | Array<IPCB_PrimitiveComponent>): Promise<boolean>;
	    /**
	     * 修改器件
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param layer - 层
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param primitiveLock - 是否锁定
	     * @param addIntoBom - 是否加入 BOM
	     * @param designator - 位号
	     * @param name - 名称，`null` 表示留空
	     * @param uniqueId - 唯一 ID，`null` 表示留空
	     * @param manufacturer - 制造商，`null` 表示留空
	     * @param manufacturerId - 制造商编号，`null` 表示留空
	     * @param supplier - 供应商，`null` 表示留空
	     * @param supplierId - 供应商编号，`null` 表示留空
	     * @returns 器件图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveComponent, property: {
	        layer?: TPCB_LayersOfComponent;
	        x?: number;
	        y?: number;
	        rotation?: number;
	        primitiveLock?: boolean;
	        addIntoBom?: boolean;
	        designator?: string | null;
	        name?: string | null;
	        uniqueId?: string | null;
	        manufacturer?: string | null;
	        manufacturerId?: string | null;
	        supplier?: string | null;
	        supplierId?: string | null;
	        otherProperty?: {
	            [key: string]: any;
	        };
	    }): Promise<IPCB_PrimitiveComponent | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID，可以为字��串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveComponent | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 器件的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveComponent>>;
	    /**
	     * 获取所有器件的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 器件的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfComponent, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有器件
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 器件图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfComponent, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveComponent>>;
	    /**
	     * 获取器件关联的所有焊盘
	     *
	     * @beta
	     * @param primitiveId - 器件图元 ID
	     * @returns 器件焊盘图元数组
	     */
	    getAllPinsByPrimitiveId(primitiveId: string): Promise<Array<IPCB_PrimitiveComponentPad> | undefined>;
	    /**
	     * 使用鼠标放置器件
	     *
	     * @beta
	     * @remarks
	     * 本接口模拟前端点击放置按钮，指定的器件将绑定到当前鼠标，并在用户后续点击时放置于画布
	     *
	     * 本接口的返回时机并不会等待用户的放置操作，一旦器件被绑定到鼠标，本接口将立即返回 `true` 的结果
	     * @param component - 关联库器件
	     * @returns 是否找到器件
	     */
	    placeComponentWithMouse(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 使用鼠标放置封装
	     *
	     * @alpha
	     * @remarks
	     * ADD since API v0.2.26
	     *
	     * 本接口模拟前端点击放置按钮，指定的封装将绑定到当前鼠标，并在用户后续点击时放置于画布
	     *
	     * 本接口的返回时机并不会等待用户的放置操作，一旦封装被绑定到鼠标，本接口将立即返回 `true` 的结果
	     * @param footprint - 关联库封装
	     * @param properties - 器件属性
	     * @returns 是否找到封装
	     */
	    placeFootprintWithMouse(footprint: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_FootprintItem | ILIB_FootprintSearchItem, properties?: {
	        [key: string]: boolean | number | string | undefined;
	    }): Promise<boolean>;
	    /**
	     * 获取所有器件的所有属性名称集合
	     *
	     * @alpha
	     * @returns 所有器件的所有属性名称集合
	     */
	    getAllPropertyNames(): Promise<Array<string>>;
	}
	/**
	 * 器件图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveComponent implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 关联库器件 */
	    private component?;
	    /** 关联库封装 */
	    private footprint?;
	    /** 层 */
	    private layer;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** 是否加入 BOM */
	    private addIntoBom;
	    /** 关联库 3D 模型 */
	    private model3D?;
	    /** 位号 */
	    private designator?;
	    /** 焊盘 */
	    private pads?;
	    /** 名称 */
	    private name?;
	    /** 唯一 ID */
	    private uniqueId?;
	    /** 制造商 */
	    private manufacturer?;
	    /** 制造商编号 */
	    private manufacturerId?;
	    /** 供应商 */
	    private supplier?;
	    /** 供应商编号 */
	    private supplierId?;
	    /** 其它参数 */
	    private otherProperty?;
	    /** 内部：属性可见性 */
	    private _attributeVisible?;
	    /** @internal */
	    constructor(component: {
	        libraryType?: ELIB_LibraryType.DEVICE | ELIB_LibraryType.FOOTPRINT;
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, layer: TPCB_LayersOfComponent, x: number, y: number, rotation?: number, primitiveLock?: boolean, addIntoBom?: boolean, primitiveId?: string, footprint?: {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, model3D?: {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, designator?: string, pads?: Array<{
	        primitiveId: string;
	        net: string;
	        padNumber: string;
	    }>, name?: string, uniqueId?: string, manufacturer?: string, manufacturerId?: string, supplier?: string, supplierId?: string, otherProperty?: {
	        [key: string]: string | number | boolean;
	    });
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 器件图元对象
	     */
	    create(): Promise<IPCB_PrimitiveComponent>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：关联库器件
	     *
	     * @public
	     * @returns 关联库器件
	     */
	    getState_Component(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：关联库封装
	     *
	     * @public
	     * @returns 关联库封装
	     */
	    getState_Footprint(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfComponent;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 获取属性状态：是否加入 BOM
	     *
	     * @public
	     * @returns 是否加入 BOM
	     */
	    getState_AddIntoBom(): boolean;
	    /**
	     * 获取属性状态：关联库 3D 模型
	     *
	     * @public
	     * @returns 关联库 3D 模型
	     */
	    getState_Model3D(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：位号
	     *
	     * @public
	     * @returns 位号
	     */
	    getState_Designator(): string | undefined;
	    /**
	     * 获取属性状态：焊盘
	     *
	     * @public
	     * @returns 焊盘
	     */
	    getState_Pads(): Array<{
	        primitiveId: string;
	        net: string;
	        padNumber: string;
	    }> | undefined;
	    /**
	     * 获取属性状态：名称
	     *
	     * @public
	     * @returns 名称
	     */
	    getState_Name(): string | undefined;
	    /**
	     * 获取属性状态：唯一 ID
	     *
	     * @public
	     * @returns 唯一 ID
	     */
	    getState_UniqueId(): string | undefined;
	    /**
	     * 获取属性状态：制造商
	     *
	     * @public
	     * @returns 制造商
	     */
	    getState_Manufacturer(): string | undefined;
	    /**
	     * 获取属性状态：制造商编号
	     *
	     * @public
	     * @returns 制造商编号
	     */
	    getState_ManufacturerId(): string | undefined;
	    /**
	     * 获取属性状态：供应商
	     *
	     * @public
	     * @returns 供应商
	     */
	    getState_Supplier(): string | undefined;
	    /**
	     * 获取属性状态：供应商编号
	     *
	     * @public
	     * @returns 供应商编号
	     */
	    getState_SupplierId(): string | undefined;
	    /**
	     * 获取属性状态：其它参数
	     *
	     * @public
	     * @returns 其它参数
	     */
	    getState_OtherProperty(): {
	        [key: string]: string | number | boolean;
	    } | undefined;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 器件图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfComponent): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 器件图元对象
	     */
	    setState_X(x: number): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 器件图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 器件图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 器件图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：是否加入 BOM
	     *
	     * @beta
	     * @param addIntoBom - 是否加入 BOM
	     * @returns 器件图元对象
	     */
	    setState_AddIntoBom(addIntoBom: boolean): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：位号
	     *
	     * @beta
	     * @param designator - 位号
	     * @returns 器件图元对象
	     */
	    setState_Designator(designator: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：名称
	     *
	     * @beta
	     * @param name - 名称
	     * @returns 器件图元对象
	     */
	    setState_Name(name: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：唯一 ID
	     *
	     * @beta
	     * @param uniqueId - 唯一 ID
	     * @returns 器件图元对象
	     */
	    setState_UniqueId(uniqueId: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：制造商
	     *
	     * @beta
	     * @param manufacturer - 制造商
	     * @returns 器件图元对象
	     */
	    setState_Manufacturer(manufacturer: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：制造商编号
	     *
	     * @beta
	     * @param manufacturerId - 制造商编号
	     * @returns 器件图元对象
	     */
	    setState_ManufacturerId(manufacturerId: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：供应商
	     *
	     * @beta
	     * @param supplier - 供应商
	     * @returns 器件图元对象
	     */
	    setState_Supplier(supplier: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：供应商编号
	     *
	     * @beta
	     * @param supplierId - 供应商编号
	     * @returns 器件图元对象
	     */
	    setState_SupplierId(supplierId: string | undefined): IPCB_PrimitiveComponent;
	    /**
	     * 设置属性状态：其它参数
	     *
	     * @beta
	     * @param otherProperty - 其它参数
	     * @returns 器件图元对象
	     */
	    setState_OtherProperty(otherProperty: {
	        [key: string]: string | number | boolean;
	    }): IPCB_PrimitiveComponent;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 器件图元对象
	     */
	    toAsync(): IPCB_PrimitiveComponent;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 器件图元对象
	     */
	    toSync(): IPCB_PrimitiveComponent;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveComponent>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    done(): Promise<IPCB_PrimitiveComponent>;
	    /**
	     * 获取器件关联的所有焊盘
	     *
	     * @beta
	     * @returns 器件焊盘图元数组
	     */
	    getAllPins(): Promise<Array<IPCB_PrimitiveComponentPad>>;
	    /**
	     * 设置属性
	     *
	     * @alpha
	     * @param key - 属性名，如若器件不存在该属性名的属性，将会新增该属性
	     * @param value - 属性值
	     * @param keyVisible - 属性名可见性
	     * @param valueVisible - 属性值可见性
	     * @returns 属性图元对象
	     */
	    setAttribute(key: string, value?: string | number | boolean, keyVisible?: boolean, valueVisible?: boolean): Promise<IPCB_PrimitiveAttribute>;
	    /**
	     * 设置属性状态：关联库器件
	     *
	     * @internal
	     * @param component - 关联库器件
	     */
	    private setState_Component;
	}

	/**
	 * 尺寸标注类型
	 *
	 * @public
	 */
	enum EPCB_PrimitiveDimensionType {
	    /** 半径 */
	    RADIUS = "Radius Dimension",
	    /** 长度 */
	    LENGTH = "Length Dimension",
	    /** 角度 */
	    ANGLE = "Protractor Dimension"
	}
	/**
	 * 尺寸标注坐标集
	 *
	 * @public
	 * @remarks
	 * 尺寸标注坐标集存在以下三种 {@link EPCB_PrimitiveDimensionType | 尺寸标注类型}：
	 *
	 * ① 半径标注
	 *
	 * `[x1, y1, x2, y2, x3, y3]`
	 *
	 * - `{number}` `x1` - 圆、圆弧上的端点 X
	 *
	 * - `{number}` `y1` - 圆、圆弧上的端点 Y
	 *
	 * - `{number}` `x2` - 标注线尾部的端点 X
	 *
	 * - `{number}` `y2` - 标注线尾部的端点 Y
	 *
	 * - `{number}` `x3` - 标注文字的左下端点 X
	 *
	 * - `{number}` `y3` - 标注文字的左下端点 Y
	 *
	 * ② 长度标注
	 *
	 * `[x1, y1, x2, y2, x3, y3, x4, y4]`
	 *
	 * - `{number}` `x1` - 第一测量端点 X
	 *
	 * - `{number}` `y1` - 第一测量端点 Y
	 *
	 * - `{number}` `x2` - 第一标注箭头端点 X
	 *
	 * - `{number}` `y2` - 第一标注箭头端点 Y
	 *
	 * - `{number}` `x3` - 第二标注箭头端点 X
	 *
	 * - `{number}` `y3` - 第二标注箭头端点 Y
	 *
	 * - `{number}` `x4` - 第二测量端点 X
	 *
	 * - `{number}` `y4` - 第二测量端点 Y
	 *
	 * ③ 角度标注
	 *
	 * `[x1, y1, x2, y2, x3, y3]`
	 *
	 * - `{number}` `x1` - 第一边端点 X
	 *
	 * - `{number}` `y1` - 第一边端点 Y
	 *
	 * - `{number}` `x2` - 角度中心 X
	 *
	 * - `{number}` `y2` - 角度中心 Y
	 *
	 * - `{number}` `x3` - 第二边端点 X
	 *
	 * - `{number}` `y3` - 第二边端点 Y
	 */
	type TPCB_PrimitiveDimensionCoordinateSet = [number, number, number, number, number, number] | [number, number, number, number, number, number, number, number];
	/**
	 * PCB & 封装 / 尺寸标注图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveDimension implements IPCB_PrimitiveAPI {
	    /**
	     * 创建尺寸标注
	     *
	     * @public
	     * @param dimensionType - 尺寸标注类型
	     * @param coordinateSet - 尺寸标注坐标集
	     * @param layer - 层
	     * @param unit - 单位
	     * @param lineWidth - 线宽
	     * @param precision - 精度，取值范围 `0`-`4`
	     * @param primitiveLock - 是否锁定
	     * @returns 尺寸标注图元对象
	     */
	    create(dimensionType: EPCB_PrimitiveDimensionType, coordinateSet: TPCB_PrimitiveDimensionCoordinateSet, layer?: TPCB_LayersOfDimension, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL, lineWidth?: number, precision?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveDimension | undefined>;
	    /**
	     * 删除尺寸标注
	     *
	     * @beta
	     * @param primitiveIds - 尺寸标注的图元 ID 或尺寸标注图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveDimension | Array<string> | Array<IPCB_PrimitiveDimension>): Promise<boolean>;
	    /**
	     * 修改尺寸标注
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 尺寸标注图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveDimension, property: {
	        dimensionType?: EPCB_PrimitiveDimensionType;
	        coordinateSet?: TPCB_PrimitiveDimensionCoordinateSet;
	        layer?: TPCB_LayersOfDimension;
	        unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL;
	        lineWidth?: number;
	        precision?: number;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveDimension | undefined>;
	    /**
	     * 获取尺寸标注
	     *
	     * @beta
	     * @param primitiveIds - 尺寸标注的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 尺寸标注图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveDimension | undefined>;
	    /**
	     * 获取尺寸标注
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 尺寸标注的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 尺寸标注图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveDimension>>;
	    /**
	     * 获取所有尺寸标注的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 尺寸标注的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfDimension, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有尺寸标注
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 尺寸标注图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfDimension, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveDimension>>;
	}
	/**
	 * 尺寸标注图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveDimension implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 尺寸标注类型 */
	    private dimensionType;
	    /** 坐标集 */
	    private coordinateSet;
	    /** 层 */
	    private layer;
	    /** 单位 */
	    private unit;
	    /** 线宽 */
	    private lineWidth;
	    /** 精度 */
	    private precision;
	    /** 文字跟随 */
	    private textFollow;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(dimensionType: EPCB_PrimitiveDimensionType, coordinateSet: TPCB_PrimitiveDimensionCoordinateSet, layer?: TPCB_LayersOfDimension, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL, lineWidth?: number, precision?: number, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 尺寸标注图元对象
	     */
	    create(): Promise<IPCB_PrimitiveDimension>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：尺寸标注类型
	     *
	     * @public
	     * @returns 尺寸标注类型
	     */
	    getState_DimensionType(): EPCB_PrimitiveDimensionType;
	    /**
	     * 获取属性状态：坐标集
	     *
	     * @public
	     * @returns 坐标集
	     */
	    getState_CoordinateSet(): TPCB_PrimitiveDimensionCoordinateSet;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfDimension;
	    /**
	     * 获取属性状态：单位
	     *
	     * @public
	     * @returns 单位
	     */
	    getState_Unit(): ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number;
	    /**
	     * 获取属性状态：精度
	     *
	     * @public
	     * @returns 精度
	     */
	    getState_Precision(): number;
	    /**
	     * 获取属性状态：文字跟随
	     *
	     * @public
	     * @returns 文字跟随
	     */
	    getState_TextFollow(): 0 | 1;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：尺寸标注类型
	     *
	     * @beta
	     * @param dimensionType - 尺寸标注类型
	     * @returns 尺寸标注图元对象
	     */
	    setState_DimensionType(dimensionType: EPCB_PrimitiveDimensionType): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：坐标集
	     *
	     * @beta
	     * @param coordinateSet - 坐标集
	     * @returns 尺寸标注图元对象
	     */
	    setState_CoordinateSet(coordinateSet: TPCB_PrimitiveDimensionCoordinateSet): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 尺寸标注图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfDimension): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：单位
	     *
	     * @beta
	     * @param unit - 单位
	     * @returns 尺寸标注图元对象
	     */
	    setState_Unit(unit: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 尺寸标注图元对象
	     */
	    setState_LineWidth(lineWidth: number): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：精度
	     *
	     * @beta
	     * @param precision - 精度
	     * @returns 尺寸标注图元对象
	     */
	    setState_Precision(precision: number): IPCB_PrimitiveDimension;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 尺寸标注图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveDimension;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 尺寸标注图元对象
	     */
	    toAsync(): IPCB_PrimitiveDimension;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 尺寸标注图元对象
	     */
	    toSync(): IPCB_PrimitiveDimension;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 尺寸标注图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveDimension>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 尺寸标注图元对象
	     */
	    done(): Promise<IPCB_PrimitiveDimension>;
	}

	/**
	 * PCB & 封装 / 图像图元类
	 *
	 * @public
	 */
	class PCB_PrimitiveImage implements IPCB_PrimitiveAPI {
	    /**
	     * 创建图像
	     *
	     * @public
	     * @remarks 如需创建彩色丝印图像，请使用 {@link PCB_PrimitiveObject | 二进制内嵌对象图元类}
	     * @param x - BBox 左上点坐标 X
	     * @param y - BBox 左上点坐标 Y
	     * @param complexPolygon - 图像源数据（复杂多边形），可以使用 {@link PCB_MathPolygon.convertImageToComplexPolygon} 方法将图像文件转换为复杂多边形数据
	     * @param layer - 层
	     * @param width - 宽
	     * @param height - 高
	     * @param rotation - 旋转角度
	     * @param horizonMirror - 是否水平镜像
	     * @param primitiveLock - 是否锁定
	     * @returns 图像图元对象
	     */
	    create(x: number, y: number, complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon, layer: TPCB_LayersOfImage, width?: number, height?: number, rotation?: number, horizonMirror?: boolean, primitiveLock?: boolean): Promise<IPCB_PrimitiveImage | undefined>;
	    /**
	     * 删除图像
	     *
	     * @beta
	     * @param primitiveIds - 图像的图元 ID 或图像图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveImage | Array<string> | Array<IPCB_PrimitiveImage>): Promise<boolean>;
	    /**
	     * 修改图像
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 图像图元对象
	     */
	    modify(primitiveId: string | IPCB_PrimitiveImage, property: {
	        x?: number;
	        y?: number;
	        layer?: TPCB_LayersOfImage;
	        width?: number;
	        height?: number;
	        rotation?: number;
	        horizonMirror?: boolean;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveImage | undefined>;
	    /**
	     * 获取图像
	     *
	     * @beta
	     * @param primitiveIds - 图像的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 图像图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveImage | undefined>;
	    /**
	     * 获取图像
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 图像的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 图像图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveImage>>;
	    /**
	     * 获取所有图像的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 图像的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有图像
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 图像图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveImage>>;
	}
	/**
	 * 图像图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveImage implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** BBox 左上点坐标 X */
	    private x;
	    /** BBox 左上点坐标 Y */
	    private y;
	    /** 图像源数据（复杂多边形） */
	    private complexPolygon;
	    /** 层 */
	    private layer;
	    /** 宽 */
	    private width;
	    /** 高 */
	    private height;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否水平镜像 */
	    private horizonMirror;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(x: number, y: number, complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>, layer: TPCB_LayersOfImage, width?: number, height?: number, rotation?: number, horizonMirror?: boolean, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 图像图元对象
	     */
	    create(): Promise<IPCB_PrimitiveImage>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：BBox 左上点坐标 X
	     *
	     * @public
	     * @returns BBox 左上点坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：BBox 左上点坐标 Y
	     *
	     * @public
	     * @returns BBox 左上点坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：图像源数据（复杂多边形）
	     *
	     * @public
	     * @returns 图像源数据（复杂多边形）
	     */
	    getState_ComplexPolygon(): TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfImage;
	    /**
	     * 获取属性状态：宽
	     *
	     * @public
	     * @returns 宽
	     */
	    getState_Width(): number;
	    /**
	     * 获取属性状态：高
	     *
	     * @public
	     * @returns 高
	     */
	    getState_Height(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否水平镜像
	     *
	     * @public
	     * @returns 是否水平镜像
	     */
	    getState_HorizonMirror(): boolean;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：BBox 左上点坐标 X
	     *
	     * @beta
	     * @param x - BBox 左上点坐标 X
	     * @returns 图像图元对象
	     */
	    setState_X(x: number): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：BBox 左上点坐标 Y
	     *
	     * @beta
	     * @param y - BBox 左上点坐标 Y
	     * @returns 图像图元对象
	     */
	    setState_Y(y: number): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 图像图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfImage): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：宽
	     *
	     * @beta
	     * @param width - 宽
	     * @returns 图像图元对象
	     */
	    setState_Width(width: number): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：高
	     *
	     * @beta
	     * @param height - 高
	     * @returns 图像图元对象
	     */
	    setState_Height(height: number): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 图像图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：是否水平镜像
	     *
	     * @beta
	     * @param horizonMirror - 是否水平镜像
	     * @returns 图像图元对象
	     */
	    setState_HorizonMirror(horizonMirror: boolean): IPCB_PrimitiveImage;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 图像图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveImage;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 图像图元对象
	     */
	    toAsync(): IPCB_PrimitiveImage;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 图像图元对象
	     */
	    toSync(): IPCB_PrimitiveImage;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 图像图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveImage>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 图像图元对象
	     */
	    done(): Promise<IPCB_PrimitiveImage>;
	    /**
	     * 设置属性状态：图像源数据
	     *
	     * @internal
	     * @param complexPolygon - 图像源数据
	     */
	    private setState_ComplexPolygon;
	}

	/**
	 * PCB & 封装 / 二进制内嵌对象图元类
	 *
	 * @public
	 * @remarks 彩色丝印图像属于二进制内嵌对象，需要使用二进制内嵌对象的方法创建和修改
	 */
	class PCB_PrimitiveObject implements IPCB_PrimitiveAPI {
	    /**
	     * 创建二进制内嵌对象
	     *
	     * @beta
	     * @param layer - 层
	     * @param topLeftX - 左上点 X
	     * @param topLeftY - 左上点 Y
	     * @param binaryData - 二进制数据
	     * @param width - 宽
	     * @param height - 高
	     * @param rotation - 旋转角度
	     * @param mirror - 是否水平镜像
	     * @param fileName - 文件名
	     * @param primitiveLock - 是否锁定
	     * @returns - 二进制内嵌对象图元对象
	     */
	    create(layer: TPCB_LayersOfObject, topLeftX: number, topLeftY: number, binaryData: string, width: number, height: number, rotation?: number, mirror?: boolean, fileName?: string, primitiveLock?: boolean): Promise<IPCB_PrimitiveObject | undefined>;
	    /**
	     * 删除二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveIds - 二进制内嵌对象的图元 ID 或二进制内嵌对象图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | IPCB_PrimitiveObject | Array<string> | Array<IPCB_PrimitiveObject>): Promise<boolean>;
	    /**
	     * 修改二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 二进制内嵌对象图元对象，`undefined` 表示修改失败
	     */
	    modify(primitiveId: string | IPCB_PrimitiveObject, property: {
	        layer?: TPCB_LayersOfObject;
	        topLeftX?: number;
	        topLeftY?: number;
	        binaryData?: string;
	        width?: number;
	        height?: number;
	        rotation?: number;
	        mirror?: boolean;
	        fileName?: string;
	        primitiveLock?: boolean;
	    }): Promise<IPCB_PrimitiveObject | undefined>;
	    /**
	     * 获取二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveIds - 二进制内嵌对象的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 二进制内嵌对象图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<IPCB_PrimitiveObject | undefined>;
	    /**
	     * 获取二进制内嵌对象
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 二进制内嵌对象的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 二进制内嵌对象图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveObject>>;
	    /**
	     * 获取所有二进制内嵌对象的图元 ID
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 二进制内嵌对象的图元 ID 数组
	     */
	    getAllPrimitiveId(layer?: TPCB_LayersOfObject, primitiveLock?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有二进制内嵌对象
	     *
	     * @beta
	     * @param layer - 层
	     * @param primitiveLock - 是否锁定
	     * @returns 二进制内嵌对象图元对象数组
	     */
	    getAll(layer?: TPCB_LayersOfObject, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveObject>>;
	}
	/**
	 * 二进制内嵌对象图元
	 *
	 * @public
	 */
	class IPCB_PrimitiveObject implements IPCB_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 层 */
	    private layer;
	    /** 左上点 X */
	    private topLeftX;
	    /** 左上点 Y */
	    private topLeftY;
	    /** 二进制数据 */
	    private binaryData;
	    /** 宽 */
	    private width;
	    /** 高 */
	    private height;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否水平镜像 */
	    private mirror;
	    /** 文件名 */
	    private fileName;
	    /** 是否锁定 */
	    private primitiveLock;
	    /** @internal */
	    constructor(layer: TPCB_LayersOfObject, topLeftX: number, topLeftY: number, binaryData: string, width: number, height: number, rotation?: number, mirror?: boolean, fileName?: string, primitiveLock?: boolean, primitiveId?: string);
	    /**
	     * 在 PCB 画布中创建图元
	     *
	     * @internal
	     * @returns 二进制内嵌对象图元对象
	     */
	    create(): Promise<IPCB_PrimitiveObject>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): EPCB_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：层
	     *
	     * @public
	     * @returns 层
	     */
	    getState_Layer(): TPCB_LayersOfObject | undefined;
	    /**
	     * 获取属性状态：左上点 X
	     *
	     * @public
	     * @returns 左上点 X
	     */
	    getState_TopLeftX(): number | undefined;
	    /**
	     * 获取属性状态：左上点 Y
	     *
	     * @public
	     * @returns 左上点 Y
	     */
	    getState_TopLeftY(): number | undefined;
	    /**
	     * 获取属性状态：二进制数据
	     *
	     * @public
	     * @remarks
	     * 从画布取回的 `binaryData` 数据可能为 `hashId`，这是由于我们后端存储二进制内嵌对象数据的是对象存储，
	     *
	     * 对象存储以 `hashId` 作为索引，需要完整取回数据将会造成额外请求消耗性能
	     * @returns 二进制数据
	     */
	    getState_BinaryData(): string;
	    /**
	     * 获取属性状态：宽
	     *
	     * @public
	     * @returns 宽
	     */
	    getState_Width(): number;
	    /**
	     * 获取属性状态：高
	     *
	     * @public
	     * @returns 高
	     */
	    getState_Height(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否水平镜像
	     *
	     * @public
	     * @returns 是否水平镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：文件名
	     *
	     * @public
	     * @returns 文件名
	     */
	    getState_FileName(): string;
	    /**
	     * 获取属性状态：是否锁定
	     *
	     * @public
	     * @returns 是否锁定
	     */
	    getState_PrimitiveLock(): boolean;
	    /**
	     * 设置属性状态：层
	     *
	     * @beta
	     * @param layer - 层
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Layer(layer: TPCB_LayersOfObject): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：左上点 X
	     *
	     * @public
	     * @param topLeftX - 左上点 X
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_TopLeftX(topLeftX: number): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：左上点 Y
	     *
	     * @public
	     * @param topLeftY - 左上点 Y
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_TopLeftY(topLeftY: number): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：二进制数据
	     *
	     * @public
	     * @remarks
	     * 从画布重新取回的 `binaryData` 数据可能为 `hashId`，这是由于我们后端存储二进制内嵌对象数据的是对象存储，
	     *
	     * 对象存储以 `hashId` 作为索引，需要完整取回数据将会造成额外请求消耗性能
	     * @param binaryData - 二进制数据
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_BinaryData(binaryData: string): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：宽
	     *
	     * @public
	     * @param width - 宽
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Width(width: number): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：高
	     *
	     * @public
	     * @param height - 高
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Height(height: number): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @public
	     * @param rotation - 旋转角度
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Rotation(rotation: number): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：是否水平镜像
	     *
	     * @public
	     * @param mirror - 是否水平镜像
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Mirror(mirror: boolean): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：文件名
	     *
	     * @public
	     * @param fileName - 文件名
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_FileName(fileName: string): IPCB_PrimitiveObject;
	    /**
	     * 设置属性状态：是否锁定
	     *
	     * @beta
	     * @param primitiveLock - 是否锁定
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_PrimitiveLock(primitiveLock: boolean): IPCB_PrimitiveObject;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 二进制内嵌对象图元对象
	     */
	    toAsync(): IPCB_PrimitiveObject;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 二进制内嵌对象图元对象
	     */
	    toSync(): IPCB_PrimitiveObject;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 二进制内嵌对象图元对象
	     */
	    reset(): Promise<IPCB_PrimitiveObject>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 二进制内嵌对象图元对象
	     */
	    done(): Promise<IPCB_PrimitiveObject>;
	}

	/**
	 * PCB & 封装 / 光线追踪引擎类
	 *
	 * @public
	 * @remarks 控制光线追踪引擎的对接和交互
	 */
	class PCB_RayTracerEngine {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 初始化光线追踪引擎
	     *
	     * @beta
	     * @remarks ADD since EDA v4
	     */
	    init(): Promise<void>;
	    /**
	     * 停止光线追踪引擎
	     *
	     * @beta
	     * @remarks ADD since EDA v4
	     */
	    dispose(): Promise<void>;
	    /**
	     * 设置光线追踪渲染配置
	     *
	     * @beta
	     * @remarks 本接口配置定义还在进行中
	     *
	     * ADD since EDA v4
	     * @param configurations - 渲染配置
	     */
	    setRenderConfigurations(configurations: any): Promise<void>;
	    /**
	     * 获取光线追踪渲染配置
	     *
	     * @beta
	     * @remarks 本接口配置定义还在进行中
	     *
	     * ADD since EDA v4
	     * @returns 渲染配置
	     */
	    getRenderConfigurations(): Promise<any>;
	    /**
	     * 获取光线追踪光源配置
	     *
	     * @beta
	     * @remarks
	     * {@link PCB_RayTracerEngine.getRenderConfigurations | 获取光线追踪渲染配置} 接口中包含一种光源配置，本接口用于获取不同光源配置
	     *
	     * 本接口配置定义还在进行中
	     *
	     * ADD since EDA v4
	     * @returns 光源配置
	     */
	    getLightConfigurations(lightName: string): Promise<any>;
	}

	/**
	 * PCB & 封装 / 选择控制类
	 *
	 * @public
	 * @remarks 获取或操作选择的元素
	 */
	class PCB_SelectControl {
	    /**
	     * 查询所有已选中图元的图元 ID
	     *
	     * @beta
	     * @returns 所有已选中图元的图元 ID
	     */
	    getAllSelectedPrimitives_PrimitiveId(): Promise<Array<string>>;
	    /**
	     * 查询所有已选中图元的图元对象
	     *
	     * @beta
	     * @returns 所有已选中图元的图元对象
	     */
	    getAllSelectedPrimitives(): Promise<Array<IPCB_Primitive>>;
	    /**
	     * 查询选中图元的所有参数
	     *
	     * @beta
	     * @deprecated 请使用 {@link PCB_SelectControl.getAllSelectedPrimitives | getAllSelectedPrimitives} 替代
	     * @returns 选中图元的所有参数
	     */
	    getSelectedPrimitives(): Promise<Array<Object>>;
	    /**
	     * 使用图元 ID 选中图元
	     *
	     * @beta
	     * @param primitiveIds - 图元 ID
	     * @returns 操作是否成功
	     */
	    doSelectPrimitives(primitiveIds: string | Array<string>): Promise<boolean>;
	    /**
	     * 进行交叉选择
	     *
	     * @beta
	     * @param components - 器件位号
	     * @param pins - 器件位号_引脚编号，格式为 ['U1_1', 'U1_2']
	     * @param nets - 网络名称
	     * @param highlight - 是否高亮
	     * @param select - 操作是否成功
	     * @param canMove - 画布能否移动
	     */
	    doCrossProbeSelect(components?: Array<string>, pins?: Array<string>, nets?: Array<string>, highlight?: boolean, select?: boolean): Promise<boolean>;
	    /**
	     * 进行交叉选择
	     *
	     * @internal
	     * @param components - 器件位号
	     * @param pins - 引脚
	     * @param nets - 网络
	     */
	    doCrossProbeSelectByObject(components?: Array<string>, pins?: Array<string>, nets?: Array<string>): Promise<boolean>;
	    /**
	     * 清除选中
	     *
	     * @beta
	     * @returns 操作是否成功
	     */
	    clearSelected(): Promise<boolean>;
	    /**
	     * 获取当前鼠标在画布上的位置
	     *
	     * @beta
	     * @returns 鼠标在画布上的位置，`undefined` 代表当前鼠标不在画布上
	     */
	    getCurrentMousePosition(): Promise<{
	        x: number;
	        y: number;
	    } | undefined>;
	}

	/**
	 * 面板 / 文档操作类
	 *
	 * @public
	 * @remarks 对设计文档总体进行的操作
	 */
	class PNL_Document {
	    /**
	     * 保存文档
	     *
	     * @beta
	     * @returns 保存操作是否成功，保存失败、上传失败等错误均返回 `false`
	     */
	    save(): Promise<boolean>;
	}

	/**
	 * 图元类型
	 *
	 * @public
	 */
	enum ESCH_PrimitiveType {
	    /** 圆弧 */
	    ARC = "Arc",
	    /** 总线 */
	    BUS = "Bus",
	    /** 圆 */
	    CIRCLE = "Circle",
	    /** 器件 */
	    COMPONENT = "Component",
	    /** 器件引脚 */
	    COMPONENT_PIN = "ComponentPin",
	    /** 引脚 */
	    PIN = "Pin",
	    /** 多边形 */
	    POLYGON = "Polygon",
	    /** 矩形 */
	    RECTANGLE = "Rectangle",
	    /** 文本 */
	    TEXT = "Text",
	    /** 导线 */
	    WIRE = "Wire",
	    /** 二进制内嵌对象 */
	    OBJECT = "Object",
	    /** 三阶贝塞尔线条 */
	    BEZIER = "Bezier",
	    /** 椭圆 */
	    ELLIPSE = "Ellipse",
	    /** 属性 */
	    ATTRIBUTE = "Attribute"
	}
	/**
	 * 线型
	 *
	 * @public
	 */
	enum ESCH_PrimitiveLineType {
	    /** 实线 */
	    SOLID = 0,
	    /** 短划线 */
	    DASHED = 1,
	    /** 点线 */
	    DOTTED = 2,
	    /** 点划线 */
	    DOT_DASHED = 3
	}
	/**
	 * 填充样式
	 *
	 * @public
	 */
	enum ESCH_PrimitiveFillStyle {
	    /** 无 */
	    NONE = "None",
	    /** 实心 */
	    SOLID = "Solid",
	    /** 网格 */
	    GRID = "Grid",
	    /** 横线 */
	    HORIZONTAL_LINE = "Horizontal Line",
	    /** 竖线 */
	    VERTICAL_LINE = "Vertical Line",
	    /** 菱形网格 */
	    RHOMBIC_GRID = "Rhombic Grid",
	    /** 左斜线 */
	    LEFT_SLASH_LINE = "Left Slash Line",
	    /** 右斜线 */
	    RIGHT_SLASH_LINE = "Right Slash Line"
	}
	/**
	 * 原理图 & 符号 / 图元类
	 *
	 * @public
	 * @remarks 图元的统一操作
	 */
	class SCH_Primitive {
	    /**
	     * 获取指定 ID 的图元的图元类型
	     *
	     * @beta
	     * @param id - 图元 ID
	     * @returns 图元类型
	     */
	    getPrimitiveTypeByPrimitiveId(id: string): Promise<ESCH_PrimitiveType | undefined>;
	    /**
	     * 获取指定 ID 的图元的所有属性
	     *
	     * @public
	     * @param id - 图元 ID
	     * @returns 图元的所有属性
	     */
	    getPrimitiveByPrimitiveId(id: string): Promise<ISCH_Primitive | undefined>;
	    /**
	     * 获取指定所有 ID 的图元的所有属性
	     *
	     * @alpha
	     * @param ids - 图元 ID 数组
	     * @returns 所有图元的所有属性
	     */
	    getPrimitivesByPrimitiveId(ids: Array<string>): Promise<Array<ISCH_Primitive>>;
	    /**
	     * 获取图元的 BBox
	     *
	     * @beta
	     * @param primitiveIds - 图元 ID 数组或图元对象数组
	     * @returns 图元的 BBox，如若图元不存在或没有 BBox，将会返回 `undefined` 的结果
	     */
	    getPrimitivesBBox(primitiveIds: Array<string | ISCH_Primitive>): Promise<{
	        minX: number;
	        minY: number;
	        maxX: number;
	        maxY: number;
	    } | undefined>;
	}

	/**
	 * 原理图图元接口
	 *
	 * @public
	 */
	interface ISCH_PrimitiveAPI {
	    create: (...args: any[]) => ISCH_Primitive | undefined | Promise<ISCH_Primitive> | Promise<ISCH_Primitive | undefined>;
	    delete: (primitiveIds: string | any | Array<string> | Array<any>) => boolean | Promise<boolean>;
	    modify: (primitiveId: string | any, ...args: any[]) => ISCH_Primitive | undefined | Promise<ISCH_Primitive> | Promise<ISCH_Primitive | undefined>;
	    get: {
	        (primitiveIds: string): ISCH_Primitive | undefined | Promise<ISCH_Primitive | undefined>;
	        (primitiveIds: Array<string>): Array<ISCH_Primitive> | Promise<Array<ISCH_Primitive>>;
	    };
	    getAllPrimitiveId: (...args: any[]) => Array<string> | Promise<Array<string>>;
	    getAll: (...args: any[]) => Array<ISCH_Primitive> | Promise<Array<ISCH_Primitive>>;
	}
	/**
	 * 原理图图元
	 *
	 * @public
	 */
	interface ISCH_Primitive {
	    getState_PrimitiveType: () => ESCH_PrimitiveType;
	    getState_PrimitiveId: () => string;
	    create: () => ISCH_Primitive | Promise<ISCH_Primitive>;
	    toAsync: () => ISCH_Primitive;
	    toSync: () => ISCH_Primitive;
	    isAsync: () => boolean;
	    reset: () => ISCH_Primitive | Promise<ISCH_Primitive>;
	    done: () => ISCH_Primitive | Promise<ISCH_Primitive>;
	}

	/**
	 * 原理图 & 符号 / 文档操作类
	 *
	 * @public
	 * @remarks 对设计文档总体进行的操作
	 */
	class SCH_Document {
	    /**
	     * 从 PCB 导入变更
	     *
	     * @public
	     * @returns 导入操作是否成功，导入失败或游离原理图返回 `false`
	     */
	    importChanges(): Promise<boolean>;
	    /**
	     * 保存文档
	     *
	     * @public
	     * @returns 保存操作是否成功，保存失败、上传失败等错误均返回 `false`
	     */
	    save(): Promise<boolean>;
	    /**
	     * 定位到画布坐标
	     *
	     * @alpha
	     * @remarks
	     * 本接口在前端画布上定位到指定的坐标；
	     *
	     * 此处的单位跨度为 0.01inch
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @returns 操作是否成功
	     */
	    navigateToCoordinates(x: number, y: number): Promise<boolean>;
	    /**
	     * 定位到画布区域
	     *
	     * @alpha
	     * @remarks
	     * 本接口在前端画布上定位到指定的区域；
	     *
	     * 例如：传入数据为 `{left: 0, right: 60, top: 100, bottom: -20}` =\> `navigateToRegion(0, 60, 100, -20)`，
	     * 则画布将会定位到以 `[30, 40]` 为中心的，`x` 轴方向长度为 `60`，`y` 轴方向长度为 `120` 的矩形范围；
	     *
	     * 本接口不进行缩放操作，但会生成指示定位中心及表示区域范围的矩形框；
	     *
	     * 此处的单位跨度为 0.01inch
	     * @param left - 矩形框第一 X 坐标
	     * @param right - 矩形框第二 X 坐标
	     * @param top - 矩形框第一 Y 坐标
	     * @param bottom - 矩形框第二 Y 坐标
	     * @returns 操作是否成功
	     */
	    navigateToRegion(left: number, right: number, top: number, bottom: number): Promise<boolean>;
	    /**
	     * 获取坐标点的图元
	     *
	     * @alpha
	     * @remarks 本操作和前端鼠标点击操作类似，将会获取指定坐标点上的图元
	     * @param x - 坐标点 X
	     * @param y - 坐标点 Y
	     * @returns 坐标点的图元，如若坐标点无法找到图元，将返回 `undefined`
	     */
	    getPrimitiveAtPoint(x: number, y: number): ISCH_Primitive | undefined;
	    /**
	     * 获取区域内所有图元
	     *
	     * @alpha
	     * @param left - 矩形框第一 X 坐标
	     * @param right - 矩形框第二 X 坐标
	     * @param top - 矩形框第一 Y 坐标
	     * @param bottom - 矩形框第二 Y 坐标
	     * @returns 区域内所有图元
	     */
	    getPrimitivesInRegion(left: number, right: number, top: number, bottom: number): Array<ISCH_Primitive>;
	    /**
	     * 获取当前画布过滤器配置
	     *
	     * @alpha
	     * @returns 当前画布过滤器配置，`undefined` 为获取失败
	     */
	    getCurrentFilterConfiguration(): Promise<{
	        [key: string]: any;
	    } | undefined>;
	    /**
	     * 自动布线
	     *
	     * @beta
	     * @param props - 自动布线参数
	     * @returns 结果
	     */
	    autoRouting(props?: {
	        uuids?: Array<string>;
	        netlist?: {
	            component: {
	                [uniqueId: string]: {
	                    pinInfoMap: {
	                        [key: string]: {
	                            name: string;
	                            number: string;
	                            net: string;
	                            props: {
	                                'Pin Number': string;
	                            };
	                        };
	                    };
	                };
	            };
	        };
	        designatorDeviceTypeMap?: {
	            [designator: string]: 'resistor' | 'capacitor' | 'inductive' | 'diode' | 'triode' | 'oscillator' | 'chip' | 'otherDevice';
	        };
	    }): Promise<any>;
	    /**
	     * 自动布局
	     *
	     * @beta
	     * @param props - 自动布局参数
	     * @returns 结果
	     */
	    autoLayout(props?: {
	        uuids?: Array<string>;
	        netlist?: {
	            component: {
	                [uniqueId: string]: {
	                    pinInfoMap: {
	                        [key: string]: {
	                            name: string;
	                            number: string;
	                            net: string;
	                            props: {
	                                'Pin Number': string;
	                            };
	                        };
	                    };
	                };
	            };
	        };
	        designatorDeviceTypeMap?: {
	            [designator: string]: 'resistor' | 'capacitor' | 'inductive' | 'diode' | 'triode' | 'oscillator' | 'chip' | 'otherDevice';
	        };
	    }): Promise<any>;
	}

	/**
	 * 原理图 & 符号 / 设计规则检查（DRC）类
	 *
	 * @public
	 * @remarks 检查、设定 DRC 规则
	 */
	class SCH_Drc {
	    /**
	     * 检查 DRC
	     *
	     * @beta
	     * @param strict - 是否严格检查，当前原理图统一为严格检查模式
	     * @param userInterface - 是否显示 UI（呼出底部 DRC 窗口）
	     * @param includeVerboseError - 是否在返回值中包含详细错误信息，如若为 `true`，则返回值将始终为数组
	     * @returns DRC 检查是否通过
	     */
	    check(strict: boolean, userInterface: boolean, includeVerboseError: false): Promise<boolean>;
	    /**
	     * 检查 DRC
	     *
	     * @beta
	     * @param strict - 是否严格检查，当前原理图统一为严格检查模式
	     * @param userInterface - 是否显示 UI（呼出底部 DRC 窗口）
	     * @param includeVerboseError - 是否在返回值中包含详细错误信息，如若为 `true`，则返回值将始终为数组
	     * @returns DRC 检查的详细结果
	     */
	    check(strict: boolean, userInterface: boolean, includeVerboseError: true): Promise<Array<any>>;
	}

	/**
	 * 鼠标事件类型
	 *
	 * @public
	 */
	enum ESCH_MouseEventType {
	    /** 选中 */
	    SELECTED = "selected",
	    /** 取消选中 */
	    CLEAR_SELECTED = "clearSelected"
	}
	/**
	 * 图元事件类型
	 *
	 * @public
	 */
	enum ESCH_PrimitiveEventType {
	    /** 删除 */
	    DELETE = "delete",
	    /** 创建 */
	    CREATE = "create",
	    /** 移动 */
	    MOVE = "move",
	    /** 属性变更（除位置外的属性变更） */
	    CHANGE = "change"
	}
	/**
	 * 动态仿真引擎拉取事件类型
	 *
	 * @public
	 */
	enum ESCH_DynamicSimulationEnginePullEventType {
	    /** 开始动态仿真会话 */
	    SESSION_START = "SESSION_START",
	    /** 暂停 */
	    SESSION_PAUSE = "SESSION_PAUSE",
	    /** 恢复 */
	    SESSION_RESUME = "SESSION_RESUME",
	    /** 停止并释放资源 */
	    SESSION_STOP = "SESSION_STOP",
	    /** 查询动态仿真状态 */
	    SESSION_STATE_QUERY = "SESSION_STATE_QUERY",
	    /** 设置速度 */
	    SPEED_SET = "SPEED_SET",
	    /** 更新元件属性 */
	    COMPONENT_UPDATE = "COMPONENT_UPDATE"
	}
	/**
	 * Spice 仿真引擎拉取事件类型
	 *
	 * @public
	 */
	enum ESCH_SpiceSimulationEnginePullEventType {
	    /** 仿真网表 */
	    SIMULATE_NETLIST = "SIMULATE_NETLIST",
	    /** 验证网表 */
	    VALIDATE_NETLIST = "VALIDATE_NETLIST"
	}
	/**
	 * 原理图 & 符号 / 事件类
	 *
	 * @public
	 * @remarks 注册事件回调
	 */
	class SCH_Event {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 新增鼠标事件监听
	     *
	     * @public
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addMouseEventListener(id: string, eventType: 'all' | ESCH_MouseEventType, callFn: (eventType: ESCH_MouseEventType) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 新增图元事件监听
	     *
	     * @beta
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     * @param onlyOnce - 是否仅监听一次
	     */
	    addPrimitiveEventListener(id: string, eventType: 'all' | ESCH_PrimitiveEventType, callFn: (eventType: ESCH_PrimitiveEventType, props: {
	        primitiveIds: Array<string>;
	    }) => void | Promise<void>, onlyOnce?: boolean): void;
	    /**
	     * 注册仿真引擎拉取事件监听
	     *
	     * @beta
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param eventType - 事件类型
	     * @param callFn - 事件触发时的回调函数
	     */
	    addSimulationEnginePullEventListener(id: string, eventType: 'all', callFn: (eventType: ESCH_DynamicSimulationEnginePullEventType | ESCH_SpiceSimulationEnginePullEventType, props: {
	        [key: string]: any;
	    }) => void | Promise<void>): void;
	    /**
	     * 移除事件监听
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 是否移除指定事件监听
	     */
	    removeEventListener(id: string): boolean;
	    /**
	     * 查询事件监听是否存在
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 事件监听是否存在
	     */
	    isEventListenerAlreadyExist(id: string): boolean;
	}

	/**
	 * 导出文档文件类型
	 *
	 * @public
	 */
	enum ESCH_ExportDocumentFileType {
	    /** PDF 文档 */
	    PDF = "PDF",
	    /** PNG 位图 */
	    PNG = "PNG",
	    /** SVG 矢量图 */
	    SVG = "SVG"
	}
	/**
	 * 仿真网表类型
	 *
	 * @public
	 */
	enum ESCH_SimulationNetlistType {
	    /** NGspice */
	    NGSPICE = "NGspice"
	}
	/**
	 * 原理图 & 符号 / 生产资料类
	 *
	 * @public
	 * @remarks 获取当前原理图图页的生产资料文件及快捷下单
	 */
	class SCH_ManufactureData {
	    /**
	     * 获取装配体变量配置列表
	     *
	     * @beta
	     * @returns 装配体变量配置列表
	     */
	    getAssemblyVariantsConfigs(): Promise<Array<{
	        text: string;
	        value: string;
	    }>>;
	    /**
	     * 获取 BOM 模板列表
	     *
	     * @alpha
	     * @returns BOM 模板列表
	     */
	    getBomTemplates(): Promise<Array<string>>;
	    /**
	     * 上传 BOM 模板文件
	     *
	     * @alpha
	     * @param templateFile - BOM 模板文件
	     * @param template - BOM 模板名称，如若为 `undefined` 则自动从 `templateFile` 中取值
	     * @returns BOM 模板名称
	     */
	    uploadBomTemplateFile(templateFile: File, template?: string): Promise<string | undefined>;
	    /**
	     * 获取 BOM 模板文件
	     *
	     * @alpha
	     * @param template - BOM 模板名称
	     * @returns BOM 模板文件
	     */
	    getBomTemplateFile(template: string): Promise<File | undefined>;
	    /**
	     * 删除 BOM 模板
	     *
	     * @alpha
	     * @param template - BOM 模板名称
	     * @returns 操作是否成功
	     */
	    deleteBomTemplate(template: string): Promise<boolean>;
	    /**
	     * 获取 BOM 文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @param template - 模板名称
	     * @param filterOptions - 过滤规则，仅应包含需要启用的规则，`property` 为规则名称，`includeValue` 为匹配的值
	     * @param statistics - 统计，包含所有需要启用的统计项的名称
	     * @param property - 属性，包含所有需要启用的属性的名称
	     * @param columns - 列的属性及排序，`title`、`sort`、`group`、`orderWeight` 不传入则取默认值，`null` 代表 **无** 或 **空**
	     * @param assemblyVariantsConfig - 装配体变量配置
	     * @returns BOM 文件数据
	     */
	    getBomFile(fileName?: string, fileType?: 'xlsx' | 'csv', template?: string, filterOptions?: Array<{
	        property: string;
	        includeValue: boolean | string;
	    }>, statistics?: Array<string>, property?: Array<string>, columns?: Array<IPCB_BomPropertiesTableColumns>, assemblyVariantsConfig?: {
	        text: string;
	        value: string;
	    }): Promise<File | undefined>;
	    /**
	     * 获取网表文件（Netlist）
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param netlistType - 网表类型
	     * @returns 网表文件数据
	     */
	    getNetlistFile(fileName?: string, netlistType?: ESYS_NetlistType): Promise<File | undefined>;
	    /**
	     * 获取仿真网表文件
	     *
	     * @beta
	     * @remarks 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param netlistType - 网表类型
	     * @returns 仿真网表文件数据
	     */
	    getSimulationNetlistFile(fileName?: string, netlistType?: ESCH_SimulationNetlistType): Promise<File | undefined>;
	    /**
	     * 获取导出文档文件
	     *
	     * @beta
	     * @remarks
	     * 可以使用 {@link SYS_FileSystem.saveFile} 接口将文件导出到本地文件系统
	     * @param fileName - 文件名
	     * @param fileType - 文件类型
	     * @param typeSpecificParams - 类型特定参数
	     * @param object - 对象
	     * @param objectSpecificParams - 对象特定参数
	     * @returns 导出文档文件数据（或压缩包）
	     */
	    getExportDocumentFile(fileName?: string, fileType?: ESCH_ExportDocumentFileType, typeSpecificParams?: {
	        theme?: 'Default' | 'White on Black' | 'Black on White';
	        lineWidth?: 'Default' | 'Always 1px' | 'Follow the Zoom Change';
	        displayAttributesAsMenu?: boolean;
	        size?: 'Original Size' | string | {
	            width: number;
	            height: number;
	            unit: ESYS_Unit.INCH | ESYS_Unit.MILLIMETER;
	        };
	    }, object?: 'All Schematic' | 'Current Schematic' | 'Current Schematic Page' | string, objectSpecificParams?: {
	        range?: 'All' | [number, number];
	        outputMethod?: 'Merged sheet' | 'Separated sheet';
	    }): Promise<File | undefined>;
	    /**
	     * 元件下单
	     *
	     * @beta
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    placeComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	    /**
	     * SMT 元件下单
	     *
	     * @beta
	     * @param interactive - 是否启用交互式检查
	     *
	     * 如若启用，则会存在弹窗等待用户进行交互，且无法使用 `ignoreWarning` 参数忽略警告，
	     * 即 `ignoreWarning` 参数将被忽略；
	     *
	     * 如若禁用，则在调用后不会有任何 EDA 内部弹窗，程序执行静默检查，
	     * 如若达成下单条件，将返回 `true` 并在新标签页打开下单页面
	     * @param ignoreWarning - 在非交互式检查时忽略警告
	     *
	     * 如果设置为 `true`，将会忽略所有检查警告项并尽可能生成下单资料；
	     *
	     * 如果设置为 `false`，存在任意警告将中断执行并返回 `false` 的结果
	     * @returns 是否通过下单检查
	     */
	    placeSmtComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>;
	}

	/**
	 * 工程网络属性
	 *
	 * @public
	 */
	interface ISCH_ProjectNetInfo {
	    /** 原理图名称 */
	    schematicName: string;
	    /** 原理图 UUID */
	    schematicUuid: string;
	    /** 板子名称 */
	    boardName: string;
	    /** 网络 */
	    nets: Array<ISCH_NetInfo>;
	}
	/**
	 * 网络属性
	 *
	 * @public
	 */
	interface ISCH_NetInfo {
	    /** 网络名称 */
	    net: string;
	    /** 导线 */
	    wires: Array<ISCH_WireInfo>;
	}
	/**
	 * 导线属性
	 *
	 * @public
	 */
	interface ISCH_WireInfo {
	    /** 导线名称 */
	    name: string;
	    /** ID */
	    id: string;
	    /** 全局网络名 */
	    globalNetName: string;
	    /** 原理图图页名称 */
	    pageName: string;
	    /** 原理图图页 UUID */
	    pageUuid: string;
	}
	/**
	 * 原理图 & 符号 / 网络类
	 *
	 * @public
	 */
	class SCH_Net {
	    /**
	     * 获取当前工程下所有网络的详细信息
	     *
	     * @alpha
	     * @returns 当前工程下所有网络的详细信息
	     */
	    getCurrentProjectAllNets(): Promise<Array<ISCH_ProjectNetInfo>>;
	    /**
	     * 获取所有网络的详细信息
	     *
	     * @alpha
	     * @returns 所有网络的详细信息
	     */
	    getAllNets(): Promise<Array<ISCH_NetInfo>>;
	    /**
	     * 获取指定网络的详细信息
	     *
	     * @alpha
	     * @param net - 网络名称
	     * @returns 网络的详细信息, `undefined` 为不存在该网络
	     */
	    getNet(net: string): Promise<ISCH_NetInfo | undefined>;
	    /**
	     * 获取所有网络的网络名称
	     *
	     * @alpha
	     * @returns 网络名称数组
	     */
	    getAllNetsName(): Promise<Array<string>>;
	}

	/**
	 * 原理图 & 符号 / 网表类
	 *
	 * @public
	 * @remarks 获取、更新网表
	 */
	class SCH_Netlist {
	    /**
	     * 获取网表
	     *
	     * @public
	     * @deprecated 请使用 {@link SCH_ManufactureData.getNetlistFile} 替代
	     * @param type - 网表格式
	     * @returns 网表数据
	     */
	    getNetlist(type?: ESYS_NetlistType): Promise<string>;
	    /**
	     * 更新网表
	     *
	     * @beta
	     * @param type - 网表格式
	     * @param netlist - 网表数据
	     */
	    setNetlist(type: ESYS_NetlistType | undefined, netlist: string): Promise<void>;
	}

	/**
	 * 原理图 & 符号 / 圆弧图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveArc implements ISCH_PrimitiveAPI {
	    /**
	     * 创建圆弧
	     *
	     * @beta
	     * @param startX - 起始点 X
	     * @param startY - 起始点 Y
	     * @param referenceX - 参考点 X
	     * @param referenceY - 参考点 Y
	     * @param endX - 终止点 X
	     * @param endY - 终止点 Y
	     * @param color - 颜色，`null` 表示默认
	     * @param fillColor - 填充颜色，`none` 表示无填充，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @returns 圆弧图元对象
	     */
	    create(startX: number, startY: number, referenceX: number, referenceY: number, endX: number, endY: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveArc | undefined>;
	    /**
	     * 删除圆弧
	     *
	     * @beta
	     * @param primitiveIds - 圆弧的图元 ID 或圆弧图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveArc | Array<string> | Array<ISCH_PrimitiveArc>): Promise<boolean>;
	    /**
	     * 修改圆弧
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 圆弧图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveArc, property: {
	        startX?: number;
	        startY?: number;
	        referenceX?: number;
	        referenceY?: number;
	        endX?: number;
	        endY?: number;
	        color?: string | null;
	        fillColor?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	    }): Promise<ISCH_PrimitiveArc | undefined>;
	    /**
	     * 获取圆弧
	     *
	     * @beta
	     * @param primitiveIds - 圆弧的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆弧图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveArc | undefined>;
	    /**
	     * 获取圆弧
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 圆弧的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆弧图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveArc>>;
	    /**
	     * 获取所有圆弧的图元 ID
	     *
	     * @beta
	     * @returns 圆弧的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有圆弧
	     *
	     * @beta
	     * @returns 圆弧图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveArc>>;
	}
	/**
	 * 圆弧图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveArc implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 起始点 X */
	    private startX;
	    /** 起始点 Y */
	    private startY;
	    /** 参考点 X */
	    private referenceX;
	    /** 参考点 Y */
	    private referenceY;
	    /** 终止点 X */
	    private endX;
	    /** 终止点 Y */
	    private endY;
	    /** 颜色 */
	    private color;
	    /** 填充颜色 */
	    private fillColor;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** @internal */
	    constructor(startX: number, startY: number, referenceX: number, referenceY: number, endX: number, endY: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 圆弧图元对象
	     */
	    create(): Promise<ISCH_PrimitiveArc>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：起始点 X
	     *
	     * @public
	     * @returns 起始点 X
	     */
	    getState_StartX(): number;
	    /**
	     * 获取属性状态：起始点 Y
	     *
	     * @public
	     * @returns 起始点 Y
	     */
	    getState_StartY(): number;
	    /**
	     * 获取属性状态：参考点 X
	     *
	     * @public
	     * @returns 参考点 X
	     */
	    getState_ReferenceX(): number;
	    /**
	     * 获取属性状态：参考点 Y
	     *
	     * @public
	     * @returns 参考点 Y
	     */
	    getState_ReferenceY(): number;
	    /**
	     * 获取属性状态：终止点 X
	     *
	     * @public
	     * @returns 终止点 X
	     */
	    getState_EndX(): number;
	    /**
	     * 获取属性状态：终止点 Y
	     *
	     * @public
	     * @returns 终止点 Y
	     */
	    getState_EndY(): number;
	    /**
	     * 获取属性状态：颜色
	     *
	     * @public
	     * @returns 颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：填充颜色
	     *
	     * @public
	     * @returns 填充颜色
	     */
	    getState_FillColor(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 设置属性状态：起始点 X
	     *
	     * @beta
	     * @param startX - 起始点 X
	     * @returns 圆弧图元对象
	     */
	    setState_StartX(startX: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：起始点 Y
	     *
	     * @beta
	     * @param startY - 起始点 Y
	     * @returns 圆弧图元对象
	     */
	    setState_StartY(startY: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：参考点 X
	     *
	     * @beta
	     * @param referenceX - 参考点 X
	     * @returns 圆弧图元对象
	     */
	    setState_ReferenceX(referenceX: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：参考点 Y
	     *
	     * @beta
	     * @param referenceY - 参考点 Y
	     * @returns 圆弧图元对象
	     */
	    setState_ReferenceY(referenceY: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：终止点 X
	     *
	     * @beta
	     * @param endX - 终止点 X
	     * @returns 圆弧图元对象
	     */
	    setState_EndX(endX: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：终止点 Y
	     *
	     * @beta
	     * @param endY - 终止点 Y
	     * @returns 圆弧图元对象
	     */
	    setState_EndY(endY: number): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：颜色
	     *
	     * @beta
	     * @param color - 颜色
	     * @returns 圆弧图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：填充颜色
	     *
	     * @beta
	     * @param fillColor - 填充颜色
	     * @returns 圆弧图元对象
	     */
	    setState_FillColor(fillColor: string | null): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 圆弧图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitiveArc;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 圆弧图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitiveArc;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 圆弧图元对象
	     */
	    toAsync(): ISCH_PrimitiveArc;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 圆弧图元对象
	     */
	    toSync(): ISCH_PrimitiveArc;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 圆弧图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveArc>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 圆弧图元对象
	     */
	    done(): Promise<ISCH_PrimitiveArc>;
	}

	/**
	 * 文本对齐模式
	 *
	 * @public
	 */
	enum ESCH_PrimitiveTextAlignMode {
	    /** 左上 */
	    LEFT_TOP = 1,
	    /** 左中 */
	    LEFT_MIDDLE = 2,
	    /** 左下 */
	    LEFT_BOTTOM = 3,
	    /** 中上 */
	    CENTER_TOP = 4,
	    /** 中心 */
	    CENTER = 5,
	    /** 中下 */
	    CENTER_BOTTOM = 6,
	    /** 右上 */
	    RIGHT_TOP = 7,
	    /** 右中 */
	    RIGHT_MIDDLE = 8,
	    /** 右下 */
	    RIGHT_BOTTOM = 9
	}
	/**
	 * 原理图 & 符号 / 文本图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveText implements ISCH_PrimitiveAPI {
	    /**
	     * 创建文本
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param content - 文本内容
	     * @param rotation - 旋转角度，可选 `0` `90` `180` `270`
	     * @param textColor - 文本颜色，`null` 表示默认
	     * @param fontName - 字体名称，`null` 表示默认
	     * @param fontSize - 字体大小，`null` 表示默认
	     * @param bold - 是否加粗
	     * @param italic - 是否斜体
	     * @param underLine - 是否加下划线
	     * @param alignMode - 对齐模式
	     * @returns 文本图元对象
	     */
	    create(x: number, y: number, content: string, rotation?: number, textColor?: string | null, fontName?: string | null, fontSize?: number | null, bold?: boolean, italic?: boolean, underLine?: boolean, alignMode?: ESCH_PrimitiveTextAlignMode): Promise<ISCH_PrimitiveText | undefined>;
	    /**
	     * 删除文本
	     *
	     * @beta
	     * @param primitiveIds - 文本的图元 ID 或文本图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveText | Array<string> | Array<ISCH_PrimitiveText>): Promise<boolean>;
	    /**
	     * 修改文本
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 文本图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveText, property: {
	        x?: number;
	        y?: number;
	        content?: string;
	        rotation?: number;
	        textColor?: string | null;
	        fontName?: string | null;
	        fontSize?: number | null;
	        bold?: boolean;
	        italic?: boolean;
	        underLine?: boolean;
	        alignMode?: ESCH_PrimitiveTextAlignMode;
	    }): Promise<ISCH_PrimitiveText | undefined>;
	    /**
	     * 获取文本
	     *
	     * @beta
	     * @param primitiveIds - 文本的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 文本图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveText | undefined>;
	    /**
	     * 获取文本
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 文本的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 文本图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveText>>;
	    /**
	     * 获取所有文本的图元 ID
	     *
	     * @beta
	     * @returns 文本的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有文本
	     *
	     * @beta
	     * @returns 文本图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveText>>;
	}
	/**
	 * 文本图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveText implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 文本内容 */
	    private content;
	    /** 旋转角度 */
	    private rotation;
	    /** 文本颜色 */
	    private textColor;
	    /** 字体名称 */
	    private fontName;
	    /** 字体大小 */
	    private fontSize;
	    /** 是否加粗 */
	    private bold;
	    /** 是否斜体 */
	    private italic;
	    /** 是否加下划线 */
	    private underLine;
	    /** 对齐模式 */
	    private alignMode;
	    /** @internal */
	    constructor(x: number, y: number, content: string, rotation: number, textColor: string | null, fontName: string | null, fontSize: number | null, bold: boolean, italic: boolean, underLine: boolean, alignMode: ESCH_PrimitiveTextAlignMode, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 文本图元对象
	     */
	    create(): Promise<ISCH_PrimitiveText>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：文本内容
	     *
	     * @public
	     * @returns 文本内容
	     */
	    getState_Content(): string;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：文本颜色
	     *
	     * @public
	     * @returns 文本颜色
	     */
	    getState_TextColor(): string | null;
	    /**
	     * 获取属性状态：字体名称
	     *
	     * @public
	     * @returns 字体名称
	     */
	    getState_FontName(): string | null;
	    /**
	     * 获取属性状态：字体大小
	     *
	     * @public
	     * @returns 字体大小
	     */
	    getState_FontSize(): number | null;
	    /**
	     * 获取属性状态：是否加粗
	     *
	     * @public
	     * @returns 是否加粗
	     */
	    getState_Bold(): boolean;
	    /**
	     * 获取属性状态：是否斜体
	     *
	     * @public
	     * @returns 是否斜体
	     */
	    getState_Italic(): boolean;
	    /**
	     * 获取属性状态：是否加下划线
	     *
	     * @public
	     * @returns 是否加下划线
	     */
	    getState_UnderLine(): boolean;
	    /**
	     * 获取属性状态：对齐模式
	     *
	     * @public
	     * @returns 对齐模式
	     */
	    getState_AlignMode(): ESCH_PrimitiveTextAlignMode;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 文本图元对象
	     */
	    setState_X(x: number): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 文本图元对象
	     */
	    setState_Y(y: number): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：文本内容
	     *
	     * @beta
	     * @param content - 文本内容
	     * @returns 文本图元对象
	     */
	    setState_Content(content: string): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 文本图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：文本颜色
	     *
	     * @beta
	     * @param textColor - 文本颜色
	     * @returns 文本图元对象
	     */
	    setState_TextColor(textColor: string | null): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：字体名称
	     *
	     * @beta
	     * @param fontName - 字体名称
	     * @returns 文本图元对象
	     */
	    setState_FontName(fontName: string | null): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：字体大小
	     *
	     * @beta
	     * @param fontSize - 字体大小
	     * @returns 文本图元对象
	     */
	    setState_FontSize(fontSize: number | null): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：是否加粗
	     *
	     * @beta
	     * @param bold - 是否加粗
	     * @returns 文本图元对象
	     */
	    setState_Bold(bold: boolean): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：是否斜体
	     *
	     * @beta
	     * @param italic - 是否斜体
	     * @returns 文本图元对象
	     */
	    setState_Italic(italic: boolean): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：是否加下划线
	     *
	     * @beta
	     * @param underLine - 是否加下划线
	     * @returns 文本图元对象
	     */
	    setState_UnderLine(underLine: boolean): ISCH_PrimitiveText;
	    /**
	     * 设置属性状态：对齐模式
	     *
	     * @beta
	     * @param alignMode - 对齐模式
	     * @returns 文本图元对象
	     */
	    setState_AlignMode(alignMode: ESCH_PrimitiveTextAlignMode): ISCH_PrimitiveText;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 文本图元对象
	     */
	    toAsync(): ISCH_PrimitiveText;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 文本图元对象
	     */
	    toSync(): ISCH_PrimitiveText;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 文本图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveText>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 文本图元对象
	     */
	    done(): Promise<ISCH_PrimitiveText>;
	}

	/**
	 * 原理图 & 符号 / 属性图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveAttribute implements ISCH_PrimitiveAPI {
	    /**
	     * 创建属性
	     *
	     * @internal
	     * @remarks 属性图元不支持新建，本接口调用将不会有任何效果
	     * @returns `undefined`
	     */
	    create(): undefined;
	    /**
	     * 删除属性
	     *
	     * @internal
	     * @remarks 属性图元不支持删除，本接口调用将不会有任何效果
	     * @returns `false`
	     */
	    delete(): boolean;
	    /**
	     * 修改属性
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 属性图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveAttribute, property: {
	        x?: number | null;
	        y?: number | null;
	        rotation?: number | null;
	        color?: string | null;
	        fontName?: string | null;
	        fontSize?: number | null;
	        bold?: boolean | null;
	        italic?: boolean | null;
	        underLine?: boolean | null;
	        alignMode?: ESCH_PrimitiveTextAlignMode | null;
	        fillColor?: string | null;
	        key?: string;
	        value?: string;
	        keyVisible?: boolean | null;
	        valueVisible?: boolean | null;
	    }): Promise<ISCH_PrimitiveAttribute | undefined>;
	    /**
	     * 获取属性
	     *
	     * @beta
	     * @param primitiveIds - 属性的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 属性图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveAttribute | undefined>;
	    /**
	     * 获取属性
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 属性的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 属性图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveAttribute>>;
	    /**
	     * 获取所有属性的图元 ID
	     *
	     * @beta
	     * @remarks 不传递父图元 ID 将拿到图页中的所有属性图元
	     * @param parentPrimitiveId - 父图元 ID
	     * @returns 属性的图元 ID 数组
	     */
	    getAllPrimitiveId(parentPrimitiveId?: string): Promise<Array<string>>;
	    /**
	     * 获取所有属性
	     *
	     * @beta
	     * @remarks 不传递父图元 ID 将拿到图页中的所有属性图元
	     * @param parentPrimitiveId - 父图元 ID
	     * @returns 属性图元对象数组
	     */
	    getAll(parentPrimitiveId?: string): Promise<Array<ISCH_PrimitiveAttribute>>;
	    /**
	     * 创建网络标签
	     *
	     * @alpha
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param net - 网络名称
	     * @returns 网络标签属性图元
	     */
	    createNetLabel(x: number, y: number, net: string): Promise<ISCH_PrimitiveAttribute | undefined>;
	}
	/**
	 * 属性图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveAttribute implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 旋转角度 */
	    private rotation;
	    /** 文本颜色 */
	    private color;
	    /** 字体名称 */
	    private fontName;
	    /** 字体大小 */
	    private fontSize;
	    /** 是否加粗 */
	    private bold;
	    /** 是否斜体 */
	    private italic;
	    /** 是否加下划线 */
	    private underLine;
	    /** 对齐模式 */
	    private alignMode;
	    /** 填充颜色 */
	    private fillColor;
	    /** 键 */
	    private key;
	    /** 值 */
	    private value;
	    /** 键是否显示 */
	    private keyVisible;
	    /** 值是否显示 */
	    private valueVisible;
	    /** 父图元 ID */
	    private parentPrimitiveId;
	    /** @internal */
	    constructor(x: number, y: number, rotation: number, color: string | null, fontName: string | null, fontSize: number | null, bold: boolean | null, italic: boolean | null, underLine: boolean | null, alignMode: ESCH_PrimitiveTextAlignMode | null, fillColor: string | null, key: string, value: string, keyVisible: boolean | null, valueVisible: boolean | null, parentPrimitiveId: string, primitiveId: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @remarks 属性图元不支持新建，本接口调用将不会有任何效果
	     * @returns 属性图元对象
	     */
	    create(): ISCH_PrimitiveAttribute;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number | null;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number | null;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number | null;
	    /**
	     * 获取属性状态：文本颜色
	     *
	     * @public
	     * @returns 文本颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：字体名称
	     *
	     * @public
	     * @returns 字体名称
	     */
	    getState_FontName(): string | null;
	    /**
	     * 获取属性状态：字体大小
	     *
	     * @public
	     * @returns 字体大小
	     */
	    getState_FontSize(): number | null;
	    /**
	     * 获取属性状态：是否加粗
	     *
	     * @public
	     * @returns 是否加粗
	     */
	    getState_Bold(): boolean | null;
	    /**
	     * 获取属性状态：是否斜体
	     *
	     * @public
	     * @returns 是否斜体
	     */
	    getState_Italic(): boolean | null;
	    /**
	     * 获取属性状态：是否加下划线
	     *
	     * @public
	     * @returns 是否加下划线
	     */
	    getState_UnderLine(): boolean | null;
	    /**
	     * 获取属性状态：对齐模式
	     *
	     * @public
	     * @returns 对齐模式
	     */
	    getState_AlignMode(): ESCH_PrimitiveTextAlignMode | null;
	    /**
	     * 获取属性状态：填充颜色
	     *
	     * @public
	     * @returns 填充颜色
	     */
	    getState_FillColor(): string | null;
	    /**
	     * 获取属性状态：键
	     *
	     * @public
	     * @returns 键
	     */
	    getState_Key(): string;
	    /**
	     * 获取属性状态：值
	     *
	     * @public
	     * @returns 值
	     */
	    getState_Value(): string;
	    /**
	     * 获取属性状态：键是否显示
	     *
	     * @public
	     * @returns 键是否显示
	     */
	    getState_KeyVisible(): boolean | null;
	    /**
	     * 获取属性状态：值是否显示
	     *
	     * @public
	     * @returns 值是否显示
	     */
	    getState_ValueVisible(): boolean | null;
	    /**
	     * 获取属性状态：父图元 ID
	     *
	     * @public
	     * @returns 父图元 ID
	     */
	    getState_ParentPrimitiveId(): string;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 属性图元对象
	     */
	    setState_X(x: number | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 属性图元对象
	     */
	    setState_Y(y: number | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 属性图元对象
	     */
	    setState_Rotation(rotation: number | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：文本颜色
	     *
	     * @beta
	     * @param textColor - 文本颜色
	     * @returns 属性图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：字体名称
	     *
	     * @beta
	     * @param fontName - 字体名称
	     * @returns 属性图元对象
	     */
	    setState_FontName(fontName: string | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：字体大小
	     *
	     * @beta
	     * @param fontSize - 字体大小
	     * @returns 属性图元对象
	     */
	    setState_FontSize(fontSize: number | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否加粗
	     *
	     * @beta
	     * @param bold - 是否加粗
	     * @returns 属性图元对象
	     */
	    setState_Bold(bold: boolean | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否斜体
	     *
	     * @beta
	     * @param italic - 是否斜体
	     * @returns 属性图元对象
	     */
	    setState_Italic(italic: boolean | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：是否加下划线
	     *
	     * @beta
	     * @param underLine - 是否加下划线
	     * @returns 属性图元对象
	     */
	    setState_UnderLine(underLine: boolean | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：对齐模式
	     *
	     * @beta
	     * @param alignMode - 对齐模式
	     * @returns 属性图元对象
	     */
	    setState_AlignMode(alignMode: ESCH_PrimitiveTextAlignMode | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：填充颜色
	     *
	     * @beta
	     * @param fillColor - 填充颜色
	     * @returns 属性图元对象
	     */
	    setState_FillColor(fillColor: string | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：键
	     *
	     * @beta
	     * @param key - 键
	     * @returns 属性图元对象
	     */
	    setState_Key(key: string): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：值
	     *
	     * @beta
	     * @param value - 值
	     * @returns 属性图元对象
	     */
	    setState_Value(value: string): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：键是否显示
	     *
	     * @beta
	     * @param keyVisible - 键是否显示
	     * @returns 属性图元对象
	     */
	    setState_KeyVisible(keyVisible: boolean | null): ISCH_PrimitiveAttribute;
	    /**
	     * 设置属性状态：值是否显示
	     *
	     * @beta
	     * @param valueVisible - 值是否显示
	     * @returns 属性图元对象
	     */
	    setState_ValueVisible(valueVisible: boolean | null): ISCH_PrimitiveAttribute;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 属性图元对象
	     */
	    toAsync(): ISCH_PrimitiveAttribute;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 属性图元对象
	     */
	    toSync(): ISCH_PrimitiveAttribute;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 属性图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveAttribute>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 属性图元对象
	     */
	    done(): Promise<ISCH_PrimitiveAttribute>;
	}

	/**
	 * 原理图 & 符号 / 总线图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveBus implements ISCH_PrimitiveAPI {
	    /**
	     * 创建总线
	     *
	     * @beta
	     * @param busName - 总线名称
	     * @param line - 多段线坐标组，每段都是连续的一组 `[x1, y1, x2, y2, x3, y3]` 所描述的线，如若多段线彼此无任何连接则创建将会失败
	     * @param color - 总线颜色，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @returns 总线图元对象
	     */
	    create(busName: string, line: Array<number> | Array<Array<number>>, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveBus | undefined>;
	    /**
	     * 删除总线
	     *
	     * @beta
	     * @param primitiveIds - 总线的图元 ID 或总线图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveBus | Array<string> | Array<ISCH_PrimitiveBus>): Promise<boolean>;
	    /**
	     * 修改总线
	     *
	     * @beta
	     * @param primitiveId - 总线的图元 ID 或总线图元对象
	     * @param property - 修改参数
	     * @returns 总线图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveBus, property: {
	        busName?: string;
	        line?: Array<number> | Array<Array<number>>;
	        color?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	    }): Promise<ISCH_PrimitiveBus | undefined>;
	    /**
	     * 获取总线
	     *
	     * @beta
	     * @param primitiveIds - 总线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 总线图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveBus | undefined>;
	    /**
	     * 获取总线
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 总线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 总线图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveBus>>;
	    /**
	     * 获取所有总线的图元 ID
	     *
	     * @beta
	     * @returns 总线的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有总线
	     *
	     * @beta
	     * @returns 总线图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveBus>>;
	}
	/**
	 * 总线图元
	 *
	 * @public
	 * @remarks
	 * 尚未解决的问题：
	 *
	 * `ISCH_PrimitiveWire.net` 全局网络名属性因其涉及多图页刷新，当前获取的值可能为 **错误** 的。
	 * 当你尝试为一个导线、总线设置多个名称（放置多个网络标签）时，获取到的 `net` 属性可能并不是当前最新的，
	 * 需要等待画布事件异步刷新全局网络后，再行获取。
	 */
	class ISCH_PrimitiveBus implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 总线名称 */
	    private busName;
	    /** 多段线坐标组 */
	    private line;
	    /** 总线颜色 */
	    private color;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** @internal */
	    constructor(busName: string, line: Array<number> | Array<Array<number>>, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 总线图元对象
	     */
	    create(): Promise<ISCH_PrimitiveBus>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：总线名称
	     *
	     * @public
	     * @returns 总线名称
	     */
	    getState_BusName(): string;
	    /**
	     * 获取属性状态：多段线坐标组
	     *
	     * @public
	     * @returns 多段线坐标组
	     */
	    getState_Line(): Array<number> | Array<Array<number>>;
	    /**
	     * 获取属性状态：总线颜色
	     *
	     * @public
	     * @returns 总线颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 设置属性状态：总线名称
	     *
	     * @beta
	     * @param busName - 总线名称
	     * @returns 总线图元对象
	     */
	    setState_BusName(busName: string): ISCH_PrimitiveBus;
	    /**
	     * 设置属性状态：多段线坐标组
	     *
	     * @beta
	     * @param line - 多段线坐标组
	     * @returns 总线图元对象
	     */
	    setState_Line(line: Array<number> | Array<Array<number>>): ISCH_PrimitiveBus;
	    /**
	     * 设置属性状态：总线颜色
	     *
	     * @beta
	     * @param color - 总线颜色
	     * @returns 总线图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveBus;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 总线图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitiveBus;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 总线图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitiveBus;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 总线图元对象
	     */
	    toAsync(): ISCH_PrimitiveBus;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 总线图元对象
	     */
	    toSync(): ISCH_PrimitiveBus;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 总线图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveBus>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 总线图元对象
	     */
	    done(): Promise<ISCH_PrimitiveBus>;
	}

	/**
	 * 原理图 & 符号 / 圆图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveCircle implements ISCH_PrimitiveAPI {
	    /**
	     * 创建圆
	     *
	     * @beta
	     * @param centerX - 圆心 X
	     * @param centerY - 圆心 Y
	     * @param radius - 半径
	     * @param color - 颜色，`null` 表示默认
	     * @param fillColor - 填充颜色，`none` 表示无填充，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @param fillStyle - 填充样式，`null` 表示默认
	     * @returns 圆图元对象
	     */
	    create(centerX: number, centerY: number, radius: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null): Promise<ISCH_PrimitiveCircle>;
	    /**
	     * 删除圆
	     *
	     * @beta
	     * @param primitiveIds - 圆的图元 ID 或圆图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveCircle | Array<string> | Array<ISCH_PrimitiveCircle>): Promise<boolean>;
	    /**
	     * 修改圆
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 圆图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveCircle, property: {
	        centerX?: number;
	        centerY?: number;
	        radius?: number;
	        color?: string | null;
	        fillColor?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	        fillStyle?: ESCH_PrimitiveFillStyle | null;
	    }): Promise<ISCH_PrimitiveCircle | undefined>;
	    /**
	     * 获取圆
	     *
	     * @beta
	     * @param primitiveIds - 圆的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveCircle | undefined>;
	    /**
	     * 获取圆
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 圆的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 圆图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveCircle>>;
	    /**
	     * 获取所有圆的图元 ID
	     *
	     * @beta
	     * @returns 圆的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有圆
	     *
	     * @beta
	     * @returns 圆图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveCircle>>;
	}
	/**
	 * 圆图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveCircle implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 圆心 X */
	    private centerX;
	    /** 圆心 Y */
	    private centerY;
	    /** 半径 */
	    private radius;
	    /** 颜色 */
	    private color;
	    /** 填充颜色 */
	    private fillColor;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** 填充样式 */
	    private fillStyle;
	    /** @internal */
	    constructor(centerX: number, centerY: number, radius: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 圆图元对象
	     */
	    create(): Promise<ISCH_PrimitiveCircle>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：圆心 X
	     *
	     * @public
	     * @returns 圆心 X
	     */
	    getState_CenterX(): number;
	    /**
	     * 获取属性状态：圆心 Y
	     *
	     * @public
	     * @returns 圆心 Y
	     */
	    getState_CenterY(): number;
	    /**
	     * 获取属性状态：半径
	     *
	     * @public
	     * @returns 半径
	     */
	    getState_Radius(): number;
	    /**
	     * 获取属性状态：颜色
	     *
	     * @public
	     * @returns 颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：填充颜色
	     *
	     * @public
	     * @returns 填充颜色
	     */
	    getState_FillColor(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 获取属性状态：填充样式
	     *
	     * @public
	     * @returns 填充样式
	     */
	    getState_FillStyle(): ESCH_PrimitiveFillStyle | null;
	    /**
	     * 设置属性状态：圆心 X
	     *
	     * @beta
	     * @param centerX - 圆心 X
	     * @returns 圆图元对象
	     */
	    setState_CenterX(centerX: number): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：圆心 Y
	     *
	     * @beta
	     * @param centerY - 圆心 Y
	     * @returns 圆图元对象
	     */
	    setState_CenterY(centerY: number): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：半径
	     *
	     * @beta
	     * @param radius - 半径
	     * @returns 圆图元对象
	     */
	    setState_Radius(radius: number): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：颜色
	     *
	     * @beta
	     * @param color - 颜色
	     * @returns 圆图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：填充颜色
	     *
	     * @beta
	     * @param fillColor - 填充颜色
	     * @returns 圆图元对象
	     */
	    setState_FillColor(fillColor: string | null): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 圆图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 圆图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitiveCircle;
	    /**
	     * 设置属性状态：填充样式
	     *
	     * @beta
	     * @param fillStyle - 填充样式
	     * @returns 圆图元对象
	     */
	    setState_FillStyle(fillStyle: ESCH_PrimitiveFillStyle | null): ISCH_PrimitiveCircle;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 圆图元对象
	     */
	    toAsync(): ISCH_PrimitiveCircle;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 圆图元对象
	     */
	    toSync(): ISCH_PrimitiveCircle;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 圆图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveCircle>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 圆图元对象
	     */
	    done(): ISCH_PrimitiveCircle;
	}

	/**
	 * 引脚形状
	 *
	 * @public
	 */
	enum ESCH_PrimitivePinShape {
	    /** 无 */
	    NONE = "None",
	    /** 反向 */
	    INVERTED = "Inverted",
	    /** 时钟 */
	    CLOCK = "Clock",
	    /** 反向时钟 */
	    INVERTED_CLOCK = "Inverted Clock"
	}
	/**
	 * 引脚类型
	 *
	 * @public
	 */
	enum ESCH_PrimitivePinType {
	    /** 输入 */
	    IN = "IN",
	    /** 输出 */
	    OUT = "OUT",
	    /** 双向 */
	    BI = "BI",
	    /** 无源 */
	    PASSIVE = "Passive",
	    /** 开集电极 */
	    OPEN_COLLECTOR = "Open Collector",
	    /** 开发射极 */
	    OPEN_EMITTER = "Open Emitter",
	    /** 电源 */
	    POWER = "Power",
	    /** 地 */
	    GROUND = "Ground",
	    /** 高阻 */
	    HIZ = "HIZ",
	    /** 信号终端 */
	    TERMINATOR = "Terminator",
	    /** 未定义 */
	    UNDEFINED = "Undefined"
	}
	/**
	 * 原理图 & 符号 / 引脚图元类
	 *
	 * @public
	 * @remarks 引脚图元仅符号编辑器可用，在原理图图页内，关联到符号的引脚被称为 {@link ISCH_PrimitiveComponentPin | 器件引脚图元}
	 */
	class SCH_PrimitivePin implements ISCH_PrimitiveAPI {
	    /**
	     * 创建引脚
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param pinNumber - 引脚编号
	     * @param pinName - 引脚名称
	     * @param rotation - 旋转角度，可选 `0` `90` `180` `270`
	     * @param pinLength - 引脚长度
	     * @param pinColor - 引脚颜色，`null` 表示默认
	     * @param pinShape - 引脚形状
	     * @param pinType - 引脚类型
	     * @returns 引脚图元对象
	     */
	    create(x: number, y: number, pinNumber: string, pinName?: string, rotation?: number, pinLength?: number, pinColor?: string | null, pinShape?: ESCH_PrimitivePinShape, pinType?: ESCH_PrimitivePinType): Promise<ISCH_PrimitivePin | undefined>;
	    /**
	     * 删除引脚
	     *
	     * @beta
	     * @param primitiveIds - 引脚的图元 ID 或引脚图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitivePin | Array<string> | Array<ISCH_PrimitivePin>): Promise<boolean>;
	    /**
	     * 修改引脚
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 引脚图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitivePin | ISCH_PrimitiveComponentPin, property: {
	        x?: number;
	        y?: number;
	        pinNumber?: string;
	        pinName?: string;
	        rotation?: number;
	        pinLength?: number;
	        pinColor?: string | null;
	        pinShape?: ESCH_PrimitivePinShape;
	        pinType?: ESCH_PrimitivePinType;
	    }): Promise<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin | undefined>;
	    /**
	     * 获取引脚
	     *
	     * @beta
	     * @param primitiveIds - 引脚的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 引脚图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin | undefined>;
	    /**
	     * 获取引脚
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 引脚的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 引脚图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin>>;
	    /**
	     * 获取所有引脚的图元 ID
	     *
	     * @beta
	     * @returns 引脚的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有引脚
	     *
	     * @beta
	     * @returns 引脚图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitivePin>>;
	}
	/**
	 * 引脚图元
	 *
	 * @public
	 * @remarks 引脚图元仅符号编辑器可用，在原理图图页内，关联到符号的引脚被称为 {@link ISCH_PrimitiveComponentPin | 器件引脚图元}
	 */
	class ISCH_PrimitivePin implements ISCH_Primitive {
	    /** 异步 */
	    protected async: boolean;
	    /** 图元类型 */
	    protected readonly primitiveType: ESCH_PrimitiveType;
	    /** 图元 ID */
	    protected primitiveId?: string;
	    /** 坐标 X */
	    protected x: number;
	    /** 坐标 Y */
	    protected y: number;
	    /** 引脚编号 */
	    protected pinNumber: string;
	    /** 引脚名称 */
	    protected pinName: string;
	    /** 旋转角度 */
	    protected rotation: number;
	    /** 引脚长度 */
	    protected pinLength: number;
	    /** 引脚颜色 */
	    protected pinColor: string | null;
	    /** 引脚形状 */
	    protected pinShape: ESCH_PrimitivePinShape;
	    /** 引脚类型 */
	    protected pinType: ESCH_PrimitivePinType;
	    /** 其它参数 */
	    private otherProperty?;
	    /** @internal */
	    constructor(x: number, y: number, pinNumber: string, pinName?: string, rotation?: number, pinLength?: number, pinColor?: string | null, pinShape?: ESCH_PrimitivePinShape, pinType?: ESCH_PrimitivePinType, primitiveId?: string, otherProperty?: {
	        [key: string]: string | number | boolean;
	    });
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 引脚图元对象
	     */
	    create(): Promise<ISCH_PrimitivePin>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：引脚编号
	     *
	     * @public
	     * @returns 引脚编号
	     */
	    getState_PinNumber(): string;
	    /**
	     * 获取属性状态：引脚名称
	     *
	     * @public
	     * @returns 引脚名称
	     */
	    getState_PinName(): string;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：引脚长度
	     *
	     * @public
	     * @returns 引脚长度
	     */
	    getState_PinLength(): number;
	    /**
	     * 获取属性状态：引脚颜色
	     *
	     * @public
	     * @returns 引脚颜色
	     */
	    getState_PinColor(): string | null;
	    /**
	     * 获取属性状态：引脚形状
	     *
	     * @public
	     * @returns 引脚形状
	     */
	    getState_PinShape(): ESCH_PrimitivePinShape;
	    /**
	     * 获取属性状态：引脚类型
	     *
	     * @public
	     * @returns 引脚类型
	     */
	    getState_pinType(): ESCH_PrimitivePinType;
	    /**
	     * 获取属性状态：其它参数
	     *
	     * @public
	     * @returns 其它参数
	     */
	    getState_OtherProperty(): {
	        [key: string]: string | number | boolean;
	    } | undefined;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 引脚图元对象
	     */
	    setState_X(x: number): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 引脚图元对象
	     */
	    setState_Y(y: number): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚编号
	     *
	     * @beta
	     * @param pinNumber - 引脚编号
	     * @returns 引脚图元对象
	     */
	    setState_PinNumber(pinNumber: string): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚名称
	     *
	     * @beta
	     * @param pinName - 引脚名称
	     * @returns 引脚图元对象
	     */
	    setState_PinName(pinName: string): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 引脚图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚长度
	     *
	     * @beta
	     * @param pinLength - 引脚长度
	     * @returns 引脚图元对象
	     */
	    setState_PinLength(pinLength: number): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚颜色
	     *
	     * @beta
	     * @param pinColor - 引脚颜色
	     * @returns 引脚图元对象
	     */
	    setState_PinColor(pinColor: string | null): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚形状
	     *
	     * @beta
	     * @param pinShape - 引脚形状
	     * @returns 引脚图元对象
	     */
	    setState_PinShape(pinShape: ESCH_PrimitivePinShape): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：引脚类型
	     *
	     * @beta
	     * @param pinType - 引脚类型
	     * @returns 引脚图元对象
	     */
	    setState_PinType(pinType: ESCH_PrimitivePinType): ISCH_PrimitivePin;
	    /**
	     * 设置属性状态：其它参数
	     *
	     * @beta
	     * @param otherProperty - 其它参数
	     * @returns 引脚图元对象
	     */
	    setState_OtherProperty(otherProperty: {
	        [key: string]: string | number | boolean;
	    }): ISCH_PrimitivePin;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 引脚图元对象
	     */
	    toAsync(): ISCH_PrimitivePin;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 引脚图元对象
	     */
	    toSync(): ISCH_PrimitivePin;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 引脚图元对象
	     */
	    reset(): Promise<ISCH_PrimitivePin>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 引脚图元对象
	     */
	    done(): Promise<ISCH_PrimitivePin>;
	}
	/**
	 * 器件引脚图元
	 *
	 * @public
	 * @remarks
	 * 器件引脚图元是一个特殊的图元，它指的是在原理图画布上关联到符号的引脚
	 *
	 * 器件引脚图元仅可更改 `pinNumber`、`noConnected` 属性，其它所有属性均为只读，
	 * 并且你只能通过 {@link SCH_PrimitiveComponent.getAllPinsByPrimitiveId | 器件类的 getAllPinsByPrimitiveId 方法} 或 {@link ISCH_PrimitiveComponent.getAllPins | 器件图元的 getAllPins 方法} 获取到器件引脚图元
	 */
	class ISCH_PrimitiveComponentPin extends ISCH_PrimitivePin {
	    /** 图元类型 */
	    protected readonly primitiveType: ESCH_PrimitiveType.COMPONENT_PIN;
	    /** 是否存在非连接标识 */
	    private noConnected;
	    /** @internal */
	    constructor(primitiveId: string, x: number, y: number, pinNumber: string, pinName: string, rotation: number, pinLength: number, pinColor: string | null, pinShape: ESCH_PrimitivePinShape, pinType: ESCH_PrimitivePinType, noConnected: boolean);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    create(): Promise<ISCH_PrimitiveComponentPin>;
	    /**
	     * 获取属性状态：是否存在非连接标识
	     *
	     * @public
	     * @returns 是否存在非连接标识
	     */
	    getState_NoConnected(): boolean;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_X(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_Y(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：引脚名称
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_PinName(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_Rotation(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：引脚长度
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_PinLength(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：引脚颜色
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_PinColor(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：引脚形状
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_PinShape(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：引脚类型
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    setState_PinType(): ISCH_PrimitiveComponentPin;
	    /**
	     * 设置属性状态：是否存在非连接标识
	     *
	     * @public
	     * @returns 器件引脚图元对象
	     */
	    setState_NoConnected(noConnected: boolean): ISCH_PrimitiveComponentPin;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @internal
	     * @remarks 本器件引脚图元属性不支持修改，本接口调用将不会有任何效果
	     * @returns 器件引脚图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveComponentPin>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @alpha
	     * @returns 器件引脚图元对象
	     */
	    done(): Promise<ISCH_PrimitiveComponentPin>;
	}

	/**
	 * 器件类型
	 *
	 * @public
	 */
	enum ESCH_PrimitiveComponentType$1 {
	    /** 元件 */
	    COMPONENT = "part",
	    /** 图纸 */
	    DRAWING = "sheet",
	    /** 网络标识 */
	    NET_FLAG = "netflag",
	    /** 网络端口 */
	    NET_PORT = "netport",
	    /** 无电气标识 */
	    NON_ELECTRICAL_FLAG = "nonElectrical_symbol",
	    /** 短接标识 */
	    SHORT_CIRCUIT_FLAG = "short_symbol",
	    /** 网络标签 */
	    NET_LABEL = "netlabel"
	}
	/**
	 * 图元类型
	 *
	 * @public
	 */
	enum ESCH_ShapeType {
	    OBJ = "obj",
	    POLYLINE = "polyline",
	    CIRCLE = "circle",
	    ELLIPSE = "ellipse",
	    RECT = "rect",
	    ARC = "arc",
	    TEXT = "text",//
	    TABLE = "table",
	    PIN = "pin",
	    BUSENTRY = "busEntry",
	    NOCONNECT = "noconnect",
	    BUS = "bus",
	    WIRE = "wire",
	    BEZIER = "bezier",
	    ANNOTATION = "annotation",
	    MASKREGION = "maskregion"
	}
	/**
	 * 原理图 & 符号 / 器件图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveComponent implements ISCH_PrimitiveAPI {
	    private netFlagComponentUuid_Power;
	    private netFlagComponentUuid_Ground;
	    private netFlagComponentUuid_AnalogGround;
	    private netFlagComponentUuid_ProtectGround;
	    private netPortComponentUuid_IN;
	    private netPortComponentUuid_OUT;
	    private netPortComponentUuid_BI;
	    private shortCircuitFlagComponentUuid;
	    private defaultLibraryUuid;
	    /**
	     * @internal
	     */
	    constructor();
	    /**
	     * 设置在扩展 API 中 Power 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_Power(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 Ground 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_Ground(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 AnalogGround 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_AnalogGround(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 ProtectGround 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_ProtectGround(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 IN 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_IN(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 OUT 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_OUT(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 BI 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_BI(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 创建器件
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @param subPartName - 子图块名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @param addIntoBom - 是否加入 BOM
	     * @param addIntoPcb - 是否转到 PCB
	     * @returns 器件图元对象
	     */
	    create(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem, x: number, y: number, subPartName?: string, rotation?: number, mirror?: boolean, addIntoBom?: boolean, addIntoPcb?: boolean): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 创建网络标识
	     *
	     * @beta
	     * @param identification - 标识类型
	     * @param net - 网络名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createNetFlag(identification: 'Power' | 'Ground' | 'AnalogGround' | 'ProtectGround', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 创建网络端口
	     *
	     * @beta
	     * @param direction - 端口方向
	     * @param net - 网络名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createNetPort(direction: 'IN' | 'OUT' | 'BI', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 创建短接标识
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createShortCircuitFlag(x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 删除器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID 或器件图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveComponent$1 | Array<string> | Array<ISCH_PrimitiveComponent$1>): Promise<boolean>;
	    /**
	     * 修改器件
	     *
	     * @beta
	     * @remarks 仅当器件类型为 {@link ESCH_PrimitiveComponentType.COMPONENT | COMPONENT} 时允许使用该方法进行修改
	     * @param primitiveId - 图元 ID
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @param libraryPath - 库路径，默认为系统库
	     * @param addIntoBom - 是否加入 BOM
	     * @param addIntoPcb - 是否转到 PCB
	     * @param designator - 位号
	     * @param name - 名称，`null` 表示留空
	     * @param uniqueId - 唯一 ID，`null` 表示留空
	     * @param manufacturer - 制造商，`null` 表示留空
	     * @param manufacturerId - 制造商编号，`null` 表示留空
	     * @param supplier - 供应商，`null` 表示留空
	     * @param supplierId - 供应商编号，`null` 表示留空
	     * @returns 器件图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveComponent$1, property: {
	        x?: number;
	        y?: number;
	        rotation?: number;
	        mirror?: boolean;
	        addIntoBom?: boolean;
	        addIntoPcb?: boolean;
	        designator?: string | null;
	        name?: string | null;
	        uniqueId?: string | null;
	        manufacturer?: string | null;
	        manufacturerId?: string | null;
	        supplier?: string | null;
	        supplierId?: string | null;
	        otherProperty?: {
	            [key: string]: string | number | boolean;
	        };
	    }): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveComponent$1 | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 器件的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveComponent$1>>;
	    /**
	     * 获取所有器件的图元 ID
	     *
	     * @beta
	     * @param componentType - 器件类型
	     * @param allSchematicPages - 是否获取所有原理图图页的器件
	     * @returns 器件的图元 ID 数组
	     */
	    getAllPrimitiveId(componentType?: ESCH_PrimitiveComponentType$1, allSchematicPages?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有器件
	     *
	     * @beta
	     * @param componentType - 器件类型
	     * @param allSchematicPages - 是否获取所有原理图图页的器件
	     * @returns 器件图元对象数组
	     */
	    getAll(componentType?: ESCH_PrimitiveComponentType$1, allSchematicPages?: boolean): Promise<Array<ISCH_PrimitiveComponent$1>>;
	    /**
	     * 获取器件关联的所有引脚
	     *
	     * @beta
	     * @param primitiveId - 器件图元 ID
	     * @returns 器件引脚图元数组
	     */
	    getAllPinsByPrimitiveId(primitiveId: string): Promise<Array<ISCH_PrimitiveComponentPin> | undefined>;
	    /**
	     * 使用鼠标放置器件
	     *
	     * @beta
	     * @remarks
	     * 本接口模拟前端点击放置按钮，指定的器件将绑定到当前鼠标，并在用户后续点击时放置于画布
	     *
	     * 本接口的返回时机并不会等待用户的放置操作，一旦器件被绑定到鼠标，本接口将立即返回 `true` 的结果
	     * @param component - 关联库器件
	     * @returns 是否找到器件
	     */
	    placeComponentWithMouse(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem, subPartName?: string): Promise<boolean>;
	    /**
	     * 获取所有器件的所有属性名称集合
	     *
	     * @beta
	     * @returns 所有器件的所有属性名称集合
	     */
	    getAllPropertyNames(): Promise<Array<string>>;
	    /**
	     * 到 pro-ui 获取器件的详细信息
	     *
	     * @internal
	     * @param componentUuid - 器件 UUID
	     * @param libraryUuid - 库 PATH
	     * @returns 器件的详细信息
	     */
	    private getComponentDetail;
	    /**
	     * 根据 DOCTYPE 验证输入的 UUID 是否正确
	     *
	     * @internal
	     * @param componentType - 器件类型
	     * @param componentUuid - 器件 UUID
	     * @param libraryUuid - 库 PATH
	     * @returns 是否正确
	     */
	    private checkComponentType;
	}
	/**
	 * 器件图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveComponent$1 implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 器件类型 */
	    private componentType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 关联库器件 */
	    private component;
	    /** 坐标 X */
	    private x;
	    /** 坐标 Y */
	    private y;
	    /** 子图块名称 */
	    private subPartName?;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否镜像 */
	    private mirror;
	    /** Component 属性：是否加入 BOM */
	    private addIntoBom?;
	    /** Component 属性：是否转到 PCB */
	    private addIntoPcb?;
	    /** NetPort 和 NetFlag 属性：网络名称 */
	    private net?;
	    /** 关联库符号 UUID */
	    private symbol?;
	    /** 关联库封装 UUID */
	    private footprint?;
	    /** Component 属性：位号 */
	    private designator?;
	    /** Component 属性：名称 */
	    private name?;
	    /** Component 属性：唯一 ID */
	    private uniqueId?;
	    /** Component 属性：制造商 */
	    private manufacturer?;
	    /** Component 属性：制造商编号 */
	    private manufacturerId?;
	    /** Component 属性：供应商 */
	    private supplier?;
	    /** Component 属性：供应商编号 */
	    private supplierId?;
	    /** 其它参数 */
	    private otherProperty?;
	    /**
	     * @internal
	     */
	    constructor(componentType: ESCH_PrimitiveComponentType$1, component: {
	        libraryUuid: string;
	        uuid: string;
	    }, x: number, y: number, subPartName?: string, rotation?: number, mirror?: boolean, addIntoBom?: boolean, addIntoPcb?: boolean, net?: string, primitiveId?: string, symbol?: {
	        libraryUuid: string;
	        uuid: string;
	    }, footprint?: {
	        libraryUuid: string;
	        uuid: string;
	    }, designator?: string, name?: string, uniqueId?: string, manufacturer?: string, manufacturerId?: string, supplier?: string, supplierId?: string, otherProperty?: {
	        [key: string]: string | number | boolean;
	    });
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 器件图元对象
	     */
	    create(): Promise<ISCH_PrimitiveComponent$1>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：器件类型
	     *
	     * @public
	     * @returns 器件类型
	     */
	    getState_ComponentType(): ESCH_PrimitiveComponentType$1;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：关联库器件
	     *
	     * @public
	     * @returns 关联库器件
	     */
	    getState_Component(): {
	        libraryUuid: string;
	        uuid: string;
	    };
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：子图块名称
	     *
	     * @public
	     * @returns 子图块名称
	     */
	    getState_SubPartName(): string | undefined;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否镜像
	     *
	     * @public
	     * @returns 是否镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：是否加入 BOM
	     *
	     * @public
	     * @returns 是否加入 BOM
	     */
	    getState_AddIntoBom(): boolean | undefined;
	    /**
	     * 获取属性状态：是否转到 PCB
	     *
	     * @public
	     * @returns 是否转到 PCB
	     */
	    getState_AddIntoPcb(): boolean | undefined;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string | undefined;
	    /**
	     * 获取属性状态：关联库符号
	     *
	     * @public
	     * @returns 关联库符号
	     */
	    getState_Symbol(): {
	        libraryUuid: string;
	        uuid: string;
	    } | undefined;
	    /**
	     * 获取属性状态：关联库封装
	     *
	     * @public
	     * @returns 关联库封装
	     */
	    getState_Footprint(): {
	        libraryUuid: string;
	        uuid: string;
	    } | undefined;
	    /**
	     * 获取属性状态：位号
	     *
	     * @public
	     * @returns 位号
	     */
	    getState_Designator(): string | undefined;
	    /**
	     * 获取属性状态：名称
	     *
	     * @public
	     * @returns 名称
	     */
	    getState_Name(): string | undefined;
	    /**
	     * 获取属性状态：唯一 ID
	     *
	     * @public
	     * @returns 唯一 ID
	     */
	    getState_UniqueId(): string | undefined;
	    /**
	     * 获取属性状态：制造商
	     *
	     * @public
	     * @returns 制造商
	     */
	    getState_Manufacturer(): string | undefined;
	    /**
	     * 获取属性状态：制造商编号
	     *
	     * @public
	     * @returns 制造商编号
	     */
	    getState_ManufacturerId(): string | undefined;
	    /**
	     * 获取属性状态：供应商
	     *
	     * @public
	     * @returns 供应商
	     */
	    getState_Supplier(): string | undefined;
	    /**
	     * 获取属性状态：供应商编号
	     *
	     * @public
	     * @returns 供应商编号
	     */
	    getState_SupplierId(): string | undefined;
	    /**
	     * 获取属性状态：其它参数
	     *
	     * @public
	     * @returns 其它参数
	     */
	    getState_OtherProperty(): {
	        [key: string]: string | number | boolean;
	    } | undefined;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 器件图元对象
	     */
	    setState_X(x: number): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 器件图元对象
	     */
	    setState_Y(y: number): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 器件图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：是否镜像
	     *
	     * @beta
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    setState_Mirror(mirror: boolean): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：是否加入 BOM
	     *
	     * @beta
	     * @param addIntoBom - 是否加入 BOM
	     * @returns 器件图元对象
	     */
	    setState_AddIntoBom(addIntoBom: boolean | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：是否转到 PCB
	     *
	     * @beta
	     * @param addIntoPcb - 是否转到 PCB
	     * @returns 器件图元对象
	     */
	    setState_AddIntoPcb(addIntoPcb: boolean | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 器件图元对象
	     */
	    setState_Net(net: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：位号
	     *
	     * @beta
	     * @param designator - 位号
	     * @returns 器件图元对象
	     */
	    setState_Designator(designator: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：名称
	     *
	     * @beta
	     * @param name - 名称
	     * @returns 器件图元对象
	     */
	    setState_Name(name: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：唯一 ID
	     *
	     * @beta
	     * @param uniqueId - 唯一 ID
	     * @returns 器件图元对象
	     */
	    setState_UniqueId(uniqueId: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：制造商
	     *
	     * @beta
	     * @param manufacturer - 制造商
	     * @returns 器件图元对象
	     */
	    setState_Manufacturer(manufacturer: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：制造商编号
	     *
	     * @beta
	     * @param manufacturerId - 制造商编号
	     * @returns 器件图元对象
	     */
	    setState_ManufacturerId(manufacturerId: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：供应商
	     *
	     * @beta
	     * @param supplier - 供应商
	     * @returns 器件图元对象
	     */
	    setState_Supplier(supplier: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：供应商编号
	     *
	     * @beta
	     * @param supplierId - 供应商编号
	     * @returns 器件图元对象
	     */
	    setState_SupplierId(supplierId: string | undefined): ISCH_PrimitiveComponent$1;
	    /**
	     * 设置属性状态：其它参数
	     *
	     * @beta
	     * @param otherProperty - 其它参数
	     * @returns 器件图元对象
	     */
	    setState_OtherProperty(otherProperty: {
	        [key: string]: string | number | boolean;
	    }): ISCH_PrimitiveComponent$1;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toAsync(): ISCH_PrimitiveComponent$1;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toSync(): ISCH_PrimitiveComponent$1;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveComponent$1>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    done(): Promise<ISCH_PrimitiveComponent$1>;
	    /**
	     * 获取器件关联的所有引脚
	     *
	     * @alpha
	     * @returns 器件引脚图元数组
	     */
	    getAllPins(): Promise<Array<ISCH_PrimitiveComponentPin> | undefined>;
	    /**
	     * 设置属性状态：关联库器件
	     *
	     * @internal
	     * @param component - 关联库器件
	     * @returns 器件图元对象
	     */
	    private setState_Component;
	    /**
	     * 设置属性状态：子图块名称
	     *
	     * @internal
	     * @param subPartName - 子图块名称
	     * @returns 器件图元对象
	     */
	    private setState_SubPartName;
	}

	/**
	 * 器件类型
	 *
	 * @public
	 */
	enum ESCH_PrimitiveComponentType {
	    /** 元件符号 */
	    COMPONENT = "part",
	    /** 图纸 */
	    DRAWING = "sheet",
	    /** 网络标识 */
	    NET_FLAG = "netflag",
	    /** 网络端口 */
	    NET_PORT = "netport",
	    /** 无电气标识 */
	    NON_ELECTRICAL_FLAG = "nonElectrical_symbol",
	    /** 短接标识 */
	    SHORT_CIRCUIT_FLAG = "short_symbol",
	    /** 网络标签 */
	    NET_LABEL = "netlabel",
	    /** 跨页连接标识 */
	    OFF_PAGE_CONNECTOR = "offPageConnector",
	    /** 差分对标识 */
	    DIFFERENTIAL_PAIRS_FLAG = "diffPairsFlag",
	    /** 复用模块符号 */
	    CBB_SYMBOL = "block_symbol"
	}
	/**
	 * 原理图 & 符号 / 器件图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveComponent3 implements ISCH_PrimitiveAPI {
	    private netFlagComponentUuid_Power;
	    private netFlagComponentUuid_Ground;
	    private netFlagComponentUuid_AnalogGround;
	    private netFlagComponentUuid_ProtectGround;
	    private netPortComponentUuid_IN;
	    private netPortComponentUuid_OUT;
	    private netPortComponentUuid_BI;
	    private shortCircuitFlagComponentUuid;
	    private defaultLibraryUuid;
	    /**
	     * @internal
	     */
	    constructor();
	    /**
	     * 设置在扩展 API 中 Power 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_Power(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 Ground 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_Ground(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 AnalogGround 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_AnalogGround(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 ProtectGround 网络标识关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetFlagComponentUuid_ProtectGround(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 IN 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_IN(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 OUT 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_OUT(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 设置在扩展 API 中 BI 网络端口关联的器件 UUID
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @returns 操作是否成功
	     */
	    setNetPortComponentUuid_BI(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>;
	    /**
	     * 创建器件
	     *
	     * @beta
	     * @param component - 关联库器件
	     * @param subPartName - 子部件名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @param addIntoBom - 是否加入 BOM
	     * @param addIntoPcb - 是否转到 PCB
	     * @returns 器件图元对象
	     */
	    create(component: {
	        libraryType?: ELIB_LibraryType.DEVICE;
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem | {
	        libraryType: ELIB_LibraryType.SYMBOL;
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_SymbolItem | ILIB_SymbolSearchItem, x: number, y: number, subPartName?: string, rotation?: number, mirror?: boolean, addIntoBom?: boolean, addIntoPcb?: boolean): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 创建网络标识
	     *
	     * @beta
	     * @param identification - 标识类型
	     * @param net - 网络名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createNetFlag(identification: 'Power' | 'Ground' | 'AnalogGround' | 'ProtectGround', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 创建网络端口
	     *
	     * @beta
	     * @param direction - 端口方向
	     * @param net - 网络名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createNetPort(direction: 'IN' | 'OUT' | 'BI', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 创建短接标识
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    createShortCircuitFlag(x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 创建复用模块符号
	     *
	     * @alpha
	     * @param cbbSymbol - 关联库复用模块符号，libraryUuid 是 CBB 工程所在库的 UUID，cbbUuid 是 CBB 工程的 UUID，uuid 是 CBB 工程内符号的 UUID，name 是符号的显示名称
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @returns 复用模块符号图元对象
	     */
	    createCbbSymbol(cbbSymbol: {
	        libraryUuid: string;
	        cbbUuid: string;
	        uuid?: string;
	    }, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveCbbSymbolComponent | undefined>;
	    /**
	     * 放置复用模块原理图图页
	     *
	     * @alpha
	     * @param cbbSchematicPage - 复用模块原理图图页
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @returns 放置操作是否成功
	     */
	    placeCbbSchematicPage(cbbSchematicPage: {
	        libraryUuid: string;
	        cbbUuid: string;
	        uuid: string;
	    }, x: number, y: number): Promise<boolean>;
	    /**
	     * 删除器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID 或器件图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveComponent | Array<string> | Array<ISCH_PrimitiveComponent>): Promise<boolean>;
	    /**
	     * 修改器件
	     *
	     * @beta
	     * @remarks 仅当器件类型为 {@link ESCH_PrimitiveComponentType.COMPONENT | COMPONENT} 时允许使用该方法进行修改
	     * @param primitiveId - 图元 ID
	     * @param x - 坐标 X
	     * @param y - 坐标 Y
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @param libraryPath - 库路径，默认为系统库
	     * @param addIntoBom - 是否加入 BOM
	     * @param addIntoPcb - 是否转到 PCB
	     * @param designator - 位号
	     * @param name - 名称，`null` 表示留空
	     * @param uniqueId - 唯一 ID，`null` 表示留空
	     * @param manufacturer - 制造商，`null` 表示留空
	     * @param manufacturerId - 制造商编号，`null` 表示留空
	     * @param supplier - 供应商，`null` 表示留空
	     * @param supplierId - 供应商编号，`null` 表示留空
	     * @returns 器件图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveComponent, property: {
	        x?: number;
	        y?: number;
	        rotation?: number;
	        mirror?: boolean;
	        addIntoBom?: boolean;
	        addIntoPcb?: boolean;
	        designator?: string | null;
	        name?: string | null;
	        uniqueId?: string | null;
	        manufacturer?: string | null;
	        manufacturerId?: string | null;
	        supplier?: string | null;
	        supplierId?: string | null;
	        otherProperty?: {
	            [key: string]: string | number | boolean;
	        };
	    }): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @param primitiveIds - 器件的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveComponent | undefined>;
	    /**
	     * 获取器件
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 器件的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 器件图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveComponent>>;
	    /**
	     * 获取所有器件的图元 ID
	     *
	     * @beta
	     * @param componentType - 器件类型
	     * @param allSchematicPages - 是否获取所有原理图图页的器件
	     * @returns 器件的图元 ID 数组
	     */
	    getAllPrimitiveId(componentType?: ESCH_PrimitiveComponentType, allSchematicPages?: boolean): Promise<Array<string>>;
	    /**
	     * 获取所有器件
	     *
	     * @beta
	     * @param componentType - 器件类型
	     * @param allSchematicPages - 是否获取所有原理图图页的器件
	     * @returns 器件图元对象数组
	     */
	    getAll(componentType?: ESCH_PrimitiveComponentType, allSchematicPages?: boolean): Promise<Array<ISCH_PrimitiveComponent>>;
	    /**
	     * 获取器件关联的所有引脚
	     *
	     * @beta
	     * @param primitiveId - 器件图元 ID
	     * @returns 器件引脚图元数组
	     */
	    getAllPinsByPrimitiveId(primitiveId: string): Promise<Array<ISCH_PrimitiveComponentPin> | undefined>;
	    /**
	     * 使用鼠标放置器件
	     *
	     * @beta
	     * @remarks
	     * 本接口模拟前端点击放置按钮，指定的器件将绑定到当前鼠标，并在用户后续点击时放置于画布
	     *
	     * 本接口的返回时机并不会等待用户的放置操作，一旦器件被绑定到鼠标，本接口将立即返回 `true` 的结果
	     * @param component - 关联库器件
	     * @param subPartName - 子部件名称
	     * @returns 是否找到器件
	     */
	    placeComponentWithMouse(component: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_DeviceItem | ILIB_DeviceSearchItem, subPartName?: string): Promise<boolean>;
	    /**
	     * 使用鼠标放置符号
	     *
	     * @alpha
	     * @remarks
	     * ADD since API v0.2.26
	     *
	     * 本接口模拟前端点击放置按钮，指定的符号将绑定到当前鼠标，并在用户后续点击时放置于画布
	     *
	     * 本接口的返回时机并不会等待用户的放置操作，一旦符号被绑定到鼠标，本接口将立即返回 `true` 的结果
	     * @param symbol - 关联库符号
	     * @param subPartName - 子部件名称
	     * @param properties - 器件属性
	     * @returns 是否找到符号
	     */
	    placeSymbolWithMouse(symbol: {
	        libraryUuid: string;
	        uuid: string;
	    } | ILIB_SymbolItem | ILIB_SymbolSearchItem, subPartName?: string, properties?: {
	        [key: string]: boolean | number | string | undefined;
	    }): Promise<boolean>;
	    /**
	     * 获取所有器件的所有属性名称集合
	     *
	     * @alpha
	     * @returns 所有器件的所有属性名称集合
	     */
	    getAllPropertyNames(): Promise<Array<string>>;
	    /**
	     * 到 pro-ui 获取器件的详细信息
	     *
	     * @internal
	     * @param componentUuid - 器件 UUID
	     * @param libraryUuid - 库 PATH
	     * @returns 器件的详细信息
	     */
	    private getComponentDetail;
	    /**
	     * 根据 DOCTYPE 验证输入的 UUID 是否正确
	     *
	     * @internal
	     * @param componentType - 器件类型
	     * @param componentUuid - 器件 UUID
	     * @param libraryUuid - 库 PATH
	     * @returns 是否正确
	     */
	    private checkComponentType;
	    private initUuid;
	}
	/**
	 * 器件图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveComponent implements ISCH_Primitive {
	    /** 异步 */
	    protected async: boolean;
	    /** 坐标 X */
	    protected x: number;
	    /** 坐标 Y */
	    protected y: number;
	    /** 旋转角度 */
	    protected rotation: number;
	    /** 是否镜像 */
	    protected mirror: boolean;
	    /** Component 属性：位号 */
	    protected designator?: string;
	    /** Component 属性：名称 */
	    protected name?: string;
	    /** 图元 ID */
	    protected primitiveId?: string;
	    /** 其它参数 */
	    protected otherProperty?: {
	        [key: string]: string | number | boolean;
	    };
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 器件类型 */
	    private componentType;
	    /** 关联库器件 */
	    private component?;
	    /** 子部件名称 */
	    private subPartName?;
	    /** Component 属性：是否加入 BOM */
	    private addIntoBom?;
	    /** Component 属性：是否转到 PCB */
	    private addIntoPcb?;
	    /** NetPort 和 NetFlag 属性：网络名称 */
	    private net?;
	    /**
	     * 关联库符号
	     *
	     */
	    private symbol?;
	    /**
	     * 关联库封装
	     *
	     */
	    private footprint?;
	    /** Component 属性：唯一 ID */
	    private uniqueId?;
	    /** Component 属性：制造商 */
	    private manufacturer?;
	    /** Component 属性：制造商编号 */
	    private manufacturerId?;
	    /** Component 属性：供应商 */
	    private supplier?;
	    /** Component 属性：供应商编号 */
	    private supplierId?;
	    /**
	     * @internal
	     */
	    constructor(componentType: ESCH_PrimitiveComponentType, component: {
	        libraryType?: ELIB_LibraryType.DEVICE | ELIB_LibraryType.SYMBOL;
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, x: number, y: number, subPartName?: string, rotation?: number, mirror?: boolean, addIntoBom?: boolean, addIntoPcb?: boolean, net?: string, primitiveId?: string, symbol?: {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, footprint?: {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, designator?: string, name?: string, uniqueId?: string, manufacturer?: string, manufacturerId?: string, supplier?: string, supplierId?: string, otherProperty?: {
	        [key: string]: string | number | boolean;
	    });
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 器件图元对象
	     */
	    create(): Promise<ISCH_PrimitiveComponent>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：器件类型
	     *
	     * @public
	     * @returns 器件类型
	     */
	    getState_ComponentType(): ESCH_PrimitiveComponentType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：关联库器件
	     *
	     * @public
	     * @returns 关联库器件
	     */
	    getState_Component(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_X(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_Y(): number;
	    /**
	     * 获取属性状态：子部件名称
	     *
	     * @public
	     * @returns 子部件名称
	     */
	    getState_SubPartName(): string | undefined;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否镜像
	     *
	     * @public
	     * @returns 是否镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：是否加入 BOM
	     *
	     * @public
	     * @returns 是否加入 BOM
	     */
	    getState_AddIntoBom(): boolean | undefined;
	    /**
	     * 获取属性状态：是否转到 PCB
	     *
	     * @public
	     * @returns 是否转到 PCB
	     */
	    getState_AddIntoPcb(): boolean | undefined;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string | undefined;
	    /**
	     * 获取属性状态：关联库符号
	     *
	     * @public
	     * @returns 关联库符号
	     */
	    getState_Symbol(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：关联库封装
	     *
	     * @public
	     * @returns 关联库封装
	     */
	    getState_Footprint(): {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    } | undefined;
	    /**
	     * 获取属性状态：位号
	     *
	     * @public
	     * @returns 位号
	     */
	    getState_Designator(): string | undefined;
	    /**
	     * 获取属性状态：名称
	     *
	     * @public
	     * @returns 名称
	     */
	    getState_Name(): string | undefined;
	    /**
	     * 获取属性状态：唯一 ID
	     *
	     * @public
	     * @returns 唯一 ID
	     */
	    getState_UniqueId(): string | undefined;
	    /**
	     * 获取属性状态：制造商
	     *
	     * @public
	     * @returns 制造商
	     */
	    getState_Manufacturer(): string | undefined;
	    /**
	     * 获取属性状态：制造商编号
	     *
	     * @public
	     * @returns 制造商编号
	     */
	    getState_ManufacturerId(): string | undefined;
	    /**
	     * 获取属性状态：供应商
	     *
	     * @public
	     * @returns 供应商
	     */
	    getState_Supplier(): string | undefined;
	    /**
	     * 获取属性状态：供应商编号
	     *
	     * @public
	     * @returns 供应商编号
	     */
	    getState_SupplierId(): string | undefined;
	    /**
	     * 获取属性状态：其它参数
	     *
	     * @public
	     * @returns 其它参数
	     */
	    getState_OtherProperty(): {
	        [key: string]: string | number | boolean;
	    } | undefined;
	    /**
	     * 设置属性状态：坐标 X
	     *
	     * @beta
	     * @param x - 坐标 X
	     * @returns 器件图元对象
	     */
	    setState_X(x: number): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：坐标 Y
	     *
	     * @beta
	     * @param y - 坐标 Y
	     * @returns 器件图元对象
	     */
	    setState_Y(y: number): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 器件图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：是否镜像
	     *
	     * @beta
	     * @param mirror - 是否镜像
	     * @returns 器件图元对象
	     */
	    setState_Mirror(mirror: boolean): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：是否加入 BOM
	     *
	     * @beta
	     * @param addIntoBom - 是否加入 BOM
	     * @returns 器件图元对象
	     */
	    setState_AddIntoBom(addIntoBom: boolean | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：是否转到 PCB
	     *
	     * @beta
	     * @param addIntoPcb - 是否转到 PCB
	     * @returns 器件图元对象
	     */
	    setState_AddIntoPcb(addIntoPcb: boolean | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 器件图元对象
	     */
	    setState_Net(net: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：位号
	     *
	     * @beta
	     * @param designator - 位号
	     * @returns 器件图元对象
	     */
	    setState_Designator(designator: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：名称
	     *
	     * @beta
	     * @param name - 名称
	     * @returns 器件图元对象
	     */
	    setState_Name(name: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：唯一 ID
	     *
	     * @beta
	     * @param uniqueId - 唯一 ID
	     * @returns 器件图元对象
	     */
	    setState_UniqueId(uniqueId: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：制造商
	     *
	     * @beta
	     * @param manufacturer - 制造商
	     * @returns 器件图元对象
	     */
	    setState_Manufacturer(manufacturer: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：制造商编号
	     *
	     * @beta
	     * @param manufacturerId - 制造商编号
	     * @returns 器件图元对象
	     */
	    setState_ManufacturerId(manufacturerId: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：供应商
	     *
	     * @beta
	     * @param supplier - 供应商
	     * @returns 器件图元对象
	     */
	    setState_Supplier(supplier: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：供应商编号
	     *
	     * @beta
	     * @param supplierId - 供应商编号
	     * @returns 器件图元对象
	     */
	    setState_SupplierId(supplierId: string | undefined): ISCH_PrimitiveComponent;
	    /**
	     * 设置属性状态：其它参数
	     *
	     * @beta
	     * @param otherProperty - 其它参数
	     * @returns 器件图元对象
	     */
	    setState_OtherProperty(otherProperty: {
	        [key: string]: string | number | boolean;
	    }): ISCH_PrimitiveComponent;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toAsync(): ISCH_PrimitiveComponent;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 圆弧线图元对象
	     */
	    toSync(): ISCH_PrimitiveComponent;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveComponent>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 器件图元对象
	     */
	    done(): Promise<ISCH_PrimitiveComponent>;
	    /**
	     * 获取器件关联的所有引脚
	     *
	     * @alpha
	     * @returns 器件引脚图元数组
	     */
	    getAllPins(): Promise<Array<ISCH_PrimitiveComponentPin> | undefined>;
	    /**
	     * 设置属性状态：关联库器件
	     *
	     * @internal
	     * @param component - 关联库器件
	     * @returns 器件图元对象
	     */
	    private setState_Component;
	    /**
	     * 设置属性状态：子部件名称
	     *
	     * @internal
	     * @param subPartName - 子部件名称
	     * @returns 器件图元对象
	     */
	    private setState_SubPartName;
	}
	/**
	 * 复用模块符号图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveCbbSymbolComponent extends ISCH_PrimitiveComponent {
	    /**
	     * 关联复用模块
	     *
	     */
	    private cbb;
	    /**
	     * 关联复用模块符号
	     *
	     * @remarks libraryUuid 是 CBB 工程所在库的 UUID，cbbUuid 是 CBB 工程的 UUID，uuid 是 CBB 工程内符号的 UUID，name 是符号的显示名称
	     */
	    private cbbSymbol;
	    /**
	     * @internal
	     */
	    constructor(cbbSymbol: {
	        libraryUuid: string;
	        cbbUuid: string;
	        uuid?: string;
	        name?: string;
	    }, x: number, y: number, rotation?: number, mirror?: boolean, primitiveId?: string, symbol?: {
	        libraryUuid: string;
	        uuid: string;
	        name?: string;
	    }, designator?: string, name?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 器件图元对象
	     */
	    create(): Promise<ISCH_PrimitiveCbbSymbolComponent>;
	    /**
	     * 获取属性状态：关联复用模块
	     *
	     * @public
	     * @returns 关联复用模块
	     */
	    getState_Cbb(): {
	        libraryUuid: string;
	        uuid: string;
	    };
	    /**
	     * 获取属性状态：关联复用模块符号
	     *
	     * @public
	     * @returns 关联复用模块符号
	     */
	    getState_CbbSymbol(): {
	        libraryUuid: string;
	        cbbUuid: string;
	        uuid?: string;
	        name?: string;
	    };
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 复用模块符号图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveCbbSymbolComponent>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @alpha
	     * @returns 复用模块符号图元对象
	     */
	    done(): Promise<ISCH_PrimitiveCbbSymbolComponent>;
	    /**
	     * 设置属性状态：关联复用模块符号
	     *
	     * @internal
	     * @returns 复用模块符号图元对象
	     */
	    private setState_CbbSymbol;
	}

	/**
	 * 原理图 & 符号 / 二进制内嵌对象图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveObject implements ISCH_PrimitiveAPI {
	    /**
	     * 创建二进制内嵌对象
	     *
	     * @beta
	     * @param content - 对象内容
	     * @param startX - 起点坐标 X
	     * @param startY - 起点坐标 Y
	     * @param width - 宽
	     * @param height - 高
	     * @param rotation - 旋转角度
	     * @param mirror - 是否镜像
	     * @param fileName - 文件名称
	     * @returns 二进制内嵌对象图元对象
	     */
	    create(content: File | string, startX: number, startY: number, width?: number, height?: number, rotation?: number, mirror?: boolean, fileName?: string): Promise<ISCH_PrimitiveObject | undefined>;
	    /**
	     * 删除二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveIds - 二进制内嵌对象的图元 ID 或二进制内嵌对象图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveObject | Array<string> | Array<ISCH_PrimitiveObject>): Promise<boolean>;
	    /**
	     * 修改二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 二进制内嵌对象图元对象，`undefined` 表示修改失败
	     */
	    modify(primitiveId: string | ISCH_PrimitiveObject, property: {
	        content?: File | string;
	        startX?: number;
	        startY?: number;
	        width?: number;
	        height?: number;
	        rotation?: number;
	        mirror?: boolean;
	        fileName?: string;
	    }): Promise<ISCH_PrimitiveObject | undefined>;
	    /**
	     * 获取二进制内嵌对象
	     *
	     * @beta
	     * @param primitiveIds - 二进制内嵌对象的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 二进制内嵌对象图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveObject | undefined>;
	    /**
	     * 获取二进制内嵌对象
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 二进制内嵌对象的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 二进制内嵌对象图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveObject>>;
	    /**
	     * 获取所有二进制内嵌对象的图元 ID
	     *
	     * @beta
	     * @returns 二进制内嵌对象的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有二进制内嵌对象
	     *
	     * @beta
	     * @returns 二进制内嵌对象图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveObject>>;
	}
	/**
	 * 二进制内嵌对象图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveObject implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 对象内容 */
	    private content;
	    /** 起点坐标 X */
	    private startX;
	    /** 起点坐标 Y */
	    private startY;
	    /** 宽度 */
	    private width;
	    /** 高度 */
	    private height;
	    /** 旋转角度 */
	    private rotation;
	    /** 是否镜像 */
	    private mirror;
	    /** 文件名称 */
	    private fileName;
	    /** @internal */
	    constructor(content: File | string, startX: number, startY: number, width?: number, height?: number, rotation?: number, mirror?: boolean, fileName?: string, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 二进制内嵌对象图元对象
	     */
	    create(): Promise<ISCH_PrimitiveObject>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：对象内容
	     *
	     * @public
	     * @returns 对象内容
	     */
	    getState_Content(): File | string;
	    /**
	     * 获取属性状态：坐标 X
	     *
	     * @public
	     * @returns 坐标 X
	     */
	    getState_StartX(): number;
	    /**
	     * 获取属性状态：坐标 Y
	     *
	     * @public
	     * @returns 坐标 Y
	     */
	    getState_StartY(): number;
	    /**
	     * 获取属性状态：宽度
	     *
	     * @public
	     * @returns 宽度
	     */
	    getState_Width(): number;
	    /**
	     * 获取属性状态：高度
	     *
	     * @public
	     * @returns 高度
	     */
	    getState_Height(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：是否镜像
	     *
	     * @public
	     * @returns 是否镜像
	     */
	    getState_Mirror(): boolean;
	    /**
	     * 获取属性状态：文件名称
	     *
	     * @public
	     * @returns 文件名称
	     */
	    getState_FileName(): string;
	    /**
	     * 设置属性状态：对象内容
	     *
	     * @beta
	     * @param content - 对象内容
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Content(content: File | string): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：起点坐标 X
	     *
	     * @beta
	     * @param startX - 起点坐标 X
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_StartX(startX: number): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：起点坐标 Y
	     *
	     * @beta
	     * @param startY - 起点坐标 Y
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_StartY(startY: number): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：宽度
	     *
	     * @beta
	     * @param width - 宽度
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Width(width: number): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：高度
	     *
	     * @beta
	     * @param height - 高度
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Height(height: number): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：是否镜像
	     *
	     * @beta
	     * @param mirror - 是否镜像
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_Mirror(mirror: boolean): ISCH_PrimitiveObject;
	    /**
	     * 设置属性状态：文件名称
	     *
	     * @beta
	     * @param fileName - 文件名称
	     * @returns 二进制内嵌对象图元对象
	     */
	    setState_FileName(fileName: string): ISCH_PrimitiveObject;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 二进制内嵌对象图元对象
	     */
	    toAsync(): ISCH_PrimitiveObject;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 二进制内嵌对象图元对象
	     */
	    toSync(): ISCH_PrimitiveObject;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 二进制内嵌对象图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveObject>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 二进制内嵌对象图元对象
	     */
	    done(): Promise<ISCH_PrimitiveObject>;
	}

	/**
	 * 原理图 & 符号 / 多边形（折线）图元类
	 *
	 * @public
	 */
	class SCH_PrimitivePolygon implements ISCH_PrimitiveAPI {
	    /**
	     * 创建多边形
	     *
	     * @beta
	     * @param line - 坐标组，连续的一组 `[x1, y1, x2, y2, x3, y3]` 所描述的线
	     * @param color - 颜色，`null` 表示默认
	     * @param fillColor - 填充颜色，`none` 表示无填充，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @returns 多边形图元对象
	     */
	    create(line: Array<number>, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitivePolygon | undefined>;
	    /**
	     * 删除多边形
	     *
	     * @beta
	     * @param primitiveIds - 多边形的图元 ID 或多边形图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitivePolygon | Array<string> | Array<ISCH_PrimitivePolygon>): Promise<boolean>;
	    /**
	     * 修改多边形
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 多边形图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitivePolygon, property: {
	        line?: Array<number>;
	        color?: string | null;
	        fillColor?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	    }): Promise<ISCH_PrimitivePolygon | undefined>;
	    /**
	     * 获取多边形
	     *
	     * @beta
	     * @param primitiveIds - 多边形的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 多边形图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitivePolygon | undefined>;
	    /**
	     * 获取多边形
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 多边形的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 多边形图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitivePolygon>>;
	    /**
	     * 获取所有多边形的图元 ID
	     *
	     * @beta
	     * @returns 多边形的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有多边形
	     *
	     * @beta
	     * @returns 多边形图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitivePolygon>>;
	}
	/**
	 * 多边形（折线）图元
	 *
	 * @public
	 */
	class ISCH_PrimitivePolygon implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 坐标组 */
	    private line;
	    /** 颜色 */
	    private color;
	    /** 填充颜色 */
	    private fillColor;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** @internal */
	    constructor(line: Array<number>, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 多边形图元对象
	     */
	    create(): Promise<ISCH_PrimitivePolygon>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：坐标组
	     *
	     * @public
	     * @returns 坐标组
	     */
	    getState_Line(): Array<number>;
	    /**
	     * 获取属性状态：颜色
	     *
	     * @public
	     * @returns 颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：填充颜色
	     *
	     * @public
	     * @returns 填充颜色
	     */
	    getState_FillColor(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 设置属性状态：坐标组
	     *
	     * @beta
	     * @param line - 坐标组
	     * @returns 多边形图元对象
	     */
	    setState_Line(line: Array<number>): ISCH_PrimitivePolygon;
	    /**
	     * 设置属性状态：颜色
	     *
	     * @beta
	     * @param color - 颜色
	     * @returns 多边形图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitivePolygon;
	    /**
	     * 设置属性状态：填充颜色
	     *
	     * @beta
	     * @param fillColor - 填充颜色
	     * @returns 多边形图元对象
	     */
	    setState_FillColor(fillColor: string | null): ISCH_PrimitivePolygon;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 多边形图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitivePolygon;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 多边形图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitivePolygon;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 多边形图元对象
	     */
	    toAsync(): ISCH_PrimitivePolygon;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 多边形图元对象
	     */
	    toSync(): ISCH_PrimitivePolygon;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 多边形图元对象
	     */
	    reset(): Promise<ISCH_PrimitivePolygon>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 多边形图元对象
	     */
	    done(): ISCH_PrimitivePolygon;
	}

	/**
	 * 原理图 & 符号 / 矩形图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveRectangle implements ISCH_PrimitiveAPI {
	    /**
	     * 创建矩形
	     *
	     * @public
	     * @param topLeftX - 左上点 X
	     * @param topLeftY - 左上点 Y
	     * @param width - 宽
	     * @param height - 高
	     * @param cornerRadius - 圆角半径
	     * @param rotation - 旋转角度，绕左上点旋转，可选 `0` `90` `180` `270`
	     * @param color - 颜色，`null` 表示默认
	     * @param fillColor - 填充颜色，`none` 表示无填充，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @param fillStyle - 填充样式，`null` 表示默认
	     * @returns 矩形图元对象
	     */
	    create(topLeftX: number, topLeftY: number, width: number, height: number, cornerRadius?: number, rotation?: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null): Promise<ISCH_PrimitiveRectangle | undefined>;
	    /**
	     * 删除矩形
	     *
	     * @public
	     * @param primitiveIds - 矩形的图元 ID 或矩形图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveRectangle | Array<string> | Array<ISCH_PrimitiveRectangle>): Promise<boolean>;
	    /**
	     * 修改矩形
	     *
	     * @beta
	     * @param primitiveId - 图元 ID
	     * @param property - 修改参数
	     * @returns 矩形图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveRectangle, property: {
	        topLeftX?: number;
	        topLeftY?: number;
	        width?: number;
	        height?: number;
	        cornerRadius?: number;
	        rotation?: number;
	        color?: string | null;
	        fillColor?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	        fillStyle?: ESCH_PrimitiveFillStyle | null;
	    }): Promise<ISCH_PrimitiveRectangle | undefined>;
	    /**
	     * 获取矩形
	     *
	     * @beta
	     * @param primitiveIds - 矩形的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 矩形图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveRectangle | undefined>;
	    /**
	     * 获取矩形
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 矩形的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 矩形图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveRectangle>>;
	    /**
	     * 获取所有矩形的图元 ID
	     *
	     * @public
	     * @returns 矩形的图元 ID 数组
	     */
	    getAllPrimitiveId(): Promise<Array<string>>;
	    /**
	     * 获取所有矩形
	     *
	     * @public
	     * @returns 矩形图元对象数组
	     */
	    getAll(): Promise<Array<ISCH_PrimitiveRectangle>>;
	}
	/**
	 * 矩形图元
	 *
	 * @public
	 */
	class ISCH_PrimitiveRectangle implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 左上点 X */
	    private topLeftX;
	    /** 左上点 Y */
	    private topLeftY;
	    /** 宽 */
	    private width;
	    /** 高 */
	    private height;
	    /** 圆角半径 */
	    private cornerRadius;
	    /** 旋转角度 */
	    private rotation;
	    /** 边框颜色 */
	    private color;
	    /** 填充颜色 */
	    private fillColor;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** 填充样式 */
	    private fillStyle;
	    /** @internal */
	    constructor(topLeftX: number, topLeftY: number, width: number, height: number, cornerRadius?: number, rotation?: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 矩形图元对象
	     */
	    create(): Promise<ISCH_PrimitiveRectangle>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：左上点 X
	     *
	     * @public
	     * @returns 左上点 X
	     */
	    getState_TopLeftX(): number;
	    /**
	     * 获取属性状态：左上点 Y
	     *
	     * @public
	     * @returns 左上点 Y
	     */
	    getState_TopLeftY(): number;
	    /**
	     * 获取属性状态：宽
	     *
	     * @public
	     * @returns 宽
	     */
	    getState_Width(): number;
	    /**
	     * 获取属性状态：高
	     *
	     * @public
	     * @returns 高
	     */
	    getState_Height(): number;
	    /**
	     * 获取属性状态：圆角半径
	     *
	     * @public
	     * @returns 圆角半径
	     */
	    getState_CornerRadius(): number;
	    /**
	     * 获取属性状态：旋转角度
	     *
	     * @public
	     * @returns 旋转角度
	     */
	    getState_Rotation(): number;
	    /**
	     * 获取属性状态：边框颜色
	     *
	     * @public
	     * @returns 边框颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：填充颜色
	     *
	     * @public
	     * @returns 填充颜色
	     */
	    getState_FillColor(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 获取属性状态：填充样式
	     *
	     * @public
	     * @returns 填充样式
	     */
	    getState_FillStyle(): ESCH_PrimitiveFillStyle | null;
	    /**
	     * 设置属性状态：左上点 X
	     *
	     * @beta
	     * @param topLeftX - 左上点 X
	     * @returns 矩形图元对象
	     */
	    setState_TopLeftX(topLeftX: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：左上点 Y
	     *
	     * @beta
	     * @param topLeftY - 左上点 Y
	     * @returns 矩形图元对象
	     */
	    setState_TopLeftY(topLeftY: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：宽
	     *
	     * @beta
	     * @param width - 宽
	     * @returns 矩形图元对象
	     */
	    setState_Width(width: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：高
	     *
	     * @beta
	     * @param height - 高
	     * @returns 矩形图元对象
	     */
	    setState_Height(height: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：圆角半径
	     *
	     * @beta
	     * @param cornerRadius - 圆角半径
	     * @returns 矩形图元对象
	     */
	    setState_CornerRadius(cornerRadius: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：旋转角度
	     *
	     * @beta
	     * @param rotation - 旋转角度
	     * @returns 矩形图元对象
	     */
	    setState_Rotation(rotation: number): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：边框颜色
	     *
	     * @beta
	     * @param color - 边框颜色
	     * @returns 矩形图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：填充颜色
	     *
	     * @beta
	     * @param fillColor - 填充颜色
	     * @returns 矩形图元对象
	     */
	    setState_FillColor(fillColor: string | null): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 矩形图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 矩形图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitiveRectangle;
	    /**
	     * 设置属性状态：填充样式
	     *
	     * @beta
	     * @param fillStyle - 填充样式
	     * @returns 矩形图元对象
	     */
	    setState_FillStyle(fillStyle: ESCH_PrimitiveFillStyle | null): ISCH_PrimitiveRectangle;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 矩形图元对象
	     */
	    toAsync(): ISCH_PrimitiveRectangle;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 矩形图元对象
	     */
	    toSync(): ISCH_PrimitiveRectangle;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @beta
	     * @returns 矩形图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveRectangle>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 矩形图元对象
	     */
	    done(): ISCH_PrimitiveRectangle;
	}

	/**
	 * 原理图 & 符号 / 导线图元类
	 *
	 * @public
	 */
	class SCH_PrimitiveWire implements ISCH_PrimitiveAPI {
	    /**
	     * 创建导线
	     *
	     * @beta
	     * @param line - 多段线坐标组，每段都是连续的一组 `[x1, y1, x2, y2, x3, y3]` 所描述的线，如若多段线彼此无任何连接则创建将会失败
	     * @param net - 网络名称，如若未指定，则遵循：
	     * 1. 没有坐标落在任何图元上，则默认为空网络；
	     * 2. 有一个坐标点在某个网络的图元上，则跟随该图元的网络；
	     * 3. 有多个坐标点在多个不同网络的图元上，则创建失败
	     *
	     * 如若已指定，则遵循：
	     * 1. 有一个或多个坐标点在其他网络的图元上，且其他图元并未显式（通常指的是包含网络标签或网络端口）指定网络，则其他图元跟随指定的网络；
	     * 2. 如若其他图元指定了网络，则创建失败
	     * @param color - 导线颜色，`null` 表示默认
	     * @param lineWidth - 线宽，范围 `1-10`，`null` 表示默认
	     * @param lineType - 线型，`null` 表示默认
	     * @returns 导线图元对象
	     */
	    create(line: Array<number> | Array<Array<number>>, net?: string, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveWire | undefined>;
	    /**
	     * 删除导线
	     *
	     * @beta
	     * @param primitiveIds - 导线的图元 ID 或导线图元对象
	     * @returns 删除操作是否成功
	     */
	    delete(primitiveIds: string | ISCH_PrimitiveWire | Array<string> | Array<ISCH_PrimitiveWire>): Promise<boolean>;
	    /**
	     * 修改导线
	     *
	     * @beta
	     * @param primitiveId - 导线的图元 ID 或导线图元对象
	     * @param property - 修改参数
	     * @returns 导线图元对象
	     */
	    modify(primitiveId: string | ISCH_PrimitiveWire, property: {
	        line?: Array<number> | Array<Array<number>>;
	        net?: string;
	        color?: string | null;
	        lineWidth?: number | null;
	        lineType?: ESCH_PrimitiveLineType | null;
	    }): Promise<ISCH_PrimitiveWire | undefined>;
	    /**
	     * 获取导线
	     *
	     * @beta
	     * @param primitiveIds - 导线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 导线图元对象，`undefined` 表示获取失败
	     */
	    get(primitiveIds: string): Promise<ISCH_PrimitiveWire | undefined>;
	    /**
	     * 获取导线
	     *
	     * @beta
	     * @remarks 如若传入多个图元 ID，任意图元 ID 未匹配到不影响其它图元的返回，即可能返回少于传入的图元 ID 数量的图元对象
	     * @param primitiveIds - 导线的图元 ID，可以为字符串或字符串数组，如若为数组，则返回的也是数组
	     * @returns 导线图元对象，空数组表示获取失败
	     */
	    get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveWire>>;
	    /**
	     * 获取所有导线的图元 ID
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 导线的图元 ID 数组
	     */
	    getAllPrimitiveId(net?: string | Array<string>): Promise<Array<string>>;
	    /**
	     * 获取所有导线
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 导线图元对象数组
	     */
	    getAll(net?: string | Array<string>): Promise<Array<ISCH_PrimitiveWire>>;
	}
	/**
	 * 导线图元
	 *
	 * @public
	 * @remarks
	 * 尚未解决的问题：
	 *
	 * `ISCH_PrimitiveWire.net` 全局网络名属性因其涉及多图页刷新，当前获取的值可能为 **错误** 的。
	 * 当你尝试为一个导线、总线设置多个名称（放置多个网络标签）时，获取到的 `net` 属性可能并不是当前最新的，
	 * 需要等待画布事件异步刷新全局网络后，再行获取。
	 */
	class ISCH_PrimitiveWire implements ISCH_Primitive {
	    /** 异步 */
	    private async;
	    /** 图元类型 */
	    private readonly primitiveType;
	    /** 图元 ID */
	    private primitiveId?;
	    /** 多段线坐标组 */
	    private line;
	    /** 网络名称 */
	    private net;
	    /** 导线颜色 */
	    private color;
	    /** 线宽 */
	    private lineWidth;
	    /** 线型 */
	    private lineType;
	    /** @internal */
	    constructor(line: Array<number> | Array<Array<number>>, net?: string, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, primitiveId?: string);
	    /**
	     * 在原理图画布中创建图元
	     *
	     * @internal
	     * @returns 导线图元对象
	     */
	    create(): Promise<ISCH_PrimitiveWire>;
	    /**
	     * 获取属性状态：图元类型
	     *
	     * @public
	     * @returns 图元类型
	     */
	    getState_PrimitiveType(): ESCH_PrimitiveType;
	    /**
	     * 获取属性状态：图元 ID
	     *
	     * @public
	     * @returns 图元 ID
	     */
	    getState_PrimitiveId(): string;
	    /**
	     * 获取属性状态：多段线坐标组
	     *
	     * @public
	     * @returns 多段线坐标组
	     */
	    getState_Line(): Array<number> | Array<Array<number>>;
	    /**
	     * 获取属性状态：网络名称
	     *
	     * @public
	     * @returns 网络名称
	     */
	    getState_Net(): string;
	    /**
	     * 获取属性状态：总线颜色
	     *
	     * @public
	     * @returns 总线颜色
	     */
	    getState_Color(): string | null;
	    /**
	     * 获取属性状态：线宽
	     *
	     * @public
	     * @returns 线宽
	     */
	    getState_LineWidth(): number | null;
	    /**
	     * 获取属性状态：线型
	     *
	     * @public
	     * @returns 线型
	     */
	    getState_LineType(): ESCH_PrimitiveLineType | null;
	    /**
	     * 设置属性状态：多段线坐标组
	     *
	     * @beta
	     * @param line - 多段线坐标组
	     * @returns 导线图元对象
	     */
	    setState_Line(line: Array<number> | Array<Array<number>>): ISCH_PrimitiveWire;
	    /**
	     * 设置属性状态：网络名称
	     *
	     * @beta
	     * @param net - 网络名称
	     * @returns 导线图元对象
	     */
	    setState_Net(net: string): ISCH_PrimitiveWire;
	    /**
	     * 设置属性状态：导线颜色
	     *
	     * @beta
	     * @param color - 导线颜色
	     * @returns 导线图元对象
	     */
	    setState_Color(color: string | null): ISCH_PrimitiveWire;
	    /**
	     * 设置属性状态：线宽
	     *
	     * @beta
	     * @param lineWidth - 线宽
	     * @returns 导线图元对象
	     */
	    setState_LineWidth(lineWidth: number | null): ISCH_PrimitiveWire;
	    /**
	     * 设置属性状态：线型
	     *
	     * @beta
	     * @param lineType - 线型
	     * @returns 导线图元对象
	     */
	    setState_LineType(lineType: ESCH_PrimitiveLineType | null): ISCH_PrimitiveWire;
	    /**
	     * 将图元转换为异步图元
	     *
	     * @public
	     * @returns 导线图元对象
	     */
	    toAsync(): ISCH_PrimitiveWire;
	    /**
	     * 将图元转换为同步图元
	     *
	     * @public
	     * @returns 导线图元对象
	     */
	    toSync(): ISCH_PrimitiveWire;
	    /**
	     * 查询图元是否为异步图元
	     *
	     * @public
	     * @returns 是否为异步图元
	     */
	    isAsync(): boolean;
	    /**
	     * 将异步图元重置为当前画布状态
	     *
	     * @alpha
	     * @returns 导线图元对象
	     */
	    reset(): Promise<ISCH_PrimitiveWire>;
	    /**
	     * 将对图元的更改应用到画布
	     *
	     * @beta
	     * @returns 导线图元对象
	     */
	    done(): Promise<ISCH_PrimitiveWire>;
	}

	/**
	 * 原理图 & 符号 / 选择控制类
	 *
	 * @public
	 * @remarks 获取或操作选择的元素
	 */
	class SCH_SelectControl {
	    /**
	     * 查询所有已选中图元的图元 ID
	     *
	     * @beta
	     * @returns 所有已选中图元的图元 ID
	     */
	    getAllSelectedPrimitives_PrimitiveId(): Promise<Array<string>>;
	    /**
	     * 查询所有已选中图元的图元对象
	     *
	     * @beta
	     * @returns 所有已选中图元的图元对象
	     */
	    getAllSelectedPrimitives(): Promise<Array<ISCH_Primitive>>;
	    /**
	     * 查询选中图元的图元 ID
	     *
	     * @public
	     * @deprecated 请使用 {@link SCH_SelectControl.getAllSelectedPrimitives_PrimitiveId | getAllSelectedPrimitives_PrimitiveId} 替代
	     * @returns 选中图元的图元 ID
	     */
	    getSelectedPrimitives_PrimitiveId(): Promise<Array<string>>;
	    /**
	     * 查询选中图元的所有参数
	     *
	     * @beta
	     * @deprecated 请使用 {@link SCH_SelectControl.getAllSelectedPrimitives | getAllSelectedPrimitives} 替代
	     * @returns 选中图元的所有参数
	     */
	    getSelectedPrimitives(): Promise<Array<Object>>;
	    /**
	     * 使用图元 ID 选中图元
	     *
	     * @public
	     * @param primitiveIds - 图元 ID
	     * @returns 操作是否成功
	     */
	    doSelectPrimitives(primitiveIds: string | Array<string>): Promise<boolean>;
	    /**
	     * 进行交叉选择
	     *
	     * @public
	     * @param components - 器件位号
	     * @param pins - 器件位号_引脚编号，格式为 ['U1_1', 'U1_2']
	     * @param nets - 网络名称
	     * @param highlight - 是否高亮
	     * @param select - 是否选中
	     * @returns 操作是否成功
	     */
	    doCrossProbeSelect(components?: Array<string>, pins?: Array<string>, nets?: Array<string>, highlight?: boolean, select?: boolean): boolean;
	    /**
	     * 清除选中
	     *
	     * @public
	     * @returns 操作是否成功
	     */
	    clearSelected(): boolean;
	    /**
	     * 获取当前鼠标在画布上的位置
	     *
	     * @beta
	     * @returns 鼠标在画布上的位置，`undefined` 代表当前鼠标不在画布上
	     */
	    getCurrentMousePosition(): Promise<{
	        x: number;
	        y: number;
	    } | undefined>;
	    /**
	     * 查询所有已选中图元的图元对象
	     *
	     * @internal
	     * @returns 所有已选中图元的图元对象
	     */
	    private getAllSelectedPrimitives3;
	}

	/**
	 * 动态仿真引擎推送事件类型
	 *
	 * @public
	 */
	enum ESCH_DynamicSimulationEnginePushEventType {
	    /** 状态变化（RUNNING/PAUSED/STOPPED...） */
	    SESSION_STATE = "SESSION_STATE",
	    /** 实时数据帧（波形点/节点电压/内部量） */
	    STREAM_DATA = "STREAM_DATA",
	    /** 一次快照（可选，用于 UI 刷新） */
	    STREAM_SNAPSHOT = "STREAM_SNAPSHOT",
	    /** 实时日志 */
	    ENGINE_LOG = "ENGINE_LOG",
	    /** 错误 */
	    ENGINE_ERROR = "ENGINE_ERROR"
	}
	/**
	 * Spice 仿真引擎推送事件类型
	 *
	 * @public
	 */
	enum ESCH_SpiceSimulationEnginePushEventType {
	    /** 仿真结果 */
	    SIMULATION_RESULT = "SIMULATION_RESULT",
	    /** 验证结果 */
	    VALIDATION_RESULT = "VALIDATION_RESULT",
	    /** 日志 */
	    LOG_RESULT = "LOG_RESULT",
	    /** 错误 */
	    ERROR_RESULT = "ERROR_RESULT"
	}
	/**
	 * 原理图 & 符号 / 仿真引擎类
	 *
	 * @public
	 * @remarks 控制仿真引擎的对接和交互
	 */
	class SCH_SimulationEngine {
	    /**
	     * 向仿真内核发送数据
	     *
	     * @param eventType - 事件类型
	     * @param props - 数据
	     */
	    pushData(eventType: ESCH_DynamicSimulationEnginePushEventType | ESCH_SpiceSimulationEnginePushEventType, props: {
	        [key: string]: any;
	    }): void;
	}

	/**
	 * 原理图 & 符号 / 工具类
	 *
	 * @public
	 */
	class SCH_Utils {
	    /**
	     * 拆分多段线
	     *
	     * @alpha
	     * @remarks
	     * 将相互之间无任何连接的多段线坐标组拆分成多个多段线，无论是否有多个多段线，本函数都会在输入数据的基础上包裹一层数组；
	     * 建议用于 {@link ISCH_PrimitiveBus} 和 {@link ISCH_PrimitiveWire} 等包含多段线的场景
	     * @param lines - 多段线坐标组，每段都是连续的一组 `[x1, y1, x2, y2, x3, y3]` 所描述的线
	     */
	    splitLines(lines: Array<number | Array<number>>): Array<Array<number | Array<number>>> | undefined;
	}

	/**
	 * 系统 / 外部请求类
	 *
	 * @public
	 * @remarks 向外部服务器发起安全的 cURL 请求
	 */
	class SYS_ClientUrl {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 发起即时请求
	     *
	     * @public
	     * @remarks
	     * 请注意，需要在被请求的站点上允许跨源资源共享（CORS），否则接口将始终返回错误结果。
	     *
	     * 更多信息，请查阅 {@link https://developer.mozilla.org/docs/Web/HTTP/CORS | 跨源资源共享 (CORS) - MDN}。
	     *
	     * 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param url - 请求地址
	     * @param method - 请求方法
	     * @param data - 请求发送的数据，可以是直接数据或 {@link https://developer.mozilla.org/docs/Web/API/URLSearchParams | URLSearchParams} 对象，如果 method 为 `HEAD` 或 `GET`，本参数将被忽略
	     * @param options - 请求参数
	     * @param succeedCallFn - 请求成功后回调的函数
	     * @returns Fetch 的返回结果
	     */
	    request(url: string, method?: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'PATCH', data?: string | Blob | FormData | URLSearchParams, options?: {
	        headers?: {
	            [header: string]: any;
	        };
	        integrity?: string;
	    }, succeedCallFn?: (data: Response) => void | Promise<void>): Promise<Response>;
	}

	/**
	 * @fileoverview Table 组件类型定义
	 * @description 整合 Table 和 ExcelTable 所有功能的类型声明
	 */

	/** 表格对齐方式 */
	type TableCellAlign = 'left' | 'center' | 'right';
	/** 列固定位置 */
	type TableColFixed = 'left' | 'right';
	/** 排序状态 */
	type SortStatus = 'asc' | 'desc' | 'unset';
	/** 表格数据变更类型 */
	enum ETableDataChangeType {
	    NORMAL = "NORMAL",
	    CHECKED = "checked",
	    ASC_SORT = "ASC_SORT",
	    DESC_SORT = "DESC_SORT"
	}
	/** 单元格类型枚举 */
	enum CellType {
	    /** 表头单元格 */
	    TH = "th",
	    /** 数据单元格 */
	    TD = "td"
	}
	/** 单元格内容类型枚举 */
	enum CellContentType {
	    /** 纯文本 */
	    TEXT = "TEXT",
	    /** 输入框 */
	    INPUT = "INPUT",
	    /** 文本域 */
	    TEXTAREA = "TEXTAREA",
	    /** 下拉框 */
	    SELECT = "SELECT",
	    /** 勾选框 */
	    CHECKBOX = "CHECKBOX",
	    /** 自定义单元格 */
	    CUSTOM = "CUSTOM",
	    /** 未定义单元格 */
	    UNDEFINED = "UNDEFINED"
	}
	/** 单元格属性 */
	interface CellAttributes {
	    /** 列跨度 */
	    colSpan?: number;
	    /** 行跨度 */
	    rowSpan?: number;
	    /** 样式 */
	    style?: CSSProperties;
	    /** 类名 */
	    className?: string;
	}
	/** 有禁用状态的单元格参数 */
	interface HasDisabledCellParams {
	    disabled?: boolean;
	}
	/** 有子类型的单元格参数 */
	interface HasSubTypeCellParams {
	    /** 指定类型单元格下仍然可以再细分类型 */
	    type?: string;
	}
	interface TextContentCellParams {
	    value?: string;
	    content?: string;
	}
	/** 输入框内容单元格参数 */
	interface InputContentCellParams extends HasDisabledCellParams {
	    value?: string;
	    onChange: (value: string) => void;
	    onConfirm: (cell: any) => void;
	    children?: ReactElement;
	}
	/** 下拉框选项 */
	interface SelectOption {
	    text: string;
	    value: string | number;
	    disabled?: boolean;
	}
	/** 下拉框内容单元格参数 */
	interface SelectContentCellParams extends HasDisabledCellParams {
	    value?: string | number;
	    onChange: (value: string | number | Array<string | number>) => void;
	    options?: SelectOption[];
	    children?: ReactElement;
	}
	/** 勾选框内容单元格参数 */
	interface CheckBoxContentCellParams extends HasDisabledCellParams {
	    checked?: boolean;
	    onChange: (checked: boolean) => void;
	}
	/** 文本域内容单元格参数 */
	interface TextareaContentCellParams extends HasDisabledCellParams {
	    value?: string;
	    onChange: (value: string) => void;
	    children?: ReactElement;
	}
	/** 自定义内容单元格参数 */
	interface CustomContentCellParams<T = any, K = any> extends HasSubTypeCellParams {
	    /** 自定义节点 */
	    element: ReactElement | {
	        Element: (props: K) => ReactElement;
	        elementProps: K;
	    };
	    /** 遮罩层样式 */
	    maskStyle?: CSSProperties;
	    /** 是否允许编辑 */
	    canEdit?: (instance: any) => boolean;
	    /** 是否允许粘贴 */
	    canPaste?: (instance: any) => boolean;
	    /** 是否置灰 */
	    isDisabled?: (instance: any) => boolean;
	    /** 获取value */
	    getValue?: (instance: any) => T;
	    /** 获取展示text */
	    getText?: (instance: any) => string;
	    /** 设置value */
	    setValue?: (instance: any, value: T) => void;
	    /** 进入编辑状态回调 */
	    onEdit?: (instance: any, value?: T) => void;
	    /** 确认回调 */
	    onConfirm?: (cell: any) => void;
	    /** 额外数据 */
	    data?: {
	        [key: string]: any;
	    };
	}
	/** 单元格内容类型映射 */
	interface CellContentReflect {
	    [CellContentType.CHECKBOX]: CheckBoxContentCellParams;
	    [CellContentType.TEXT]: TextContentCellParams;
	    [CellContentType.INPUT]: InputContentCellParams;
	    [CellContentType.SELECT]: SelectContentCellParams;
	    [CellContentType.TEXTAREA]: TextareaContentCellParams;
	    [CellContentType.CUSTOM]: CustomContentCellParams;
	    [CellContentType.UNDEFINED]: undefined;
	}
	/** 单元格内容参数泛型 */
	type CellContentParams<T extends CellContentType = CellContentType> = CellContentReflect[T];
	/** 单元格配置 */
	interface TableCellConfig<T extends CellContentType = CellContentType> {
	    /** 单元格类型 */
	    cellType?: CellType;
	    /** 单元格属性 */
	    cellAttributes?: CellAttributes;
	    /** 内容类型 */
	    contentType?: T;
	    /** 内容参数 */
	    content?: CellContentParams<T>;
	    /** 是否支持排序（仅表头有效） */
	    sortable?: boolean;
	    /** 排序字段名（仅表头有效） */
	    sortKey?: string;
	}
	/** 单元格属性 */
	type TableCellProps = string | TableCellConfig;

	/** 表格行数据 */
	interface TableRow {
	    /** 自定义行背景颜色 */
	    bgColor?: string;
	    /** 错误行标识 */
	    isError?: boolean;
	    /** 不显示复选框 */
	    noCheckbox?: boolean;
	    /** 固定状态 */
	    fixed?: boolean;
	    /** 禁止选中当前行 */
	    disabledRow?: boolean;
	    /** 禁用复选框 */
	    disabledCheckbox?: boolean;
	    /** 允许事件传递 */
	    propagationClickHandle?: boolean;
	    /** 数据唯一索引值 */
	    [key: string]: any;
	}
	/** 表格列配置 */
	interface TableColumn {
	    /** 列key值 */
	    key: string;
	    /** 列名 */
	    name: string;
	    /** 列宽 */
	    width?: number;
	    /** 是否开启排序 */
	    sortable?: boolean;
	    /** 排序字段 */
	    sortKey?: string | string[];
	    /** 是否允许编辑 */
	    editable?: boolean | 1 | 2;
	    /** 是否带过滤搜索功能 */
	    filter?: boolean;
	    /** ��元格对齐方式 */
	    align?: TableCellAlign;
	    /** 下拉框列表 */
	    selectList?: SelectOption[];
	    /** 当前列单元格是否开启溢出省略 */
	    ellipsis?: boolean;
	    /** 固定列位置 */
	    fixed?: TableColFixed;
	    /** 列宽固定 */
	    fixedWidth?: boolean;
	    /** 是否悬浮显示列bodytitle */
	    showBodyTitle?: boolean;
	    /** 样式 */
	    style?: CSSProperties;
	    /** 点击事件 */
	    onClick?: (colKey: string, ev: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
	    /** 设置单元格属性 */
	    onCell?: (row: TableRow, index: number, colKey: string) => CellAttributes | void;
	    /** 设置列头单元格属性 */
	    onHeadCell?: (col: TableColumn) => CellAttributes | void;
	    /** 自定义cell渲染 */
	    render?: (params: RenderParam) => ReactNode;
	    /** 自定义headerCell渲染 */
	    nameRender?: () => ReactNode;
	}
	/** 渲染参数 */
	interface RenderParam {
	    /** 点击对象 */
	    clickObj: TableClickObj;
	    /** 行号 */
	    rowNumber: number;
	    /** 列key */
	    colKey: string;
	    /** 行数据 */
	    row: TableRow;
	    /** 单元格数据 */
	    cellData: any;
	    /** 表格数据 */
	    tableData: TableRow[];
	    /** 编辑行号数组 */
	    editingRowNumbers: number[];
	    /** 选中行号数组 */
	    selectedRowNumbers: number[];
	    /** 设置单元格样式 */
	    setCellStyle: (style: CSSProperties) => void;
	    /** 设置行样式 */
	    setRowStyle: (style: CSSProperties) => void;
	    /** 设置所有单元格样式 */
	    setAllCellStyle: (style: CSSProperties) => void;
	    /** 设置行数据 */
	    setRowData: (data: {
	        rowIndex: number;
	        colKey: string;
	        value: string | number;
	    }) => void;
	    /** 设置表格数据 */
	    setTableData: (data: TableRow[]) => void;
	    /** 折叠展开回调 */
	    onToggleExpand?: (action: 'Expand' | 'Collapse', rows: Array<TableRow>, opIndex: number) => void;
	    /** 高亮字符串 */
	    heightLightStr?: string;
	}
	/** 表格点击对象 */
	interface TableClickObj {
	    /** 行号 */
	    rowNumber: number;
	    /** 列key */
	    colKey?: string;
	    /** 点击次数 */
	    clickCount: number;
	    /** 是否Ctrl按下 */
	    isCtrl?: boolean;
	    /** 是否Shift按下 */
	    isShift?: boolean;
	    /** 是否选中 */
	    checked?: boolean;
	    /** 鼠标事件 */
	    e: React.MouseEvent<HTMLTableDataCellElement> | null;
	}
	/** 表格点击参数 */
	interface TableOnClickParam {
	    /** 点击对象 */
	    clickObj?: TableClickObj;
	    /** 行数据 */
	    row: TableRow;
	    /** 表格数据 */
	    tableData?: TableRow[];
	    /** 编辑行号数组 */
	    editingRowNumbers?: number[];
	    /** 选中行号数组 */
	    selectedRowNumbers?: number[];
	    /** 所有选中索引值 */
	    allSelectedRowIndexValues?: Set<string | number>;
	    /** 是否Ctrl按下 */
	    isCtrl?: boolean;
	    /** 是否Shift按下 */
	    isShift?: boolean;
	    /** 来源 */
	    from?: string;
	    /** 设置单元格样式 */
	    setCellStyle?: (style: CSSProperties) => void;
	}
	/** 复选框变更可选参数 */
	interface CheckedOptionalParams {
	    /** 是否由行更新触发 */
	    isTriggerByRowsUpdate: boolean;
	    /** 是否由选中列表更新触发 */
	    isTriggerByCheckListUpdate?: boolean;
	    /** 行数据 */
	    row?: TableRow;
	}
	/** 排序信息 */
	interface SortInfo {
	    /** 列key */
	    colKey: string;
	    /** 排序字段 */
	    key: string | string[];
	    /** 排序状态 */
	    status: SortStatus;
	}
	/** 移动行信息 */
	interface MoveRowIndex {
	    /** 当前索引 */
	    curIndex: number;
	    /** 新索引 */
	    newIndex: number;
	}
	/** 删除行信息 */
	interface DelRowInfo {
	    /** 索引值 */
	    indexValue: string;
	    /** 刷新次数 */
	    refreshCount: number;
	}
	/** 增加行数据 */
	interface AddRowData {
	    [key: number]: TableRow;
	}
	/** 拖拽配置参数 */
	interface DragConfigParams {
	    /** 上限索引 */
	    upperLimitIndex: number;
	    /** 下限索引 */
	    lowerLimitIndex: number;
	}
	/** Table 组件属性 */
	interface TableProps {
	    /** 表格ID */
	    id?: string;
	    /** 数据唯一索引值字段 */
	    index: string;
	    /** 表格名称 */
	    name?: string;
	    /** 表格宽度 */
	    width?: number;
	    /** 表格高度 */
	    height?: number;
	    /** 列配置 */
	    columns: TableColumn[];
	    /** 行数据 */
	    rows: TableRow[];
	    /** 表格头部数据 */
	    head?: Array<Array<TableCellProps>>;
	    /** 表格内容数据 */
	    body?: Array<Array<TableCellProps>>;
	    /** 表格尾部数据 */
	    foot?: Array<Array<TableCellProps>>;
	    /** 是否显示序号 */
	    number?: boolean;
	    /** 是否显示边框 */
	    border?: boolean;
	    /** 是否显示表头边框 */
	    headerBorder?: boolean;
	    /** 表格行栅栏显示效果 */
	    stockade?: boolean;
	    /** 是否带复选框 */
	    checkbox?: boolean;
	    /** 需要选中的行 */
	    checkedList?: TableRow[];
	    /** 是否固定表头 */
	    fixedHeader?: boolean;
	    /** 是否显示表头 */
	    showHeader?: boolean;
	    /** 行上下移动的下标信息 */
	    moveRowIndex?: MoveRowIndex;
	    /** 要删除行的信息 */
	    delRowInfo?: DelRowInfo;
	    /** 增加行数据 */
	    addRowData?: AddRowData;
	    /** 是否开启虚拟滚动 */
	    openVirtualScroll?: boolean;
	    /** 表格搜索值 */
	    searchValue?: string;
	    /** 外部控制选中行 */
	    selectedRowNumbers?: number[];
	    /** 外部控制编辑行 */
	    editingRowNumbers?: number[];
	    /** 行选中背景颜色 */
	    openRowSelectedBgColor?: boolean;
	    /** 是否在表格头右键菜单中显示"自定义表头"设置项 */
	    showCustomHeadSettingOnHeadContextmenu?: boolean;
	    /** 是否改变表头排序的状态 */
	    isChangeSortStatus?: boolean;
	    /** 是否显示表格状态提示词 */
	    showStatus?: boolean;
	    /** 状态提示内容 */
	    statusNode?: ReactNode;
	    /** 是否高亮多行 */
	    multiSelect?: boolean;
	    /** 是否开启上下键移动高亮行 */
	    moveAble?: boolean;
	    /** 是否仅高亮文本 */
	    isOnlyHighlightText?: boolean;
	    /** 行高 */
	    rowHeight?: number;
	    /** 头高 */
	    headHeight?: number;
	    /** 表头行高 */
	    headLineHeight?: number;
	    /** 是否允许鼠标滑过时选中该行 */
	    enableSelectRowByHover?: boolean;
	    /** 重置表格内部数据 */
	    resetTableDataCount?: number;
	    /** 数据变化时是否重置滚动位置到顶部 */
	    resetScrollOnDataChange?: boolean;
	    /** 是否允许拖拽排序 */
	    enableDragSort?: boolean;
	    /** 是否显示拖拽图标 */
	    showDragIcon?: boolean;
	    /** 拖拽配置 */
	    dragConfig?: DragConfigParams;
	    /** 是否开启多行拖拽 */
	    openMultiDrag?: boolean;
	    /** 是否跟随高亮 */
	    followHeightLight?: boolean;
	    /** 是否开启拖动列宽 */
	    resize?: boolean;
	    /** 是否开启点击时按住ctrl自动操作行 */
	    isCtrlSelect?: boolean;
	    /** 是否开启点击时按住shift自动操作行 */
	    isShiftSelect?: boolean;
	    /** 开启虚拟滚动，在高度变更后是否滚动到第一个勾选项或顶部 */
	    virtualScrollAutoFirst?: boolean;
	    /** 滚动X基底部距离 */
	    scrollXBaseBottom?: number;
	    /** 额外高度 */
	    extraHeight?: number;
	    /** 自定义th样式 */
	    headerStyle?: CSSProperties;
	    /** 是否启用横向滚动 */
	    enableScrollX?: boolean;
	    /** 是否双击 */
	    doubleClick?: boolean;
	    /** 使用指针拖拽 */
	    usePointerDrag?: boolean;
	    /** 高亮搜索的正则 */
	    highLightRegexpFn?: (v: any) => RegExp;
	    /** 是否启用表头竖向显示功能 */
	    enableVerticalHeader?: boolean;
	    /** 指定忽略竖向显示的表头键 */
	    verticalHeaderIgnoreKeys?: string[];
	    /** 复选框改变事件回调 */
	    onCheckRow?: (rows: TableRow[], rowNumbers: number[], optional: CheckedOptionalParams) => void;
	    /** 全选回调 */
	    onAllChecked?: (data: TableRow[], checked: boolean) => void;
	    /** 选中行回调 */
	    onClick?: (props: TableOnClickParam) => void;
	    /** 表格数据变动的事件回调 */
	    onChange?: (data: TableRow[], row?: TableRow, type?: ETableDataChangeType, optional?: PlainObject) => void;
	    /** 表格行右键回调 */
	    onContextMenu?: (rows: TableRow, ev: React.MouseEvent<HTMLTableCellElement>) => void;
	    /** 行鼠标离开 */
	    onRowMouseLeave?: (row: TableRow, rowIndex: number) => void;
	    /** 行鼠标进入 */
	    onRowMouseEnter?: (row: TableRow, rowIndex: number) => void;
	    /** 行鼠标移动 */
	    onRowMouseMove?: (row: TableRow, rowIndex: number) => void;
	    /** 拖拽移动结束回调 */
	    onDragMoveEnd?: (handlerInitialIndex: number | number[], insertedRealtimeIndex: number, handlerRealtimeIndex: number | number[]) => void;
	    /** 表格滚动回调 */
	    onTableScroll?: (tableScrollHeight: number, currentTableHeight: number, scrollTop: number) => void;
	    /** 把searchValue搜索到的高亮数据返回 */
	    searchValueCB?: (a: any) => void;
	    /** 列尺寸变化回调 */
	    onColSizeChange?: (col: TableColumn, cols: TableColumn[]) => void;
	    /** 排序触发后的回调 */
	    onSort?: (info: SortInfo) => void;
	    /** 表格样式 */
	    style?: CSSProperties;
	    /** 表格body样式 */
	    tableBodyStyle?: CSSProperties;
	}
	/** 普通对象类型 */
	type PlainObject = {
	    [key: string]: any;
	};
	/** Table 实例方法类型 */
	interface TableInstance {
	    /** 全选 */
	    checkAll: () => void;
	    /** 选中某一行 */
	    checkedRow: ({ row, checked }: {
	        row: TableRow;
	        checked: boolean;
	    }) => void;
	    /** 选择某一行 */
	    toSelectRow: (row: TableRow, option?: {
	        isCtrl?: boolean;
	        isShift?: boolean;
	    }, from?: string) => void;
	    /** 向下移动高亮行 */
	    downMove: (rowNumber?: number) => void;
	    /** 向上移动高亮行 */
	    upMove: (rowNumber?: number) => void;
	    /** 滚动到选中行 */
	    scrollSelectedRowIntoView: () => void;
	    /** 滚动到指定行 */
	    scrollRowIntoView: (rowIndex: string) => void;
	    /** 根据滚动位置处理表格滚动 */
	    handleTableScrollByScrollTop: (scrollTop: number) => void;
	    /** 刷新表格 */
	    refresh: () => void;
	    /** 取消排序状态 */
	    cancelSortStatus: () => void;
	    /** 表格体 DOM 引用 */
	    tableBodyDiv: HTMLDivElement | null;
	    /** 恢复选中 */
	    revertSelect: () => void;
	    /** 虚拟滚动行索引到视图 */
	    virtualScrollRowIndexIntoView: (rowIdx: number) => void;
	}

	type IconProps = {
	    /** 模板名称 */
	    iconClass: string;
	} | {
	    /** 图标地址 */
	    iconUrl: string;
	} | {};

	interface ButtonProps {
	    text?: string;
	    disabled?: boolean;
	    type?: 'default' | 'primary' | 'danger' | 'forbidden' | 'text';
	    width?: number | 'responsive';
	    icon?: IconProps;
	    onClick?: () => void;
	}
	function Button({ text, disabled, type, width, icon, onClick, }: ButtonProps): react_jsx_runtime.JSX.Element;

	interface ListChildren$1 {
	    title: string;
	    id?: string;
	    value?: string;
	    clearBtn?: boolean;
	    children?: ListChildren$1[];
	    selected?: boolean;
	}
	interface InputProps {
	    width?: number;
	    disabled?: boolean;
	    readonly?: boolean;
	    clearBtn?: boolean;
	    clickBtn?: boolean;
	    dropDownList?: ListChildren$1[];
	    searchBtn?: boolean;
	    value?: string;
	    placeholder?: string;
	    preText?: string;
	    type: 'text' | 'telephone' | 'number' | 'password' | 'color' | 'email';
	    otherAttr?: {
	        [key: string]: string;
	    };
	    testVal?: string;
	    onClick?: () => void;
	    onSearchClick?: (data: string) => void;
	    onFilterClick?: (data: string) => void;
	    onChange?: (data: string) => void;
	    onAddClick?: (data: string) => void;
	    onBlur?: (data: string) => void;
	}
	function Input({ width, disabled, readonly, clearBtn, clickBtn, dropDownList, searchBtn, value: propValue, placeholder, preText, type, otherAttr, testVal, onClick, onSearchClick, onFilterClick, onChange, onAddClick, onBlur, }: InputProps): react_jsx_runtime.JSX.Element;

	interface TextProps {
	    value: string;
	    fontFamily?: string;
	    textAlign?: 'left' | 'center' | 'right';
	    fontSize?: number;
	    color?: string;
	}
	function Text({ value, fontFamily, textAlign, fontSize, color, }: TextProps): react_jsx_runtime.JSX.Element;

	interface ContainerStyleProps {
	    backgroundColor?: string;
	    borderWidth?: number;
	    borderColor?: string;
	    hide?: boolean;
	    color?: string;
	    padding?: number[];
	    margin?: number[];
	    width?: number | '100%';
	    height?: number | '100%';
	    rotate?: number;
	    cursor?: 'pointer' | 'default' | 'none' | 'move' | 'text';
	    invisible?: boolean;
	    display?: string;
	}

	interface FlexProps extends ContainerStyleProps {
	    direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
	    alignX?: 'start' | 'center' | 'end';
	    alignY?: 'start' | 'center' | 'end' | 'stretch';
	    gap?: number;
	    classes?: string[];
	    children?: React__default__default.ReactNode;
	    onClick?: () => void;
	}
	function Flex({ direction, alignX, alignY, gap, classes, children, onClick, ...styleProps }: FlexProps): react_jsx_runtime.JSX.Element;

	interface FlexItemProps extends ContainerStyleProps {
	    flexRatio?: number;
	    children?: React__default__default.ReactNode;
	    onClick?: () => void;
	}
	function FlexItem({ flexRatio, children, onClick, ...styleProps }: FlexItemProps): react_jsx_runtime.JSX.Element;

	interface GridProps extends ContainerStyleProps {
	    columns: number;
	    rowGap?: number;
	    colGap?: number;
	    children?: React__default__default.ReactNode;
	}
	function Grid({ columns, rowGap, colGap, children, ...styleProps }: GridProps): react_jsx_runtime.JSX.Element;

	interface GridItemProps extends ContainerStyleProps {
	    colSpan?: number;
	    rowSpan?: number;
	    align?: 'start' | 'center' | 'end' | 'stretch';
	    children?: React__default__default.ReactNode;
	}
	function GridItem({ colSpan, rowSpan, align, children, ...styleProps }: GridItemProps): react_jsx_runtime.JSX.Element;

	interface ListChildren {
	    title: string;
	    id?: string;
	    value?: string;
	    clearBtn?: boolean;
	    children?: ListChildren[];
	    childrenCollapse?: boolean;
	    selected?: boolean;
	    icons?: IconProps[];
	}
	interface ListProps {
	    width?: number;
	    height?: number;
	    list: ListChildren[];
	    itemHeight?: number;
	    border?: boolean;
	    expandEnable?: boolean;
	    onItemClick?: (id: string, item: ListChildren) => void;
	    onItemDblclick?: (id: string) => void;
	    onItemContextmenu?: (id: string) => void;
	}
	function List({ width, height, list, itemHeight: propItemHeight, border, expandEnable, onItemClick, onItemDblclick, onItemContextmenu, }: ListProps): react_jsx_runtime.JSX.Element;

	interface CheckBoxProps {
	    checked?: boolean;
	    disabled?: boolean;
	    text?: string;
	    name?: string;
	    onlyChangeByBox?: boolean;
	    onChange?: (checked: boolean) => void;
	}
	function CheckBox({ checked, disabled, text, name, onlyChangeByBox, onChange, }: CheckBoxProps): react_jsx_runtime.JSX.Element;

	interface RadioProps {
	    disabled?: boolean;
	    text: string;
	    value: string;
	    width?: number;
	}
	interface RadioGroupProps {
	    group: RadioProps[];
	    selectedValue?: string;
	    onlyChangeByBox?: boolean;
	    lineBreak?: boolean;
	    gap?: number;
	    onChange?: (value: string) => void;
	}
	function RadioGroup({ group, selectedValue, onlyChangeByBox, lineBreak, gap, onChange, }: RadioGroupProps): react_jsx_runtime.JSX.Element;

	interface TextAreaProps {
	    disabled?: boolean;
	    value?: string;
	    width?: number;
	    height?: number;
	    resizable?: {
	        x?: boolean;
	        y?: boolean;
	    };
	    placeholder?: string;
	    name?: string;
	    onChange?: (value: string) => void;
	}
	function TextArea({ disabled, value, width, height, resizable, placeholder, name, onChange, }: TextAreaProps): react_jsx_runtime.JSX.Element;

	interface ModalProps {
	    top: number;
	    left: number;
	    width: number;
	    height: number;
	    overlay?: boolean;
	    maxDragX?: number;
	    maxDragY?: number;
	    hide?: boolean;
	    resizeX?: boolean;
	    resizeY?: boolean;
	    children?: React__default__default.ReactNode;
	    onMoved?: (top: number, left: number) => void;
	}
	function Modal({ top, left, width, height, maxDragX, maxDragY, hide, overlay, resizeX, resizeY, children, onMoved, }: ModalProps): react_jsx_runtime.JSX.Element;

	interface DialogProps {
	    title: string;
	    width?: number;
	    height?: number;
	    left?: number;
	    top?: number;
	    hide?: boolean;
	    overlay?: boolean;
	    maxDragY?: number;
	    modal?: boolean;
	    resizeX?: boolean;
	    resizeY?: boolean;
	    buttons?: ButtonProps[];
	    onClose?: () => void;
	    children?: React__default__default.ReactNode;
	    footer?: React__default__default.ReactNode;
	}
	function Dialog(props: DialogProps): react_jsx_runtime.JSX.Element;

	interface SelectListItem {
	    title: string;
	    value?: string;
	    selected?: boolean;
	    children?: SelectListItem[];
	}
	interface SelectProps {
	    width?: number;
	    disabled?: boolean;
	    readonly?: boolean;
	    dropDownList?: SelectListItem[];
	    value?: string;
	    onChange?: (value: string) => void;
	}
	function Select({ width, disabled, readonly, dropDownList, value, onChange }: SelectProps): react_jsx_runtime.JSX.Element;

	interface BoardProps {
	    padding?: number[];
	    bgColor?: string;
	    width?: number;
	    height?: number;
	    title: string;
	    children?: React__default__default.ReactNode;
	    onClick?: () => void;
	}
	function Board({ padding, bgColor, width, height, title, children, onClick }: BoardProps): react_jsx_runtime.JSX.Element;

	interface ImageProps {
	    src: string;
	    width?: number;
	    height?: number;
	    title?: string;
	    onClick?: () => void;
	}
	function Image({ src, width, height, title, onClick }: ImageProps): react_jsx_runtime.JSX.Element;

	const ComponentsIndex: {
	    readonly Button: typeof Button;
	    readonly Input: typeof Input;
	    readonly Text: typeof Text;
	    readonly Flex: typeof Flex;
	    readonly FlexItem: typeof FlexItem;
	    readonly Grid: typeof Grid;
	    readonly GridItem: typeof GridItem;
	    readonly List: typeof List;
	    readonly CheckBox: typeof CheckBox;
	    readonly RadioGroup: typeof RadioGroup;
	    readonly TextArea: typeof TextArea;
	    readonly Modal: typeof Modal;
	    readonly Dialog: typeof Dialog;
	    readonly Select: typeof Select;
	    readonly Board: typeof Board;
	    readonly Image: typeof Image;
	    readonly Table: React__default.ForwardRefExoticComponent<TableProps & React__default.RefAttributes<TableInstance>>;
	};
	const LC_DESIGN_COMPONENTS_NAMES: (keyof typeof ComponentsIndex)[];
	type TComponentsIndex = typeof ComponentsIndex;
	type KComponentsIndex = keyof TComponentsIndex;
	type ComponentProps<T extends KComponentsIndex> = TComponentsIndex[T] extends React.ComponentType<infer P> ? P : never;

	type ReactComponentProps<T extends KComponentsIndex> = ComponentProps<T>;
	type LC_DESIGN_COMPONENTS = {
	    [K in KComponentsIndex]: (props: ReactComponentProps<K>) => React.ReactElement;
	};

	/**
	 * React 实例接口
	 * 用于接收扩展的 React 实例
	 *
	 * @alpha
	 * @remarks
	 * 此接口定义了从扩展传递的 React 实例的方法。
	 * 由于扩展和 pro-api 使用不同的 React 实例，需要通过此接口传递 React 方法。
	 * @example
	 * ```typescript
	 * const ReactInstance = {
	 *   createContext: React.createContext,
	 *   useContext: React.useContext,
	 *   useRef: React.useRef,
	 *   useEffect: React.useEffect,
	 *   createElement: React.createElement,
	 * };
	 * ```
	 */
	interface ISYS_ReactComponentizationDialogReactInstance {
	    /**
	     * 创建 React Context
	     * @typeParam T - Context 的值类型
	     * @returns Context 对象
	     */
	    createContext: <T>(defaultValue: T) => React.Context<T>;
	    /**
	     * 读取和订阅 Context 的值
	     * @typeParam T - Context 的值类型
	     * @param context - Context 对象
	     * @returns Context 的当前值
	     */
	    useContext: <T>(context: React.Context<T>) => T;
	    /**
	     * 创建一个可变的 ref 对象
	     * @typeParam T - ref 的值类型
	     * @param initialValue - 初始值
	     * @returns ref 对象
	     */
	    useRef: <T>(initialValue: T) => React.MutableRefObject<T>;
	    /**
	     * 执行副作用操作
	     * @param effect - 副作用函数
	     * @param deps - 依赖项数组
	     */
	    useEffect: (effect: () => undefined | (() => undefined), deps?: React.DependencyList) => void;
	    /**
	     * 创建并返回指定类型的新 React 元素
	     * @param type - 元素类型
	     * @param props - 元素属性
	     * @param children - 子元素
	     * @returns React 元素
	     */
	    createElement: <P extends Record<string, unknown>>(type: React.ElementType<P>, props?: P | null, ...children: React.ReactNode[]) => React.ReactElement<P>;
	}
	/**
	 * React Reconciler 实例接口
	 * 用于接收扩展的 react-reconciler 实例
	 *
	 * @alpha
	 * @remarks
	 * 此接口定义了从扩展传递的 react-reconciler 实例。
	 * react-reconciler 是 React 的自定义渲染器，用于实现虚拟 DOM 渲染。
	 * @example
	 * ```typescript
	 * const ReconcilerInstance = {
	 *   default: Reconciler,
	 *   constants: {
	 *     ContinuousEventPriority,
	 *     DiscreteEventPriority,
	 *     DefaultEventPriority,
	 *     ConcurrentRoot,
	 *   },
	 * };
	 * ```
	 */
	interface ISYS_ReactComponentizationDialogReconcilerInstance {
	    /**
	     * Reconciler 构造函数
	     * @param config - Reconciler 配置
	     * @returns Reconciler 实例
	     */
	    default: any;
	    /**
	     * Reconciler 常量
	     */
	    constants: {
	        /**
	         * 连续事件优先级
	         * 用于鼠标移动、滚动等连续事件
	         */
	        ContinuousEventPriority: number;
	        /**
	         * 离散事件优先级
	         * 用于点击、键盘输入等离散事件
	         */
	        DiscreteEventPriority: number;
	        /**
	         * 默认事件优先级
	         * 用于没有特定优先级的事件
	         */
	        DefaultEventPriority: number;
	        /**
	         * 并发根节点标签
	         * 用于标识并发模式的根节点
	         */
	        ConcurrentRoot: number;
	    };
	}
	/**
	 * WorkerPortal 类接口
	 * 用于管理组件的生命周期和事件处理
	 *
	 * @alpha
	 * @remarks
	 * WorkerPortal 负责在虚拟环境中创建、更新和销毁组件，
	 * 并通过消息机制与 EditorDesignPortal 通信。
	 */
	interface ISYS_ReactComponentizationDialogWorkerPortal {
	    /**
	     * Provider 组件
	     * 用于提供 PortalContext 给子组件
	     */
	    Provider: React.ComponentType<React.PropsWithChildren<unknown>>;
	    /**
	     * 创建组件
	     * @param handle - 组件句柄
	     * @param type - 组件类型
	     * @param props - 组件属性
	     * @param parent - 父组件句柄
	     */
	    createComponent: (handle: string, type: string, props: Record<string, unknown>, parent: string) => void;
	    /**
	     * 更新组件
	     * @param handle - 组件句柄
	     * @param props - 新的组件属性
	     */
	    updateComponent: (handle: string, props: Record<string, unknown>) => void;
	    /**
	     * 销毁组件
	     * @param handle - 组件句柄
	     */
	    detachComponent: (handle: string) => void;
	    /**
	     * 绑定事件处理器
	     * @param handle - 组件句柄
	     * @param callback - 事件回调函数
	     */
	    bindEvent: (handle: string, callback: (event: unknown) => void) => void;
	    /**
	     * 触发事件
	     * @param handle - 组件句柄
	     * @param event - 事件对象
	     */
	    dispatchEvent: (handle: string, event: unknown) => void;
	}
	/**
	 * VirtualRender 类接口
	 * 用于在虚拟环境中渲染 React 组件
	 *
	 * @alpha
	 * @remarks
	 * VirtualRender 使用 react-reconciler 实现虚拟 DOM 渲染，
	 * 不直接操作真实 DOM，而是通过消息机制与 EditorDesignPortal 通信。
	 */
	interface ISYS_ReactComponentizationDialogVirtualRender {
	    /**
	     * 渲染 React 元素
	     * @param element - React 元素
	     */
	    render: (element: React.ReactNode) => void;
	}
	/**
	 * React 组件化弹出窗口接口
	 *
	 * @alpha
	 * @remarks
	 * 此接口提供了创建 React 组件化弹出窗口所需的所有功能。
	 * 通过此接口，用户可以使用 lc-editor-design 提供的预制组件创建自定义弹窗。
	 * @example
	 * ```typescript
	 * const { Components, WorkerPortal, VirtualRender } = await eda.sys_Dialog.createReactComponentizationDialogInterface(
	 *   {
	 *     createContext: React.createContext,
	 *     useContext: React.useContext,
	 *     useRef: React.useRef,
	 *     useEffect: React.useEffect,
	 *     createElement: React.createElement,
	 *   },
	 *   {
	 *     default: Reconciler,
	 *     constants: {
	 *       ContinuousEventPriority,
	 *       DiscreteEventPriority,
	 *       DefaultEventPriority,
	 *       ConcurrentRoot,
	 *     },
	 *   },
	 * );
	 *
	 * const portal = new WorkerPortal();
	 * const root = new VirtualRender();
	 *
	 * function MyDialog() {
	 *   return (
	 *     <Modal defaultTop={100} defaultLeft={100} defaultWidth={800} defaultHeight={600}>
	 *       <Dialog title="My Dialog">
	 *         <Input placeholder="Enter text" />
	 *       </Dialog>
	 *     </Modal>
	 *   );
	 * }
	 *
	 * root.render(
	 *   <portal.Provider>
	 *     <MyDialog />
	 *   </portal.Provider>,
	 * );
	 * ```
	 */
	interface ISYS_ReactComponentizationDialogInterface {
	    /**
	     * 预制组件
	     *
	     * @remarks
	     * 包含所有 lc-editor-design 提供的预制组件，如 Modal、Dialog、Input、Button 等。
	     */
	    Components: LC_DESIGN_COMPONENTS;
	    /**
	     * 组件名称常量
	     *
	     * @remarks
	     * 包含所有预制组件的名称常量，用于类型安全的组件引用。
	     */
	    LC_DESIGN_COMPONENTS_NAMES: typeof LC_DESIGN_COMPONENTS_NAMES;
	    /**
	     * WorkerPortal 类
	     *
	     * @remarks
	     * 用于管理组件的生命周期和事件处理。
	     * 需要实例化后使用。
	     */
	    WorkerPortal: new () => ISYS_ReactComponentizationDialogWorkerPortal;
	    /**
	     * VirtualRender 类
	     *
	     * @remarks
	     * 用于在虚拟环境中渲染 React 组件。
	     * 需要实例化后使用。
	     */
	    VirtualRender: new () => ISYS_ReactComponentizationDialogVirtualRender;
	}

	/**
	 * 系统 / 对话框类
	 *
	 * @public
	 * @remarks 生成对话框窗口
	 */
	class SYS_Dialog {
	    /**
	     * 创建 React 组件化弹出窗口接口
	     *
	     * @alpha
	     * @param React - 扩展的 React 实例
	     * @param Reconciler - 扩展的 react-reconciler 实例
	     * @returns 包含 Components、LC_DESIGN_COMPONENTS_NAMES、WorkerPortal 类和 VirtualRender 类的对象
	     */
	    createReactComponentizationDialogInterface(React: ISYS_ReactComponentizationDialogReactInstance, Reconciler: ISYS_ReactComponentizationDialogReconcilerInstance): Promise<ISYS_ReactComponentizationDialogInterface>;
	    /**
	     * 弹出消息窗口
	     *
	     * @public
	     * @remarks 显示一个文字消息窗口
	     * @param content - 消息文本，支持使用 `\n` 换行
	     * @param title - 弹出窗口标题
	     * @param buttonTitle - 按钮标题，为空则不显示按钮
	     */
	    showInformationMessage(content: string, title?: string, buttonTitle?: string): void;
	    /**
	     * 弹出确认窗口
	     *
	     * @public
	     * @remarks 显示一个拥有确认和取消按钮的窗口
	     * @param content - 消息文本，支持使用 `\n` 换行
	     * @param title - 弹出窗口标题
	     * @param mainButtonTitle - 主要按钮标题
	     * @param buttonTitle - 主要按钮标题
	     * @param callbackFn - 回调函数
	     */
	    showConfirmationMessage(content: string, title?: string, mainButtonTitle?: string, buttonTitle?: string, callbackFn?: (mainButtonClicked: boolean) => void): void;
	    /**
	     * 弹出输入窗口
	     *
	     * @beta
	     * @param beforeContent - 输入框上方文字
	     * @param afterContent - 输入框下方文字
	     * @param title - 弹出窗口标题
	     * @param type - 输入框类型
	     * @param value - 输入框默认值
	     * @param otherProperty - 其它参数，可参考 {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#attributes | The HTML Input element}
	     * @param callbackFn - 回调函数
	     * @returns 用户输入的值，始终为 `string` 类型，除非用户点击了 **取消** 按钮
	     */
	    showInputDialog(beforeContent?: string, afterContent?: string, title?: string, type?: 'color' | 'date' | 'datetime-local' | 'email' | 'mouth' | 'number' | 'password' | 'tel' | 'text' | 'time' | 'url' | 'week', value?: string | number, otherProperty?: {
	        max?: number;
	        maxlength?: number;
	        min?: number;
	        minlength?: number;
	        multiple?: boolean;
	        pattern?: RegExp;
	        placeholder?: string;
	        readonly?: boolean;
	        step?: number;
	    }, callbackFn?: (value: any) => void): void;
	    /**
	     * 弹出选择窗口
	     *
	     * @beta
	     * @param options -
	     * 选项列表，可以为字符串数组或对象数组，在未指定 `defaultOption` 时，默认值为列表的第一项；
	     *
	     * 如若为字符串数组，则选项的值和选项的展示内容将保持一致；
	     *
	     * 如若为对象数组，则 `value` 表示选项的值，`displayContent` 表示选项的展示内容
	     * @param beforeContent - 选择框上方文字
	     * @param afterContent - 选择框下方文字
	     * @param title - 选择框标题
	     * @param defaultOption - 默认选项，以选项的值作为匹配参数，如若 `multiple` 参数为 `true`，则此处需要传入字符串数组
	     * @param multiple - 是否支持多选，默认为单选框
	     * @param callbackFn - 回调函数
	     * @returns 用户选择的值，对应传入的 `options` 中的 `value` 字段
	     */
	    showSelectDialog(options: Array<string> | Array<{
	        value: string;
	        displayContent: string;
	    }>, beforeContent?: string, afterContent?: string, title?: string, defaultOption?: string, multiple?: false, callbackFn?: (value: string) => void | Promise<void>): void;
	    /**
	     * 弹出多选窗口
	     *
	     * @beta
	     * @param options -
	     * 选项列表，可以为字符串数组或对象数组，在未指定 `defaultOption` 时，默认值为列表的第一项；
	     *
	     * 如若为字符串数组，则选项的值和选项的展示内容将保持一致；
	     *
	     * 如若为对象数组，则 `value` 表示选项的值，`displayContent` 表示选项的展示内容
	     * @param beforeContent - 多选框上方文字
	     * @param afterContent - 多选框下方文字
	     * @param title - 多选框标题
	     * @param defaultOption - 默认选项数组，以选项的值作为匹配参数
	     * @param multiple - 是否支持多选
	     * @param callbackFn - 回调函数
	     * @returns 用户选择的值的集合数组，对应传入的 `options` 中的 `value` 字段
	     */
	    showSelectDialog(options: Array<string> | Array<{
	        value: string;
	        displayContent: string;
	    }>, beforeContent?: string, afterContent?: string, title?: string, defaultOption?: Array<string>, multiple?: true, callbackFn?: (value: Array<string>) => void | Promise<void>): void;
	    /**
	     * 向指定原生弹窗注入函数
	     *
	     * @internal
	     * @param dialogId - 弹窗 ID
	     * @param scriptFunction - 注入函数
	     * @param args - 传入 `scriptFunction` 的参数
	     */
	    insertScriptToDialog(dialogId: string, scriptFunction: (...args: Array<any>) => void | Promise<void>, ...args: Array<any>): void;
	}

	/**
	 * 系统 / 运行环境类
	 *
	 * @public
	 * @remarks 获取嘉立创 EDA 专业版运行环境参数
	 */
	class SYS_Environment {
	    /**
	     * 是否处于浏览器环境
	     *
	     * @public
	     * @returns 是否处于浏览器环境
	     */
	    isWeb(): boolean;
	    /**
	     * 是否处于客户端环境
	     *
	     * @public
	     * @returns 是否处于客户端环境
	     */
	    isClient(): boolean;
	    /**
	     * 是否为 EasyEDA Pro 版本
	     *
	     * @public
	     * @returns 是否为 EasyEDA Pro 版本
	     */
	    isEasyEDAProEdition(): boolean;
	    /**
	     * 是否为 嘉立创EDA 专业版本
	     *
	     * @public
	     * @returns 是否为嘉立创EDA 专业版本
	     */
	    isJLCEDAProEdition(): boolean;
	    /**
	     * 是否为私有化部署版本
	     *
	     * @public
	     * @returns 是否为私有化部署版本
	     */
	    isProPrivateEdition(): boolean;
	    /**
	     * 是否为在线模式
	     *
	     * @public
	     * @returns 是否为在线模式
	     */
	    isOnlineMode(): boolean;
	    /**
	     * 是否为半离线模式
	     *
	     * @public
	     * @returns 是否为半离线模式
	     */
	    isHalfOfflineMode(): boolean;
	    /**
	     * 是否为全离线模式
	     *
	     * @public
	     * @returns 是否为全离线模式
	     */
	    isOfflineMode(): boolean;
	    /**
	     * 获取编辑器当前版本
	     *
	     * @public
	     * @returns 编辑器当前版本
	     */
	    getEditorCurrentVersion(): string;
	    /**
	     * 获取编辑器编译日期
	     *
	     * @public
	     * @returns 编辑器编译日期
	     */
	    getEditorCompliedDate(): string;
	    /**
	     * 获取用户信息
	     *
	     * @public
	     * @returns 用户信息
	     */
	    getUserInfo(): {
	        username?: string;
	        nickname?: string;
	        avatar?: string;
	        uuid?: string;
	        customerCode?: string;
	    };
	    /**
	     * 设置环境：保持工程仅拥有一个板子
	     *
	     * @internal
	     * @remarks Board、Schematic、PCB 均保持唯一
	     * @param status - 环境变量状态
	     */
	    setKeepProjectHasOnlyOneBoard(status?: boolean): Promise<void>;
	}

	/**
	 * 文件系统文件路径
	 *
	 * @public
	 */
	interface ISYS_FileSystemFileList {
	    /** 文件名（前后均无斜杠） */
	    fileName: string;
	    /** 是否为目录 */
	    isDirectory: boolean;
	    /** 目录子文件 */
	    subFiles?: Array<ISYS_FileSystemFileList>;
	    /** 相对路径，不包含前面的传入路径和文件名（当没有传入路径时，不存在相对路径），且前后均无斜杠 */
	    relativePath?: string;
	    /** 完整路径，包含文件名的绝对路径 */
	    fullPath: string;
	}
	/**
	 * 系统 / 文件系统交互类
	 *
	 * @public
	 */
	class SYS_FileSystem {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 获取扩展内的文件
	     *
	     * @public
	     * @param uri - 文件路径
	     * @returns File 格式文件
	     */
	    getExtensionFile(uri: string): Promise<File | undefined>;
	    /**
	     * 打开读入文件窗口
	     *
	     * @beta
	     * @param filenameExtensions - 文件扩展名
	     * @param multiFiles - 是否允许读取多文件
	     * @returns File 格式文件数组
	     */
	    openReadFileDialog(filenameExtensions?: string | Array<string>, multiFiles?: true): Promise<Array<File> | undefined>;
	    /**
	     * 打开读入文件窗口
	     *
	     * @beta
	     * @param filenameExtensions - 文件扩展名
	     * @param multiFiles - 是否允许读取多文件
	     * @returns File 格式文件
	     */
	    openReadFileDialog(filenameExtensions?: string | Array<string>, multiFiles?: false): Promise<File | undefined>;
	    /**
	     * 打开读入文件夹窗口
	     *
	     * @alpha
	     * @remarks 本接口的浏览器支持有限，具体请参考 {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory | MDN}
	     * @returns 读取到的所有文件及其路径信息
	     */
	    openReadFolderDialog(): Promise<Array<{
	        relativePath: string;
	        file: File;
	    }>>;
	    /**
	     * 保存文件
	     *
	     * @public
	     * @remarks 调用浏览器下载接口或 Electron 保存文件接口，将传入的文件流保存到本地
	     * @param fileData - 文件数据
	     * @param fileName - 文件名称
	     */
	    saveFile(fileData: File | Blob, fileName?: string): Promise<void>;
	    /**
	     * 从文件系统读取文件
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param uri - 文件资源定位符，需要包含完整的文件名称的绝对路径
	     * @returns File 格式文件
	     */
	    readFileFromFileSystem(uri: string): Promise<File | undefined>;
	    /**
	     * 向文件系统写入文件
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param uri - 文件资源定位符
	     *
	     * 如若结尾为斜杠 `/`（Windows 为反斜杠 `\`），则识别为文件夹；
	     *
	     * 如若结尾非斜杠，则识别为完整文件名，此时 `fileName` 参数将被忽略
	     * @param fileData - 文件数据
	     * @param fileName - 文件名称
	     * @param force - 强制写入（文件存在则覆盖文件）
	     * @returns 写入操作是否成功，如若不允许覆盖但文件已存在将返回 `false` 的结果
	     */
	    saveFileToFileSystem(uri: string, fileData: File | Blob, fileName?: string, force?: boolean): Promise<boolean>;
	    /**
	     * 查看文件系统路径下的文件列表
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param folderPath - 目录路径
	     * @param recursive - 是否递归获取所有子文件
	     * @returns 当前目录下的文件列表
	     */
	    listFilesOfFileSystem(folderPath: string, recursive?: boolean): Promise<Array<ISYS_FileSystemFileList>>;
	    /**
	     * 删除文件系统内的文件
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param uri - 文件资源定位符
	     *
	     * 如若结尾为斜杠 `/`（Windows 为反斜杠 `\`），则识别为文件夹；
	     *
	     * 如若结尾非斜杠，则识别为完整文件名，此时 `fileName` 参数将被忽略
	     * @param force - 强制删除文件夹（当欲删除的是文件夹且文件夹内有文件时，是否强制删除该文件夹）
	     * @returns 删除操作是否成功
	     */
	    deleteFileInFileSystem(uri: string, force?: boolean): Promise<boolean>;
	    /**
	     * 获取 EDA 文档目录路径
	     *
	     * @beta
	     * @remarks
	     * 返回的路径中，结尾不包含斜杠 `/`（或反斜杠 `\`）
	     *
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @returns EDA 文档目录路径
	     */
	    getEdaPath(): Promise<string>;
	    /**
	     * 获取文档目录路径
	     *
	     * @beta
	     * @remarks
	     * 返回的路径中，结尾不包含斜杠 `/`（或反斜杠 `\`）
	     *
	     * 注意 1：本接口仅客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @returns 文档目录路径
	     */
	    getDocumentsPath(): Promise<string>;
	    /**
	     * 获取库目录路径
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅全离线客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @returns 库目录路径数组
	     */
	    getLibrariesPaths(): Promise<Array<string>>;
	    /**
	     * 获取工程目录路径
	     *
	     * @beta
	     * @remarks
	     * 注意 1：本接口仅半、全离线客户端有效，在浏览器环境内调用将始终 `throw Error`
	     *
	     * 注意 2：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @returns 工程目录路径数组
	     */
	    getProjectsPaths(): Promise<Array<string>>;
	}

	/**
	 * 系统 / 字体管理类
	 *
	 * @public
	 * @remarks 配置嘉立创 EDA 专业版允许调用的系统字体列表
	 */
	class SYS_FontManager {
	    /**
	     * 获取当前已经配置的字体列表
	     *
	     * @public
	     * @returns 字体列表
	     */
	    getFontsList(): Promise<Array<string>>;
	    /**
	     * 添加字体到字体列表
	     *
	     * @public
	     * @param fontName - 字体名称
	     * @returns 添加操作是否成功
	     */
	    addFont(fontName: string): Promise<boolean>;
	    /**
	     * 删除字体列表内的指定字体
	     *
	     * @public
	     * @param fontName - 字体名称
	     * @returns 删除操作是否成功
	     */
	    deleteFont(fontName: string): Promise<boolean>;
	}

	/**
	 * 系统 / 格式转换（Chameleon）类
	 *
	 * @public
	 * @remarks 与其它板级 EDA 软件进行交叉文件格式转换
	 */
	class SYS_FormatConversion {
	    /**
	     * 转换 Altium Designer 库到单个嘉立创库文件
	     *
	     * @beta
	     * @param file - Altium Designer 库文件
	     * @returns 嘉立创库文件
	     */
	    convertAltiumDesignerLibrariesToEasyEDASingleFile(file: File | Array<File>): Promise<File | undefined>;
	    /**
	     * 转换 Altium Designer 库到多个嘉立创库文件（每个器件一个文件）
	     *
	     * @beta
	     * @param file - Altium Designer 库文件
	     * @returns 多个嘉立创库文件
	     */
	    convertAltiumDesignerLibrariesToEasyEDAMultiFiles(file: File | Array<File>): Promise<Array<File>>;
	    /**
	     * 转换 T/DISA 4001 库到单个嘉立创库文件
	     *
	     * @beta
	     * @param file - T/DISA 4001 库文件
	     * @returns 嘉立创库文件
	     */
	    convertDisaLibrariesToEasyEDASingleFile(file: File | Array<File>): Promise<File | undefined>;
	    /**
	     * 转换 T/DISA 4001 库到多个嘉立创库文件（每个器件一个文件）
	     *
	     * @beta
	     * @param file - T/DISA 4001 库文件
	     * @returns 多个嘉立创库文件
	     */
	    convertDisaLibrariesToEasyEDAMultiFiles(file: File | Array<File>): Promise<Array<File>>;
	}

	/**
	 * 顶部菜单环境
	 *
	 * @public
	 */
	enum ESYS_HeaderMenuEnvironment {
	    /** 主页 */
	    HOME = "home",
	    /** 空白页 */
	    BLANK = "blank",
	    /** 原理图 */
	    SCHEMATIC = "sch",
	    /** 符号（包括 CBB 符号） */
	    SYMBOL = "symbol",
	    /** PCB */
	    PCB = "pcb",
	    /** 封装 */
	    FOOTPRINT = "footprint",
	    /** PCB 预览（包括 2D、3D 预览） */
	    PCB_VIEW = "pcbView",
	    /** 面板 */
	    PANEL = "panel",
	    /** 面板库 */
	    PANEL_LIBRARY = "panelLibrary",
	    /** 面板预览 */
	    PANEL_VIEW = "panelView",
	    /** 仿真原理图：NGspice */
	    SIMULATION_SCHEMATIC_NGSPICE = "simulationSchematicNGspice",
	    /** 仿真原理图：SimulIDE */
	    SIMULATION_SCHEMATIC_SIMULIDE = "simulationSchematicSimulIDE"
	}
	/**
	 * 顶部菜单项
	 *
	 * @public
	 */
	interface ISYS_HeaderMenus {
	    /** 主页 */
	    home?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 空白页 */
	    blank?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 原理图 */
	    schematic?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /**
	     * 原理图
	     *
	     * @deprecated 请使用 `schematic` 替代 `sch`
	     */
	    sch?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 符号（包括 CBB 符号） */
	    symbol?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** PCB */
	    pcb?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 封装 */
	    footprint?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** PCB 预览（包括 2D、3D 预览） */
	    pcbView?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 面板 */
	    panel?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 面板库 */
	    panelLibrary?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 面板预览 */
	    panelView?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 仿真原理图：NGspice */
	    simulationSchematicNGspice?: Array<ISYS_HeaderMenuTopMenuItem>;
	    /** 仿真原理图：SimulIDE */
	    simulationSchematicSimulIDE?: Array<ISYS_HeaderMenuTopMenuItem>;
	}
	/**
	 * 顶部一级菜单项
	 *
	 * @public
	 */
	interface ISYS_HeaderMenuTopMenuItem {
	    /** 菜单项 ID，不可重复 */
	    id: string;
	    /** 菜单项标题 */
	    title: string;
	    /** 注册方法名称（需要在扩展入口文件导出该方法） */
	    registerFn?: string;
	    /** 子菜单项 */
	    menuItems?: Array<ISYS_HeaderMenuSub1MenuItem | null>;
	}
	/**
	 * 顶部二级菜单项
	 *
	 * @public
	 */
	interface ISYS_HeaderMenuSub1MenuItem {
	    /** 菜单项 ID，不可重复 */
	    id: string;
	    /** 菜单项标题 */
	    title: string;
	    /** 菜单项图标 */
	    icon?: string;
	    /** 注册方法名称（需要在扩展入口文件导出该方法） */
	    registerFn?: string;
	    /** 子菜单项 */
	    menuItems?: Array<ISYS_HeaderMenuSub2MenuItem | null>;
	}
	/**
	 * 顶部三级菜单项
	 *
	 * @public
	 */
	interface ISYS_HeaderMenuSub2MenuItem {
	    /** 菜单项 ID，不可重复 */
	    id: string;
	    /** 菜单项标题 */
	    title: string;
	    /** 菜单项图标 */
	    icon?: string;
	    /** 注册方法名称（需要在扩展入口文件导出该方法） */
	    registerFn?: string;
	}
	/**
	 * 系统 / 顶部菜单类
	 *
	 * @public
	 */
	class SYS_HeaderMenu {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 导入顶部菜单数据
	     *
	     * @public
	     * @param headerMenus - 顶部菜单数据
	     */
	    insertHeaderMenus(headerMenus: ISYS_HeaderMenus): Promise<void>;
	    /**
	     * 移除顶部菜单数据
	     *
	     * @public
	     */
	    removeHeaderMenus(): void;
	    /**
	     * 替换顶部菜单数据
	     *
	     * @public
	     * @remarks 本接口相当于同时执行了 {@link SYS_HeaderMenu.removeHeaderMenus | 移除} 和 {@link SYS_HeaderMenu.insertHeaderMenus | 导入} 操作
	     * @param headerMenus - 顶部菜单数据
	     */
	    replaceHeaderMenus(headerMenus: ISYS_HeaderMenus): Promise<void>;
	    /**
	     * 移除系统顶部菜单项
	     *
	     * @beta
	     * @remarks
	     * 一旦菜单被移除，需要重启嘉立创 EDA 软件才可以恢复
	     *
	     * 本接口无法移除 {@link SYS_HeaderMenu.insertSystemHeaderMenus | 导入系统顶部菜单} 接口导入的系统顶部菜单项
	     *
	     * 本接口无法移除第一级菜单，`id` 数组请至少传递 `2` 个值
	     *
	     * 本接口无法移除 **高级** 菜单下的任何子菜单
	     *
	     * 注意：本接口需要使用者启用���展的外部交互权限，如若未启用将始终 `throw Error`
	     *
	     * 非公开接口使用提醒：本接口按原样提供，不提供参数的额外文档，参数可能在任何版本出现破坏性更改并不另行通知
	     * @param env - 环境
	     * @param id - 菜单项 ID 树，将会按照数组顺序按层级匹配菜单项，并移除数组最后一位对应的菜单项
	     * @param props - 其它参数，是否移除菜单项之前、之后的分隔线
	     * @returns 移除操作是否成功，菜单已移除但分隔线未找到也会返回 `true` 的结果
	     */
	    removeSystemHeaderMenuItem(id: Array<string>, props?: {
	        /** 是否移除前面的分隔线 */
	        removeTheBeforeDivider?: boolean;
	        /** 是否移除后面的分隔线 */
	        removeTheAfterDivider?: boolean;
	    }): Promise<boolean>;
	    /**
	     * 在指定位置插入系统顶部菜单项
	     *
	     * @beta
	     * @remarks
	     * 本接口需要在系统已有的系统一级菜单下新增子菜单，无法新增和修改一级菜单，`id` 数组请至少传递 `2` 个值
	     *
	     * 本接口将会强制新建的系统顶部菜单的 ID 包含扩展 UUID，例如输入的 `id = 'example'`，将会被自动重写为 `e143d88179874e7f851cc890cd22fc71|example`，后续如需移除该菜单，请输入重写后的名称
	     *
	     * 本接口不能在 **高级** 菜单下新增任何子菜单
	     *
	     * 本接口新增的子菜单将默认排列在原菜单的结尾，除非指定了 `props.insertBefore` 参数
	     *
	     * 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     *
	     * 非公开接口使用提醒：本接口按原样提供，不提供参数的额外文档，参数可能在任何版本出现破坏性更改并不另行通知
	     * @param env - 环境
	     * @param id - 菜单项 ID 树，将会按照数组顺序按层级匹配菜单项，并将数组最后一位作为插入的菜单项的 ID
	     * @param props - 其它参数
	     * @returns 顶部菜单项的 ID，分隔线是否插入并不会影响操作结果的返回值，不包含 menuItems 中的子项的 ID
	     */
	    insertSystemHeaderMenuItem(env: ESYS_HeaderMenuEnvironment, id: Array<string>, props: {
	        /** 菜单项的标题 */
	        title: string;
	        /** 注册方法名称 */
	        registerFn?: string;
	        /** 子菜单项 */
	        menuItems?: Array<ISYS_HeaderMenuSub1MenuItem | ISYS_HeaderMenuSub2MenuItem | null>;
	        /** 是否在前面插入分隔线 */
	        insertDividerBefore?: boolean;
	        /** 是否在后面插入分隔线  */
	        insertDividerAfter?: boolean;
	        /** 在指定 ID 的菜单项的前面插入当前菜单项 */
	        insertBefore?: string;
	        /** 在插入时如若指定的菜单项前面存在分隔线，是否跨过该分隔线（即和 insertBefore 指定 ID 的菜单项之间是否可能存在分隔线，这和 insertDividerAfter 并不冲突，因为 insertDividerAfter 在菜单项插入完成后添加） */
	        crossDividerWhenInsert?: boolean;
	    }): Promise<string | undefined>;
	    /**
	     * 导入系统顶部菜单 **暂不开发**
	     *
	     * @internal
	     * @remarks
	     * 系统顶部菜单一旦新增无法有效删除，需要重启嘉立创 EDA 软件才可以恢复
	     *
	     * 本接口需要在系统已有的系统一级菜单下新增子菜单，无法新增和修改一级菜单
	     *
	     * 本接口不能在 **高级** 菜单下新增任何子菜单
	     *
	     * 本接口新增的子菜单将默认排列在原菜单的结尾
	     *
	     * 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     *
	     * 非公开接口使用提醒：本接口按原样提供，不提供参数的额外文档，参数可能在任何版本出现破坏性更改并不另行通知
	     * @param headerMenus - 顶部菜单数据
	     * @example
	     * headerMenus:
	     *
	     * ```typescript
	     * const headerMenus = {
	     * 	sch: [
	     * 		null,
	     * 		{
	     * 			id: 'eda|help',
	     * 			title: '扩展开发指南...',
	     * 			registerFn: 'aboutExtension',
	     * 		},
	     * 	],
	     * };
	     * ```
	     */
	    insertSystemHeaderMenus(headerMenus: ISYS_HeaderMenus): void;
	}

	/**
	 * 语言数据键值对
	 *
	 * @public
	 * @remarks 单一语言的数据
	 */
	interface ISYS_LanguageKeyValuePairs {
	    [key: string]: string;
	}
	/**
	 * 多语言数据
	 *
	 * @public
	 * @remarks 包含同一命名空间下的多种语言的数据
	 */
	interface ISYS_MultilingualLanguagesData {
	    [language: string]: ISYS_LanguageKeyValuePairs;
	}
	/**
	 * 系统 / 多语言类
	 *
	 * @public
	 * @remarks 使用多语言系统展示多语言文本
	 */
	class SYS_I18n {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 输出语言文本
	     *
	     * @public
	     * @remarks
	     * 可以使用 `${1}` 格式的占位符表示参数；
	     *
	     * 语言优先级：当前显示语言 \> 系统默认语言 \> 数据集中第一个搜索到的包含该文本标签的语言 \> 文本标签(tag)
	     * @param tag - 文本标签，对应多语言文件键值对中的键
	     * @param namespace - 文本命名空间，在扩展运行环境内默认为扩展的 UUID，否则为系统默认命名空间
	     * @param language - 语言，`undefined` 为 EDA 当前的显示语言
	     * @param args - 语言文本中替换占位符的参数
	     * @returns 语言文本
	     */
	    text(tag: string, namespace?: string, language?: string, ...args: Array<any>): string;
	    /**
	     * 获取当前语言环境
	     *
	     * @public
	     * @remarks 能够获取到的语言受 EDA 当前支持语言限制，其它 API 支持的语言需要显式指定 `language` 参数才能使用
	     * @returns 语言
	     */
	    getCurrentLanguage(): Promise<string>;
	    /**
	     * 查询所有支持的语言
	     *
	     * @public
	     * @returns 所有支持的语言列表
	     */
	    getAllSupportedLanguages(): Array<string>;
	    /**
	     * 检查语言是否受支持
	     *
	     * @public
	     * @param language - 语言
	     * @returns 是否受支持
	     */
	    isLanguageSupported(language: string): boolean;
	    /**
	     * 导入多语言
	     *
	     * @public
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param language - 语言
	     * @param source - 欲导入的多语言数据对象
	     * @returns 导入是否成功
	     */
	    importMultilingual(language: string, source: ISYS_LanguageKeyValuePairs): boolean;
	    /**
	     * 导入多语言：指定命名空间和语言
	     *
	     * @public
	     * @param namespace - 命名空间
	     * @param language - 语言
	     * @param source - 欲导入的多语言数据对象
	     * @returns 导入是否成功
	     */
	    importMultilingualLanguage(namespace: string, language: string, source: ISYS_LanguageKeyValuePairs): boolean;
	    /**
	     * 导入多语言：指定命名空间
	     *
	     * @public
	     * @param namespace - 命名空间
	     * @param source - 欲导入的多语言数据对象
	     * @returns 导入是否成功
	     */
	    importMultilingualNamespace(namespace: string, source: ISYS_MultilingualLanguagesData): boolean;
	    /**
	     * 新增语言切换事件监听
	     *
	     * @public
	     * @param id - 事件 ID，用以防止重复注册事件
	     * @param callFn - 事件触发时的回调函数
	     */
	    addLanguageChangedEventListener(id: string, callFn: (newLanguage: string, lastLanguage: string) => void | Promise<void>, onlyOnce: boolean): void;
	    /**
	     * 移除事件监听
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 是否移除指定事件监听
	     */
	    removeEventListener(id: string): boolean;
	    /**
	     * 查询事件监听是否存在
	     *
	     * @public
	     * @param id - 事件 ID
	     * @returns 事件监听是否存在
	     */
	    isEventListenerAlreadyExist(id: string): boolean;
	}

	/**
	 * 系统 / 内联框架窗口类
	 *
	 * @public
	 */
	class SYS_IFrame {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 打开内联框架窗口
	     *
	     * @beta
	     * @remarks
	     * 本接口仅扩展包允许调用，用户需要在扩展包内包含用于内联的 HTML 文件；
	     *
	     * 本接口调用后将会打开一个 Dialog 窗口，该 Dialog 窗口的标题为 HTML 文件的 `<title>`，标题栏有关闭按钮；
	     *
	     * 正文部分为内联框架，`width` 和 `height` 均为正文部分内联框架的宽高；
	     *
	     * 内联框架需要展示 `htmlFileName` 的内容，该 HTML 从扩展包内获取，并已在安装时被存储至 IndexedDB 中
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param htmlFileName - 需要加载的 HTML 文件在扩展包内的路径，从扩展根目录起始，例如 `/iframe/index.html`
	     * @param width - 内联框架窗口的宽度
	     * @param height - 内联框架窗口的高度
	     * @param id - 内联框架窗口 ID，用于关闭内联框架窗口
	     * @param props - 其它参数
	     * @returns 操作是否成功
	     */
	    openIFrame(htmlFileName: string, width?: number, height?: number, id?: string, props?: {
	        /** 是否显示最大化按钮 */
	        maximizeButton?: boolean;
	        /** 是否显示最小化按钮 */
	        minimizeButton?: boolean;
	        /** 最小化风格：折叠、收缩 */
	        minimizeStyle?: 'collapsed' | 'constricted';
	        /** 按钮点击回调 */
	        buttonCallbackFn?: (button: 'close' | 'minimize' | 'maximize') => void | Promise<void>;
	        /** 关闭前回调：回调返回 `false` 时阻止按钮触发 */
	        onBeforeCloseCallFn?: () => boolean | undefined | Promise<boolean | undefined>;
	        /** 是否背景置灰 */
	        grayscaleMask?: boolean;
	        /** IFrame 标题 */
	        title?: string;
	    }): Promise<boolean>;
	    /**
	     * 关闭内联框架窗口
	     *
	     * @beta
	     * @remarks
	     * 关闭指定 ID 的内联框架窗口
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 内联框架窗口 ID，如若传入 `undefined`，将关闭由本扩展打开的所有内联框架窗口
	     * @returns 操作是否成功
	     */
	    closeIFrame(id?: string): Promise<boolean>;
	    /**
	     * 隐藏内联框架窗口
	     *
	     * @beta
	     * @remarks 本接口为结果导向的：
	     * 如若未找到指定内联框架窗口，接口将会返回 `false`；
	     * 如若在执行操作前该内联框架窗口已处于隐藏状态，接口将会返回 `true`
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 内联框架窗口 ID
	     * @returns 操作是否成功
	     */
	    hideIFrame(id?: string): Promise<boolean>;
	    /**
	     * 显示内联框架窗口
	     *
	     * @beta
	     * @remarks 本接口为结果导向的：
	     * 如若未找到指定内联框架窗口，接口将会返回 `false`；
	     * 如若在执行操作前该内联框架窗口已处于显示状态，接口将会返回 `true`
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 内联框架窗口 ID
	     * @returns 操作是否成功
	     */
	    showIFrame(id?: string): Promise<boolean>;
	    /**
	     * 内联框架是否已存在
	     *
	     * @alpha
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param id - 内联框架 ID
	     * @returns 是否存在
	     */
	    isIFrameAlreadyExist(id: string): Promise<boolean>;
	}

	/**
	 * 系统 / 加载与进度条类
	 *
	 * @public
	 */
	class SYS_LoadingAndProgressBar {
	    /**
	     * 显示进度条或设置进度条进度
	     *
	     * @public
	     * @remarks 当进度达到 `100` 时，进度条将自动销毁
	     * @param progress - 进度值，取值范围 `0-100`
	     * @param title - 进度条标题
	     */
	    showProgressBar(progress?: number, title?: string): void;
	    /**
	     * 销毁进度条
	     *
	     * @public
	     */
	    destroyProgressBar(): void;
	    /**
	     * 显示无进度加载覆盖
	     *
	     * @public
	     * @remarks 没有进度指示，但会存在与进度条一致的灰色覆盖，阻止用户进一步操作
	     */
	    showLoading(): void;
	    /**
	     * 销毁无进度加载覆盖
	     *
	     * @public
	     */
	    destroyLoading(): void;
	}

	/**
	 * 日志类型
	 *
	 * @public
	 */
	enum ESYS_LogType {
	    /** 信息 */
	    INFO = "info",
	    /** 警告 */
	    WARNING = "warn",
	    /** 错误 */
	    ERROR = "error",
	    /** 致命错误 */
	    FATAL_ERROR = "fatalError",
	    /**
	     * 查找
	     *
	     * @internal
	     */
	    FIND = "find",
	    /**
	     * 替换
	     *
	     * @internal
	     */
	    REPLACE = "replace",
	    /**
	     * 打开工程
	     *
	     * @internal
	     */
	    OPEN_PROJECT = "openProject"
	}
	/**
	 * 日志行
	 *
	 * @public
	 */
	interface ISYS_LogLine {
	    /** 时间戳 */
	    timestamp: number;
	    /** 日志类型 */
	    type: ESYS_LogType;
	    /** 日志内容 */
	    message: string;
	}
	/**
	 * 系统 / 日志类
	 *
	 * @public
	 */
	class SYS_Log {
	    /**
	     * 添加日志条目
	     *
	     * @public
	     * @param message - 日志内容
	     * @param type - 日志类型
	     */
	    add(message: string, type?: ESYS_LogType): void;
	    /**
	     * 清空日志
	     *
	     * @public
	     */
	    clear(): void;
	    /**
	     * 导出日志
	     *
	     * @public
	     * @param types - 日志类型
	     */
	    export(types?: ESYS_LogType | Array<ESYS_LogType>): void;
	    /**
	     * 筛选并获取日志条目
	     *
	     * @public
	     * @remarks 如果日志面板处于打开状态，筛选操作会同时在前端展现
	     * @param types - 日志类型数组，可以同时指定多种日志类型，如若不指定则为全部类型
	     * @returns 符合筛选条件的日志条目数组
	     */
	    sort(types?: ESYS_LogType | Array<ESYS_LogType>): Promise<Array<ISYS_LogLine>>;
	    /**
	     * 查找条目
	     *
	     * @public
	     * @remarks 如果日志面板处于打开状态，查找操作会同时在前端展现
	     * @param message - 查找内容
	     * @param types - 日志类型数组，可以在指定的日志类型内查找
	     * @returns 符合查找条件的日志条目数组
	     */
	    find(message: string | Array<string | {
	        text: string;
	        attr?: {
	            id?: string;
	            path?: string;
	            sheet?: string;
	            pcbid?: string;
	            type?: string;
	        };
	    }>, types?: ESYS_LogType | Array<ESYS_LogType>): Promise<Array<ISYS_LogLine>>;
	}

	/**
	 * 左侧面板标签页
	 *
	 * @public
	 */
	enum ESYS_LeftPanelTab {
	    /** 工程 */
	    PROJECT_LIST = "project_list",
	    /** 工程设计 */
	    PROJECT_DESIGN = "projectDesign",
	    /** 库设计 */
	    LIB_DESIGN = "libDesign",
	    /** 常用库 */
	    BASIC_LIBRARY = "basicLibrary",
	    /** 器件标准化 */
	    DEVICE_STANDARDIZATION = "device-standardization"
	}
	/**
	 * 右侧面板标签页
	 *
	 * @public
	 */
	enum ESYS_RightPanelTab {
	    /** 原理图：属性 */
	    SCH_ATTR = "sch-attr",
	    /** 原理图：过滤 */
	    SCH_FILTER = "sch-filter",
	    /** 工程：属性 */
	    PROJECT_ATTR = "project-attr",
	    /** 面板：图层 */
	    PANEL_LAYER = "panel-layer",
	    /** 面板：属性 */
	    PANEL_ATTR = "panel-attr",
	    /** 面板：过滤 */
	    PANEL_FILTER = "panel-filter",
	    /** PCB：图层 */
	    PCB_LAYER = "pcb-layer",
	    /** PCB：属性 */
	    PCB_ATTR = "pcb-attr",
	    /** PCB：测量对象属性 */
	    PCB_SKETCHER_ATTR = "pcb-sketcher-attr",
	    /** PCB：过滤 */
	    PCB_FILTER = "pcb-filter",
	    /** PCB 2D 预览：属性 */
	    PCB_2D_PREVIEW_ATTR = "pcb2d-attr",
	    /** PCB 3D 预览：图层 */
	    PCB_3D_PREVIEW_LAYER = "pcb3d-layer",
	    /** PCB 3D 预览：属性 */
	    PCB_3D_PREVIEW_ATTR = "pcb3d-attr",
	    /** 面板 3D 预览：图层 */
	    PANEL_3D_PREVIEW_LAYER = "panel3d-layer",
	    /** 面板 3D 预览：属性 */
	    PANEL_3D_PREVIEW_ATTR = "panel3d-attr",
	    /** 批注 */
	    ANNOTATION = "annotation"
	}
	/**
	 * 底部面板标签页
	 *
	 * @public
	 */
	enum ESYS_BottomPanelTab {
	    /** 库 */
	    LIBRARY = "library",
	    /** 日志 */
	    LOG = "log",
	    /** PCB：DRC */
	    PCB_DRC = "drcResult",
	    /** 原理图：DRC */
	    SCHEMATIC_DRC = "schDrcResult",
	    /** 查找结果 */
	    FIND = "findResult"
	}
	/**
	 * 系统 / 面板控制类
	 *
	 * @public
	 */
	class SYS_PanelControl {
	    /**
	     * 打开左侧面板
	     *
	     * @public
	     * @param tab - 标签页，如若不指定则不切换标签页
	     */
	    openLeftPanel(tab?: ESYS_LeftPanelTab): void;
	    /**
	     * 关闭左侧面板
	     *
	     * @public
	     */
	    closeLeftPanel(): void;
	    /**
	     * 切换左侧面板锁定状态
	     *
	     * @public
	     * @param state - 是否锁定，如若不指定则反置当前状态
	     */
	    toggleLeftPanelLockState(state?: boolean): void;
	    /**
	     * 查询左侧面板是否已锁定
	     *
	     * @public
	     * @returns 是否已锁定
	     */
	    isLeftPanelLocked(): Promise<boolean>;
	    /**
	     * 打开右侧面板
	     *
	     * @public
	     * @param tab - 标签页，如若不指定则不切换标签页
	     */
	    openRightPanel(tab?: ESYS_RightPanelTab): void;
	    /**
	     * 关闭右侧面板
	     *
	     * @public
	     */
	    closeRightPanel(): void;
	    /**
	     * 切换右侧面板锁定状态
	     *
	     * @public
	     * @param state - 是否锁定，如若不指定则反置当前状态
	     */
	    toggleRightPanelLockState(state?: boolean): void;
	    /**
	     * 查询右侧面板是否已锁定
	     *
	     * @public
	     * @returns 是否已锁定
	     */
	    isRightPanelLocked(): Promise<boolean>;
	    /**
	     * 打开底部面板
	     *
	     * @public
	     * @param tab - 标签页，如若不指定则不切换标签页
	     */
	    openBottomPanel(tab?: ESYS_BottomPanelTab): void;
	    /**
	     * 关闭底部面板
	     *
	     * @public
	     */
	    closeBottomPanel(): void;
	    /**
	     * 切换底部面板锁定状态
	     *
	     * @public
	     * @param state - 是否锁定，如若不指定则反置当前状态
	     */
	    toggleBottomPanelLockState(state?: boolean): void;
	    /**
	     * 查询底部面板是否已锁定
	     *
	     * @public
	     * @returns 是否已锁定
	     */
	    isBottomPanelLocked(): Promise<boolean>;
	}

	/**
	 * 吐司消息类型
	 *
	 * @public
	 */
	enum ESYS_ToastMessageType {
	    /** 错误 */
	    ERROR = "error",
	    /** 警告 */
	    WARNING = "warn",
	    /** 信息 */
	    INFO = "info",
	    /** 成功 */
	    SUCCESS = "success",
	    /** 问询 */
	    ASK = "question"
	}
	/**
	 * 系统 / 消息通知类
	 *
	 * @public
	 * @remarks 生成各种对用户的非侵入式提醒
	 */
	class SYS_Message {
	    /**
	     * 显示吐司消息
	     *
	     * @public
	     * @param message - 消息内容
	     * @param messageType - 消息类型
	     * @param timer - 自动关闭倒计时秒数，`0` 为不自动关闭
	     * @param bottomPanel - 展开底部信息面板
	     * @param buttonTitle - 回调按钮标题
	     * @param buttonCallbackFn - 回调函数内容，字符串形式，会被自动解析并执行
	     */
	    showToastMessage(message: string, messageType?: ESYS_ToastMessageType, timer?: number, bottomPanel?: ESYS_BottomPanelTab, buttonTitle?: string, buttonCallbackFn?: string): void;
	    /**
	     * 展示跟随鼠标的提示
	     *
	     * @beta
	     * @remarks 同一时间只能展示一条提示，如果展示新的提示，则之前的提示将被自动移除
	     * @param tip - 提示内容
	     * @param msTimeout - 展示时间，以毫秒（ms）为单位，如若不传入则持续展示，直到调用 {@link SYS_Message.removeFollowMouseTip | removeFollowMouseTip} 或被其它提示覆盖
	     */
	    showFollowMouseTip(tip: string, msTimeout?: number): Promise<void>;
	    /**
	     * 移除跟随鼠标的提示
	     *
	     * @beta
	     * @remarks 移除当前或指定的跟随鼠标的提示
	     * @param tip - 提示内容，如若传入，则仅当当前提示为指定内容时才移除
	     */
	    removeFollowMouseTip(tip?: string): Promise<void>;
	}

	/**
	 * 系统 / 消息框类
	 *
	 * @public
	 * @deprecated 已更名为 {@link SYS_Dialog}
	 * @remarks 生成消息提示框
	 */
	class SYS_MessageBox {
	    /**
	     * 显示消息框
	     *
	     * @public
	     * @deprecated 请使用 {@link SYS_Dialog.showInformationMessage} 替代
	     * @remarks 显示一个文字消息提示框
	     * @param content - 消息文本，支持使用 `\n` 换行
	     * @param title - 消息框标题
	     * @param buttonTitle - 按钮标题，为空则不显示按钮
	     */
	    showInformationMessage(content: string, title?: string, buttonTitle?: string): void;
	    /**
	     * 显示确认框
	     *
	     * @public
	     * @deprecated 请使用 {@link SYS_Dialog.showConfirmationMessage} 替代
	     * @remarks 显示一个拥有确认和取消按钮的确认框
	     * @param content - 消息文本，支持使用 `\n` 换行
	     * @param title - 确认框标题
	     * @param mainButtonTitle - 主要按钮标题
	     * @param buttonTitle - 主要按钮标题
	     * @param callbackFn - 回调函数，如需调用扩展内的函数，请在函数名前加上扩展的唯一 ID，以西文句号 `.` 分隔
	     */
	    showConfirmationMessage(content: string, title?: string, mainButtonTitle?: string, buttonTitle?: string, callbackFn?: (mainButtonClicked: boolean) => void): void;
	}

	/**
	 * 消息总线任务
	 *
	 * @public
	 */
	interface ISYS_MessageBusTask {
	    /** 调用以取消任务 */
	    cancel: () => void;
	    /**
	     * 检查运行状态
	     *
	     * @returns 是否正在监听
	     */
	    running: () => boolean;
	    /**
	     * 任务处理
	     *
	     * @param message - 接收到的数据
	     */
	    execute: (message: any) => Promise<void>;
	}
	/**
	 * 系统 / 消息总线类
	 *
	 * @public
	 */
	class SYS_MessageBus {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 创建私有消息总线
	     *
	     * @public
	     * @remarks 一般无需调用该方法，在进行监听或发送消息时会自动创建私有消息总线
	     */
	    createPrivateMessageBus(): void;
	    /**
	     * 移除私有消息总线
	     *
	     * @public
	     * @remarks 一般无需调用该方法，除非你知道自己在做什么
	     */
	    removePrivateMessageBus(): void;
	    /**
	     * 私有消息总线：推消息
	     *
	     * @public
	     * @remarks 每个消息只有一个 Puller 可以收到
	     * @param topic - 主题
	     * @param message - 消息
	     */
	    push(topic: string, message: any): void;
	    /**
	     * 公共消息总线：推消息
	     *
	     * @public
	     * @remarks 每个消息只有一个 Puller 可以收到
	     * @param topic - 主题
	     * @param message - 消息
	     */
	    pushPublic(topic: string, message: any): void;
	    /**
	     * 私有消息总线：拉消息
	     *
	     * @public
	     * @remarks 每次只能拉一个消息
	     * @param topic - 主题
	     * @param callbackFn - 拉到消息后的回调
	     * @returns 消息总线任务
	     */
	    pull(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 公共消息总线：拉消息
	     *
	     * @public
	     * @remarks 每次只能拉一个消息
	     * @param topic - 主题
	     * @param callbackFn - 拉到消息后的回调
	     * @returns 消息总线任务
	     */
	    pullPublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 私有消息总线：拉消息 Promise 版本
	     *
	     * @public
	     * @remarks 每次只能拉一个消息，可以使用 `await` 等待消息拉取
	     * @param topic - 主题
	     * @returns 拉取到的消息
	     */
	    pullAsync(topic: string): Promise<any>;
	    /**
	     * 公共消息总线：拉消息 Promise 版本
	     *
	     * @public
	     * @remarks 每次只能拉一个消息，可以使用 `await` 等待消息拉取
	     * @param topic - 主题
	     * @returns 拉取到的消息
	     */
	    pullAsyncPublic(topic: string): Promise<any>;
	    /**
	     * 私有消息总线：发布消息
	     *
	     * @public
	     * @remarks 将消息广播给每一个 Subscriber
	     * @param topic - 主题
	     * @param message - 消息
	     */
	    publish(topic: string, message: any): void;
	    /**
	     * 公共消息总线：发布消息
	     *
	     * @public
	     * @remarks 将消息广播给每一个 Subscriber
	     * @param topic - 主题
	     * @param message - 消息
	     */
	    publishPublic(topic: string, message: any): void;
	    /**
	     * 私有消息总线：订阅消息
	     *
	     * @public
	     * @remarks 持久性订阅消息
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     * @returns 消息总线任务
	     */
	    subscribe(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 公共消息总线：订阅消息
	     *
	     * @public
	     * @remarks 持久性订阅消息
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     * @returns 消息总线任务
	     */
	    subscribePublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 私有消息总线：订阅单次消息
	     *
	     * @public
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     * @returns 消息总线任务
	     */
	    subscribeOnce(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 公共消息总线：订阅单次消息
	     *
	     * @public
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     * @returns 消息总线任务
	     */
	    subscribeOncePublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask;
	    /**
	     * 私有消息总线：调用 RPC 服务
	     *
	     * @public
	     * @param topic - 主题
	     * @param message - 消息
	     * @param timeout - 超时
	     * @returns RPC 服务返回
	     */
	    rpcCall(topic: string, message?: any, timeout?: number): Promise<any>;
	    /**
	     * 公共消息总线：调用 RPC 服务
	     *
	     * @public
	     * @param topic - 主题
	     * @param message - 消息
	     * @param timeout - 超时
	     * @returns RPC 服务返回
	     */
	    rpcCallPublic(topic: string, message?: any, timeout?: number): Promise<any>;
	    /**
	     * 私有消息总线：注册 RPC 服务
	     *
	     * @public
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     */
	    rpcService(topic: string, callbackFn: (...args: Array<any>) => any | Promise<any>): void;
	    /**
	     * 公共消息总线：注册 RPC 服务
	     *
	     * @public
	     * @param topic - 主题
	     * @param callbackFn - 接收到消息后的回调
	     */
	    rpcServicePublic(topic: string, callbackFn: (...args: Array<any>) => any | Promise<any>): void;
	}

	/**
	 * 右键菜单项
	 *
	 * @public
	 */
	interface ISYS_RightClickMenuItem {
	    /** 菜单项 ID，不可重复 */
	    id: string;
	    /** 菜单项标题 */
	    title?: string;
	    /** 菜单项图标 */
	    icon?: string;
	    /** 注册方法名称（需要在扩展入口文件导出该方法） */
	    registerFn?: string;
	    /** 子菜单项 */
	    menuItems?: Array<ISYS_RightClickMenuItem | null>;
	}
	/**
	 * 系统 / 右键菜单类
	 *
	 * @public
	 */
	class SYS_RightClickMenu {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 修改右键菜单
	     *
	     * @beta
	     * @remarks
	     * 当前仅支持 **底部菜单器件列表项目右击**、**底部菜单符号列表项目右击**、**底部菜单封装列表项目右击**、**底部菜单复用模块列表项目右击** 的右键菜单修改
	     *
	     * 如若希望重新排序、移除部分菜单项，在 `menuItems` 内只需传入菜单项 ID，其它属性将自动保持不变
	     *
	     * 如若需要注册新的右键菜单，需要传入完整的 {@link ISYS_RightClickMenuItem} 数据
	     *
	     * 本接口将会强制新建的右键菜单的 ID 包含扩展 UUID，例如输入的 `id = 'example'`，将会被自动重写为 `e143d88179874e7f851cc890cd22fc71|example`
	     *
	     * 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     *
	     * 非公开接口使用提醒：本接口按原样提供，不提供参数的额外文档，参数可能在任何版本出现破坏性更改并不另行通知
	     * @param menuId - 菜单 ID
	     * @param menuItems - 菜单项，`null` 代表分隔符
	     */
	    changeMenu(menuId: string, menuItems: Array<ISYS_RightClickMenuItem | null>): Promise<void>;
	}

	/**
	 * 系统 / 设置类
	 *
	 * @public
	 */
	class SYS_Setting {
	    /**
	     * 全局恢复默认设置
	     *
	     * @beta
	     * @remarks 将所有 EDA 设置恢复到默认状态，本操作将会丢失所有设置项，在调用时请特别注意
	     * @returns 操作是否成功
	     */
	    restoreDefault(): Promise<boolean>;
	}

	/**
	 * 快捷键按键
	 *
	 * @public
	 */
	type TSYS_ShortcutKeys = Array<'SHIFT' | 'LEFT_SHIFT' | 'RIGHT_SHIFT' | 'FN' | 'ALT' | 'LEFT_ALT' | 'RIGHT_ALT' | 'CONTROL' | 'LEFT_CONTROL' | 'RIGHT_CONTROL' | 'COMMAND' | 'WIN' | 'OPTION' | 'SUPER' | 'TAB' | 'SPACE' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'F16' | 'F17' | 'F18' | 'F19' | 'F20' | '`' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | '=' | 'Q' | 'W' | 'E' | 'R' | 'T' | 'Y' | 'U' | 'I' | 'O' | 'P' | '[' | ']' | 'A' | 'S' | 'D' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | ';' | "'" | '\\' | 'Z' | 'X' | 'C' | 'V' | 'B' | 'N' | 'M' | ',' | '.' | '/'>;
	/**
	 * 快捷键生效页面范围
	 *
	 * @public
	 */
	enum ESYS_ShortcutKeyEffectiveEditorDocumentType {
	    /** 空白页 */
	    BLANK = 0,
	    /** 开始页 */
	    HOME = 1,
	    /** 原理图图页 */
	    SCHEMATIC_PAGE = 2,
	    /** 符号 */
	    SYMBOL = 3,
	    /** PCB */
	    PCB = 4,
	    /** 封装 */
	    FOOTPRINT = 5,
	    /** 面板 */
	    PANEL = 6,
	    /** PCB 3D 预览 */
	    PCB_3D_PREVIEW = 7,
	    /** PCB 2D 预览 */
	    PCB_2D_PREVIEW = 8,
	    /** 面板 3D 预览 */
	    PANEL_3D_PREVIEW = 9,
	    /** 面板库 */
	    PANEL_LIBRARY = 10
	}
	/**
	 * 快捷键生效场景范围
	 *
	 * @public
	 */
	enum ESYS_ShortcutKeyEffectiveEditorScene {
	    /** 非画布 */
	    EDITOR = 1,
	    /** 画布选中 */
	    SELECT_CANVAS = 2,
	    /** 画布未选中 */
	    NOT_SELECT_CANVAS = 3,
	    /** 画布绘制 */
	    DRAW = 4,
	    /** 画布放置 */
	    PLACE = 5,
	    /** 局部快捷键 */
	    LOCAL = 6
	}
	/**
	 * 系统 / 快捷键类
	 *
	 * @public
	 * @remarks 注册与管理系统快捷键
	 */
	class SYS_ShortcutKey {
	    /**
	     * 注册快捷键
	     *
	     * @beta
	     * @param shortcutKey - 快捷键，数组中包含多个元素则解析为组合快捷键，将按规则排序后存入缓存
	     * @param title - 快捷键标题，快捷键的友好名称
	     * @param callbackFn - 回调函数
	     * @returns 注册操作是否成功
	     */
	    registerShortcutKey(shortcutKey: TSYS_ShortcutKeys, title: string, callbackFn: (shortcutKey: TSYS_ShortcutKeys) => void | Promise<void>, documentType?: Array<ESYS_ShortcutKeyEffectiveEditorDocumentType>, scene?: Array<ESYS_ShortcutKeyEffectiveEditorScene>): Promise<boolean>;
	    /**
	     * 反注册快捷键
	     *
	     * @beta
	     * @param shortcutKey - 快捷键，不区分传入的排列顺序，将自动排序并查询匹配的快捷键
	     * @returns 反注册操作是否成功
	     */
	    unregisterShortcutKey(shortcutKey: TSYS_ShortcutKeys): Promise<boolean>;
	    /**
	     * 查询快捷键列表
	     *
	     * @beta
	     * @param includeSystem - 是否包含系统快捷键
	     * @returns 快捷键列表
	     */
	    getShortcutKeys(includeSystem?: boolean): Promise<Array<{
	        shortcutKey: TSYS_ShortcutKeys;
	        title: string;
	        documentType: Array<ESYS_ShortcutKeyEffectiveEditorDocumentType>;
	        scene: Array<ESYS_ShortcutKeyEffectiveEditorScene>;
	    }>>;
	}

	/**
	 * 系统 / 存储类
	 *
	 * @public
	 * @remarks 可以进行扩展的用户配置存储、浏览器本地存储的操作接口
	 */
	class SYS_Storage {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 获取扩展所有用户配置
	     *
	     * @public
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @returns 扩展所有用户配置信息
	     */
	    getExtensionAllUserConfigs(): {
	        [key: string]: any;
	    };
	    /**
	     * 设置扩展所有用户配置
	     *
	     * @public
	     * @remarks
	     * 此举会覆盖当前扩展的所有用户配置信息，请谨慎操作
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param configs - 扩展所有用户配置
	     * @returns 操作是否成功
	     */
	    setExtensionAllUserConfigs(configs: {
	        [key: string]: any;
	    }): Promise<boolean>;
	    /**
	     * 清除扩展所有用户配置
	     *
	     * @public
	     * @remarks
	     * 此举会删除当前扩展的所有用户配置信息，请谨慎操作
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @returns 操作是否成功
	     */
	    clearExtensionAllUserConfigs(): Promise<boolean>;
	    /**
	     * 获取扩展用户配置
	     *
	     * @public
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param key - 配置项
	     * @returns 配置项对应的值，不存在将返回 `undefined`
	     */
	    getExtensionUserConfig(key: string): any | undefined;
	    /**
	     * 设置扩展用户配置
	     *
	     * @public
	     * @remarks
	     * 新建扩展用户配置也使用本接口，在设置时如果不存在将会自动新建
	     *
	     * 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param key - 配置项
	     * @param value - 值
	     * @returns 操作是否成功
	     */
	    setExtensionUserConfig(key: string, value: any): Promise<boolean>;
	    /**
	     * 删除扩展用户配置
	     *
	     * @public
	     * @remarks 注意：本接口仅扩展有效，在独立脚本环境内调用将始终 `throw Error`
	     * @param key - 配置项
	     * @returns 操作是否成功
	     */
	    deleteExtensionUserConfig(key: string): Promise<boolean>;
	}

	/**
	 * 系统 / 定时器类
	 *
	 * @public
	 * @remarks 设置定时器
	 */
	class SYS_Timer {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 设置循环定时器
	     *
	     * @public
	     * @remarks 如果遇到 ID 重复的定时器，则之前设置的定时器将被清除
	     * @param id - 定时器 ID，用于定位&删除定时器
	     * @param timeout - 定时时间，单位 ms
	     * @param callFn - 定时调用函数
	     * @param args - 传给定时调用函数的参数
	     * @returns 定时器是否设置成功
	     */
	    setIntervalTimer(id: string, timeout: number, callFn: (...args: any) => void, ...args: any): boolean;
	    /**
	     * 清除指定循环定时器
	     *
	     * @public
	     * @param id - 定时器 ID
	     * @returns 定时器是否清除成功
	     */
	    clearIntervalTimer(id: string): boolean;
	    /**
	     * 设置单次定时器
	     *
	     * @public
	     * @remarks 如果遇到 ID 重复的定时器，则之前设置的定时器将被清除
	     * @param id - 定时器 ID
	     * @param timeout - 定时时间，单位 ms
	     * @param callFn - 定时调用函数
	     * @param args - 传给定时调用函数的参数
	     * @returns 定时器是否设置成功
	     */
	    setTimeoutTimer(id: string, timeout: number, callFn: (...args: any) => void, ...args: any): boolean;
	    /**
	     * 清除指定单次定时器
	     *
	     * @public
	     * @param id - 定时器 ID
	     * @returns 定时器是否清除成功
	     */
	    clearTimeoutTimer(id: string): boolean;
	}

	/**
	 * 系统 / 吐司消息类
	 *
	 * @public
	 * @deprecated 即将移除吐司消息类，合并入 {@link SYS_Message | 消息通知类}
	 * @remarks 在屏幕的边缘弹出简短的消息提醒，会在一定时间后自动消除
	 */
	class SYS_ToastMessage {
	    /**
	     * 显示吐司消息
	     *
	     * @public
	     * @deprecated 请使用 {@link SYS_Message.showToastMessage} 方法替代
	     * @param message - 消息内容
	     * @param messageType - 消息类型
	     * @param timer - 自动关闭倒计时秒数，`0` 为不自动关闭
	     * @param bottomPanel - 展开底部信息面板
	     * @param buttonTitle - 回调按钮标题
	     * @param buttonCallbackFn - 回调函数内容，字符串形式，会被自动解析并执行
	     */
	    showMessage(message: string, messageType?: ESYS_ToastMessageType, timer?: number, bottomPanel?: ESYS_BottomPanelTab, buttonTitle?: string, buttonCallbackFn?: string): void;
	}

	/**
	 * 系统 / 工具类
	 *
	 * @public
	 */
	class SYS_Tool {
	    /**
	     * 网表对比
	     *
	     * @beta
	     * @param netlist1 - 网表 1，可以为：①当前工程内的原理图、PCB 的 UUID；②其它工程的工程 UUID 和原理图、PCB UUID；③原理图、PCB 文件数据
	     * @param netlist2 - 网表 2，可以为：①当前工程内的原理图、PCB 的 UUID；②其它工程的工程 UUID 和原理图、PCB UUID；③原理图、PCB 文件数据
	     * @returns 网表对比结果
	     */
	    netlistComparison(netlist1: string | {
	        projectUuid: string;
	        documentUuid: string;
	    } | File, netlist2: string | {
	        projectUuid: string;
	        documentUuid: string;
	    } | File): Promise<Array<{
	        type: 'Net' | 'Component';
	        object: string;
	        netlist1Name: Array<string>;
	        netlist2Name: Array<string>;
	    }>>;
	    /**
	     * 原理图对比
	     *
	     * @alpha
	     * @param schematic1 - 原理图 1，可以为：①当前工程内的原理图的 UUID；②其它工程的工程 UUID 和原理图 UUID；③原理图文件数据
	     * @param schematic2 - 原理图 2，可以为：①当前工程内的原理图的 UUID；②其它工程的工程 UUID 和原理图 UUID；③原理图文件数据
	     * @returns 原理图对比结果
	     */
	    schematicComparison(schematic1: string | {
	        projectUuid: string;
	        schematicUuid: string;
	    } | File, schematic2: string | {
	        projectUuid: string;
	        schematicUuid: string;
	    } | File): Promise<any>;
	    /**
	     * PCB 对比
	     *
	     * @alpha
	     * @param pcb1 - PCB 1，可以为：①当前工程内的 PCB 的 UUID；②其它工程的工程 UUID 和 PCB UUID；③PCB 文件数据
	     * @param pcb2 - PCB 2，可以为：①当前工程内的 PCB 的 UUID；②其它工程的工程 UUID 和 PCB UUID；③PCB 文件数据
	     * @returns PCB 对比结果
	     */
	    pcbComparison(pcb1: string | {
	        projectUuid: string;
	        pcbUuid: string;
	    } | File, pcb2: string | {
	        projectUuid: string;
	        pcbUuid: string;
	    } | File): Promise<any>;
	}

	/**
	 * 系统 / WebSocket 类
	 *
	 * @public
	 * @remarks 与 WebSocket 服务器交互
	 */
	class SYS_WebSocket {
	    /** 扩展 UUID */
	    private extensionUuid?;
	    /**
	     * @internal
	     * @param extensionUuid - 扩展 UUID
	     */
	    constructor(extensionUuid?: string);
	    /**
	     * 注册 WebSocket 连接
	     *
	     * @public
	     * @remarks
	     * 可以用来执行前检测 WebSocket 连接是否正常，但需要注意 **不要尝试相同 ID 不同参数的连接**，这会造成混乱：
	     * 如果存在指定 ID 且处于活跃状态中的 WebSocket 连接，那么其余参数的变更将不会被应用
	     *
	     * 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param id - 自定义 WebSocket ID
	     * @param serviceUri - WebSocket 服务地址
	     * @param receiveMessageCallFn - 接收到消息时的回调函数
	     * @param connectedCallFn - 连接建立时的回调函数
	     * @param protocols - 子协议
	     */
	    register(id: string, serviceUri: string, receiveMessageCallFn?: (event: MessageEvent<any>) => void | Promise<void>, connectedCallFn?: () => void | Promise<void>, protocols?: string | Array<string>): void;
	    /**
	     * 向 WebSocket 服务器发送数据
	     *
	     * @public
	     * @remarks 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param id - 自定义的 WebSocket ID
	     * @param data - 发送的数据
	     * @param extensionUuid - 扩展 UUID，一般不需要指定，仅当需要操作其它扩展建立的 WebSocket 连接时才需要指定为其它扩展的 UUID
	     */
	    send(id: string, data: string | ArrayBuffer | Blob | ArrayBufferView, extensionUuid?: string): void;
	    /**
	     * 关闭 WebSocket 连接
	     *
	     * @public
	     * @remarks 注意：本接口需要使用者启用扩展的外部交互权限，如若未启用将始终 `throw Error`
	     * @param id - 自定义的 WebSocket ID
	     * @param code - 数字状态码，对应 {@link https://developer.mozilla.org/docs/Web/API/CloseEvent/code | WebSocket.CloseEvent} 内允许的状态码
	     * @param reason - 一个人类可读的字符串，解释连接关闭的原因
	     * @param extensionUuid - 扩展 UUID，一般不需要指定，仅当需要操作其它扩展建立的 WebSocket 连接时才需要指定为其它扩展的 UUID
	     */
	    close(id: string, code?: number, reason?: string, extensionUuid?: string): void;
	}

	/**
	 * 窗口事件监听可移除对象
	 *
	 * @public
	 * @remarks 本对象从 {@link SYS_Window.addEventListener | addEventListener} 获取，并可用于移除创建的事件监听，仅需将其传入 {@link SYS_Window.removeEventListener | removeEventListener}
	 */
	interface ISYS_WindowEventListenerRemovableObject {
	    type: ESYS_WindowEventType;
	    listener: (ev: any) => any;
	    options?: {
	        capture?: boolean;
	    };
	}
	/**
	 * 打开窗口上下文目标
	 *
	 * @public
	 */
	enum ESYS_WindowOpenTarget {
	    /** 新标签页 */
	    BLANK = "_blank",
	    /** 当前页 */
	    SELF = "_self"
	}
	/**
	 * 窗口事件类型
	 *
	 * @public
	 */
	enum ESYS_WindowEventType {
	    /** 失去焦点 */
	    BLUR = "blur",
	    /** 获取焦点 */
	    FOCUS = "focus"
	}
	/**
	 * 主题
	 *
	 * @public
	 */
	enum ESYS_Theme {
	    /** 浅色 */
	    LIGHT = "light",
	    /** 深色 */
	    DARK = "dark"
	}
	/**
	 * 系统 / 窗口类
	 *
	 * @public
	 * @remarks 为了保证安全性，仅提供有限的窗口跳转与监听支持，更多操作请使用内联框架窗口 {@link SYS_IFrame}
	 */
	class SYS_Window {
	    /**
	     * 打开资源窗口
	     *
	     * @public
	     * @param url - 欲加载资源的 URL 或路径
	     * @param target - 上下文目标
	     */
	    open(url: string, target?: ESYS_WindowOpenTarget): void;
	    /**
	     * 新增事件监听
	     *
	     * @public
	     * @param type - 事件类型，当前支持 `blur` `focus`
	     * @param listener - 事件监听回调
	     * @param options - 可选参数
	     * @returns 事件监听方法，用于移除事件监听，如若为 `undefined` 则表示创建事件监听失败
	     */
	    addEventListener(type: ESYS_WindowEventType, listener: (ev: any) => any, options?: {
	        capture?: boolean;
	        once?: boolean;
	        passive?: boolean;
	        signal?: AbortSignal;
	    }): ISYS_WindowEventListenerRemovableObject | undefined;
	    /**
	     * 移除事件监听
	     *
	     * @public
	     * @param removableObject - 窗口事件监听可移除对象
	     */
	    removeEventListener(removableObject: ISYS_WindowEventListenerRemovableObject): void;
	    /**
	     * 打开 UI 窗口
	     *
	     * @public
	     * @remarks 非公开接口使用提醒：本接口按原样提供，不提供参数的额外文档，参数可能在任何版本出现破坏性更改并不另行通知
	     * @param uiName - UI 名称
	     * @param args - 可选参数对象
	     */
	    openUI(uiName: string, args?: {
	        [key: string]: any;
	    }): Promise<void>;
	    /**
	     * 获取当前主题
	     *
	     * @public
	     * @remarks 获取当前 EDA 主题，**浅色** 或 **深色**
	     * @returns 当前主题
	     */
	    getCurrentTheme(): Promise<ESYS_Theme>;
	    /**
	     * 获取 URL 参数
	     *
	     * @public
	     * @param key - 参数名
	     * @returns 参数值
	     */
	    getUrlParam(key: string): string | null;
	    /**
	     * 获取 URL 锚点
	     *
	     * @public
	     * @returns URL 锚点值
	     */
	    getUrlAnchor(): string;
	    /**
	     * 追加新的 URL 历史记录栈信息
	     *
	     * @public
	     * @param url - URL
	     */
	    urlPushState(url: string): void;
	    /**
	     * 修改当前的 URL 历史记录栈信息
	     *
	     * @public
	     * @param url - URL
	     */
	    urlReplaceState(url: string): void;
	}

	/**
	 * 嘉立创 EDA 专业版用户 API 接口
	 *
	 * @public
	 */
	class EDA {
	    dmt_Board: DMT_Board;
	    dmt_EditorControl: DMT_EditorControl;
	    dmt_Event: DMT_Event;
	    dmt_Folder: DMT_Folder;
	    dmt_Panel: DMT_Panel;
	    dmt_Pcb: DMT_Pcb;
	    dmt_Project: DMT_Project;
	    dmt_Schematic: DMT_Schematic;
	    dmt_SelectControl: DMT_SelectControl;
	    dmt_Team: DMT_Team;
	    dmt_Workspace: DMT_Workspace;
	    lib_3DModel: LIB_3DModel;
	    lib_Cbb: LIB_Cbb;
	    lib_Classification: LIB_Classification;
	    lib_Device: LIB_Device;
	    lib_Footprint: LIB_Footprint;
	    lib_LibrariesList: LIB_LibrariesList;
	    lib_PanelLibrary: LIB_PanelLibrary;
	    lib_SelectControl: LIB_SelectControl;
	    lib_Symbol: LIB_Symbol;
	    pcb_Document: PCB_Document;
	    pcb_Drc: PCB_Drc;
	    pcb_Event: PCB_Event;
	    pcb_Layer: PCB_Layer;
	    pcb_ManufactureData: PCB_ManufactureData;
	    pcb_MathPolygon: PCB_MathPolygon;
	    pcb_Net: PCB_Net;
	    pcb_Primitive: PCB_Primitive;
	    pcb_PrimitiveArc: PCB_PrimitiveArc;
	    pcb_PrimitiveAttribute: PCB_PrimitiveAttribute;
	    pcb_PrimitiveComponent: PCB_PrimitiveComponent;
	    pcb_PrimitiveDimension: PCB_PrimitiveDimension;
	    pcb_PrimitiveFill: PCB_PrimitiveFill;
	    pcb_PrimitiveImage: PCB_PrimitiveImage;
	    pcb_PrimitiveLine: PCB_PrimitiveLine;
	    pcb_PrimitiveObject: PCB_PrimitiveObject;
	    pcb_PrimitivePad: PCB_PrimitivePad;
	    pcb_PrimitivePolyline: PCB_PrimitivePolyline;
	    pcb_PrimitivePour: PCB_PrimitivePour;
	    pcb_PrimitivePoured: PCB_PrimitivePoured;
	    pcb_PrimitiveRegion: PCB_PrimitiveRegion;
	    pcb_PrimitiveString: PCB_PrimitiveString;
	    pcb_PrimitiveVia: PCB_PrimitiveVia;
	    pcb_RayTracerEngine: PCB_RayTracerEngine;
	    pcb_SelectControl: PCB_SelectControl;
	    pnl_Document: PNL_Document;
	    sch_Document: SCH_Document;
	    sch_Drc: SCH_Drc;
	    sch_Event: SCH_Event;
	    sch_ManufactureData: SCH_ManufactureData;
	    sch_Net: SCH_Net;
	    sch_Netlist: SCH_Netlist;
	    sch_Primitive: SCH_Primitive;
	    sch_PrimitiveArc: SCH_PrimitiveArc;
	    sch_PrimitiveAttribute: SCH_PrimitiveAttribute;
	    sch_PrimitiveBus: SCH_PrimitiveBus;
	    sch_PrimitiveCircle: SCH_PrimitiveCircle;
	    sch_PrimitiveComponent: SCH_PrimitiveComponent | SCH_PrimitiveComponent3;
	    sch_PrimitivePin: SCH_PrimitivePin;
	    sch_PrimitivePolygon: SCH_PrimitivePolygon;
	    sch_PrimitiveRectangle: SCH_PrimitiveRectangle;
	    sch_PrimitiveText: SCH_PrimitiveText;
	    sch_PrimitiveWire: SCH_PrimitiveWire;
	    sch_SelectControl: SCH_SelectControl;
	    sch_SimulationEngine: SCH_SimulationEngine;
	    sch_Utils: SCH_Utils;
	    sch_PrimitiveObject: SCH_PrimitiveObject;
	    sys_ClientUrl: SYS_ClientUrl;
	    sys_Dialog: SYS_Dialog;
	    sys_Environment: SYS_Environment;
	    sys_FileManager: SYS_FileManager;
	    sys_FileSystem: SYS_FileSystem;
	    sys_FontManager: SYS_FontManager;
	    sys_FormatConversion: SYS_FormatConversion;
	    sys_HeaderMenu: SYS_HeaderMenu;
	    sys_I18n: SYS_I18n;
	    sys_IFrame: SYS_IFrame;
	    sys_LoadingAndProgressBar: SYS_LoadingAndProgressBar;
	    sys_Log: SYS_Log;
	    sys_Message: SYS_Message;
	    sys_MessageBox: SYS_MessageBox;
	    sys_MessageBus: SYS_MessageBus;
	    sys_PanelControl: SYS_PanelControl;
	    sys_RightClickMenu: SYS_RightClickMenu;
	    sys_Setting: SYS_Setting;
	    sys_ShortcutKey: SYS_ShortcutKey;
	    sys_Storage: SYS_Storage;
	    sys_Timer: SYS_Timer;
	    sys_ToastMessage: SYS_ToastMessage;
	    sys_Tool: SYS_Tool;
	    sys_Unit: SYS_Unit;
	    sys_WebSocket: SYS_WebSocket;
	    sys_Window: SYS_Window;
	    /** @internal */
	    private extensionUuid;
	    /** @internal */
	    constructor(extensionUuid: string);
	}
	/**
	 * 扩展用户 API 接口
	 *
	 * @public
	 */
	const eda: EDA;
}
