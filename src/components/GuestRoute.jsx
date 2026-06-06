import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'

/**
 * Guest guard — the inverse of ProtectedRoute. Blocks already-authenticated
 * users from guest-only pages (login/register) and sends them back to where
 * they came from, or to a sensible role-based default.
 */
function GuestRoute({ children }) {
  const { hasCheckedSession, isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading || !hasCheckedSession) {
    return null
  }

  if (isAuthenticated) {
    const fallback = isAdmin ? '/dashboard' : '/'
    return <Navigate to={location.state?.from ?? fallback} replace />
  }

  return children
}

export default GuestRoute
