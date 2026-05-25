import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AboutPage from './pages/AboutPage'
import BuatEventFestivalPage from './pages/BuatEventFestivalPage'
import BuatEventGatheringPage from './pages/BuatEventGatheringPage'
import BuatEventPage from './pages/BuatEventPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import EventDetailPage from './pages/EventDetailPage'
import EventKamuDetailPage from './pages/EventKamuDetailPage'
import EventKamuPage from './pages/EventKamuPage'
import HomePage from './pages/HomePage'
import JelajahiPage from './pages/JelajahiPage'
import LoginPage from './pages/LoginPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import PengaturanPage from './pages/PengaturanPage'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import TiketSayaPage from './pages/TiketSayaPage'
import TransaksiPage from './pages/TransaksiPage'
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

      <Route
        path="/buat-event"
        element={
          <ProtectedRoute requireAdmin>
            <BuatEventPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buat-event/festival"
        element={
          <ProtectedRoute requireAdmin>
            <BuatEventFestivalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buat-event/gathering"
        element={
          <ProtectedRoute requireAdmin>
            <BuatEventGatheringPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/event-kamu"
        element={
          <ProtectedRoute requireAdmin>
            <EventKamuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event-kamu/:eventId"
        element={
          <ProtectedRoute requireAdmin>
            <EventKamuDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tiket-saya"
        element={
          <ProtectedRoute>
            <TiketSayaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaksi"
        element={
          <ProtectedRoute>
            <TransaksiPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengaturan"
        element={
          <ProtectedRoute>
            <PengaturanPage />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
