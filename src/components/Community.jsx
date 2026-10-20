import { useState } from 'react'
import { POST_CATEGORIES } from '../data/posts.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useCommunity } from '../context/CommunityContext.jsx'
import NewPostForm from './NewPostForm.jsx'
import MoodPoll from './MoodPoll.jsx'

function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)
  const visibleReplies = expanded ? post.replies : post.replies.slice(0, 1)

  return (
    <div className="panel p-6">
      <div className="flex items-center gap-2.5 text-sm">
        <span className="rounded-full border border-ink-line px-2.5 py-0.5 text-xs text-ink-muted">{post.category}</span>
        <span className="font-medium text-ink-text">{post.anonymous ? 'Anonymous' : post.author}</span>
        <span className="ml-auto text-xs text-ink-muted">{post.time}</span>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-ink-text">{post.text}</p>

      {post.aiReply && (
        <div className="mt-4 rounded-xl border border-violet/30 bg-violet/10 p-4">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-violet">
            <span className="h-4 w-4 rounded-full bg-brand-gradient" /> AI Astro
            <span className="font-normal text-ink-muted">· AI-generated, not a substitute for a real reading</span>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{post.aiReply}</p>
        </div>
      )}

      {post.replies.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-ink-line pt-4">
          {visibleReplies.map((r) => (
            <div key={r.id} className="flex gap-3 text-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink-text">{r.author}</span>
                  {r.isAstrologer && (
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[11px] text-cyan">Astrologer</span>
                  )}
                </div>
                <p className="mt-0.5 text-ink-muted">{r.text}</p>
              </div>
              <div className="shrink-0 text-xs text-ink-muted">▲ {r.upvotes}</div>
            </div>
          ))}
          {post.replies.length > 1 && (
            <button className="text-xs text-violet hover:underline" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show less' : `View ${post.replies.length - 1} more ${post.replies.length - 1 === 1 ? 'reply' : 'replies'}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function Community() {
  const { user, requireLogin } = useAuth()
  const { posts, addPost } = useCommunity()
  const [category, setCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)

  function handleAskClick() {
    requireLogin(() => setShowForm(true))
  }

  function handleNewPost({ category: cat, anonymous, text }) {
    addPost({ category: cat, anonymous, text, authorName: user.name })
    setShowForm(false)
  }

  const list = category === 'All' ? posts : posts.filter((p) => p.category === category)

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <div className="border-b border-ink-line pb-5">
        <h1 className="text-3xl">Community</h1>
        <p className="mt-1.5 text-[15px] text-ink-muted">
          Ask something you're going through. Get an instant AI Astro take, and real replies from
          people and astrologers who've been there.
        </p>
      </div>

      <div className="mt-6">
        <MoodPoll />
      </div>

      <div className="my-6 flex flex-wrap items-center gap-5 border-b border-ink-line pb-4.5">
        <button className="chip" aria-pressed={category === 'All'} onClick={() => setCategory('All')}>All</button>
        {POST_CATEGORIES.map((c) => (
          <button key={c} className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
        ))}
        <button className="btn-primary ml-auto !px-4 !py-1.5 !text-xs" onClick={handleAskClick}>
          Ask the community
        </button>
      </div>

      {showForm && <NewPostForm onSubmit={handleNewPost} onClose={() => setShowForm(false)} />}

      <div className="space-y-5">
        {list.length === 0 ? (
          <p className="py-10 text-center text-ink-muted">No posts in this category yet.</p>
        ) : (
          list.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </section>
  )
}
