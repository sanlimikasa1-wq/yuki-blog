"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// 通用「淡入上移」动画容器:
// - 默认进入视口时触发(滚动渐入),克制不浮夸
// - delay 可用于让同屏多个元素错落出现
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
