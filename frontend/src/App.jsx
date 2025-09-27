import React from 'react'
import ChatInterface from './components/ChatInterface'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#071017] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-3xl mx-auto p-4">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">AI Chat — Gemma 2 (proxy)</h1>
          <ThemeToggle />
        </header>

        <main className="bg-white/60 dark:bg-black/30 rounded-2xl shadow-md p-4">
          <ChatInterface />
        </main>

        <footer className="mt-4 text-sm text-slate-500 dark:text-slate-400">Built for CS628 — follow the instructions.md to wire Ollama or your LLM.</footer>
      </div>
    </div>
  )
}
