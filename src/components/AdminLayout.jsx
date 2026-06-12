import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBars,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaCity,
  FaCog,
  FaComments,
  FaListUl,
  FaMoneyBillWave,
  FaPlusCircle,
  FaReceipt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTicketAlt,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { useAuth } from "../context/authContext";
import brandLogo from "../assets/logobrand2.webp";
import UserAvatar from "./UserAvatar";

// Regular user navigation — buying tickets, hosting RSVP/private events.
const userNav = [
  { to: "/tiket-saya", label: "Tiket Saya", icon: FaTicketAlt },
  { to: "/transaksi", label: "Transaksi", icon: FaReceipt },
  { to: "/event-kamu", label: "Event Saya", icon: FaCalendarAlt },
  { to: "/buat-event", label: "Buat Event", icon: FaPlusCircle },
  { to: "/withdraw", label: "Tarik Dana", icon: FaMoneyBillWave },
];

// Internal staff (admin) — manages master data and can create events
// on behalf of registered organizers.
const adminNav = [
  { to: "/dashboard", label: "Dasbor", icon: FaTachometerAlt, exact: true },
  { to: "/admin/kategori", label: "Kategori", icon: FaListUl },
  { to: "/admin/kota", label: "Kota", icon: FaCity },
  { to: "/admin/organizer", label: "Penyelenggara", icon: FaBuilding },
  { to: "/admin/users", label: "Pengguna", icon: FaUsers },
  { to: "/admin/finance", label: "Keuangan", icon: FaChartLine },
  { to: "/admin/feedback", label: "Masukan", icon: FaComments },
  { to: "/event-kamu", label: "Event Dikelola", icon: FaCalendarAlt },
  { to: "/buat-event", label: "Buat Event", icon: FaPlusCircle },
];

const footerNav = [{ to: "/pengaturan", label: "Pengaturan", icon: FaCog }];

function SidebarLinks({ items, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.exact}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-brand-50 text-brand-700"
                : "text-[#4a4a4a] hover:bg-[#f4f4f4] hover:text-[#1f1f1f]"
            }`
          }
        >
          <item.icon className="text-base" />
          <span className="truncate">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarContent({ user, isAdmin, onLogout, onNavigate }) {
  const mainNav = isAdmin ? adminNav : userNav;
  return (
    <div className="flex h-full flex-col">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2 border-b border-[#eee] px-5 py-4"
      >
        <img src={brandLogo} alt="brand logo" className="w-10" />
        <div className="flex flex-col leading-tight">
          <span className="text-base font-extrabold text-[#1f1f1f]">
            Ramein
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2ea387]">
            {isAdmin ? "Admin · Data Master" : "Akun Saya"}
          </span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9a9a9a]">
          Menu
        </p>
        <SidebarLinks items={mainNav} onNavigate={onNavigate} />

        <p className="mt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9a9a9a]">
          Akun
        </p>
        <SidebarLinks items={footerNav} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-[#eee] p-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#f9fbfa] px-3 py-2.5">
          <UserAvatar className="h-9 w-9 shrink-0 ring-1 ring-black/5" />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-[#1f1f1f]">
              {user.name}
              {isAdmin && <FaUserShield className="text-xs text-[#2ea387]" />}
            </p>
            <p className="truncate text-[11px] text-[#6d6d6d]">{user.email}</p>
          </div>
        </div>
        <Link
          to="/"
          onClick={onNavigate}
          className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#6d6d6d] transition hover:bg-[#f4f4f4] hover:text-[#1f1f1f]"
        >
          <FaArrowLeft className="text-xs" />
          Kembali ke Beranda
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt className="text-xs" />
          Keluar
        </button>
      </div>
    </div>
  );
}

function AdminLayout({ title, subtitle, actions, children }) {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#eee] bg-white lg:block">
        <SidebarContent user={user} isAdmin={isAdmin} onLogout={handleLogout} />
      </aside>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-[#eee] bg-white shadow-xl lg:hidden">
            <SidebarContent
              user={user}
              isAdmin={isAdmin}
              onLogout={handleLogout}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#eee] bg-white px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1f1f1f] hover:bg-[#f4f4f4] lg:hidden"
          >
            <FaBars />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-[#1f1f1f] sm:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-[#6d6d6d] sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
