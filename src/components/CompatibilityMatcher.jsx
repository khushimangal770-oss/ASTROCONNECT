import { useState } from 'react'
import { computeCompatibility } from '../utils/compatibility.js'
import { numberInfo } from '../data/numerology.js'
import NumerologyBadge from './NumerologyBadge.jsx'

export default function CompatibilityMatcher({ onBrowseAstrologers }) {
  const [name1, setName1] = useState('')
  const [dob1, setDob1] = useState('')
  const [name2, setName2] = useState('')
  const [dob2, setDob2] = useState('')
  const [result, setResult] = useState(null)

  function submit(e) {
    e.preventDefault()
    if (!dob1 || !dob2) return
    setResult(computeCompatibility(dob1, dob2))
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <div className="border-b border-ink-line pb-5 text-center">
        <h1 className="text-3xl">Compatibility matcher</h1>
        <p className="mt-1.5 text-[15px] text-ink-muted">
          A numerology-based match score, just for fun — enter two birth dates and see how your numbers get along.
        </p>
      </div>

      <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="panel space-y-3 p-5">
          <h3 className="text-sm text-ink-muted">Person 1</h3>
          <input
            value={name1} onChange={(e) => setName1(e.target.value)} placeholder="Name"
            className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
          />
          <input
            type="date" value={dob1} onChange={(e) => setDob1(e.target.value)} required
            className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
          />
        </div>

        <div className="panel space-y-3 p-5">
          <h3 className="text-sm text-ink-muted">Person 2</h3>
          <input
            value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Name"
            className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
          />
          <input
            type="date" value={dob2} onChange={(e) => setDob2(e.target.value)} required
            className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
          />
        </div>

        <button type="submit" className="btn-primary sm:col-span-2" disabled={!dob1 || !dob2}>
          Check compatibility
        </button>
      </form>

      {result && (
        <div className="panel mt-7 p-7 text-center">
          <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-brand-gradient">
            <span className="font-display text-4xl text-white">{result.overall}%</span>
          </div>
          <p className="text-ink-text">{result.verdict}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-left">
            <div className="rounded-xl border border-ink-line p-4">
              <div className="mb-2 flex items-center gap-2">
                <NumerologyBadge number={result.m1} />
                <span className="text-sm text-ink-text">{name1 || 'Person 1'}</span>
              </div>
              <p className="text-xs text-ink-muted">
                Mulank {result.m1} · {numberInfo[result.m1].planet} energy
              </p>
            </div>
            <div className="rounded-xl border border-ink-line p-4">
              <div className="mb-2 flex items-center gap-2">
                <NumerologyBadge number={result.m2} />
                <span className="text-sm text-ink-text">{name2 || 'Person 2'}</span>
              </div>
              <p className="text-xs text-ink-muted">
                Mulank {result.m2} · {numberInfo[result.m2].planet} energy
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-24 text-left">Mulank match</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-surface2">
                <div className="h-full bg-brand-gradient" style={{ width: `${result.mulankScore}%` }} />
              </div>
              <span className="w-10 text-right">{result.mulankScore}%</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-24 text-left">Bhagyank match</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-surface2">
                <div className="h-full bg-brand-gradient" style={{ width: `${result.bhagyankScore}%` }} />
              </div>
              <span className="w-10 text-right">{result.bhagyankScore}%</span>
            </div>
          </div>

          <button className="btn-outline mt-6" onClick={onBrowseAstrologers}>
            Talk to an astrologer about this
          </button>
        </div>
      )}
    </section>
  )
}
