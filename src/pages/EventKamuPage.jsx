import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatDateTime, formatIDR, formatNumber } from '../lib/format'

const statusStyles = {
  active: 'bg-emerald-500 text-white',
  published: 'bg-emerald-500 text-white',
  pending: 'bg-amber-500 text-white',
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

function EventKamuPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    api
      .getMyEvents()
      .then((res) => {
        if (!cancelled) setEvents(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat event.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
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
              <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-brand-400 to-brand-600 sm:h-44 sm:w-60">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                    statusStyles[event.status] ?? 'bg-gray-500 text-white'
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col">
                <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span>{formatDateTime(event.dateLabel)}</span>
                  <span>{event.city}</span>
                  <span>{event.category}</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  <Stat label="Terjual" value={formatNumber(event.registered)} accent="text-brand-600" />
                  <Stat label="Kuota" value={formatNumber(event.totalQuota)} accent="text-emerald-600" />
                  <Stat
                    label="Revenue"
                    value={event.revenue > 0 ? formatIDR(event.revenue) : formatIDR(0)}
                    accent="text-gray-900"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="rounded-2xl border border-[#eee] bg-white p-12 text-center">
          <p className="text-gray-500">Memuat event...</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
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
