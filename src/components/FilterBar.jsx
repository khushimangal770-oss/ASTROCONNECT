import { SKILLS } from '../data/astrologers.js'

export default function FilterBar({ skill, setSkill, lang, setLang, sort, setSort, langs }) {
  return (
    <div className="my-7 flex flex-wrap items-center gap-5 border-b border-ink-line pb-4.5">
      <div className="flex flex-wrap gap-5" role="group" aria-label="Filter by speciality">
        {SKILLS.map((s) => (
          <button
            key={s}
            className="chip"
            aria-pressed={skill === s}
            onClick={() => setSkill(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-4 text-sm">
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Filter by language"
          className="rounded-lg border border-ink-line bg-ink-surface px-2.5 py-1.5 text-[13.5px] text-ink-text"
        >
          <option value="">Any language</option>
          {langs.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by"
          className="rounded-lg border border-ink-line bg-ink-surface px-2.5 py-1.5 text-[13.5px] text-ink-text"
        >
          <option value="rating">Highest rated</option>
          <option value="low">Price: low to high</option>
          <option value="exp">Most experienced</option>
        </select>
      </div>
    </div>
  )
}
