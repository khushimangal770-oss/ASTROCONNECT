import Avatar from './Avatar.jsx'

export default function AstrologerCard({ a, onChat, onSelect }) {
  return (
    <article className="grid grid-cols-[56px_1fr] items-center gap-5 border-b border-ink-line py-6 first:pt-2 sm:grid-cols-[78px_1fr_auto]">
      <button onClick={() => onSelect(a)} aria-label={`View ${a.name}'s profile and reviews`}>
        <Avatar
          src={a.avatar}
          alt={a.name}
          initials={a.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          online={a.online}
          className="h-14 w-14 sm:h-[78px] sm:w-[78px]"
        />
      </button>

      <div>
        <button className="text-left" onClick={() => onSelect(a)}>
          <h3 className="text-xl text-ink-text hover:text-violet">{a.name}</h3>
        </button>
        <p className="mt-0.5 text-sm text-ink-muted">{a.skills.join(', ')}</p>
        <div className="mt-2.5 flex flex-wrap gap-x-4.5 gap-y-1 text-xs text-ink-muted">
          <button className="hover:text-ink-text" onClick={() => onSelect(a)}>
            <span className="text-gold">★</span> {a.rating} · reviews
          </button>
          <span>{a.exp} yrs experience</span>
          <span>{a.orders.toLocaleString('en-IN')} consultations</span>
          <span>{a.langs.join(', ')}</span>
        </div>
      </div>

      <div className="col-span-2 mt-3.5 flex items-center justify-between gap-2 sm:col-span-1 sm:mt-0 sm:min-w-[128px] sm:flex-col sm:items-end sm:justify-start sm:text-right">
        <div className="font-display text-xl text-ink-text">
          ₹{a.price}<small className="font-sans text-xs font-normal text-ink-muted">/min</small>
        </div>
        <div className={`text-xs ${a.online ? 'text-cyan' : 'text-busy'}`}>
          {a.online ? 'Online now' : 'Busy, wait ~10 min'}
        </div>
        <button
          className="btn-primary !px-4 !py-1.5 !text-xs"
          disabled={!a.online}
          onClick={() => onChat(a)}
        >
          Chat now
        </button>
      </div>
    </article>
  )
}
