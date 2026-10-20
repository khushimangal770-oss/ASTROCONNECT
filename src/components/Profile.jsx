import { useAuth } from '../context/AuthContext.jsx'
import { useCommunity } from '../context/CommunityContext.jsx'
import NumerologyBadge from './NumerologyBadge.jsx'
import { horoscopes } from '../data/horoscope.js'

export default function Profile({ onNavigate }) {
  const { user, logout } = useAuth()
  const { posts } = useCommunity()

  if (!user) {
    return (
      <section className="mx-auto max-w-md px-5 py-20 text-center">
        <p className="text-ink-muted">You're not logged in.</p>
        <button className="btn-primary mt-4" onClick={() => onNavigate('home')}>Go home</button>
      </section>
    )
  }

  const myPosts = posts.filter((p) => p.author === user.name)
  const signInfo = user.sign ? horoscopes.find((h) => h.sign === user.sign) : null

  return (
    <section className="mx-auto max-w-2xl px-5 py-14">
      <div className="panel p-7 text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-3xl">
          {signInfo?.glyph || user.name[0].toUpperCase()}
        </div>
        <h1 className="text-2xl">{user.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {user.sign}{user.sign ? ' · ' : ''}Mulank {user.mulank} · Bhagyank {user.bhagyank}
        </p>

        <div className="mt-5 flex justify-center gap-4">
          <NumerologyBadge number={user.mulank} size="h-9 w-9 text-base" />
          <NumerologyBadge number={user.bhagyank} size="h-9 w-9 text-base" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2 text-left text-sm sm:grid-cols-3">
          <div className="rounded-xl border border-ink-line p-3">
            <div className="text-xs text-ink-muted">Date of birth</div>
            <div className="text-ink-text">{user.dob || '—'}</div>
          </div>
          <div className="rounded-xl border border-ink-line p-3">
            <div className="text-xs text-ink-muted">Time of birth</div>
            <div className="text-ink-text">{user.time || 'Not shared'}</div>
          </div>
          <div className="rounded-xl border border-ink-line p-3">
            <div className="text-xs text-ink-muted">Place of birth</div>
            <div className="text-ink-text">{user.place || 'Not shared'}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          These details are shared automatically when you start a chat, so you don't have to
          retype them for every astrologer.
        </p>

        <button className="btn-outline mt-6" onClick={() => { logout(); onNavigate('home') }}>
          Log out
        </button>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl">My community posts</h2>
        {myPosts.length === 0 ? (
          <p className="text-sm text-ink-muted">You haven't posted in the community yet.</p>
        ) : (
          <div className="space-y-3">
            {myPosts.map((p) => (
              <div key={p.id} className="panel p-4">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <span className="rounded-full border border-ink-line px-2 py-0.5">{p.category}</span>
                  {p.anonymous && <span>Posted anonymously</span>}
                  <span className="ml-auto">{p.time}</span>
                </div>
                <p className="mt-2 text-sm text-ink-text">{p.text}</p>
              </div>
            ))}
          </div>
        )}
        <button className="mt-3 text-sm text-violet hover:underline" onClick={() => onNavigate('community')}>
          Go to Community →
        </button>
      </div>
    </section>
  )
}
