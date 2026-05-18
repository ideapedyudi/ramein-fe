import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import SocialButton from '../components/SocialButton'

const inputClass =
  'mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base'

function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Mulai petualangan event kamu bersama Ramein"
    >
      <form className="space-y-4">
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Nama Lengkap
          <input type="text" placeholder="Masukkan nama lengkap" className={inputClass} />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Email
          <input type="email" placeholder="nama@email.com" className={inputClass} />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Nomor Telepon
          <input type="tel" placeholder="+62 812 3456 7890" className={inputClass} />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Password
          <input type="password" placeholder="Minimal 8 karakter" className={inputClass} />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Konfirmasi Password
          <input type="password" placeholder="Ketik ulang password" className={inputClass} />
        </label>
        <label className="flex items-start gap-3 pt-1 text-xs leading-tight text-[#666666] md:text-sm">
          <input
            type="checkbox"
            className="mt-2 h-5 w-5 rounded border-[#d5d5d5] text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Saya setuju dengan{' '}
            <a href="#" className="font-semibold text-[#2ea387] hover:underline">
              Syarat & Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="font-semibold text-[#2ea387] hover:underline">
              Kebijakan Privasi
            </a>
          </span>
        </label>
        <button
          type="submit"
          className="h-10 w-full rounded-xl bg-[#2ea387] text-sm font-semibold text-white transition hover:bg-[#288f77] md:h-11 md:text-base"
        >
          Daftar
        </button>
      </form>
      <div className="my-7 flex items-center gap-3 text-xs text-[#808080] md:text-sm">
        <div className="h-px flex-1 bg-[#e3e3e3]" />
        <span>Atau daftar dengan</span>
        <div className="h-px flex-1 bg-[#e3e3e3]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SocialButton icon="G" label="Google" />
        <SocialButton icon="f" label="Facebook" />
      </div>
      <p className="mt-6 text-center text-xs text-[#6f6f6f] md:text-sm">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-semibold text-[#2ea387] hover:underline">
          Masuk
        </Link>
      </p>
    </AuthLayout>
  )
}

export default RegisterPage
