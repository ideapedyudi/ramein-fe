import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const USER_CREDENTIALS = {
  user: { email: 'usertest@ramein.fun', password: 'password123' },
}

export const ADMIN_CREDENTIALS = {
  user: { email: 'firstadmin@demo.com', password: 'password123' },
}