import { useEffect, useRef, useState } from 'react'
import { astrologers, initials } from '../data/astrologers.js'
import { products } from '../data/products.js'
import { ASSISTANT_CATEGORIES, assistantGuidance } from '../data/assistant.js'
import Avatar from './Avatar.jsx'
import ProductImage from './ProductImage.jsx'

function bestAstrologers(skills) {
  const pool = skills.length
    ? astrologers.filter((a) => a.skills.some((s) => skills.includes(s)))
    : astrologers
  return [...pool].sort((a, b) => b.rating - a.rating).slice(0, 2)
}

export default function AssistantWidget({ onChatWithAstrologer, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', type: 'text', text: "Hi! I'm your AI Astro Assistant 👋 What's on your mind today?" },
    { from: 'bot', type: 'categories' },
  ])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  // greet shortly after the app loads, on any page
  useEffect(() => {
    const t = setTimeout(() => setShowTeaser(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing, open])

  function openPanel() {
    setOpen(true)
    setShowTeaser(false)
  }

  function respondTo(category) {
    setMessages((m) => [...m, { from: 'me', type: 'text', text: category }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const g = assistantGuidance[category]
      const picks = bestAstrologers(g.skills)
      const product = products.find((p) => p.id === g.productId)
      setMessages((m) => [
        ...m,
        { from: 'bot', type: 'text', text: g.reply },
        { from: 'bot', type: 'astrologers', items: picks },
        { from: 'bot', type: 'product', item: product },
      ])
    }, 1200 + Math.random() * 800)
  }

  function sendFreeText(text) {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'me', type: 'text', text: text.trim() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { from: 'bot', type: 'text', text: "Got it — which of these feels closest to what's going on?" },
        { from: 'bot', type: 'categories' },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTeaser && !open && (
        <div className="panel relative w-64 p-4 text-sm">
          <button
            className="absolute right-2 top-2 text-ink-muted hover:text-ink-text"
            onClick={() => setShowTeaser(false)}
            aria-label="Dismiss"
          >
            ✕
          </button>
          <p className="pr-4 text-ink-text">
            Not sure who to talk to? Tell me what's going on and I'll point you the right way.
          </p>
          <button className="btn-primary mt-3 w-full !py-1.5 !text-xs" onClick={openPanel}>
            Chat with AI Astro
          </button>
        </div>
      )}

      {open && (
        <div className="panel flex h-[min(520px,70vh)] w-[min(360px,92vw)] flex-col overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-ink-line p-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm">🔮</span>
            <strong className="text-sm text-ink-text">AI Astro Assistant</strong>
            <button className="ml-auto rounded-lg p-1.5 text-ink-muted hover:bg-ink-surface2" onClick={() => setOpen(false)} aria-label="Close assistant">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-ink p-3.5">
            {messages.map((m, i) => {
              if (m.type === 'categories') {
                return (
                  <div key={i} className="flex flex-wrap gap-1.5">
                    {ASSISTANT_CATEGORIES.map((c) => (
                      <button
                        key={c}
                        className="rounded-full border border-ink-line px-3 py-1 text-xs text-ink-muted hover:border-violet hover:text-ink-text"
                        onClick={() => respondTo(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )
              }
              if (m.type === 'astrologers') {
                return (
                  <div key={i} className="space-y-2">
                    {m.items.map((a) => (
                      <div key={a.id} className="flex items-center gap-2.5 rounded-xl border border-ink-line p-2.5">
                        <Avatar src={a.avatar} alt={a.name} initials={initials(a.name)} className="h-9 w-9 text-xs" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs text-ink-text">{a.name}</div>
                          <div className="text-[10.5px] text-ink-muted">★ {a.rating} · ₹{a.price}/min</div>
                        </div>
                        <button
                          className="btn-primary !px-3 !py-1 !text-[11px]"
                          onClick={() => { onChatWithAstrologer(a); setOpen(false) }}
                        >
                          Chat
                        </button>
                      </div>
                    ))}
                  </div>
                )
              }
              if (m.type === 'product' && m.item) {
                return (
                  <div key={i} className="flex items-center gap-2.5 rounded-xl border border-violet/30 bg-violet/5 p-2.5">
                    <ProductImage src={m.item.image} alt={m.item.name} glyph={m.item.glyph} className="h-9 w-9 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs text-ink-text">{m.item.name}</div>
                      <div className="text-[10.5px] text-ink-muted">₹{m.item.price.toLocaleString('en-IN')} · remedy</div>
                    </div>
                    <button className="btn-outline !px-3 !py-1 !text-[11px]" onClick={() => { onNavigate('store'); setOpen(false) }}>
                      View
                    </button>
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    m.from === 'me'
                      ? 'ml-auto rounded-br-md bg-brand-gradient text-white'
                      : 'rounded-bl-md border border-ink-line bg-ink-surface2 text-ink-text'
                  }`}
                >
                  {m.text}
                </div>
              )
            })}
            {typing && <div className="pl-1 text-[11px] text-ink-muted">Thinking…</div>}
          </div>

          <form className="flex gap-2 border-t border-ink-line p-3" onSubmit={(e) => { e.preventDefault(); sendFreeText(input) }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              className="flex-1 rounded-xl border border-ink-line bg-ink-surface2 px-3 py-2 text-xs text-ink-text outline-none focus:border-violet"
            />
            <button type="submit" className="btn-primary !px-3.5 !py-2 !text-xs">Send</button>
          </form>
        </div>
      )}

      {!open && (
        <button
          onClick={openPanel}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-2xl shadow-glow"
          aria-label="Open AI Astro Assistant"
        >
          🔮
        </button>
      )}
    </div>
  )
}
