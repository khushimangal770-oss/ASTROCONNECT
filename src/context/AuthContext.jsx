import { createContext, useContext, useState } from 'react'

// NOTE: this is a frontend-only mock. There is no real password or backend —
// "signup" just stores a display name + birth details for the session, enough
// to demo the gated flow and the zodiac-sign lookup.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { name, dob, time, sign }
  const [loginOpen, setLoginOpen] = useState(false)
  const [afterLogin, setAfterLogin] = useState(null) // callback to run once logged in

  function requireLogin(onSuccess) {
    if (user) {
      onSuccess()
      return
    }
    setAfterLogin(() => onSuccess)
    setLoginOpen(true)
  }

  function login(userData) {
    setUser(userData)
    if (afterLogin) {
      afterLogin()
      setAfterLogin(null)
    }
  }

  function closeLogin() {
    setLoginOpen(false)
    setAfterLogin(null)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginOpen, setLoginOpen, login, logout, requireLogin, closeLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
