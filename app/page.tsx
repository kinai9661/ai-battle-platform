'use client'

import { useState } from 'react'
import ImageArena from './components/ImageArena'
import TextArena from './components/TextArena'
import Leaderboard from './components/Leaderboard'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'image' | 'text' | 'leaderboard'>('image')
  const [votes, setVotes] = useState<Record<string, number>>({})

  const handleVote = (model: string) => {
    setVotes(prev => ({
      ...prev,
      [model]: (prev[model] || 0) + 1
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🤖 AI 模型對戰平台
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            使用 Pollinations.ai 比較不同 AI 模型的生成效果
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'image'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              🎨 圖片生成
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'text'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              💬 文字生成
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📊 排行榜
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'image' && <ImageArena onVote={handleVote} />}
          {activeTab === 'text' && <TextArena onVote={handleVote} />}
          {activeTab === 'leaderboard' && <Leaderboard votes={votes} />}
        </div>
      </div>
    </main>
  )
}