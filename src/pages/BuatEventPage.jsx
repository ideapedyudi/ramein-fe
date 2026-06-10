import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { useAuth } from "../context/authContext";

function TicketIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
      <path d="M13 5v2M13 17v2M13 11v2" />
    </svg>
  );
}

function SparkleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowRight({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function BroadcastIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49" />
    </svg>
  );
}

function FestivalCard() {
  const tiers = [
    { name: "Regular", price: "Rp 500.000", available: 150 },
    { name: "VIP", price: "Rp 1.500.000", available: 50 },
    { name: "VVIP", price: "Rp 3.000.000", available: 20 },
  ];

  return (
    <Link
      to="/buat-event/festival"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-xl"
    >
      <div className="border-b border-gray-100 bg-gray-50/40 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-100 text-rose-700">
            <TicketIcon className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400">
            01 — Festival
          </span>
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
          Festival & Tiket
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Untuk konser, festival, dan seminar berbayar dengan tiket berjenjang.
        </p>
      </div>

      <div className="flex-1 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Kategori tiket
        </p>
        <ul className="mt-3 space-y-2">
          {tiers.map((t) => (
            <li
              key={t.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-gray-50 text-[10px] font-bold uppercase text-gray-500">
                  {t.name.slice(0, 3)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {t.available} tiket tersedia
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900 tabular-nums">
                {t.price}
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-5 space-y-1.5 text-sm text-gray-700">
          {[
            "Validasi QR Code di gerbang",
            "Dashboard penjualan real-time",
            "Pencairan dana H+3 setelah event",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 text-sm font-semibold text-gray-900 transition group-hover:bg-gray-50/50">
        <span>Mulai bikin festival</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function GatheringCard() {
  return (
    <Link
      to="/buat-event/gathering"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-xl"
    >
      <div className="border-b border-gray-100 bg-gray-50/40 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <SparkleIcon className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400">
            02 — Meetup
          </span>
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
          Meetup & Gathering
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Untuk komunitas, workshop, webinar, atau online event dengan RSVP
          cepat.
        </p>
      </div>

      <div className="flex-1 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Tampilan RSVP
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="grid grid-cols-[64px_1fr] gap-3 p-4">
            <div className="overflow-hidden rounded-lg bg-brand-50 text-center">
              <div className="bg-brand-600 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Sab
              </div>
              <div className="py-1.5 text-xl font-bold text-brand-700">23</div>
              <div className="pb-1 text-[10px] uppercase text-brand-700">
                Mei
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                React Jakarta Monthly Meetup
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                19:00 · Online via Zoom
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700">
                <BroadcastIcon className="h-3 w-3" /> Online · RSVP Gratis
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 p-3">
            <button
              type="button"
              tabIndex={-1}
              className="w-full cursor-default rounded-lg bg-brand-600 py-2 text-xs font-semibold text-white"
            >
              RSVP — Gratis
            </button>
          </div>
        </div>
        <ul className="mt-5 space-y-1.5 text-sm text-gray-700">
          {[
            "Link Zoom otomatis ke peserta",
            "Publik atau private invite-only",
            "Cocok untuk komunitas & online event",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 text-sm font-semibold text-gray-900 transition group-hover:bg-gray-50/50">
        <span>Mulai bikin meetup</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function BuatEventPage() {
  const { isAdmin } = useAuth();
  return (
    <AdminLayout
      title="Buat Event"
      subtitle={
        isAdmin
          ? "Pilih tipe event yang ingin kamu buat"
          : "Buat meetup, gathering, atau event RSVP privat"
      }
      actions={
        <Link
          to="/event-kamu"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 sm:px-4 sm:text-sm"
        >
          Event Saya
        </Link>
      }
    >
      {!isAdmin && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 sm:text-sm">
          Sebagai user kamu bisa membuat <span className="font-semibold">event RSVP / privat</span>. Untuk event
          publik berbayar dengan tiket berjenjang (Festival & Tiket), silakan hubungi admin Ramein.
        </div>
      )}
      <div
        className={`grid gap-6 ${
          isAdmin ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        {isAdmin && <FestivalCard />}
        <GatheringCard />
      </div>
    </AdminLayout>
  );
}

export default BuatEventPage;
