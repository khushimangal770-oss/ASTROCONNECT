import { useWallet } from '../context/WalletContext.jsx'

const AMOUNTS = [
  { value: 100 },
  { value: 250 },
  { value: 500, tag: 'Popular' },
]

export default function RechargeModal() {
  const { rechargeOpen, rechargeNote, addFunds, closeRecharge } = useWallet()
  if (!rechargeOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="rTitle">
      <div className="panel w-[min(380px,92vw)] p-7">
        <h2 id="rTitle" className="text-2xl">Add money</h2>
        <p className="mb-5 mt-1 text-sm text-ink-muted">{rechargeNote}</p>

        <div className="mb-4.5 grid grid-cols-3 gap-2.5">
          {AMOUNTS.map((a) => (
            <button
              key={a.value}
              onClick={() => addFunds(a.value)}
              className="rounded-xl border border-ink-line bg-ink py-4 font-display text-base font-bold text-ink-text hover:border-violet"
            >
              ₹{a.value}
              {a.tag && <small className="block font-sans text-[10.5px] font-normal text-ink-muted">{a.tag}</small>}
            </button>
          ))}
        </div>

        <button className="btn-outline w-full" onClick={closeRecharge}>Cancel</button>
      </div>
    </div>
  )
}
