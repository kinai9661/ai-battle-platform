'use client'

import { useState } from 'react'

const SUNO_API_ENDPOINT = 'https://suno.gcui.ai/api/custom_generate'

export default function MusicArena() {
  const [lyrics, setLyrics] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [instrumental, setInstrumental] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioId, setAudioId] = useState('')
  const [error, setError] = useState('')

  async function generateMusic() {
    setLoading(true)
    setError('')
    setAudioUrl('')
    setAudioId('')
    try {
      const res = await fetch(SUNO_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lyrics,
          tags,
          title,
          prompt,
          make_instrumental: instrumental
        })
      })
      const data = await res.json()
      if(data.id) {
        // 再用 /api/get 拿audio_url
        const urlRes = await fetch(`https://suno.gcui.ai/api/get?id=${data.id}`)
        const urlData = await urlRes.json()
        setAudioId(data.id)
        setAudioUrl(urlData.audio_url || '')
      } else {
        setError('API 音樂生成失敗，請稍後再試或檢查配額！')
      }
    } catch(e:any) {
      setError('出現錯誤：' + (e.message || String(e)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8 mt-8 mb-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">🎵 AI 音樂生成</h2>
      <div className="space-y-4">
        <label>歌詞 (自定義 / 中文/英文/J-Pop)</label>
        <textarea value={lyrics} onChange={e=>setLyrics(e.target.value)} rows={3} className="w-full border rounded p-2" placeholder="如：我在月球上尋找你..."/>
        <label>歌手/風格 (可多選，用逗號分隔)</label>
        <input type="text" value={tags} onChange={e=>setTags(e.target.value)} className="w-full border rounded p-2" placeholder="如：周杰倫,動漫,J-Pop,嘻哈,女聲"/>
        <label>歌曲標題 (選填)</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2" placeholder="如：月夜思念"/>
        <label>Remix/曲風描述 (可加效果或混音)</label>
        <input type="text" value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full border rounded p-2" placeholder="如：古典混現代節奏"/>
        <label>純音樂（無人聲）</label>
        <input type="checkbox" checked={instrumental} onChange={e=>setInstrumental(e.target.checked)} className="mr-2"/><span>啟用純音樂模式</span>
      </div>
      <button onClick={generateMusic} disabled={loading || !lyrics} className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400">{loading ? '🎵 生成中...' : '🚀 生成音樂'}</button>
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      {audioUrl && (
        <div className="mt-6 text-center">
          <audio controls src={audioUrl} className="w-full"/>
          <div className="mt-2"><a href={audioUrl} target="_blank" rel="noopener" className="text-blue-600 underline">下載 mp3</a></div>
        </div>
      )}
      {audioId && (
        <div className="mt-2 text-xs text-gray-500 text-center">音樂ID: {audioId}</div>
      )}
      <div className="border-t mt-8 pt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
        免費配額每天 50 次（需 Suno 帳號），可自定歌詞和所有細節
        <br />原理請見 <a href="https://github.com/gcui-art/suno-api" target="_blank" className="underline text-blue-700">Suno-API GitHub</a>
      </div>
    </div>
  )
}
