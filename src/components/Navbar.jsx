import { useEffect, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCompass,
  FaHeadset,
  FaHome,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";
import brandLogo from "../assets/logobrand2.webp";
import { navMenus } from "../data/homeData";
import { useAuth } from "../context/authContext";
import ProfileMenu from "./ProfileMenu";

const topLinks = [
  { label: "Harga", to: "/pricing" },
  { label: "FAQ", to: "/pricing#faq" },
  { label: "Syarat", to: "/terms" },
  { label: "Privasi", to: "/privacy" },
];

const mobileNavIcons = {
  "/": FaHome,
  "/jelajahi": FaCompass,
  "/untuk-kamu": FaStar,
  "/about": FaInfoCircle,
  "/contact": FaHeadset,
};

const mobileNavMenus = navMenus.map((menu) => ({
  ...menu,
  icon: mobileNavIcons[menu.to] ?? FaCompass,
}));

function isMenuActive(pathname, menu) {
  return pathname === menu.to || pathname.startsWith(`${menu.to}/`);
}

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

      const activeIndex = navMenus.findIndex((menu) => isMenuActive(pathname, menu));
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
    <>
      <header className="sticky top-0 z-40">
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
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <img src={brandLogo} alt="brand logo" className="w-10" />
              <span className="text-[2rem] font-extrabold leading-none text-white sm:text-4xl">
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
              {isAuthenticated ? (
                <ProfileMenu
                  user={user}
                  isAdmin={isAdmin}
                  onLogout={handleLogout}
                  variant="avatar"
                />
              ) : (
                <Link
                  to="/login"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2ea387] transition hover:bg-emerald-50"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav
        aria-label="Navigasi utama mobile"
        className="fixed inset-x-0 bottom-4 z-50 px-2 md:hidden"
      >
        <div className="mx-auto w-fit max-w-full rounded-[2rem] bg-[#118a7b] p-2.5 shadow-[0_18px_40px_rgba(13,127,116,0.28)] ring-1 ring-white/10">
          <div className="flex items-center gap-1.5">
            {mobileNavMenus.map((menu) => {
              const Icon = menu.icon;
              const active = isMenuActive(pathname, menu);

              return (
                <NavLink
                  key={menu.to}
                  to={menu.to}
                  end={menu.to === "/"}
                  aria-label={menu.label}
                  className={`flex h-11 items-center rounded-full transition-all duration-300 ${
                    active
                      ? "shrink-0 gap-2.5 bg-white px-3.5 text-[#118a7b] shadow-sm"
                      : "w-11 shrink-0 justify-center text-white/78 hover:text-white"
                  }`}
                >
                  <Icon className="shrink-0 text-[17px]" />
                  <span
                    className={active ? "whitespace-nowrap text-sm font-semibold" : "sr-only"}
                  >
                    {menu.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
