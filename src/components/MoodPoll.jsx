import { useState } from 'react'

const MOODS = [
  { key: 'hopeful', emoji: '😊', label: 'Hopeful', base: 142 },
  { key: 'stressed', emoji: '😟', label: 'Stressed', base: 98 },
  { key: 'calm', emoji: '😌', label: 'Calm', base: 76 },
  { key: 'confused', emoji: '🤔', label: 'Confused', base: 54 },
  { key: 'excited', emoji: '😄', label: 'Excited', base: 61 },
]

export default function MoodPoll() {
  const [voted, setVoted] = useState(null)
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(MOODS.map((m) => [m.key, m.base]))
  )

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  function vote(key) {
    if (voted) return
    setCounts((c) => ({ ...c, [key]: c[key] + 1 }))
    setVoted(key)
  }

  return (
    <div className="panel mb-8 p-6">
      <h3 className="text-lg text-ink-text">Mood of the day</h3>
      <p className="mt-1 text-xs text-ink-muted">
        {voted ? `${total.toLocaleString('en-IN')} people have shared how they feel today.` : 'How are you feeling today? Tap one.'}
      </p>

      {!voted ? (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => vote(m.key)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-ink-line py-3 text-xs text-ink-muted hover:border-violet hover:text-ink-text"
            >
              <span className="text-xl">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {MOODS.map((m) => {
            const pct = Math.round((counts[m.key] / total) * 100)
            return (
              <div key={m.key} className="flex items-center gap-2 text-xs text-ink-muted">
                <span className="w-24 shrink-0">{m.emoji} {m.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-surface2">
                  <div
                    className={`h-full ${voted === m.key ? 'bg-brand-gradient' : 'bg-ink-line'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 text-right">{pct}%</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
