import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearTokens, getAccessToken } from '../lib/authStorage'
import {
  fetchCurrentUser,
  googleAuthUser,
  loginUser,
  logout as logoutAction,
  registerUser,
} from '../store/authSlice'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, status, error, hasCheckedSession } = useSelector((state) => state.auth)

  useEffect(() => {
    if (getAccessToken() && !user && !hasCheckedSession) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, hasCheckedSession, user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isUser: user?.role === 'user',
      isLoading: status === 'loading',
      authError: error,
      hasCheckedSession,
      login: (credentials) => dispatch(loginUser(credentials)).unwrap(),
      register: (payload) => dispatch(registerUser(payload)).unwrap(),
      googleAuth: (payload) => dispatch(googleAuthUser(payload)).unwrap(),
      logout: () => {
        clearTokens()
        dispatch(logoutAction())
      },
    }),
    [dispatch, error, hasCheckedSession, status, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
