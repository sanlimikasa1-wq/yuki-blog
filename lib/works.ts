import type { Slide } from "@/components/Showcase";

// 一个作品项目的完整信息
export interface Project {
  slug: string;
  title: string;
  tagline: string; // 一句话简介(列表 + 详情用)
  status: string; // Demo / 实际交付
  thumb: string; // 悬停预览缩略图
  tags: string[]; // 列表上展示的简短标签
  frameLabel: string; // 浏览器外框里的地址文字
  slides: Slide[]; // 演示画面
  painpoint: string;
  solution: string;
  highlights: string[];
  techTags: string[]; // 详情页技术栈
  note?: string; // 详情页脚注
}

export const projects: Project[] = [
  {
    slug: "yunxiang-erp",
    title: "云象 ERP",
    tagline: "电商企业管理系统 · 内置 AI 经营助手",
    status: "Demo",
    thumb: "/works/erp-1-dashboard.jpg",
    tags: ["TypeScript", "Chart.js", "Claude API"],
    frameLabel: "云象 ERP · 电商企业管理系统",
    slides: [
      { src: "/works/erp-1-dashboard.jpg", label: "经营看板 · 一屏看懂赚没赚钱" },
      { src: "/works/erp-2-ai.jpg", label: "AI 经营助手「灵犀」· 用大白话问数据" },
      { src: "/works/erp-3-orders.jpg", label: "订单管理 · 千级订单一目了然" },
      { src: "/works/erp-4-inventory.jpg", label: "库存仓储 · 实时库存与告警" },
      { src: "/works/erp-5-finance.jpg", label: "财务会计 · 利润表与收支流水" },
      { src: "/works/erp-6-tickets.jpg", label: "客服工单 · 售后全流程跟踪" },
    ],
    painpoint:
      "中小电商的经营数据散落各处 —— 订单在平台后台、库存在 Excel、财务靠手算。老板想看一眼「这个月到底赚没赚钱」,都很难。",
    solution:
      "做了一套一体化的电商 ERP,把经营看板、订单、库存、客户、财务、客服整合到一起,并内置 AI 经营助手 —— 老板用大白话提问,它直接基于系统数据给出带数字的分析。",
    highlights: [
      "经营看板:营收 / 净利 / 订单 / 库存告警一屏掌握,配销售趋势、品类占比、渠道分析图表",
      "AI 经营助手「灵犀」:用大白话提问,自动调取系统数据生成带数字的经营分析",
      "全模块打通:订单、库存仓储、客户、财务会计、客服工单一体化",
      "单文件离线版:一个 HTML 打开即用、数据内嵌、零部署 —— FDE 交付的理想形态",
    ],
    techTags: ["TypeScript", "Express", "WebSocket", "Chart.js", "Claude API"],
    note: "* 在线版接入大模型(Claude);上方演示为单文件离线版,数据内嵌于页面。",
  },
  {
    slug: "xiaoyou-ai-cs",
    title: "小优 · AI 智能客服",
    tagline: "自建 agentic 客服 · RAG + 工具调用 + 转人工",
    status: "Demo",
    thumb: "/works/xy-2-order.jpg",
    tags: ["Anthropic SDK", "SSE 流式", "Tool Use"],
    frameLabel: "小优 · AI 智能客服",
    slides: [
      { src: "/works/xy-1-rag.jpg", label: "知识库答疑 · 退换货 / 运费 / 发票秒回" },
      { src: "/works/xy-2-order.jpg", label: "工具调用 · 按订单号查订单与物流" },
      { src: "/works/xy-3-human.jpg", label: "智能转人工 · 自动生成工单转接" },
    ],
    painpoint:
      "电商客服重复问题多、人力成本高、夜间还经常无人响应;而现成的对话平台往往把逻辑锁死,难以接进自己的订单系统。",
    solution:
      "不依赖 n8n / 扣子,基于 Anthropic SDK 自建了一个 agentic 客服:知识库答疑、调用工具查订单物流、识别投诉自动转人工生成工单,全部流式输出,边想边答。",
    highlights: [
      "RAG 知识库答疑:退换货 / 运费 / 发票 / 会员积分等问题开箱即答",
      "工具调用:按订单号查询订单状态与物流轨迹",
      "智能转人工:识别投诉 / 纠纷,自动生成工单并转接人工",
      "流式输出:回答边生成边显示,并实时展示「正在查询知识库 / 订单…」",
    ],
    techTags: ["TypeScript", "Express", "Anthropic SDK", "SSE 流式", "Tool Use"],
    note: "* 基于 Anthropic SDK 自建 agentic loop,可接 Claude / DeepSeek 等兼容端点;演示数据为内置模拟知识库与订单。",
  },
  {
    slug: "hotel-checkin",
    title: "旅店前台登记系统",
    tagline: "OCR 自动登记 · 本地离线 · 已实际交付",
    status: "实际交付",
    thumb: "/works/hotel-4-report.jpg",
    tags: ["Python", "PySide6", "PaddleOCR"],
    frameLabel: "旅店前台登记管理系统 · 本地版",
    slides: [
      { src: "/works/hotel-1-register.jpg", label: "当日登记 · 手机号+房间号即可,姓名可后补" },
      { src: "/works/hotel-2-import.jpg", label: "导入治安文件 · 批量补齐客人信息" },
      { src: "/works/hotel-3-query.jpg", label: "入住查询 · 快速检索在住与历史" },
      { src: "/works/hotel-4-report.jpg", label: "报表统计 · 入住率与营收一目了然" },
      { src: "/works/hotel-5-rooms.jpg", label: "房间设置 · 房型与计费灵活配置" },
    ],
    painpoint:
      "前台还在用纸质本子登记证件 —— 字迹潦草、难检索、容易丢;交班时还要手动把客人信息一条条补进治安系统。",
    solution:
      "做了一套桌面登记系统:OCR 截图识别证件、极简录入、交班一键导入补齐、本地数据库存储。单次登记从「手抄一分钟」降到「刷一下几秒」,全程离线、数据不出本机。",
    highlights: [
      "OCR 截图识别:拍照 / 截图即可自动录入证件信息,告别手抄",
      "极简录入:入住当下最少只填手机号+房间号,姓名等可在导入时自动补齐",
      "报表统计:床位 / 房间入住率、日 / 月营收自动计算(兼容床位制与整间制计费)",
      "本地离线:数据不出本机,契合小旅店的隐私与合规需求",
    ],
    techTags: ["Python", "PySide6", "PaddleOCR", "SQLite"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
