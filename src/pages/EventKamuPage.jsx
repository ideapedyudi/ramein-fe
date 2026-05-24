import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatIDR, formatNumber } from '../lib/format'

const statusStyles = {
  active: 'bg-emerald-500 text-white',
  ended: 'bg-gray-500 text-white',
  draft: 'bg-amber-500 text-white',
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-0.5 text-base font-bold ${accent}`}>{value}</p>
    </div>
  )
}

function ShareIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function EventKamuPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    let cancelled = false
    api.getMyEvents().then((res) => {
      if (!cancelled) setEvents(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AdminLayout
      title="Event Saya"
      subtitle={`${events.length} event yang kamu kelola`}
      actions={
        <Link
          to="/buat-event"
          className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 sm:px-4 sm:text-sm"
        >
          + Buat Event Baru
        </Link>
      }
    >
      <div className="space-y-5">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/event-kamu/${event.id}`}
            className="block overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-col gap-6 p-4 sm:flex-row sm:p-5">
              <div
                className={`relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-linear-to-br sm:h-44 sm:w-60 ${event.bannerHue ?? 'from-brand-400 to-brand-600'}`}
              >
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${statusStyles[event.status] ?? 'bg-gray-500 text-white'}`}
                >
                  {event.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col">
                <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1.5">📅 {event.dateLabel}</span>
                  <span className="inline-flex items-center gap-1.5">📍 {event.city}</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  <Stat
                    label="Terdaftar"
                    value={formatNumber(event.registered)}
                    accent="text-brand-600"
                  />
                  <Stat
                    label="Hadir"
                    value={formatNumber(event.attended)}
                    accent="text-emerald-600"
                  />
                  <Stat
                    label="Revenue"
                    value={event.revenue > 0 ? formatIDR(event.revenue) : 'Gratis'}
                    accent="text-gray-900"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <ShareIcon /> Share
                  </button>
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <SettingsIcon /> Edit
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">Belum ada event. Yuk buat event pertama kamu!</p>
          <Link
            to="/buat-event"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + Buat Event Baru
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}

export default EventKamuPage
