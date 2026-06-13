import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import RouteLoadingFallback from './RouteLoadingFallback'

/**
 * Guest guard — the inverse of ProtectedRoute. Blocks already-authenticated
 * users from guest-only pages (login/register) and sends them back to where
 * they came from, or to a sensible role-based default.
 */
function GuestRoute({ children }) {
  const { hasCheckedSession, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!hasCheckedSession) {
    return <RouteLoadingFallback message="Mengecek sesi akun..." />
  }

  if (isAuthenticated) {
    const fallback = isAdmin ? '/dashboard' : '/'
    return <Navigate to={location.state?.from ?? fallback} replace />
  }

  return children
}

export default GuestRoute
