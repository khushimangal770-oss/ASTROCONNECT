import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'astroconnect_streak'
const StreakContext = createContext(null)

function todayStr() { return new Date().toISOString().slice(0, 10) }
function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function StreakProvider({ children }) {
  const stored = readStored()
  const brokenOrNew = !stored || (stored.lastDate !== todayStr() && stored.lastDate !== yesterdayStr())

  const [streak, setStreak] = useState(brokenOrNew ? 0 : stored.count)
  const [checkedToday, setCheckedToday] = useState(stored?.lastDate === todayStr())

  function checkIn() {
    if (checkedToday) return
    setStreak((prev) => {
      const next = prev + 1
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: next, lastDate: todayStr() }))
      } catch { /* localStorage unavailable — streak just won't persist */ }
      return next
    })
    setCheckedToday(true)
  }

  return (
    <StreakContext.Provider value={{ streak, checkedToday, checkIn }}>
      {children}
    </StreakContext.Provider>
  )
}

export function useStreak() {
  const ctx = useContext(StreakContext)
  if (!ctx) throw new Error('useStreak must be used inside StreakProvider')
  return ctx
}
