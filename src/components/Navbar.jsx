import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import brandLogo from '../assets/logobrand2.png'
import { navMenus } from '../data/homeData'
import { useAuth } from '../context/AuthContext'
import Container from './Container'
import ProfileMenu from './ProfileMenu'

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  const visibleMenus = navMenus.filter((m) => {
    if (m.to.startsWith('/buat-event')) return isAdmin
    return true
  })

  function handleLogout() {
    logout()
    navigate('/home')
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0d7f74] py-2 text-center text-xs font-medium text-white sm:text-sm">
        Hari mu ngebosenin? #Rameinaja
      </div>
      <div className="bg-[rgb(50,160,140)]">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-2 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:px-3 md:py-0">
          <Link to="/home" className="flex items-center gap-2"> 
              <img src={brandLogo } alt="brand logo" className="w-10" />          
            <span className="text-4xl font-extrabold leading-none text-white">Ramein</span>
          </Link>

          <nav className="scrollbar-hide hidden items-center gap-1 rounded-full bg-[#58b59f]/70 px-1 py-1 md:flex md:gap-2 md:px-2">
            {visibleMenus.map((menu) => (
              <NavLink
                key={menu.to}
                to={menu.to}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition md:px-5 ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/95 hover:bg-white/10'
                  }`
                }
              >
                {menu.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <ProfileMenu user={user} isAdmin={isAdmin} onLogout={handleLogout} />
            ) : (
              <>
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
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#32a08c] md:hidden">
            <Container className="py-3">
              <nav className="flex flex-col gap-1">
                {visibleMenus.map((menu) => (
                  <NavLink
                    key={menu.to}
                    to={menu.to}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                        isActive ? 'bg-white/15 text-white' : 'text-white/95 hover:bg-white/10'
                      }`
                    }
                  >
                    {menu.label}
                  </NavLink>
                ))}

                <div className="mt-2 border-t border-white/10 pt-3">
                  {isAuthenticated ? (
                    <ProfileMenu
                      user={user}
                      isAdmin={isAdmin}
                      onLogout={handleLogout}
                      variant="mobile"
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/login"
                        onClick={closeMobile}
                        className="rounded-xl border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobile}
                        className="rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#2ea387] transition hover:bg-emerald-50"
                      >
                        Daftar
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </Container>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
