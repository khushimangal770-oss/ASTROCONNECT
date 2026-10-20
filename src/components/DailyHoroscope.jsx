import { useState } from 'react'
import { horoscopes } from '../data/horoscope.js'
import { useStreak } from '../context/StreakContext.jsx'

export default function DailyHoroscope() {
  const [active, setActive] = useState(null)
  const { streak, checkedToday, checkIn } = useStreak()
  const current = horoscopes.find((h) => h.sign === active)

  function handlePick(sign) {
    setActive(sign === active ? null : sign)
    checkIn()
  }

  return (
    <section className="border-t border-ink-line bg-ink-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-baseline">
          <h2 className="text-3xl">Today's horoscope</h2>
          <p className="text-sm text-ink-muted">
            {checkedToday ? (
              <span>🔥 {streak}-day streak — you've checked in today</span>
            ) : (
              "Tap your sign for today's reading"
            )}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-12">
          {horoscopes.map((h) => (
            <button
              key={h.sign}
              onClick={() => handlePick(h.sign)}
              aria-pressed={active === h.sign}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3.5 text-xs transition-colors ${
                active === h.sign
                  ? 'border-violet bg-ink text-ink-text'
                  : 'border-ink-line bg-ink text-ink-muted hover:border-violet/60'
              }`}
            >
              <span className="text-xl">{h.glyph}</span>
              {h.sign}
            </button>
          ))}
        </div>

        {current && (
          <div className="panel mt-7 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl">{current.glyph}</span>
              <div>
                <h3 className="text-xl text-ink-text">{current.sign}</h3>
                <p className="text-xs text-ink-muted">{current.dates}</p>
              </div>
              <div className="ml-auto flex gap-5 text-xs text-ink-muted">
                <span>Mood <b className="block text-sm text-ink-text">{current.mood}</b></span>
                <span>Lucky color <b className="block text-sm text-ink-text">{current.color}</b></span>
                <span>Lucky number <b className="block text-sm text-ink-text">{current.luckyNumber}</b></span>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{current.reading}</p>
          </div>
        )}
      </div>
    </section>
  )
}
