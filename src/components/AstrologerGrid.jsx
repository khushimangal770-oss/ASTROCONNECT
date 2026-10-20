import { useMemo, useState } from 'react'
import { astrologers } from '../data/astrologers.js'
import FilterBar from './FilterBar.jsx'
import AstrologerCard from './AstrologerCard.jsx'

export default function AstrologerGrid({ onChat, onSelect }) {
  const [skill, setSkill] = useState('All')
  const [lang, setLang] = useState('')
  const [sort, setSort] = useState('rating')

  const langs = useMemo(
    () => [...new Set(astrologers.flatMap((a) => a.langs))].sort(),
    []
  )

  const list = useMemo(() => {
    let l = astrologers.filter(
      (a) => (skill === 'All' || a.skills.includes(skill)) && (!lang || a.langs.includes(lang))
    )
    l.sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'exp' ? b.exp - a.exp : b.rating - a.rating))
    return l
  }, [skill, lang, sort])

  return (
    <section id="astrologers" className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-col items-start justify-between gap-5 border-b border-ink-line pb-5 sm:flex-row sm:items-baseline">
        <h2 className="text-3xl">Astrologers available</h2>
        <p className="max-w-[34ch] text-[15px] text-ink-muted sm:text-right">
          Prices are per minute. Your first minute is charged when the chat opens.
        </p>
      </div>

      <FilterBar
        skill={skill} setSkill={setSkill}
        lang={lang} setLang={setLang}
        sort={sort} setSort={setSort}
        langs={langs}
      />

      <div>
        {list.length === 0 ? (
          <div className="py-12 text-center text-ink-muted">
            No astrologer matches these filters. Try another language or speciality.
          </div>
        ) : (
          list.map((a) => <AstrologerCard key={a.id} a={a} onChat={onChat} onSelect={onSelect} />)
        )}
      </div>
    </section>
  )
}
