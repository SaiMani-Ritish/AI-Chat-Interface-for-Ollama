import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700"
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  )
}
