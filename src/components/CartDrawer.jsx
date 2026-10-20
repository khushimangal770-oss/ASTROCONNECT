import { useCart } from '../context/CartContext.jsx'
import ProductImage from './ProductImage.jsx'

export default function CartDrawer() {
  const { items, updateQty, total, cartOpen, setCartOpen } = useCart()
  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
      <div className="flex h-full w-[min(400px,94vw)] flex-col border-l border-ink-line bg-ink-surface">
        <div className="flex items-center gap-3 border-b border-ink-line p-5">
          <h2 id="cartTitle" className="text-xl">Your cart</h2>
          <button
            className="ml-auto rounded-lg p-1.5 text-ink-muted hover:bg-ink-surface2"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-ink-muted">Your cart is empty. Browse the store to add remedies.</p>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3 border-b border-ink-line pb-4">
                  <ProductImage src={product.image} alt={product.name} glyph={product.glyph} className="h-11 w-11 shrink-0 rounded-lg" />
                  <div className="flex-1">
                    <div className="text-sm text-ink-text">{product.name}</div>
                    <div className="text-xs text-ink-muted">₹{product.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-6 w-6 rounded-md border border-ink-line text-ink-muted hover:border-violet"
                      onClick={() => updateQty(product.id, qty - 1)}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm">{qty}</span>
                    <button
                      className="h-6 w-6 rounded-md border border-ink-line text-ink-muted hover:border-violet"
                      onClick={() => updateQty(product.id, qty + 1)}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-line p-5">
            <div className="mb-3 flex items-center justify-between text-sm text-ink-muted">
              <span>Total</span>
              <span className="font-display text-lg text-ink-text">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary w-full" onClick={() => alert('This is a demo — checkout is not connected to real payment.')}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
