import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "关于",
  description:
    "关于赵御行 —— FDE,一个把 AI 当作母语的人。自我介绍、工作方式、核心能力、项目经历与联系方式。",
};

/* —— 区块标题:小号靛蓝标签 + 标题,统一各分区的视觉节奏 —— */
function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-medium tracking-[0.2em] text-accent">
        {label}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

// 核心能力数据
const abilities = [
  {
    title: "AI 工程与快速交付",
    desc: "熟练用 Claude Code 进行 vibe coding,从需求到可运行原型;能编写可复用的 Claude Skills,把工作流和领域知识沉淀下来,让交付更稳定高效。",
  },
  {
    title: "业务流程工具化",
    desc: "擅长把客户口中那些「很麻烦」的流程,拆解成能直接上手的轻量工具 —— 单文件 HTML 应用、飞书/钉钉自动化脚本,开箱即用、几乎零部署成本。",
  },
  {
    title: "全栈交付与排障",
    desc: "有 Python 和前端基础,能独立完成桌面应用、OCR 集成、本地数据库这样的端到端开发;也能在受限或非标准的客户环境里把东西真正跑起来。",
  },
  {
    title: "跨文化沟通",
    desc: "日语 N1、商务英语;熟悉日本「报联商」职场文化,能在客户现场把需求、谈判、协调这些「人的部分」处理好 —— 这往往才是 FDE 最难的一环。",
  },
];

// 项目经历数据
const projects = [
  {
    title: "酒店访客登记桌面系统",
    status: "实际交付",
    desc: "为前台设计的桌面化登记系统,集成 OCR 自动识别证件信息,本地数据库存储,替代了原本的纸质登记台账。",
    tags: ["PySide6", "PaddleOCR", "SQLite"],
  },
  {
    title: "电商运营轻量化工具集",
    status: "Demo",
    desc: "围绕中小电商的高频痛点,做的一组开箱即用小工具,包括退货管理、供应商货款追踪、员工提成计算等。",
    tags: ["单文件 HTML", "飞书/钉钉自动化", "DeepSeek API"],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {/* ===== 1. 头部 ===== */}
      <FadeIn>
        <header className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-8">
          {/* 头像 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/person.jpg"
            alt="赵御行的照片"
            className="h-32 w-32 shrink-0 rounded-2xl object-cover ring-1 ring-[var(--border)] sm:h-36 sm:w-36"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-serif text-4xl font-bold tracking-tight">
              赵御行
            </h1>
            <p className="mt-3 text-lg text-[var(--fg-muted)]">
              不断<span className="text-accent">进步</span>
            </p>
          </div>
        </header>
      </FadeIn>

      {/* ===== 2. 简介 ===== */}
      <FadeIn delay={0.1}>
        <section className="mt-14">
          <p className="text-lg leading-loose">
            我是赵御行,更希望你叫我 <span className="text-accent">yuki</span>。
            目前希望进入 FDE 领域,熟悉各行各业的业务逻辑,让更多技能赋予己身。
            我是国际经营专业出身,在东京留学了五年,日语也拿到了 N1;回国后,
            我婉拒了日企的邀约,想去做一些自己真正感兴趣的事。
          </p>
        </section>
      </FadeIn>

      {/* ===== 3. 核心能力 ===== */}
      <FadeIn delay={0.1}>
        <section className="mt-16">
          <SectionHeading label="CAPABILITIES" title="核心能力" />
          <div className="grid gap-4 sm:grid-cols-2">
            {abilities.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-[var(--border)] p-6 transition-colors hover:border-accent"
              >
                <h3 className="mb-2.5 font-medium">{a.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ===== 5. 项目经历 ===== */}
      <FadeIn delay={0.1}>
        <section className="mt-16">
          <SectionHeading label="PROJECTS" title="项目经历" />
          <div className="grid gap-4">
            {projects.map((p) => (
              <article
                key={p.title}
                className="rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                    {p.status}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-xs text-[var(--fg-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ===== 6. 背景 ===== */}
      <FadeIn delay={0.1}>
        <section className="mt-16">
          <SectionHeading label="BACKGROUND" title="背景" />
          <dl className="space-y-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-24 shrink-0 text-sm text-[var(--fg-muted)]">教育</dt>
              <dd>
                <p className="font-medium">二松学舍大学 · 国际工商管理(本科)</p>
                <p className="text-sm text-[var(--fg-muted)]">2022 – 2026</p>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="w-24 shrink-0 text-sm text-[var(--fg-muted)]">语言</dt>
              <dd className="flex flex-wrap gap-2">
                <span className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-sm">中文(母语)</span>
                <span className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-sm">日语(N1)</span>
                <span className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-sm">英语(商务)</span>
              </dd>
            </div>
          </dl>
        </section>
      </FadeIn>

      {/* ===== 7. 联系方式 + 简历下载 ===== */}
      <FadeIn delay={0.1}>
        <section className="mt-16 border-t border-[var(--border)] pt-10">
          <SectionHeading label="CONTACT" title="联系我" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[var(--fg-muted)]">
              <span>邮箱 </span>
              <a
                href="mailto:sanlimikasa1@gmail.com"
                className="text-accent underline underline-offset-4"
              >
                sanlimikasa1@gmail.com
              </a>
              {/* 社交链接之后补 */}
            </div>
            <a
              href="/resume.pdf"
              download="赵御行_FDE简历.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {/* 下载图标 */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              下载简历
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
