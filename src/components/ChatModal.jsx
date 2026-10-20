import { useEffect, useRef, useState } from 'react'
import { initials, sampleReplies } from '../data/astrologers.js'
import { useWallet } from '../context/WalletContext.jsx'
import { useChatHistory } from '../context/ChatHistoryContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Avatar from './Avatar.jsx'

const QUICK = [
  { label: 'Career', text: 'Will I get a job change this year?' },
  { label: 'Marriage', text: 'When will I get married?' },
  { label: 'Money', text: 'Is this a good time to invest?' },
]

export default function ChatModal({ astrologer, sharedContext, onClose }) {
  const { balance, spend, openRecharge } = useWallet()
  const { saveChat } = useChatHistory()
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [outOfFunds, setOutOfFunds] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [closing, setClosing] = useState(false)
  const replyIdx = useRef(0)
  const scrollRef = useRef(null)

  const typingRef = useRef(false)
  const balanceRef = useRef(balance)
  useEffect(() => { typingRef.current = typing }, [typing])
  useEffect(() => { balanceRef.current = balance }, [balance])

  useEffect(() => {
    if (!astrologer) return
    setMessages([])
    setElapsed(0)
    setOutOfFunds(false)
    setClosing(false)

    const lastUserMsg = sharedContext?.messages?.filter((m) => m.from === 'me').slice(-1)[0]?.text
    let openerText
    if (sharedContext) {
      openerText = `I've gone through your earlier chat with ${sharedContext.astrologerName}. ${
        lastUserMsg ? `You were asking: "${lastUserMsg}" — let's continue from there.` : "Let's continue from where you left off."
      }`
    } else if (user?.dob) {
      const dobDisplay = new Date(user.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      const timePart = user.time ? ` at ${user.time}` : ''
      const placePart = user.place ? ` in ${user.place}` : ''
      openerText = `Namaste ${user.name}! I can already see your birth details — born ${dobDisplay}${timePart}${placePart}. What would you like clarity on today?`
    } else {
      openerText = "Namaste! What would you like clarity on: career, relationships or something else?"
    }
    // when birth details are already known, skip the canned "please share
    // your date/time/place" reply — it would be redundant and irritating
    replyIdx.current = (!sharedContext && user?.dob) ? 1 : 0

    const t = setTimeout(() => setMessages([{ from: 'them', text: openerText }]), 500)
    return () => clearTimeout(t)
  }, [astrologer, sharedContext, user])

  useEffect(() => {
    if (!astrologer) return
    const perSecond = astrologer.price / 60
    const id = setInterval(() => {
      if (typingRef.current) return
      if (balanceRef.current < perSecond) {
        setOutOfFunds(true)
        return
      }
      spend(perSecond)
      setElapsed((e) => e + 1)
      setOutOfFunds(false)
    }, 1000)
    return () => clearInterval(id)
  }, [astrologer])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing, closing])

  if (!astrologer) return null

  function send(text) {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'me', text: text.trim() }])
    setInput('')
    setTyping(true)
    const delay = 1500 + Math.random() * 2000
    setTimeout(() => {
      setTyping(false)
      const reply = sampleReplies[replyIdx.current % sampleReplies.length]
      replyIdx.current += 1
      setMessages((m) => [...m, { from: 'them', text: reply }])
    }, delay)
  }

  function requestClose() {
    const hadRealExchange = messages.some((m) => m.from === 'me')
    if (!hadRealExchange) {
      onClose()
      return
    }
    setClosing(true)
  }

  function saveAndClose() {
    saveChat(astrologer, messages)
    onClose()
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')
  const cost = (elapsed * astrologer.price / 60).toFixed(2)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="chatName">
      <div className="panel flex h-[min(620px,88vh)] w-[min(440px,94vw)] flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-ink-line p-4">
          <Avatar src={astrologer.avatar} alt={astrologer.name} initials={initials(astrologer.name)} className="h-[42px] w-[42px] text-sm" />
          <div>
            <strong id="chatName" className="text-ink-text">{astrologer.name}</strong>
            <small className="block text-xs text-ink-muted">₹{astrologer.price}/min</small>
          </div>
          <button className="ml-auto rounded-lg p-1.5 text-ink-muted hover:bg-ink-surface2" onClick={requestClose} aria-label="Close chat">
            ✕
          </button>
        </div>

        {closing ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-7 text-center">
            <div className="text-3xl">💾</div>
            <h3 className="text-lg text-ink-text">Save this chat for next time?</h3>
            <p className="text-sm text-ink-muted">
              If you talk to a different astrologer later, you can share this conversation
              with one click instead of explaining everything again.
            </p>
            <div className="w-full space-y-2.5">
              <button className="btn-primary w-full" onClick={saveAndClose}>Save chat</button>
              <button className="btn-outline w-full" onClick={onClose}>Don't save</button>
              <button className="text-xs text-ink-muted hover:text-ink-text" onClick={() => setClosing(false)}>
                Back to chat
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-ink-line bg-ink-surface2 px-4 py-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${outOfFunds ? 'bg-busy' : typing ? 'bg-gold' : 'bg-cyan'}`} />
              <span className="font-medium text-ink-text">{mm}:{ss}</span>
              <span className="text-ink-muted">· ₹{cost} billed so far</span>
              <span className="ml-auto text-ink-muted">
                {outOfFunds ? 'Paused — add funds' : typing ? 'Paused — thinking' : 'Billing live'}
              </span>
            </div>

            {sharedContext && (
              <div className="border-b border-ink-line px-4 py-2.5 text-xs">
                <button
                  className="flex w-full items-center justify-between text-ink-muted hover:text-ink-text"
                  onClick={() => setShowOld(!showOld)}
                >
                  <span>💬 Shared from chat with {sharedContext.astrologerName}</span>
                  <span>{showOld ? '▲' : '▼'}</span>
                </button>
                {showOld && (
                  <div className="mt-2 max-h-32 space-y-1.5 overflow-y-auto rounded-lg bg-ink-surface2 p-2.5">
                    {sharedContext.messages.map((m, i) => (
                      <div key={i} className={`text-[11px] ${m.from === 'me' ? 'text-ink-text' : 'text-ink-muted'}`}>
                        <b>{m.from === 'me' ? 'You' : sharedContext.astrologerName.split(' ')[0]}:</b> {m.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto bg-ink p-4">
              {!sharedContext && (
                <div className="mx-auto w-fit max-w-[90%] rounded-xl border border-ink-line bg-ink-surface2 px-3.5 py-2 text-center text-xs text-ink-muted">
                  You're only billed while {astrologer.name.split(' ')[0]} is actively responding — thinking time doesn't count.
                </div>
              )}
              {!sharedContext && user?.dob && (
                <div className="mx-auto w-fit max-w-[90%] rounded-xl border border-cyan/30 bg-cyan/10 px-3.5 py-2 text-center text-xs text-cyan">
                  🔒 Your birth details are shared automatically — no need to retype them.
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === 'me'
                      ? 'ml-auto rounded-br-md bg-brand-gradient text-white'
                      : 'rounded-bl-md border border-ink-line bg-ink-surface2 text-ink-text'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 pl-1 text-xs text-ink-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  {astrologer.name.split(' ')[0]} is thinking — billing paused
                </div>
              )}
            </div>

            {outOfFunds ? (
              <div className="m-4 rounded-xl border border-busy/40 bg-busy/10 p-4 text-center">
                <p className="text-sm text-ink-text">Your wallet is running low.</p>
                <p className="mt-0.5 text-xs text-ink-muted">Add funds to keep chatting with {astrologer.name}.</p>
                <button
                  className="btn-primary mt-3 !px-5 !py-2"
                  onClick={() => openRecharge(`Add money to continue your chat with ${astrologer.name}.`)}
                >
                  Add money
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 px-4 pt-3">
                  {QUICK.map((q) => (
                    <button
                      key={q.label}
                      className="rounded-full border border-ink-line px-3.5 py-1.5 text-xs text-ink-muted hover:border-violet hover:text-ink-text"
                      onClick={() => send(q.text)}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
                <form className="flex gap-2 p-4" onSubmit={(e) => { e.preventDefault(); send(input) }}>
                  <input
                    value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question" aria-label="Your message" autoComplete="off"
                    className="flex-1 rounded-xl border border-ink-line bg-ink px-4 py-2.5 text-sm text-ink-text outline-none focus:border-violet"
                  />
                  <button type="submit" className="btn-primary !px-5">Send</button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
