import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChartLine,
  FaComments,
  FaCog,
  FaMoneyBillWave,
  FaReceipt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";

function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function ProfileMenu({ user, isAdmin, onLogout, variant = "desktop" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onDocClick(e) {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const items = isAdmin
    ? [
        { label: "Dashboard", to: "/dashboard", icon: FaTachometerAlt },
        { label: "Kategori", to: "/admin/kategori", icon: FaReceipt },
        { label: "Kota", to: "/admin/kota", icon: FaReceipt },
        { label: "Organizer", to: "/admin/organizer", icon: FaCalendarAlt },
        { label: "User", to: "/admin/users", icon: FaUsers },
        { label: "Finance", to: "/admin/finance", icon: FaChartLine },
        { label: "Feedback", to: "/admin/feedback", icon: FaComments },
        { label: "Event Dikelola", to: "/event-kamu", icon: FaCalendarAlt },
        { label: "Buat Event", to: "/buat-event", icon: FaTicketAlt },
        { label: "Pengaturan", to: "/pengaturan", icon: FaCog },
      ]
    : [
        { label: "Tiket Saya", to: "/tiket-saya", icon: FaTicketAlt },
        { label: "Transaksi", to: "/transaksi", icon: FaReceipt },
        { label: "Event Saya", to: "/event-kamu", icon: FaCalendarAlt },
        { label: "Buat Event", to: "/buat-event", icon: FaTicketAlt },
        { label: "Withdraw", to: "/withdraw", icon: FaMoneyBillWave },
        { label: "Pengaturan", to: "/pengaturan", icon: FaCog },
      ];

  const isAvatar = variant === "avatar";

  return (
    <div ref={wrapperRef} className="relative">
      {isAvatar ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Menu profil"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2ea387] ring-2 ring-white/40 transition hover:ring-white/70"
        >
          {initialsOf(user.name)}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2ea387]">
            {initialsOf(user.name)}
          </span>
          <span className="max-w-30 truncate">{user.name}</span>
          <svg
            className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {open && (
        <div
          role="menu"
          className="animate-dropdown absolute right-0 z-50 mt-2 flex max-h-[calc(100vh-5rem)] w-64 origin-top-right flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-[#f0f0f0] bg-[#f9fbfa] px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2ea387] text-sm font-bold text-white">
              {initialsOf(user.name)}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-[#1f1f1f]">
                {user.name}
                {isAdmin && (
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-emerald-700">
                    ADMIN
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-[#6d6d6d]">{user.email}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f1f1f] transition hover:bg-[#f4faf7] hover:text-[#2ea387]"
              >
                <item.icon className="text-base text-[#6d6d6d]" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="shrink-0 border-t border-[#f0f0f0] py-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <FaSignOutAlt className="text-base" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
