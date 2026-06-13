import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import RouteLoadingFallback from './RouteLoadingFallback'

function ProtectedRoute({ children, requireAdmin = false, userOnly = false }) {
  const { hasCheckedSession, isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading || !hasCheckedSession) {
    return <RouteLoadingFallback message="Menyiapkan halaman..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }
  if (userOnly && isAdmin) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

export default ProtectedRoute
