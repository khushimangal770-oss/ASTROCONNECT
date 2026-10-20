import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getZodiacFromDob } from '../utils/zodiac.js'
import { getMulank, getBhagyank } from '../utils/numerology.js'
import { zodiacTraits } from '../data/zodiacTraits.js'
import { numberInfo } from '../data/numerology.js'
import { horoscopes } from '../data/horoscope.js'
import NumerologyBadge from './NumerologyBadge.jsx'

export default function LoginModal() {
  const { loginOpen, closeLogin, login } = useAuth()
  const [step, setStep] = useState('form') // 'form' | 'result'
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [computed, setComputed] = useState(null) // { sign, mulank, bhagyank }

  if (!loginOpen) return null

  function handleReset() {
    setStep('form'); setName(''); setDob(''); setTime(''); setPlace(''); setComputed(null)
  }

  function submitDetails(e) {
    e.preventDefault()
    if (!name.trim() || !dob) return
    setComputed({
      sign: getZodiacFromDob(dob),
      mulank: getMulank(dob),
      bhagyank: getBhagyank(dob),
    })
    setStep('result')
  }

  function confirm() {
    login({ name: name.trim(), dob, time, place: place.trim(), ...computed })
    handleReset()
  }

  function skipForNow() {
    closeLogin()
    handleReset()
  }

  const signInfo = computed ? horoscopes.find((h) => h.sign === computed.sign) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
      <div className="panel w-[min(420px,92vw)] max-h-[90vh] overflow-y-auto p-7">
        {step === 'form' ? (
          <>
            <h2 id="loginTitle" className="text-2xl">Create your account</h2>
            <p className="mb-5 mt-1 text-sm text-ink-muted">
              This is a demo — no password needed. Share your birth details and we'll tell you
              your zodiac sign, mulank and bhagyank.
            </p>
            <form onSubmit={submitDetails} className="space-y-4">
              <div>
                <label htmlFor="suName" className="mb-1.5 block text-xs text-ink-muted">Your name</label>
                <input
                  id="suName" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya" autoFocus required
                  className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
                />
              </div>
              <div>
                <label htmlFor="suDob" className="mb-1.5 block text-xs text-ink-muted">Date of birth</label>
                <input
                  id="suDob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required
                  className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
                />
              </div>
              <div>
                <label htmlFor="suTime" className="mb-1.5 block text-xs text-ink-muted">
                  Time of birth <span className="text-ink-muted/70">(optional — for a detailed chart later)</span>
                </label>
                <input
                  id="suTime" type="time" value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
                />
              </div>
              <div>
                <label htmlFor="suPlace" className="mb-1.5 block text-xs text-ink-muted">
                  Place of birth <span className="text-ink-muted/70">(optional)</span>
                </label>
                <input
                  id="suPlace" value={place} onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
                />
              </div>
              <p className="text-xs text-ink-muted">
                Once saved, these details are shared automatically whenever you chat with an
                astrologer — you won't need to type them again.
              </p>
              <button type="submit" className="btn-primary w-full" disabled={!name.trim() || !dob}>
                Calculate my numbers
              </button>
              <button type="button" className="btn-outline w-full" onClick={skipForNow}>Cancel</button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-3xl">
                {signInfo?.glyph}
              </div>
              <h2 className="text-2xl">You're a {computed.sign}</h2>
              <p className="mt-1 text-xs text-ink-muted">{signInfo?.dates}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{zodiacTraits[computed.sign]}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink-line p-4 text-center">
                <NumerologyBadge number={computed.mulank} size="mx-auto h-10 w-10 text-lg" />
                <div className="mt-2 text-sm text-ink-text">Mulank {computed.mulank}</div>
                <div className="text-[11px] text-ink-muted">{numberInfo[computed.mulank].planet}</div>
              </div>
              <div className="rounded-xl border border-ink-line p-4 text-center">
                <NumerologyBadge number={computed.bhagyank} size="mx-auto h-10 w-10 text-lg" />
                <div className="mt-2 text-sm text-ink-text">Bhagyank {computed.bhagyank}</div>
                <div className="text-[11px] text-ink-muted">{numberInfo[computed.bhagyank].planet}</div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-ink-muted">{numberInfo[computed.mulank].trait}</p>

            <div className="mt-6 space-y-2.5">
              <button className="btn-primary w-full" onClick={confirm}>Continue to AstroConnect</button>
              <button className="btn-outline w-full" onClick={() => setStep('form')}>Edit details</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
