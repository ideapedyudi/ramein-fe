import { Link } from "react-router-dom";
import brandLogo from "../assets/logobrand2.webp";

function Brand() {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      <img src={brandLogo} alt="brand logo" className="w-10" />
      <h1 className="text-4xl font-extrabold leading-none tracking-tight">
        <span className="text-emerald-600">Ram</span>
        <span className="text-amber-500">ein</span>
      </h1>
    </div>
  );
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
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#6e6e6e] transition-colors hover:bg-[#2ea387]/8 hover:text-[#2ea387] md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
