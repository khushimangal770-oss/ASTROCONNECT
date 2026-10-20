import { createContext, useContext, useState } from 'react'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(250)
  const [rechargeOpen, setRechargeOpen] = useState(false)
  const [rechargeNote, setRechargeNote] = useState('')

  function openRecharge(note) {
    setRechargeNote(note || 'Choose an amount to add to your wallet.')
    setRechargeOpen(true)
  }

  function addFunds(amount) {
    setBalance((b) => b + amount)
    setRechargeOpen(false)
  }

  function spend(amount) {
    setBalance((b) => b - amount)
  }

  return (
    <WalletContext.Provider
      value={{ balance, rechargeOpen, rechargeNote, openRecharge, addFunds, spend, closeRecharge: () => setRechargeOpen(false) }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used inside WalletProvider')
  return ctx
}
