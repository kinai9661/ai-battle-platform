'use client'

import { useState, useEffect } from 'react'

interface SunoAccount {
  cookie: string
  label: string
  quota?: number
}

const SUNO_API_ENDPOINT = 'https://suno.gcui.ai/api/custom_generate'
const SUNO_API_QUOTA_ENDPOINT = 'https://suno.gcui.ai/api/userinfo'

export default function MusicArena() {
  // 多帳號管理
  const [accounts, setAccounts] = useState<SunoAccount[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [newCookie, setNewCookie] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [instrumental, setInstrumental] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioId, setAudioId] = useState('')
  const [error, setError] = useState('')

  // 讀取帳戶資料（本地localStorage）
  useEffect(() => {
    const accStr = localStorage.getItem('suno_accounts')
    if (accStr) {
      setAccounts(JSON.parse(accStr) as SunoAccount[])
    } else {
      setAccounts([])
    }
  }, [])

  // 寫入帳戶資料
  useEffect(() => {
    localStorage.setItem('suno_accounts', JSON.stringify(accounts))
  }, [accounts])

  // 取得配額（quota）
  useEffect(() => {
    if(accounts.length === 0) return
    const cookie = accounts[activeIdx]?.cookie
    if (!cookie) return
    fetch(SUNO_API_QUOTA_ENDPOINT, {
      method: 'GET',
      headers: { 'Cookie': cookie }
    })
      .then(res => res.json())
      .then(data => {
        let quota = data?.quota ?? 50
        let updated = accounts.map((acc, idx) => idx === activeIdx ? ({...acc, quota}) : acc)
        setAccounts(updated)
      }).catch()
  }, [activeIdx, accounts.length])

  async function generateMusic() {
    setLoading(true)
    setError('')
    setAudioUrl('')
    setAudioId('')
    try {
      const cookie = accounts[activeIdx]?.cookie
      const res = await fetch(SUNO_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(cookie ? { 'Cookie': cookie } : {})
        },
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

  // 新增帳號
  function addAccount() {
    if (newCookie && newLabel) {
      setAccounts([...accounts, { cookie: newCookie.trim(), label: newLabel.trim() }])
      setNewCookie(''); setNewLabel('')
    }
  }

  // 刪除帳號
  function removeAccount(idx:number) {
    setAccounts(accounts.filter((_, i) => i !== idx))
    if (activeIdx === idx) setActiveIdx(0)
  }

  // 切換帳號
  function selectAccount(idx:number) {
    setActiveIdx(idx)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8 mt-8 mb-16">
      <h2 className="text-3xl font-bold mb-3 text-center text-gray-800 dark:text-white">🎵 AI 音樂生成</h2>
      <div className="space-y-2 mb-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900 p-3">
          <div className="text-base font-medium mb-2">Suno 帳戶管理</div>
          <div className="flex gap-1 flex-wrap items-center">
            {accounts.map((acc, idx) => (
              <div key={acc.label + idx} className={`px-3 py-1 rounded-lg border ${activeIdx===idx?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'} cursor-pointer hover:bg-blue-500 hover:text-white transition`} onClick={()=>selectAccount(idx)}>
                {acc.label} {acc.quota!==undefined && (`｜ 今日免費額度剩餘：${acc.quota}`)}
                <span onClick={e => {e.stopPropagation(); removeAccount(idx)}} title="刪除" className="ml-2 text-xs cursor-pointer text-red-400">✕</span>
              </div>
            ))}
            <div className="px-3 py-1 rounded-lg border bg-green-100 text-green-800 cursor-pointer" onClick={()=>{document.getElementById('add_account_form')?.scrollIntoView({behavior:'smooth'})}}>＋ 新增</div>
          </div>
        </div>
        <div id="add_account_form" className="flex gap-2 mt-2 items-center">
          <input type="text" value={newLabel} onChange={e=>setNewLabel(e.target.value)} placeholder="帳號暱稱" className="border rounded px-2 py-1 w-32"/>
          <input type="text" value={newCookie} onChange={e=>setNewCookie(e.target.value)} placeholder="貼上Suno帳號Cookie" className="border rounded px-2 py-1 flex-1"/>
          <button onClick={addAccount} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">加入</button>
        </div>
        <div className="text-xs text-gray-500 mt-1">Cookie取得步驟見 <a href="https://github.com/gcui-art/suno-api#how-to-get-cookie" target="_blank" className="underline">GitHub教學</a>，每帳號每天約有50次免費生成。</div>
      </div>
      <div className="space-y-4">
        <label>歌詞 (自定義，中文/英文/J-Pop)</label>
        <textarea value={lyrics} onChange={e=>setLyrics(e.target.value)} rows={3} className="w-full border rounded p-2" placeholder="如：我在月球上尋找你..."/>
        <label>歌手/風格 (逗號分隔)</label>
        <input type="text" value={tags} onChange={e=>setTags(e.target.value)} className="w-full border rounded p-2" placeholder="如：周杰倫,動漫,J-Pop"/>
        <label>歌曲標題 (選填)</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2" placeholder="如：月夜思念"/>
        <label>Remix/曲風描述</label>
        <input type="text" value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full border rounded p-2" placeholder="如：古典混現代節奏"/>
        <label>純音樂（無人聲）</label>
        <input type="checkbox" checked={instrumental} onChange={e=>setInstrumental(e.target.checked)} className="mr-2"/><span>啟用純音樂模式</span>
      </div>
      <button onClick={generateMusic} disabled={loading || !lyrics || accounts.length===0} className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400">{loading ? '🎵 生成中...' : '🚀 生成音樂'}</button>
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
        <span>支援多帳號切換，能夠讀取當前帳號今日免費配額餘額</span><br/>
        取得 cookie 步驟、詳情請參考 <a href="https://github.com/gcui-art/suno-api" target="_blank" className="underline">Suno API 開源教學</a>
      </div>
    </div>
  )
}
