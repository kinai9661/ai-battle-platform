'use client'

import { useState, useRef, useEffect } from 'react'

const POLLINATIONS_API = 'https://chat.pollinations.ai/api/chat' // 假定Pollinations AI 聊天API

const TEXT_MODELS = [
  { id: 'flux', label: 'Flux (文字助手)' },
  { id: 'flux-pro', label: 'Flux Pro (進階)' },
  { id: 'turbo', label: 'Turbo (極速)' },
  { id: 'flux-realism', label: 'Flux Realism' },
]

export default function PersonalChat() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [model, setModel] = useState(TEXT_MODELS[0].id)
  const [loading, setLoading] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [imagePreview, setImagePreview] = useState<string|null>(null)
  const [imageFile, setImageFile] = useState<File|null>(null)

  // 滾到最新一則
  useEffect(()=>{
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({behavior:'smooth'})
  },[messages])

  // 上載圖片預覽
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    if(file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }
  function clearImage() {
    setImageFile(null)
    setImagePreview(null)
    if (fileInput.current) fileInput.current.value=''
  }

  async function sendMessage() {
    if (!input && !imageFile) return
    setLoading(true)
    // 新增自己訊息
    const newMsg = { role: 'user', content: input, image: imageFile ? imagePreview : null, time: new Date().toLocaleTimeString() }
    setMessages(msgs=>[...msgs,newMsg])

    let formData = new FormData()
    formData.append('model',model)
    formData.append('message',input)
    if(imageFile) formData.append('image',imageFile)
    try {
      const res = await fetch(POLLINATIONS_API, {
        method:'POST',
        body: formData
      })
      const data = await res.json()
      setMessages(msgs=>[...msgs, { role: 'bot', content: data.reply, image: data.image_url || null, time: new Date().toLocaleTimeString()}])
    } catch(e:any) {
      setMessages(msgs=>[...msgs, {role:'bot',content:'AI 回應失敗，請稍後再試', image:null, time: new Date().toLocaleTimeString()}])
    }
    setInput('')
    setLoading(false)
    clearImage()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && e.ctrlKey && !loading) {
      sendMessage()
    }
  }

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl p-6 max-w-2xl mx-auto mt-12 shadow-2xl min-h-[70vh] flex flex-col" style={{height:'70vh'}}>
      <h2 className="text-2xl font-bold mb-3 text-center">🗣️ 個人 AI 對話（Pollinations API）</h2>
      <div className="mb-2 flex items-center gap-2">
        <select className="bg-gray-800 text-gray-200 border border-gray-700 rounded px-2 py-1" value={model} onChange={e=>setModel(e.target.value)}>
          {TEXT_MODELS.map(m=>(<option key={m.id} value={m.id}>{m.label}</option>))}
        </select>
        <span className="text-xs text-gray-400">（可切換模型）</span>
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-800 rounded-md bg-gray-950 mb-3 px-2 py-2" style={{minHeight:280,height:'45vh'}}> {/* 對話內容 */}
        {messages.length===0 && (
          <div className="text-gray-400 py-8 text-center">對話開始…</div>
        )}
        {messages.map((msg,i)=>(
          <div key={i} className={`flex items-start gap-2 mb-3 ${msg.role==='user'?'justify-end':'justify-start'}`} >
            {msg.role==='bot' && (<div className="bg-gradient-to-tr from-green-700 to-blue-800 h-9 w-9 rounded-full flex items-center justify-center text-white font-bold">AI</div>)}
            <div>
              <div className={`rounded-xl px-4 py-2 max-w-xs break-words whitespace-pre-wrap ${msg.role==='user'?'bg-blue-800 text-white':'bg-gray-900 text-gray-100'}`}>{msg.content}</div>
              {msg.image && <img src={msg.image} alt="上傳圖片" className="mt-1 max-w-[180px] rounded-lg shadow" />}
              <div className="text-xs text-gray-600 mt-1 text-right">{msg.time}</div>
            </div>
            {msg.role==='user' && (<div className="bg-gradient-to-tr from-purple-700 to-blue-900 h-9 w-9 rounded-full flex items-center justify-center text-white font-bold">你</div>)}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex items-end gap-2 pt-2">
        <textarea
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="請輸入訊息，Ctrl+Enter 送出"
          className="flex-1 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white min-h-[40px] max-h-28 resize-y"
          rows={2}
          disabled={loading}
        />
        <input type="file" accept="image/*" style={{display:'none'}} id="chat_file_inp" ref={fileInput} onChange={handleImageChange}/>
        <button className="bg-indigo-600 px-3 py-2 rounded text-white font-bold" onClick={()=>fileInput.current?.click()} disabled={loading}>📷 上傳圖片</button>
        {imagePreview && (<div className="ml-1 relative"><img src={imagePreview} className="w-12 h-12 rounded-lg object-cover inline" alt="預覽" /><button className="absolute top-0 right-0 bg-black/70 text-white text-xs px-1 rounded" onClick={clearImage}>✕</button></div>)}
        <button className="bg-blue-600 px-5 py-2 rounded text-white font-bold" onClick={sendMessage} disabled={loading || (!input && !imageFile)}>{loading?'傳送中…':'送出'}</button>
      </div>
      <div className="text-xs text-gray-400 mt-1">Ctrl+Enter 送出訊息，支持圖片上傳</div>
    </div>
  )
}
