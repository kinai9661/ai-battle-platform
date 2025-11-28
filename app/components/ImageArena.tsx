'use client'

import { useState } from 'react'
import Image from 'next/image'

const IMAGE_MODELS = [
  { id: 'flux', name: 'Flux', model: 'flux' },
  { id: 'flux-pro', name: 'Flux Pro', model: 'flux-pro' },
  { id: 'flux-realism', name: 'Flux Realism', model: 'flux-realism' },
  { id: 'flux-anime', name: 'Flux Anime', model: 'flux-anime' },
  { id: 'turbo', name: 'Turbo', model: 'turbo' },
  { id: 'google', name: 'Google Gemini Flash 2.0', model: 'gemini2-flash' },
]

interface ImageArenaProps {
  onVote: (model: string) => void
}

export default function ImageArena({ onVote }: ImageArenaProps) {
  const [prompt, setPrompt] = useState('')
  const [modelA, setModelA] = useState(IMAGE_MODELS[0])
  const [modelB, setModelB] = useState(IMAGE_MODELS[1])
  const [numImages, setNumImages] = useState(2)
  const [imagesA, setImagesA] = useState<string[]>([])
  const [imagesB, setImagesB] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showModels, setShowModels] = useState(false)

  const generateImages = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setShowModels(false)
    const getUrls = (model: typeof modelA) => {
      return Array.from({ length: numImages }).map((_, i) => {
        const seed = Math.floor(Math.random() * 1000000) + i
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${model.model}&seed=${seed}&width=1024&height=1024&nologo=true`
      })
    }
    const urlsA = getUrls(modelA)
    const urlsB = getUrls(modelB)
    setImagesA(urlsA)
    setImagesB(urlsB)
    // 預載圖片
    await Promise.all([
      ...urlsA.map(url => new Promise(res => { const img = new window.Image(); img.onload = res; img.src = url; })),
      ...urlsB.map(url => new Promise(res => { const img = new window.Image(); img.onload = res; img.src = url; }))
    ])
    setLoading(false)
  }

  const handleVote = (model: typeof modelA | typeof modelB) => {
    onVote(model.name)
    setShowModels(true)
  }

  const handleReset = () => {
    setImagesA([])
    setImagesB([])
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
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">每個模型生成圖片數量</label>
          <input
            type="number"
            min={1}
            max={6}
            value={numImages}
            onChange={e => setNumImages(Math.max(1, Math.min(6, parseInt(e.target.value) || 2)))}
            className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
          />
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">(1~6 張)</span>
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
      {(imagesA.length > 0 || imagesB.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images A */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅰️ ${modelA.name}` : '🅰️ 模型 A'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {imagesA.map((img, i) => (
                <div key={img} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image src={img} alt={`A圖${i+1}`} fill className="object-contain" unoptimized/>
                </div>
              ))}
            </div>
            {!showModels && (
              <button
                onClick={() => handleVote(modelA)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                👍 投票給 A
              </button>
            )}
          </div>
          {/* Images B */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅱️ ${modelB.name}` : '🅱️ 模型 B'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {imagesB.map((img, i) => (
                <div key={img} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image src={img} alt={`B圖${i+1}`} fill className="object-contain" unoptimized/>
                </div>
              ))}
            </div>
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
            ✅ 已記錄投票! 繼續生成新圖片進行比較
          </p>
        </div>
      )}
    </div>
  )
}
