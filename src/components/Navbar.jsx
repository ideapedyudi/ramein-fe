import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import brandLogo from "../assets/logobrand2.webp";
import { navMenus } from "../data/homeData";
import { useAuth } from "../context/authContext";
import Container from "./Container";
import ProfileMenu from "./ProfileMenu";

const topLinks = [
  { label: "Harga", to: "/pricing" },
  { label: "FAQ", to: "/pricing#faq" },
  { label: "Syarat", to: "/terms" },
  { label: "Privasi", to: "/privacy" },
];

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef([]);
  const indicatorReady = useRef(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Slide the active-link highlight to the current route. We mutate the
  // indicator's style imperatively (no state) so the CSS transition animates
  // the move and it stays a layout-effect-free, render-cheap operation.
  useEffect(() => {
    function moveIndicator() {
      const nav = navRef.current;
      const indicator = indicatorRef.current;
      if (!nav || !indicator) return;

      const activeIndex = navMenus.findIndex(
        (menu) => pathname === menu.to || pathname.startsWith(`${menu.to}/`),
      );
      const el = linkRefs.current[activeIndex];

      if (!el) {
        indicator.style.opacity = "0";
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const rect = el.getBoundingClientRect();

      // First placement (page load/reload) snaps without animating; later
      // route changes keep the CSS transition so the highlight slides.
      if (!indicatorReady.current) {
        indicator.style.transition = "none";
      }

      indicator.style.transform = `translate(${rect.left - navRect.left}px, ${
        rect.top - navRect.top
      }px)`;
      indicator.style.width = `${rect.width}px`;
      indicator.style.height = `${rect.height}px`;
      indicator.style.opacity = "1";

      if (!indicatorReady.current) {
        // Commit the snapped position, then restore the stylesheet transition.
        void indicator.offsetWidth;
        indicator.style.transition = "";
        indicatorReady.current = true;
      }
    }

    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0d7f74] text-white">
        <div className="mx-auto flex w-full max-w-370 items-center justify-center gap-4 px-3 py-1.5 text-xs font-medium sm:justify-center sm:text-sm">
          {/* <span className="hidden sm:inline">Hari mu ngebosenin? #Rameinaja</span> */}
          <nav className="scrollbar-hide flex items-center gap-3 overflow-x-auto sm:gap-5">
            {topLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="shrink-0 whitespace-nowrap text-white/90 transition hover:text-accent-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="bg-[rgb(50,160,140)]">
        <div className="mx-auto flex w-full max-w-370 flex-row items-center justify-between gap-3 px-2 py-3 md:h-16 md:px-3 md:py-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={brandLogo} alt="brand logo" className="w-10" />
            <span className="text-4xl font-extrabold leading-none text-white">
              Ramein
            </span>
          </Link>

          <nav
            ref={navRef}
            className="scrollbar-hide relative hidden items-center gap-1 rounded-full bg-[#58b59f]/70 px-1 py-1 md:flex md:gap-2 md:px-2"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-white/15 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            {navMenus.map((menu, i) => (
              <NavLink
                key={menu.to}
                to={menu.to}
                end={menu.to === "/"}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className={({ isActive }) =>
                  `relative z-10 shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition md:px-5 ${
                    isActive ? "text-white" : "text-white/95 hover:bg-white/10"
                  }`
                }
              >
                {menu.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <ProfileMenu
                user={user}
                isAdmin={isAdmin}
                onLogout={handleLogout}
              />
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

          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && (
              <ProfileMenu
                user={user}
                isAdmin={isAdmin}
                onLogout={handleLogout}
                variant="avatar"
              />
            )}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
            >
              <span
                key={mobileOpen ? 'close' : 'open'}
                className="animate-icon-swap inline-flex"
              >
                {mobileOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="animate-menu origin-top border-t border-white/10 bg-[#32a08c] md:hidden">
            <Container className="py-3">
              <nav className="flex flex-col gap-1">
                {navMenus.map((menu, i) => (
                  <NavLink
                    key={menu.to}
                    to={menu.to}
                    end={menu.to === "/"}
                    onClick={closeMobile}
                    style={{ animationDelay: `${i * 45}ms` }}
                    className={({ isActive }) =>
                      `animate-menu-item rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/95 hover:bg-white/10"
                      }`
                    }
                  >
                    {menu.label}
                  </NavLink>
                ))}

                {!isAuthenticated && (
                  <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
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
              </nav>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
