import { useMemo, useState } from 'react'
import StarRating from './StarRating.jsx'
import { reviews as allReviews, ratingBreakdown } from '../data/reviews.js'

export default function ReviewsList({ astrologerId, avgRating }) {
  const [sort, setSort] = useState('helpful')
  const list = allReviews[astrologerId] || []
  const breakdown = useMemo(() => ratingBreakdown(list), [list])

  const sorted = useMemo(() => {
    const copy = [...list]
    if (sort === 'helpful') copy.sort((a, b) => b.rating - a.rating)
    // 'recent' keeps the original mock order, which is already newest-first
    return copy
  }, [list, sort])

  return (
    <div>
      <div className="flex flex-col gap-8 border-b border-ink-line pb-8 sm:flex-row sm:items-center">
        <div className="text-center sm:border-r sm:border-ink-line sm:pr-8">
          <div className="font-display text-5xl text-ink-text">{avgRating}</div>
          <StarRating value={avgRating} size="text-base" />
          <div className="mt-1 text-xs text-ink-muted">{list.length} reviews</div>
        </div>

        <div className="flex-1 space-y-1.5">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-10">{b.star} star</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-surface2">
                <div className="h-full bg-brand-gradient" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-8 text-right">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-5 flex gap-5 text-sm">
        <button
          className={`border-b-2 pb-1 font-medium ${sort === 'helpful' ? 'border-pink text-ink-text' : 'border-transparent text-ink-muted'}`}
          onClick={() => setSort('helpful')}
        >
          Most helpful
        </button>
        <button
          className={`border-b-2 pb-1 font-medium ${sort === 'recent' ? 'border-pink text-ink-text' : 'border-transparent text-ink-muted'}`}
          onClick={() => setSort('recent')}
        >
          Recent
        </button>
      </div>

      <div className="space-y-5">
        {sorted.length === 0 ? (
          <p className="text-sm text-ink-muted">No reviews yet for this astrologer.</p>
        ) : (
          sorted.map((r) => (
            <div key={r.id} className="border-b border-ink-line pb-5 last:border-0">
              <div className="flex items-center gap-2.5">
                <span className="font-medium text-ink-text">{r.name}</span>
                {r.verified && (
                  <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[11px] text-cyan">
                    Verified consultation
                  </span>
                )}
                <span className="ml-auto text-xs text-ink-muted">{r.date}</span>
              </div>
              <div className="mt-1.5"><StarRating value={r.rating} /></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
