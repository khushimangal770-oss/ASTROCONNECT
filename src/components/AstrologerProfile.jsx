import Avatar from './Avatar.jsx'
import ReviewsList from './ReviewsList.jsx'
import StarRating from './StarRating.jsx'

export default function AstrologerProfile({ a, onBack, onChat }) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <button
        className="mb-8 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink-text"
        onClick={onBack}
      >
        ← Back to astrologers
      </button>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar
          src={a.avatar}
          alt={a.name}
          initials={a.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          online={a.online}
          dotSize="h-4 w-4"
          className="h-24 w-24 text-2xl"
        />

        <div className="flex-1">
          <h1 className="text-3xl">{a.name}</h1>
          <p className="mt-1 text-ink-muted">{a.skills.join(' · ')}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5"><StarRating value={a.rating} /> {a.rating}</span>
            <span>{a.exp} yrs experience</span>
            <span>{a.orders.toLocaleString('en-IN')} consultations</span>
            <span>{a.langs.join(', ')}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 sm:min-w-[140px]">
          <div className="font-display text-2xl text-ink-text">
            ₹{a.price}<small className="font-sans text-xs font-normal text-ink-muted">/min</small>
          </div>
          <button className="btn-primary w-full" disabled={!a.online} onClick={() => onChat(a)}>
            {a.online ? 'Chat now' : 'Busy right now'}
          </button>
        </div>
      </div>

      <div className="panel mt-10 p-6">
        <h2 className="mb-5 text-xl">Reviews</h2>
        <ReviewsList astrologerId={a.id} avgRating={a.rating} />
      </div>
    </section>
  )
}
