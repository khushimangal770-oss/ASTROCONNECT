import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'astroconnect_saved_chats'
const ChatHistoryContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function ChatHistoryProvider({ children }) {
  const [savedChats, setSavedChats] = useState(readStored)

  function persist(next) {
    setSavedChats(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  }

  // called when the user explicitly chooses "Save this chat" as they leave it
  function saveChat(astrologer, messages) {
    const entry = {
      id: `sc_${Date.now()}`,
      astrologerId: astrologer.id,
      astrologerName: astrologer.name,
      messages,
      savedAt: new Date().toISOString(),
    }
    persist([entry, ...savedChats].slice(0, 5)) // keep the 5 most recent
  }

  function discardChat(id) {
    persist(savedChats.filter((c) => c.id !== id))
  }

  // the most recent saved chat that ISN'T with the astrologer the user is
  // about to open — i.e. the one worth offering to "continue" with
  function getOfferableChat(forAstrologerId) {
    return savedChats.find((c) => c.astrologerId !== forAstrologerId) || null
  }

  return (
    <ChatHistoryContext.Provider value={{ savedChats, saveChat, discardChat, getOfferableChat }}>
      {children}
    </ChatHistoryContext.Provider>
  )
}

export function useChatHistory() {
  const ctx = useContext(ChatHistoryContext)
  if (!ctx) throw new Error('useChatHistory must be used inside ChatHistoryProvider')
  return ctx
}
