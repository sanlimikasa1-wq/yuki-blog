"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface Slide {
  src: string;
  label: string;
}

const INTERVAL = 3800;

// 浏览器外框 + 自动循环交叉淡入的产品演示轮播(通用,供各项目复用)
export function Showcase({
  slides,
  frameLabel,
}: {
  slides: Slide[];
  frameLabel: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (n: number) => setI((n + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* 浏览器窗口外框 */}
      <div className="overflow-hidden rounded-xl border border-[var(--border)] shadow-2xl">
        {/* 顶部栏:三个圆点 + 地址 */}
        <div className="flex h-9 items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)] px-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 hidden rounded-md bg-[var(--bg)] px-3 py-0.5 font-mono text-xs text-[var(--fg-muted)] sm:block">
            {frameLabel}
          </div>
        </div>

        {/* 截图轮播区 */}
        <div className="relative aspect-[16/10] bg-[#0a1a2f]">
          <AnimatePresence>
            <motion.img
              key={i}
              src={slides[i].src}
              alt={slides[i].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* 当前画面说明 + 进度圆点 */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-[var(--fg-muted)]"
          >
            {slides[i].label}
          </motion.p>
        </AnimatePresence>

        <div className="flex shrink-0 gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.src}
              onClick={() => go(idx)}
              aria-label={`查看第 ${idx + 1} 屏`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-accent" : "w-1.5 bg-[var(--border)] hover:bg-[var(--fg-muted)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
