"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 列表项所需的精简数据
export interface WorkItem {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  thumb: string;
  tags: string[];
}

// lawted 风格的作品目录:
// - 一行行项目标题,鼠标悬停时其余行变暗、并在光标旁浮现预览小窗
// - 点进去才是详情页
export function WorksIndex({ items }: { items: WorkItem[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      className="relative border-t border-[var(--border)]"
    >
      {items.map((it, i) => (
        <Link
          key={it.slug}
          href={`/works/${it.slug}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className="group block border-b border-[var(--border)] py-8 transition-opacity duration-300"
          style={{ opacity: hover === null || hover === i ? 1 : 0.35 }}
        >
          <div className="flex items-baseline justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-4xl">
                {it.title}
              </h2>
              <p className="mt-2 text-[var(--fg-muted)] transition-transform duration-300 group-hover:translate-x-2">
                {it.tagline}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
              {it.status}
            </span>
          </div>

          {/* 移动端没有悬停:直接展示缩略图,保证信息不丢失 */}
          <div className="mt-5 overflow-hidden rounded-lg border border-[var(--border)] sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.thumb} alt={it.title} className="w-full" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {it.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-xs text-[var(--fg-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </Link>
      ))}

      {/* 跟随光标的预览小窗(仅桌面端,position: fixed)*/}
      <AnimatePresence>
        {hover !== null && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none fixed z-50 hidden w-80 overflow-hidden rounded-lg border border-[var(--border)] shadow-2xl sm:block"
            style={{
              left: Math.min(pos.x + 24, (typeof window !== "undefined" ? window.innerWidth : 1200) - 340),
              top: pos.y - 100,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[hover].thumb} alt="" className="w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
