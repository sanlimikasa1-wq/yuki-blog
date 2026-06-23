import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { Showcase } from "@/components/Showcase";
import { projects, getProject } from "@/lib/works";

// 预生成所有作品详情页
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProject(params.slug);
  if (!p) return { title: "作品未找到" };
  return { title: p.title, description: p.tagline };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getProject(params.slug);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      {/* 返回 */}
      <Link
        href="/works"
        className="text-sm text-[var(--fg-muted)] transition-colors hover:text-accent"
      >
        ← 返回作品
      </Link>

      {/* 标题 */}
      <FadeIn>
        <header className="mb-10 mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-4xl font-bold tracking-tight">
              {p.title}
            </h1>
            <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
              {p.status}
            </span>
          </div>
          <p className="mt-3 text-lg text-[var(--fg-muted)]">{p.tagline}</p>
        </header>
      </FadeIn>

      {/* 演示 */}
      <FadeIn delay={0.05}>
        <Showcase slides={p.slides} frameLabel={p.frameLabel} />
      </FadeIn>

      {/* 痛点 / 方案 */}
      <FadeIn delay={0.05}>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-medium text-accent">痛点</h2>
            <p className="leading-relaxed text-[var(--fg-muted)]">{p.painpoint}</p>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-medium text-accent">我做了什么</h2>
            <p className="leading-relaxed text-[var(--fg-muted)]">{p.solution}</p>
          </div>
        </div>
      </FadeIn>

      {/* 亮点 */}
      <FadeIn delay={0.05}>
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-accent">亮点</h2>
          <ul className="space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 leading-relaxed text-[var(--fg-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* 技术栈 */}
      <FadeIn delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2">
          {p.techTags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-xs text-[var(--fg-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
        {p.note && (
          <p className="mt-4 text-xs text-[var(--fg-muted)]">{p.note}</p>
        )}
      </FadeIn>

      {/* 其他作品 */}
      <FadeIn delay={0.05}>
        <div className="mt-16 border-t border-[var(--border)] pt-8">
          <p className="mb-4 text-sm text-[var(--fg-muted)]">其他作品</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {projects
              .filter((o) => o.slug !== p.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`/works/${o.slug}`}
                  className="text-[var(--fg)] underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {o.title} →
                </Link>
              ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
