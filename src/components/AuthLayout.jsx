import { Link } from 'react-router-dom'

function Brand() {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold text-white">
        R
      </div>
      <h1 className="text-4xl font-extrabold leading-none tracking-tight">
        <span className="text-emerald-600">Ram</span>
        <span className="text-amber-500">ein</span>
      </h1>
    </div>
  )
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-[#f3f3f3] px-4 py-8 text-[#232323] md:py-10">
      <div className="mx-auto w-full max-w-115">
        <Brand />
        <h2 className="text-center font-light leading-tight tracking-tight md:text-[24px]">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm leading-snug text-[#777777] md:text-base">
          {subtitle}
        </p>
        <section className="mt-7 rounded-[18px] border border-[#e6e6e6] bg-white p-5 shadow-[0_3px_10px_rgba(0,0,0,0.03)] md:p-6">
          {children}
        </section>
        <div className="mt-6 text-center text-sm font-medium text-[#6e6e6e] md:text-base">
          <Link to="/home" className="inline-flex items-center gap-2 hover:text-[#2ea387]">
            <span aria-hidden="true">&lt;-</span>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
