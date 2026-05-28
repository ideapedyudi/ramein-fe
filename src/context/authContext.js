import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const SAMPLE_CREDENTIALS = {
  user: { email: 'user@demo.com', password: 'password123' },
}
