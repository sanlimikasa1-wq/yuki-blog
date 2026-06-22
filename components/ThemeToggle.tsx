"use client";

import { useEffect, useState } from "react";

// 暗色模式切换按钮:通过给 <html> 增删 .dark 类来切换,并持久化到 localStorage
export function ThemeToggle() {
  // 用 mounted 避免服务端/客户端初次渲染不一致
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  // 未挂载前渲染一个占位,保持布局稳定
  if (!mounted) {
    return <span className="inline-block h-9 w-9" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "切换到浅色模式" : "切换到暗色模式"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)]"
    >
      {isDark ? (
        // 太阳图标
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // 月亮图标
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
