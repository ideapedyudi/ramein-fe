import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import RouteSeo from './components/RouteSeo'
import TopProgressBar from './components/TopProgressBar'
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
import PricingPage from './pages/PricingPage'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import TiketSayaPage from './pages/TiketSayaPage'
import TransaksiPage from './pages/TransaksiPage'
import UntukKamuPage from './pages/UntukKamuPage'
import WithdrawPage from './pages/WithdrawPage'
import AdminFinancePage from './pages/admin/AdminFinancePage'
import AdminKategoriPage from './pages/admin/AdminKategoriPage'
import AdminKotaPage from './pages/admin/AdminKotaPage'
import AdminOrganizerPage from './pages/admin/AdminOrganizerPage'
import AdminWithdrawPage from './pages/admin/AdminWithdrawPage'

function App() {
  return (
    <>
      <TopProgressBar />
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/jelajah" element={<Navigate to="/jelajahi" replace />} />
        <Route path="/jelajahi" element={<JelajahiPage />} />
        <Route path="/untuk-kamu" element={<UntukKamuPage />} />
        <Route path="/event/:eventId" element={<EventDetailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />

      {/* Dashboard — admin only (overview of master data) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin>
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
        path="/withdraw"
        element={
          <ProtectedRoute>
            <WithdrawPage />
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

      {/* Event hosting — any authenticated user can host events */}
      <Route
        path="/buat-event"
        element={
          <ProtectedRoute>
            <BuatEventPage />
          </ProtectedRoute>
        }
      />
      {/* Festival = public ticketed event. Admin only. */}
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
          <ProtectedRoute>
            <BuatEventGatheringPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event-kamu"
        element={
          <ProtectedRoute>
            <EventKamuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event-kamu/:eventId"
        element={
          <ProtectedRoute>
            <EventKamuDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Admin master data — internal staff only */}
      <Route
        path="/admin/kategori"
        element={
          <ProtectedRoute requireAdmin>
            <AdminKategoriPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/kota"
        element={
          <ProtectedRoute requireAdmin>
            <AdminKotaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/organizer"
        element={
          <ProtectedRoute requireAdmin>
            <AdminOrganizerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/finance"
        element={
          <ProtectedRoute requireAdmin>
            <AdminFinancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/withdraw"
        element={
          <ProtectedRoute requireAdmin>
            <AdminWithdrawPage />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App
