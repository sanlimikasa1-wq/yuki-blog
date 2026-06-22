import type { Config } from "tailwindcss";

// Tailwind 配置
const config: Config = {
  // 使用 class 策略控制暗色模式(给 <html> 加 .dark 即可切换)
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 低饱和点缀色:靛蓝
        accent: {
          DEFAULT: "#2E75B6",
          fg: "#ffffff",
        },
      },
      fontFamily: {
        // 中文正文:思源黑体 / 系统无衬线字体
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Source Han Sans SC",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        // 中文衬线(宋体):用于首页叙事的「独白」大字,带文学/电影感
        serif: [
          "Songti SC",
          "STSong",
          "Noto Serif SC",
          "Source Han Serif SC",
          "SimSun",
          "serif",
        ],
        // 代码:等宽字体
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        // 正文内容理想阅读宽度
        content: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
