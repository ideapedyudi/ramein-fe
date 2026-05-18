import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MenuPlaceholderPage from './pages/MenuPlaceholderPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/jelajah"
        element={
          <MenuPlaceholderPage
            title="Jelajah Event"
            description="Halaman jelajah masih kosong dulu. Nanti bisa diisi list event + filter."
          />
        }
      />
      <Route
        path="/untuk-kamu"
        element={
          <MenuPlaceholderPage
            title="Untuk Kamu"
            description="Halaman rekomendasi personal masih kosong dulu."
          />
        }
      />
      <Route
        path="/buat-event"
        element={
          <MenuPlaceholderPage
            title="Buat Event"
            description="Halaman buat event masih kosong dulu."
          />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
