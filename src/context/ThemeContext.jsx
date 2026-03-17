import { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = {
  green: {
    id: 'green',
    name: 'Matrix',
    preview: ['#020e06', '#00ff88', '#00cc66'],
  },
  blue: {
    id: 'blue',
    name: 'Ocean',
    preview: ['#0a1628', '#6366f1', '#06b6d4'],
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ipad-theme') || 'green'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ipad-theme', theme)
  }, [theme])

  // Apply initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
