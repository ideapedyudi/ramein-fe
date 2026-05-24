import brandLogo from '../assets/logobrand.png'
import { NavLink, Link } from 'react-router-dom'
import { navMenus } from '../data/homeData'

function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0d7f74] py-2 text-center text-sm font-medium text-white">
        Hari mu ngebosenin? #Rameinaja
      </div>
      <div className="bg-[#32a08c]">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-2 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:px-3 md:py-0">
          <Link to="/home" className="flex items-center gap-2">
              <img src={brandLogo } alt="brand logo" className="w-10" />          
            <span className="text-4xl font-extrabold leading-none text-white">Ramein</span>
          </Link>

          <nav className="scrollbar-hide flex w-full items-center gap-1 overflow-x-auto rounded-full bg-[#58b59f]/70 px-1 py-1 md:w-auto md:gap-2 md:px-2">
            {navMenus.map((menu) => (
              <NavLink
                key={menu.to}
                to={menu.to}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm md:px-5 ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/95 hover:bg-white/10'
                  }`
                }
              >
                {menu.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <Link
              to="/login"
              className="text-sm font-semibold text-white transition hover:text-white/80"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#2ea387] transition hover:bg-emerald-50"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
