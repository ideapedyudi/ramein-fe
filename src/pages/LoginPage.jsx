import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import SocialButton from '../components/SocialButton'

const inputClass =
  'mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base'

function LoginPage() {
  return (
    <AuthLayout title="Selamat Datang Kembali!" subtitle="Masuk ke akun Ramein kamu">
      <form className="space-y-5">
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Email
          <input type="email" placeholder="nama@email.com" className={inputClass} />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Password
          <input
            type="password"
            placeholder="Masukkan password"
            className={inputClass}
          />
        </label>
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
