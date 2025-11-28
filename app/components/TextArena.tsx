'use client'

import { useState } from 'react'

const TEXT_MODELS = [
  { id: 'openai', name: 'OpenAI (模擬)' },
  { id: 'mistral', name: 'Mistral (模擬)' },
  { id: 'llama', name: 'Llama (模擬)' },
]

interface TextArenaProps {
  onVote: (model: string) => void
}

export default function TextArena({ onVote }: TextArenaProps) {
  const [prompt, setPrompt] = useState('')
  const [modelA, setModelA] = useState(TEXT_MODELS[0])
  const [modelB, setModelB] = useState(TEXT_MODELS[1])
  const [responseA, setResponseA] = useState<string | null>(null)
  const [responseB, setResponseB] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showModels, setShowModels] = useState(false)

  const generateResponses = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setShowModels(false)

    // 模擬API調用
    await new Promise(resolve => setTimeout(resolve, 1500))

    setResponseA(
      `【${modelA.name} 的回答】\n\n這是 ${modelA.name} 針對您的問題所提供的回答。在實際應用中,這裡會呼叫真實的 API 來獲取模型回應。\n\n您可以根據回答的準確性、創造性、實用性等方面來評估這個回答的品質。`
    )
    setResponseB(
      `【${modelB.name} 的回答】\n\n這是 ${modelB.name} 針對您的問題所提供的回答。每個模型都有其獨特的回答風格和能力特點。\n\n請仔細比較兩個模型的回答,選擇您認為更好的那一個。`
    )

    setLoading(false)
  }

  const handleVote = (model: typeof modelA | typeof modelB) => {
    onVote(model.name)
    setShowModels(true)
  }

  const handleReset = () => {
    setResponseA(null)
    setResponseB(null)
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
              onChange={(e) => setModelA(TEXT_MODELS.find(m => m.id === e.target.value)!)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {TEXT_MODELS.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">模型 B</label>
            <select
              value={modelB.id}
              onChange={(e) => setModelB(TEXT_MODELS.find(m => m.id === e.target.value)!)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {TEXT_MODELS.map(model => (
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
          placeholder="例如: 請解釋量子力學的基本原理..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={generateResponses}
            disabled={loading || !prompt.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? '💬 生成中...' : '🚀 生成回答'}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🗑️ 清除
          </button>
        </div>
      </div>

      {/* Response Comparison */}
      {(responseA || responseB) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Response A */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅰️ ${modelA.name}` : '🅰️ 模型 A'}
            </h3>
            {responseA && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{responseA}</p>
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

          {/* Response B */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              {showModels ? `🅱️ ${modelB.name}` : '🅱️ 模型 B'}
            </h3>
            {responseB && (
              <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{responseB}</p>
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
            ✅ 已記錄投票!繼續生成新回答進行比較
          </p>
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          💡 提示: 文字生成功能目前使用模擬數據。要使用真實API,可以整合 Groq、Hugging Face 或其他文字生成服務。
        </p>
      </div>
    </div>
  )
}