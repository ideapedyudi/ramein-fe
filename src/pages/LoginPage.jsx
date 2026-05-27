import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import SocialButton from '../components/SocialButton'
import { DUMMY_CREDENTIALS, useAuth } from '../context/AuthContext'

const inputClass =
  'mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const requestedPath = location.state?.from ?? null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }
    const user = login({ email, password })
    // Role-aware destination. If the user originally tried to reach an
    // admin-only path but isn't admin, silently fall back to /home instead
    // of blocking the login.
    const adminOnly =
      requestedPath?.startsWith('/admin') || requestedPath === '/dashboard'
    const fallback = user.role === 'admin' ? '/dashboard' : '/home'
    const destination =
      requestedPath && !(adminOnly && user.role !== 'admin')
        ? requestedPath
        : fallback
    navigate(destination, { replace: true })
  }

  function fillWith(creds) {
    setEmail(creds.email)
    setPassword(creds.password)
  }

  return (
    <AuthLayout title="Selamat Datang Kembali!" subtitle="Masuk ke akun Ramein kamu">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="space-y-2 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 px-3 py-2.5 text-xs text-[#2b2b2b]">
          <p className="font-semibold uppercase tracking-wider text-emerald-700">
            Dummy credentials
          </p>
          <div className="flex items-center justify-between gap-2">
            <span>
              <span className="font-semibold">User</span> · {DUMMY_CREDENTIALS.user.email} /{' '}
              {DUMMY_CREDENTIALS.user.password}
            </span>
            <button
              type="button"
              onClick={() => fillWith(DUMMY_CREDENTIALS.user)}
              className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Isi
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>
              <span className="font-semibold">Admin</span> · {DUMMY_CREDENTIALS.admin.email} /{' '}
              {DUMMY_CREDENTIALS.admin.password}
            </span>
            <button
              type="button"
              onClick={() => fillWith(DUMMY_CREDENTIALS.admin)}
              className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Isi
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm md:text-base">
          <label className="inline-flex items-center gap-2 font-semibold text-[#2b2b2b]">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#d5d5d5] text-emerald-600 focus:ring-emerald-500"
            />
            Ingat saya
          </label>
          <a href="#" className="text-[#2ea387] hover:underline">
            Lupa password?
          </a>
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded-xl bg-[#2ea387] text-sm font-semibold text-white transition hover:bg-[#288f77] md:h-11 md:text-base"
        >
          Masuk
        </button>
      </form>
      <div className="my-7 flex items-center gap-3 text-xs text-[#808080] md:text-sm">
        <div className="h-px flex-1 bg-[#e3e3e3]" />
        <span>Atau masuk dengan</span>
        <div className="h-px flex-1 bg-[#e3e3e3]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SocialButton icon="G" label="Google" />
        <SocialButton icon="f" label="Facebook" />
      </div>
      <p className="mt-6 text-center text-xs text-[#6f6f6f] md:text-sm">
        Belum punya akun?{' '}
        <Link to="/register" className="font-semibold text-[#2ea387] hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage
