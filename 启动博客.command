#!/bin/bash
# ============================================================
#  双击启动「赵御行的个人博客」本地预览
#  说明:在本机运行,使用 localhost,无需联网。
#       关闭此终端窗口即停止预览。
# ============================================================

# 切换到脚本所在目录(即项目根目录)
cd "$(dirname "$0")" || exit 1

echo "============================================"
echo "  赵御行的个人博客 · 本地预览"
echo "============================================"
echo ""

# 检查是否安装了 Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ 没有检测到 Node.js,请先安装 Node.js 后再试。"
  echo "   下载地址:https://nodejs.org/"
  echo ""
  echo "按回车键关闭窗口..."
  read -r
  exit 1
fi

# 首次运行若缺少依赖则安装(此步需要联网,通常已装好)
if [ ! -d "node_modules" ]; then
  echo "⏳ 首次运行,正在安装依赖(需要联网,仅此一次)..."
  npm install || { echo "依赖安装失败"; read -r; exit 1; }
fi

echo "⏳ 正在启动本地服务器..."
echo ""

# 后台启动 Next.js 开发服务器
npm run dev &
DEV_PID=$!

# 轮询等待服务器就绪,然后自动打开浏览器
for _ in $(seq 1 40); do
  if curl -s http://localhost:3000 >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

open "http://localhost:3000"

echo ""
echo "============================================"
echo "  ✅ 博客已在浏览器打开:http://localhost:3000"
echo ""
echo "  · 想停止预览:直接关闭这个终端窗口,"
echo "    或按 Control + C。"
echo "============================================"
echo ""

# 保持脚本运行(等待开发服务器进程),否则窗口会立刻退出
wait $DEV_PID
