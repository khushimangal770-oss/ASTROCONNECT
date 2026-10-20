import { numberInfo } from '../data/numerology.js'

// Small badge showing a user's ruling number/planet — e.g. mulank 1 → Sun badge.
export default function NumerologyBadge({ number, size = 'h-7 w-7 text-sm' }) {
  const info = numberInfo[number]
  if (!info) return null

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-ink-line ${size}`}
      style={{ backgroundColor: `${info.color}22`, color: info.color }}
      title={`Mulank ${number} — ruled by ${info.planet} (${info.sanskrit})`}
    >
      {info.glyph}
    </span>
  )
}
