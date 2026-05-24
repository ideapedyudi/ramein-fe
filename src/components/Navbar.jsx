import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { navMenus } from '../data/homeData'
import { useAuth } from '../context/AuthContext'
import Container from './Container'
import ProfileMenu from './ProfileMenu'

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

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
      <div className="bg-[#32a08c]">
        <Container className="flex items-center justify-between gap-3 py-3 md:h-16 md:py-0">
          <Link to="/home" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base font-bold text-[#2ea387] md:h-10 md:w-10 md:text-lg">
              R
            </div>
            <span className="text-2xl font-extrabold leading-none text-white md:text-3xl">
              Ramein
            </span>
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
        </Container>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#32a08c] md:hidden">
            <Container className="py-3">
              <nav className="flex flex-col gap-1">
                {visibleMenus.map((menu) => (
                  <NavLink
                    key={menu.to}
                    to={menu.to}
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
                        className="rounded-xl border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/register"
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
