"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

/* ============================================================
   首页叙事:像一段独白 / 一部短片
   随用户向下滚动,文字一段段淡入。克制、优雅。
   结构:引子(名言) → 论点 → 留学 → 过渡 → AI native → 入口
   ============================================================ */

// 单行文字的淡入上移动画(进入视口时触发,只触发一次)
const lineVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// 统一的缓动:慢起快收,有「呼吸感」
const ease = [0.22, 1, 0.36, 1] as const;

// 一个「画面」容器:占据接近一屏的高度,内容垂直居中。
// 内部用 staggerChildren 让多行文字错落淡入。
function Screen({
  children,
  className = "",
  full = false,
}: {
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <motion.section
      className={`mx-auto flex max-w-3xl flex-col justify-center px-6 ${
        full ? "min-h-screen" : "min-h-[80vh]"
      } ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

// 一行叙事文字
function Line({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      variants={lineVariant}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

// 大字「独白」行:中文衬线、舒展行距
const speak =
  "font-serif text-2xl leading-relaxed tracking-tight text-[var(--fg)] sm:text-[2rem] sm:leading-[1.6]";
// 次要 / 旁白文字
const aside = "text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg";

export function HomeNarrative() {
  // 顶部滚动进度条
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="relative">
      {/* 顶部细线滚动进度条 */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      {/* —— 画面 1:引子(题词卡)—— */}
      <motion.section
        className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.22 }}
      >
        {/* 装饰性引号:正常排版,放在引言上方,完全可见、不被导航遮挡 */}
        <motion.span
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 1, ease }}
          aria-hidden
          className="mb-1 block select-none font-serif text-[5rem] leading-[0.5] text-accent/25 sm:text-[6.5rem]"
        >
          “
        </motion.span>

        <Line className={speak}>
          未来已经到来,
        </Line>
        <Line className={`${speak} mt-1`}>
          只是<span className="text-accent">尚未均匀分布</span>。
        </Line>
        <Line className="mt-8 text-sm tracking-[0.2em] text-[var(--fg-muted)]">
          —— 威廉·吉布森 · WILLIAM GIBSON
        </Line>

        <Line className="mt-16 flex items-center gap-2 text-sm text-[var(--fg-muted)]">
          <span className="scroll-cue inline-block">↓</span>
          <span>向下滚动</span>
        </Line>
      </motion.section>

      {/* —— 画面 2:论点(一笔带过)—— */}
      <Screen>
        <Line className={speak}>
          差别或许不在会不会用 AI,
        </Line>
        <Line className={`${speak} mt-1`}>
          而在它<span className="text-accent">是不是已经成了你的习惯</span>。
        </Line>
      </Screen>

      {/* —— 画面 3:留学(淡淡地说)—— */}
      <Screen>
        <Line className={`${aside} mb-2 text-sm tracking-widest`}>
          东京 · 五年
        </Line>
        <Line className={speak}>
          在日本读书的那几年,
        </Line>
        <Line className={`${speak} mt-1`}>
          常常一个人,对着成堆的文献和论文。
        </Line>
        <Line className={`${aside} mt-8`}>
          是 AI 陪我一点点啃下来的。
          不知不觉,它从一个「工具」,变成了我做事的默认方式。
        </Line>
      </Screen>

      {/* —— 画面 4:过渡 —— */}
      <Screen className="min-h-[55vh]">
        <Line className={`${aside} text-center sm:text-xl`}>
          后来我才知道,这种习惯有个说法——
        </Line>
      </Screen>

      {/* —— 画面 5:AI native(视觉重心,单独成屏)—— */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.22 }}
      >
        {/* 背景:极淡的靛蓝径向光晕,制造深度 */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #2E75B6, transparent 70%)" }}
        />

        <motion.h2
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            show: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 1, ease }}
          className="relative font-mono text-[16vw] font-bold leading-none tracking-tighter text-[var(--fg)] sm:text-[11rem]"
        >
          AI<span className="text-accent"> native</span>
          {/* 终端光标,呼应 vibe coding */}
          <span className="caret-blink ml-2 inline-block align-baseline text-accent">_</span>
        </motion.h2>

        <motion.p
          variants={lineVariant}
          transition={{ duration: 0.8, ease }}
          className={`relative mt-12 max-w-xl ${aside}`}
        >
          不是刻意「会用 AI」,而是遇到问题,
          第一反应就是:<span className="text-[var(--fg)]">让 AI 一起来。</span>
        </motion.p>
      </motion.section>

      {/* —— 画面 6:入口(无文案,仅按钮)—— */}
      <motion.section
        className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-8 px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* 一道细短分隔线,作收束 */}
        <motion.span
          variants={{ hidden: { opacity: 0, scaleX: 0 }, show: { opacity: 1, scaleX: 1 } }}
          transition={{ duration: 0.8, ease }}
          className="h-px w-12 bg-[var(--border)]"
        />
        <motion.div
          variants={lineVariant}
          transition={{ duration: 0.8, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/resume.pdf"
            download="赵御行_FDE简历.pdf"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            简历
          </a>
          <Link
            href="/about"
            className="rounded-md border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-subtle)]"
          >
            关于我
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
