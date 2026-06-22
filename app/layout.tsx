import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// 站点全局元信息(利于 SEO 与社交分享)
export const metadata: Metadata = {
  title: {
    default: "赵御行 | FDE · 博客与作品集",
    template: "%s | 赵御行",
  },
  description:
    "赵御行的个人博客与作品集 —— 记录技术实践与思考,面向前线部署工程(FDE)方向。",
  metadataBase: new URL("https://example.com"),
};

// 内联脚本:在页面渲染前同步设置暗色模式,避免主题闪烁(FOUC)
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
