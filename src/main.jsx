import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WalletProvider } from './context/WalletContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { StreakProvider } from './context/StreakContext.jsx'
import { ChatHistoryProvider } from './context/ChatHistoryContext.jsx'
import { CommunityProvider } from './context/CommunityContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <WalletProvider>
        <CartProvider>
          <AuthProvider>
            <StreakProvider>
              <ChatHistoryProvider>
                <CommunityProvider>
                  <App />
                </CommunityProvider>
              </ChatHistoryProvider>
            </StreakProvider>
          </AuthProvider>
        </CartProvider>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
