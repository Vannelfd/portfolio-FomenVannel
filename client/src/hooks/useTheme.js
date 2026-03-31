import { useState, useEffect } from 'react'

function useTheme() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode(!darkMode)

  return { darkMode, toggleTheme }
}

export default useTheme