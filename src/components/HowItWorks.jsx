const STEPS = [
  { num: '01', title: 'Add money to your wallet', body: 'Recharge with ₹100 or more. Your balance is shown at the top of every page.' },
  { num: '02', title: 'Pick an astrologer', body: 'Filter by speciality and language, compare ratings and price per minute.' },
  { num: '03', title: 'Chat and get remedies', body: 'Share your birth details, ask your question and get clear next steps.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-ink-line bg-ink-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl">How a consultation works</h2>

        <div className="relative mt-9 grid gap-7 md:grid-cols-3">
          <div className="absolute left-[5%] right-[5%] top-[22px] hidden h-px bg-ink-line md:block" />
          {STEPS.map((s) => (
            <div key={s.num} className="relative pr-7">
              <span className="relative z-10 inline-block bg-ink-surface pr-3.5">
                <span className="bg-brand-gradient bg-clip-text font-display text-[26px] font-bold text-transparent">
                  {s.num}
                </span>
              </span>
              <h3 className="mb-2 mt-4 text-lg text-ink-text">{s.title}</h3>
              <p className="max-w-[30ch] text-[14.5px] text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
