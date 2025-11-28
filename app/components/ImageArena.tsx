'use client'

import { useState } from 'react'
import Image from 'next/image'

const IMAGE_MODELS = [
  { id: 'flux', name: 'Flux', model: 'flux' },
  { id: 'flux-realism', name: 'Flux Realism', model: 'flux-realism' },
  { id: 'flux-anime', name: 'Flux Anime', model: 'flux-anime' },
  { id: 'flux-3d', name: 'Flux 3D', model: 'flux-3d' },
  { id: 'turbo', name: 'Turbo', model: 'turbo' },
]

interface ImageArenaProps {
  onVote: (model: string) => void
}

export default function ImageArena({ onVote }: ImageArenaProps) {
  const [prompt, setPrompt] = useState('')
  const [modelA, setModelA] = useState(IMAGE_MODELS[0])
  const [modelB, setModelB] = useState(IMAGE_MODELS[1])
  const [imageA, setImageA] = useState<string | null>(null)
  const [imageB, setImageB] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showModels, setShowModels] = useState(false)

  const generateImages = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setShowModels(false)
    
    const seedA = Math.floor(Math.random() * 1000000)
    const seedB = Math.floor(Math.random() * 1000000)

    const urlA = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${modelA.model}&seed=${seedA}&width=1024&height=1024&nologo=true`
    const urlB = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${modelB.model}&seed=${seedB}&width=1024&height=1024&nologo=true`

    setImageA(urlA)
    setImageB(urlB)

    // 預載圖片
    await Promise.all([
      new Promise((resolve) => {
        const img = new window.Image()
        img.onload = resolve
        img.src = urlA
      }),
      new Promise((resolve) => {
        const img = new window.Image()
        img.onload = resolve
        img.src = urlB
      })
    ])

    setLoading(false)
  }

  const handleVote = (model: typeof modelA | typeof modelB) => {
    onVote(model.name)
    setShowModels(true)
  }

  const handleReset = () => {
    setImageA(null)
    setImageB(null)
    setShowModels(false)
    setPrompt('')
  }

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">⚙️ 模型設定</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">模型 A</label>
            <select
              value={modelA.id}
              onChange={(e) => setModelA(IMAGE_MODELS.find(m => m.id === e.target.value)!)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {IMAGE_MODELS.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">模型 B</label>
            <select
              value={modelB.id}
              onChange={(e) => setModelB(IMAGE_MODELS.find(m => m.id === e.target.value)!)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {IMAGE_MODELS.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">✏️ 提示詞</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如: 一隻可愛的貓咪坐在月球上,星空背景,賽博龐克風格..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={generateImages}
            disabled={loading || !prompt.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? '🎨 生成中...' : '🚀 生成圖片'}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🗑️ 清除
          </button>
        </div>
      </div>

      {/* Image Comparison */}
      {(imageA || imageB) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image A */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅰️ ${modelA.name}` : '🅰️ 模型 A'}
            </h3>
            {imageA && (
              <div className="relative aspect-square mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={imageA}
                  alt="Model A Output"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            {!showModels && (
              <button
                onClick={() => handleVote(modelA)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                👍 投票給 A
              </button>
            )}
          </div>

          {/* Image B */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅱️ ${modelB.name}` : '🅱️ 模型 B'}
            </h3>
            {imageB && (
              <div className="relative aspect-square mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={imageB}
                  alt="Model B Output"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            {!showModels && (
              <button
                onClick={() => handleVote(modelB)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                👍 投票給 B
              </button>
            )}
          </div>
        </div>
      )}

      {showModels && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            ✅ 已記錄投票!繼續生成新圖片進行比較
          </p>
        </div>
      )}
    </div>
  )
}