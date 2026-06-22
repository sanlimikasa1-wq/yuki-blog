import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "赵御行的全部文章 —— 技术实践与思考。",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <FadeIn>
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">博客</h1>
          <p className="mt-3 text-[var(--fg-muted)]">
            记录技术实践与思考,共 {posts.length} 篇。
          </p>
        </header>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-[var(--fg-muted)]">还没有文章。</p>
      ) : (
        <div className="grid gap-5">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.06}>
              <article>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg border border-[var(--border)] p-6 transition-colors hover:border-accent"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-medium transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <time className="text-xs text-[var(--fg-muted)]">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="mt-2 leading-relaxed text-[var(--fg-muted)]">
                    {post.summary}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--bg-subtle)] px-2.5 py-1 text-xs text-[var(--fg-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
