export default function ShareChatPrompt({ savedChat, newAstrologer, onShare, onStartFresh, onDiscard }) {
  if (!savedChat || !newAstrologer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="shareTitle">
      <div className="panel w-[min(400px,92vw)] p-7 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-xl">
          💬
        </div>
        <h2 id="shareTitle" className="text-xl text-ink-text">Continue where you left off?</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          You have a saved chat with <b className="text-ink-text">{savedChat.astrologerName}</b>.
          Share it with <b className="text-ink-text">{newAstrologer.name}</b> so you don't have
          to explain everything again.
        </p>
        <div className="mt-6 space-y-2.5">
          <button className="btn-primary w-full" onClick={onShare}>Share & continue</button>
          <button className="btn-outline w-full" onClick={onStartFresh}>Start fresh instead</button>
          <button className="text-xs text-ink-muted hover:text-ink-text" onClick={onDiscard}>
            Not relevant — delete saved chat
          </button>
        </div>
      </div>
    </div>
  )
}
