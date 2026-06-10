import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

function LoginPromptModal({
  open,
  onClose,
  title = 'Masuk Dulu, Yuk!',
  message = 'Kamu perlu masuk ke akun terlebih dahulu sebelum melanjutkan pembelian tiket.',
  redirectTo,
}) {
  const navigate = useNavigate()

  if (!open) return null

  const handleLogin = () => {
    navigate('/login', redirectTo ? { state: { from: redirectTo } } : undefined)
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-xl">
              🔒
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup dialog masuk"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-gray-600">{message}</p>

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="w-full rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPromptModal
