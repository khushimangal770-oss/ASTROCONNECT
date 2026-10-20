import { useState } from 'react'
import { POST_CATEGORIES } from '../data/posts.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function NewPostForm({ onSubmit, onClose }) {
  const { user } = useAuth()
  const [category, setCategory] = useState('Career')
  const [anonymous, setAnonymous] = useState(false)
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit({ category, anonymous, text: text.trim() })
    setText('')
  }

  return (
    <div className="panel mb-8 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg text-ink-text">Share your problem</h3>
        <button className="text-sm text-ink-muted hover:text-ink-text" onClick={onClose}>Close</button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {POST_CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              className={`rounded-full border px-3.5 py-1.5 text-xs ${
                category === c ? 'border-pink text-ink-text' : 'border-ink-line text-ink-muted'
              }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="What's on your mind? Be as specific as you're comfortable with."
          className="w-full resize-none rounded-xl border border-ink-line bg-ink px-4 py-3 text-sm text-ink-text outline-none focus:border-violet"
        />

        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="h-4 w-4 rounded border-ink-line accent-violet-dark"
          />
          Post anonymously (your name won't be shown, only "Anonymous")
        </label>

        <div className="text-xs text-ink-muted">
          Posting as <b className="text-ink-text">{anonymous ? 'Anonymous' : user?.name}</b> · AI Astro will reply instantly, and other users can reply too.
        </div>

        <button type="submit" className="btn-primary" disabled={!text.trim()}>Post to community</button>
      </form>
    </div>
  )
}
