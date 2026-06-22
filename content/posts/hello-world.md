---
title: "你好,世界:这个博客是怎么搭起来的"
date: "2026-06-22"
summary: "用 Next.js 14 + TypeScript + Tailwind 搭建一个可部署到 Vercel 的个人博客,聊聊技术选型背后的取舍。"
tags: ["Next.js", "前端", "建站"]
---

## 为什么从零搭一个博客

市面上现成的博客平台很多,但我想要一个**完全可控**的站点:既能持续写技术文章,
也能作为面向招聘方的个人门面。于是选择了自己动手。

这篇文章既是一篇示例文章,也用来测试列表页和详情页的渲染效果。

## 技术选型

核心技术栈如下:

- **Next.js 14(App Router)** —— 现代 React 框架,天然适配 Vercel
- **TypeScript** —— 类型安全,重构更安心
- **Tailwind CSS** —— 原子化样式,开发速度快
- **Framer Motion** —— 克制的滚动渐入动画
- **Markdown + gray-matter** —— 文章用纯文本管理,版本可控

## 一段代码示例

文章里可以直接写代码块,并带语法高亮:

```ts
// 读取所有文章并按日期倒序
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(readPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

行内代码也没问题,比如 `npm run dev` 就能启动本地预览。

## 一个引用

> 把产品真正部署到客户现场,解决最后一公里的问题 —— 这是 FDE 的价值所在。

## 接下来

后续会逐步完善设计、补充真实文章和项目展示。这只是一个开始。
