import React, { useState, useRef } from 'react'

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello — start the conversation by typing a question and pressing Send.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  const API = import.meta.env.VITE_API_URL || '/api/chat'

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const resp = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      })
      const data = await resp.json()
      const reply = (data && (data.reply || data.answer || data.text)) || 'No reply (empty response)'
      setMessages(prev => [...prev, { id: Date.now()+1, role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now()+1, role: 'assistant', content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
      setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); sendMessage()
    }
  }

  return (
    <div>
      <div className="space-y-3 max-h-[60vh] overflow-auto mb-4 p-2">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] px-4 py-2 ${m.role === 'user' ? 'bg-brand-500 text-white msg-user' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 msg-assistant'}`}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={listRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={loading ? 'Waiting for response...' : 'Type your message and press Enter'}
          className="flex-1 resize-none p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          rows={2}
          disabled={loading}
        />

        <div className="flex flex-col">
          <button onClick={sendMessage} disabled={loading} className="px-4 py-2 rounded-md bg-brand-500 text-white disabled:opacity-50">
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
