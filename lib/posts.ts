import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// 文章 Markdown 文件所在目录
const postsDir = path.join(process.cwd(), "content", "posts");

// frontmatter 元信息结构
export interface PostMeta {
  slug: string; // 由文件名生成,用于路由
  title: string; // 标题
  date: string; // 日期(YYYY-MM-DD)
  summary: string; // 摘要
  tags: string[]; // 标签
}

// 含正文 HTML 的完整文章
export interface Post extends PostMeta {
  contentHtml: string;
}

// 读取目录下所有 .md 文件名(去掉扩展名即为 slug)
function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 读取并解析单篇文章的 frontmatter(不含正文渲染)
function readPostMeta(slug: string): PostMeta {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    summary: data.summary ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}

// 获取全部文章元信息,按日期倒序排列
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(readPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 获取单篇文章的完整内容(frontmatter + 渲染后的正文 HTML)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // Markdown -> HTML 处理管线:
  // 解析 -> GFM 扩展 -> 转 rehype -> 标题加锚点 id -> 代码高亮 -> 输出 HTML 字符串
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    summary: data.summary ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    contentHtml: String(processed),
  };
}

// 供 generateStaticParams 使用:返回所有 slug
export function getAllPostSlugs(): string[] {
  return getPostSlugs();
}

// 把日期格式化为中文友好的形式
export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
