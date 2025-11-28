'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'image' | 'text' | 'leaderboard' | 'music' | 'video'>('image')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 登入介紹區塊 */}
        <div className="bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-700 rounded-xl shadow-md text-white mb-6 p-6 text-center">
          <h1 className="text-4xl font-bold mb-2">🤖 AI 多模型競技平台</h1>
          <div className="mb-2">支援 Google 一鍵登入，保護您的個人數據、歷史紀錄和作品！</div>
          <div className="mb-3">登入後可享有個人專屬配額、收藏與進階功能。</div>
          <div>
            <Link href="/api/auth/signin">
              <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow hover:bg-blue-50 text-xl transition-all">🔐 用 Google 帳號登入</button>
            </Link>
          </div>
          <div className="text-xs mt-2 opacity-90">* 本平台不會收集或外洩您的 Google 個資，僅用於辨識與資料綁定，支援安全登出。</div>
        </div>

        {/* 功能選擇 Tabs */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${ activeTab === 'image' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            🎨 圖片生成對戰
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${ activeTab === 'text' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            💬 文字生成對戰
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${ activeTab === 'music' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            🎵 音樂生成
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${ activeTab === 'video' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            🎬 影片生成功能
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${ activeTab === 'leaderboard' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            📊 排行榜
          </button>
        </div>

        {/* 對應頁籤內容展示 */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'image' && (
            <DynamicComponent name="ImageArena"/>
          )}
          {activeTab === 'text' && (
            <DynamicComponent name="TextArena"/>
          )}
          {activeTab === 'music' && (
            <DynamicComponent name="MusicArena"/>
          )}
          {activeTab === 'leaderboard' && (
            <DynamicComponent name="Leaderboard"/>
          )}
          {activeTab === 'video' && (
            <div className="rounded-xl bg-white/80 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 shadow-xl p-10 my-12 text-center animate-fadein">
              <h2 className="text-2xl font-bold mb-4">🎬 影片生成</h2>
              <div className="mb-2">影片AI即將登場！未來將支援多種影片生成模型 (如 Runway、Pika labs、Luma AI)。</div>
              <div className="opacity-90 mt-4">如急需影片生成功能，請聯絡開發者或參考 <a target="_blank" href="https://runwayml.com/">Runway</a>、<a target="_blank" href="https://pika.art/">Pika Labs</a>、<a target="_blank" href="https://lumalabs.ai/">Luma AI</a> 官方平台。</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// 動態載入組件避免SSR警告
function DynamicComponent({name}:{name:string}) {
  const Comp = require(`./components/${name}`).default
  return <Comp />
}
