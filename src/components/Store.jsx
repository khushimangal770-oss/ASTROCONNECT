import { useMemo, useState } from 'react'
import { products, PRODUCT_CATEGORIES } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductImage from './ProductImage.jsx'

export default function Store() {
  const [cat, setCat] = useState('All')
  const { addItem } = useCart()

  const list = useMemo(
    () => (cat === 'All' ? products : products.filter((p) => p.category === cat)),
    [cat]
  )

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="border-b border-ink-line pb-5">
        <h1 className="text-3xl">Puja items & remedies</h1>
        <p className="mt-1.5 text-[15px] text-ink-muted">
          Gemstones, rudraksha and yantras your astrologer might suggest as a remedy.
        </p>
      </div>

      <div className="my-6 flex flex-wrap gap-5 border-b border-ink-line pb-4.5">
        {PRODUCT_CATEGORIES.map((c) => (
          <button
            key={c}
            className="chip"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className="panel flex flex-col p-5">
            <ProductImage src={p.image} alt={p.name} glyph={p.glyph} className="mb-3 h-36 w-full rounded-xl" />
            <h3 className="text-lg text-ink-text">{p.name}</h3>
            <p className="mt-1 flex-1 text-sm text-ink-muted">{p.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-lg text-ink-text">₹{p.price.toLocaleString('en-IN')}</span>
              <button className="btn-primary !px-4 !py-1.5 !text-xs" onClick={() => addItem(p)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
