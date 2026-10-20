import { useState } from 'react'
import { useWallet } from './context/WalletContext.jsx'
import { useChatHistory } from './context/ChatHistoryContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DailyHoroscope from './components/DailyHoroscope.jsx'
import AstrologerGrid from './components/AstrologerGrid.jsx'
import AstrologerProfile from './components/AstrologerProfile.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Store from './components/Store.jsx'
import Community from './components/Community.jsx'
import CompatibilityMatcher from './components/CompatibilityMatcher.jsx'
import Profile from './components/Profile.jsx'
import Footer from './components/Footer.jsx'
import ChatModal from './components/ChatModal.jsx'
import RechargeModal from './components/RechargeModal.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import LoginModal from './components/LoginModal.jsx'
import ShareChatPrompt from './components/ShareChatPrompt.jsx'
import AssistantWidget from './components/AssistantWidget.jsx'

export default function App() {
  const [view, setView] = useState('home')
  const [activeChat, setActiveChat] = useState(null)
  const [sharedContext, setSharedContext] = useState(null)
  const [shareOffer, setShareOffer] = useState(null) // { savedChat, astrologer }
  const [profileAstrologer, setProfileAstrologer] = useState(null)
  const { balance, openRecharge } = useWallet()
  const { getOfferableChat, discardChat } = useChatHistory()

  function handleChat(astrologer) {
    const perSecond = astrologer.price / 60
    if (balance < perSecond) {
      openRecharge(`Your balance is ₹${balance.toFixed(2)}. Add money to start chatting with ${astrologer.name}.`)
      return
    }
    const offerable = getOfferableChat(astrologer.id)
    if (offerable) {
      setShareOffer({ savedChat: offerable, astrologer })
      return
    }
    setActiveChat(astrologer)
  }

  function confirmShare() {
    setSharedContext(shareOffer.savedChat)
    setActiveChat(shareOffer.astrologer)
    setShareOffer(null)
  }

  function startFresh() {
    setActiveChat(shareOffer.astrologer)
    setShareOffer(null)
  }

  function discardOffer() {
    discardChat(shareOffer.savedChat.id)
    setShareOffer(null)
  }

  function closeChat() {
    setActiveChat(null)
    setSharedContext(null)
  }

  function handleSelect(astrologer) {
    setProfileAstrologer(astrologer)
    window.scrollTo({ top: 0 })
  }

  function navigate(to) {
    setView(to)
    setProfileAstrologer(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <Navbar onNavigate={navigate} />
      <main>
        {profileAstrologer ? (
          <AstrologerProfile a={profileAstrologer} onBack={() => setProfileAstrologer(null)} onChat={handleChat} />
        ) : view === 'store' ? (
          <Store />
        ) : view === 'community' ? (
          <Community />
        ) : view === 'match' ? (
          <CompatibilityMatcher onBrowseAstrologers={() => navigate('home')} />
        ) : view === 'profile' ? (
          <Profile onNavigate={navigate} />
        ) : (
          <>
            <Hero />
            <DailyHoroscope />
            <AstrologerGrid onChat={handleChat} onSelect={handleSelect} />
            <HowItWorks />
          </>
        )}
      </main>
      <Footer />

      <ChatModal astrologer={activeChat} sharedContext={sharedContext} onClose={closeChat} />
      <RechargeModal />
      <CartDrawer />
      <LoginModal />
      <ShareChatPrompt
        savedChat={shareOffer?.savedChat}
        newAstrologer={shareOffer?.astrologer}
        onShare={confirmShare}
        onStartFresh={startFresh}
        onDiscard={discardOffer}
      />
      <AssistantWidget onChatWithAstrologer={handleChat} onNavigate={navigate} />
    </>
  )
}
