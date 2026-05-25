import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ramein.auth'

const DUMMY_ADMIN = {
  email: 'admin@ramein.fun',
  password: 'admin123',
}

const AuthContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStored())

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login: ({ email, password }) => {
        const isAdmin =
          email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password
        const next = {
          id: isAdmin ? 'admin-1' : `user-${Date.now()}`,
          name: isAdmin ? 'Admin' : (email?.split('@')[0] ?? 'User'),
          email,
          role: isAdmin ? 'admin' : 'user',
        }
        setUser(next)
        return next
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const DUMMY_CREDENTIALS = DUMMY_ADMIN
