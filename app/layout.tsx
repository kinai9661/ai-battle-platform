import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 模型對戰平台 - LMArena Clone',
  description: '基於 Pollinations.ai 的 AI 圖片生成對戰平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}