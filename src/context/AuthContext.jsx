import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ramein.auth'

const DUMMY_ADMIN = {
  email: 'admin@ramein.id',
  password: 'admin123',
  name: 'Internal Staff',
  role: 'admin',
}

const DUMMY_USER = {
  email: 'user@ramein.id',
  password: 'user123',
  name: 'User Demo',
  role: 'user',
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

function matchCredentials(email, password) {
  if (email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password) {
    return DUMMY_ADMIN
  }
  if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
    return DUMMY_USER
  }
  return null
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
      isUser: user?.role === 'user',
      login: ({ email, password }) => {
        const match = matchCredentials(email, password)
        // Unknown credentials default to a regular user account so demo flows still work.
        const profile = match ?? {
          name: email?.split('@')[0] ?? 'User',
          role: 'user',
        }
        const next = {
          id: profile.role === 'admin' ? 'admin-1' : `user-${Date.now()}`,
          name: profile.name,
          email,
          role: profile.role,
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

export const DUMMY_CREDENTIALS = {
  admin: { email: DUMMY_ADMIN.email, password: DUMMY_ADMIN.password },
  user: { email: DUMMY_USER.email, password: DUMMY_USER.password },
}
