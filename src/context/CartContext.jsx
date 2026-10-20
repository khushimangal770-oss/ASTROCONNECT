import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ product, qty }]
  const [cartOpen, setCartOpen] = useState(false)

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function updateQty(productId, qty) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) => i.product.id === productId ? { ...i, qty } : i)
    )
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, count, total, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
