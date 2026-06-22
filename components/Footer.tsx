// 全局页脚
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-[var(--fg-muted)] sm:flex-row">
        <p>© {year} 赵御行 · 用 Next.js 构建</p>
        <div className="flex items-center gap-4">
          <a href="mailto:sanlimikasa1@gmail.com" className="transition-colors hover:text-[var(--fg)]">
            邮箱
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--fg)]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
