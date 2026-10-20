import { useWallet } from '../context/WalletContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useStreak } from '../context/StreakContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import NumerologyBadge from './NumerologyBadge.jsx'

export default function Navbar({ onNavigate }) {
  const { balance, openRecharge } = useWallet()
  const { count, setCartOpen } = useCart()
  const { user, setLoginOpen } = useAuth()
  const { streak } = useStreak()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-ink-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 font-display text-lg font-bold text-ink-text">
          <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#FF5FD8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#navGrad)" opacity="0.25" />
            <path d="M50 15V35M35 50H65M50 65V85" stroke="url(#navGrad)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="url(#navGrad)" />
          </svg>
          AstroConnect
        </button>

        <nav className="ml-1 hidden gap-5 text-sm text-ink-muted lg:flex">
          <button onClick={() => onNavigate('home')} className="hover:text-ink-text">Astrologers</button>
          <button onClick={() => onNavigate('match')} className="hover:text-ink-text">Match</button>
          <button onClick={() => onNavigate('store')} className="hover:text-ink-text">Store</button>
          <button onClick={() => onNavigate('community')} className="hover:text-ink-text">Community</button>
        </nav>

        <div className="flex-1" />

        <button
          onClick={toggleTheme}
          className="rounded-full border border-ink-line bg-ink-surface p-2.5 text-ink-muted hover:text-ink-text"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {streak > 0 && (
          <span className="hidden items-center gap-1 rounded-full border border-ink-line bg-ink-surface px-2.5 py-1 text-xs text-ink-muted sm:flex">
            🔥 <b className="text-ink-text">{streak}</b>
          </span>
        )}

        <button
          onClick={() => setCartOpen(true)}
          className="relative rounded-full border border-ink-line bg-ink-surface p-2.5 text-ink-muted hover:text-ink-text"
          aria-label="Open cart"
        >
          🛍️
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-brand-gradient px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-surface py-1.5 pl-4 pr-1.5 text-sm">
          <span className="text-ink-muted">Wallet</span>
          <b className="text-cyan">₹{balance.toFixed(2)}</b>
          <button className="btn-primary !px-4 !py-1.5 !text-xs" onClick={() => openRecharge()}>
            Recharge
          </button>
        </div>

        {user ? (
          <button
            onClick={() => onNavigate('profile')}
            className="relative hidden h-8 w-8 items-center justify-center rounded-full bg-ink-surface2 text-xs font-semibold text-ink-text sm:flex"
            title={`${user.name} — view profile`}
          >
            {user.name[0].toUpperCase()}
            {user.mulank && (
              <span className="absolute -bottom-1 -right-1">
                <NumerologyBadge number={user.mulank} size="h-4 w-4 text-[9px]" />
              </span>
            )}
          </button>
        ) : (
          <button onClick={() => setLoginOpen(true)} className="btn-outline hidden !px-4 !py-1.5 !text-xs sm:inline-flex">
            Login
          </button>
        )}
      </div>
    </header>
  )
}
