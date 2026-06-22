import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPostSlugs,
  getPostBySlug,
  formatDate,
} from "@/lib/posts";

// 构建时预生成所有文章的静态路由(Vercel 上为纯静态页面)
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// 为每篇文章生成独立的页面元信息
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "文章未找到" };
  return { title: post.title, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-content px-5 py-16">
      {/* 返回博客列表 */}
      <Link
        href="/blog"
        className="text-sm text-[var(--fg-muted)] transition-colors hover:text-accent"
      >
        ← 返回博客
      </Link>

      {/* 文章头部 */}
      <header className="mb-10 mt-6 border-b border-[var(--border)] pb-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--fg-muted)]">
          <time>{formatDate(post.date)}</time>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* 正文:由 Markdown 渲染而来 */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
