import { Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import BuatEventFestivalPage from './pages/BuatEventFestivalPage'
import BuatEventGatheringPage from './pages/BuatEventGatheringPage'
import BuatEventPage from './pages/BuatEventPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import EventDetailPage from './pages/EventDetailPage'
import EventKamuDetailPage from './pages/EventKamuDetailPage'
import EventKamuPage from './pages/EventKamuPage'
import HomePage from './pages/HomePage'
import JelajahiPage from './pages/JelajahiPage'
import LoginPage from './pages/LoginPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import UntukKamuPage from './pages/UntukKamuPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />

      <Route path="/jelajah" element={<Navigate to="/jelajahi" replace />} />
      <Route path="/jelajahi" element={<JelajahiPage />} />
      <Route path="/untuk-kamu" element={<UntukKamuPage />} />
      <Route path="/event/:eventId" element={<EventDetailPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/success" element={<OrderSuccessPage />} />

      <Route path="/buat-event" element={<BuatEventPage />} />
      <Route path="/buat-event/festival" element={<BuatEventFestivalPage />} />
      <Route path="/buat-event/gathering" element={<BuatEventGatheringPage />} />

      <Route path="/event-kamu" element={<EventKamuPage />} />
      <Route path="/event-kamu/:eventId" element={<EventKamuDetailPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
