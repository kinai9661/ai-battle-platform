'use client'

interface LeaderboardProps {
  votes: Record<string, number>
}

export default function Leaderboard({ votes }: LeaderboardProps) {
  const sortedVotes = Object.entries(votes)
    .sort(([, a], [, b]) => b - a)
    .map(([model, count], index) => ({ model, count, rank: index + 1 }))

  const maxVotes = sortedVotes[0]?.count || 1

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `${rank}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          🏆 模型排行榜
        </h2>

        {sortedVotes.length > 0 ? (
          <div className="space-y-4">
            {sortedVotes.map(({ model, count, rank }) => (
              <div key={model} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold w-12 text-center">
                      {getMedalEmoji(rank)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{model}</h3>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {count} 票
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxVotes) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              還沒有投票記錄
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              開始進行 AI 對戰並投票來查看排行榜!
            </p>
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">如何使用:</h4>
              <ol className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                <li>1️⃣ 選擇功能模式(圖片或文字生成)</li>
                <li>2️⃣ 選擇要對戰的兩個 AI 模型</li>
                <li>3️⃣ 輸入您的提示詞</li>
                <li>4️⃣ 比較兩個模型的輸出結果</li>
                <li>5️⃣ 投票給您認為更好的模型</li>
                <li>6️⃣ 在排行榜查看統計結果</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {sortedVotes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📈 統計資訊</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {sortedVotes.reduce((sum, { count }) => sum + count, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">總投票數</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {sortedVotes.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">參與模型</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {sortedVotes[0]?.model.split(' ')[0] || 'N/A'}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">目前領先</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}