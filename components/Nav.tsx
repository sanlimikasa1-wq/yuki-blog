"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

// 顶部导航项
const links = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
];

export function Nav() {
  const pathname = usePathname();

  // 判断某个导航项是否处于激活状态
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="text-base font-semibold tracking-tight">
          赵御行<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-[var(--fg)] ${
                isActive(link.href)
                  ? "text-[var(--fg)] font-medium"
                  : "text-[var(--fg-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
