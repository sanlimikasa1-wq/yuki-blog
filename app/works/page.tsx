import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { WorksIndex } from "@/components/WorksIndex";
import { projects } from "@/lib/works";

export const metadata: Metadata = {
  title: "作品",
  description:
    "赵御行的作品 —— 云象 ERP(内置 AI 经营助手)、小优 AI 智能客服、旅店前台登记系统(OCR)。",
};

export default function WorksPage() {
  // 只把列表需要的字段传给客户端组件
  const items = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    status: p.status,
    thumb: p.thumb,
    tags: p.tags,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <FadeIn>
        <header className="mb-12">
          <p className="mb-2 text-xs font-medium tracking-[0.2em] text-accent">
            WORKS
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight">作品</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--fg-muted)]">
            一些我真正做出来、能跑起来的东西。比起描述,我更愿意让它们自己说话。
            <span className="hidden sm:inline"> 悬停预览,点进去看细节。</span>
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <WorksIndex items={items} />
      </FadeIn>
    </div>
  );
}
