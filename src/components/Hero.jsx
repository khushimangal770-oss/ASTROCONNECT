import { astrologers } from '../data/astrologers.js'
import { useAuth } from '../context/AuthContext.jsx'
import { horoscopes } from '../data/horoscope.js'
import { numberInfo } from '../data/numerology.js'
import NumerologyBadge from './NumerologyBadge.jsx'

export default function Hero() {
  const onlineCount = astrologers.filter((a) => a.online).length
  const { user, setLoginOpen } = useAuth()
  const signInfo = user?.sign ? horoscopes.find((h) => h.sign === user.sign) : null

  return (
    <section className="relative overflow-hidden border-b border-ink-line">
      {/* ambient glow background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 right-0 h-[480px] w-[480px] rounded-full bg-violet/25 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-pink/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-surface py-1 pl-1.5 pr-3 text-[13.5px] font-medium text-ink-muted">
            <i className="h-5 w-5 rounded-full bg-brand-gradient" />
            Live readings, every sign welcome
          </span>

          <h1 className="max-w-[13ch] text-4xl leading-[1.06] md:text-6xl">
            Your chart has{' '}
            <span className="bg-brand-gradient-3 bg-clip-text text-transparent">answers</span>.
            We'll help you read them.
          </h1>

          <p className="mt-6 max-w-[42ch] text-lg text-ink-muted">
            Chat with verified astrologers in Hindi, English and more. Filter by
            vibe, language and price, and start talking in a minute.
          </p>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <a href="#astrologers" className="btn-primary">Browse astrologers</a>
            <a href="#how" className="btn-outline">See how it works</a>
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-sm text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_0_4px_rgba(74,242,207,0.18)]" />
            {onlineCount} astrologers online right now
          </div>
        </div>

        <div className="panel p-6">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-2xl">
                  {signInfo?.glyph}
                </span>
                <div>
                  <div className="text-xs text-ink-muted">Welcome back</div>
                  <div className="text-lg text-ink-text">{user.name} · {user.sign}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-muted">
                Today's mood for {user.sign}: <b className="text-ink-text">{signInfo?.mood}</b>. Scroll down to read your full horoscope.
              </p>
              {user.mulank && (
                <div className="mt-4 flex items-center gap-2 border-t border-ink-line pt-4 text-xs text-ink-muted">
                  <NumerologyBadge number={user.mulank} size="h-6 w-6 text-xs" />
                  Mulank {user.mulank} · ruled by {numberInfo[user.mulank].planet}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-1 text-3xl">🔮</div>
              <h2 className="text-xl">Know your sign in 10 seconds</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Create a free account with your date of birth and we'll tell you your
                zodiac sign and nature — no payment needed.
              </p>
              <button className="btn-primary mt-5 w-full" onClick={() => setLoginOpen(true)}>
                Get my sign
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
