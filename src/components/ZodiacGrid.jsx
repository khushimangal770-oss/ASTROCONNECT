import { ZODIAC } from '../data/astrologers.js'

const TINTS = ['text-pink', 'text-cyan', 'text-gold']

export default function ZodiacGrid() {
  return (
    <div
      className="grid w-full max-w-[300px] grid-cols-4 gap-2.5 justify-self-start md:justify-self-end"
      aria-hidden="true"
    >
      {ZODIAC.map((sign, i) => (
        <span
          key={sign}
          className={`grid aspect-square place-items-center rounded-xl border border-ink-line bg-ink-surface text-lg ${TINTS[i % TINTS.length]}`}
        >
          {sign}
        </span>
      ))}
    </div>
  )
}
