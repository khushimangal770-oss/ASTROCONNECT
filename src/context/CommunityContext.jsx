import { createContext, useContext, useState } from 'react'
import { initialPosts, pickAiReply } from '../data/posts.js'

const STORAGE_KEY = 'astroconnect_community_posts'
const CommunityContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : initialPosts
  } catch {
    return initialPosts
  }
}

export function CommunityProvider({ children }) {
  const [posts, setPosts] = useState(readStored)

  function persist(next) {
    setPosts(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  }

  // authorName is always the REAL logged-in user's name, even for anonymous
  // posts — `anonymous` just controls what's shown publicly, so the user can
  // still see their own anonymous posts later in their profile.
  function addPost({ category, anonymous, text, authorName }) {
    const newPost = {
      id: `post${Date.now()}`,
      category,
      anonymous,
      author: authorName,
      text,
      time: 'just now',
      aiReply: null,
      replies: [],
    }
    persist([newPost, ...posts])

    setTimeout(() => {
      setPosts((p) => {
        const next = p.map((post) => post.id === newPost.id ? { ...post, aiReply: pickAiReply(category) } : post)
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
        return next
      })
    }, 1400)
  }

  return (
    <CommunityContext.Provider value={{ posts, addPost }}>
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const ctx = useContext(CommunityContext)
  if (!ctx) throw new Error('useCommunity must be used inside CommunityProvider')
  return ctx
}
