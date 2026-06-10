import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import EventImage from '../components/EventImage'
import MarqueeText from '../components/MarqueeText'
import { api } from '../lib/api'
import { formatDateTime, formatNumber } from '../lib/format'

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
  const [deletingId, setDeletingId] = useState(null)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getMyEvents()
      setEvents(res)
    } catch (err) {
      setError(err.message || 'Gagal memuat event.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEvents()
    }, 0)

    return () => clearTimeout(timer)
  }, [loadEvents])

  async function handleDelete(event) {
    const confirmed = window.confirm(`Hapus event "${event.name}"?`)
    if (!confirmed) return

    setDeletingId(event.id)
    setError('')
    try {
      await api.deleteEvent(event.id)
      setEvents((current) => current.filter((item) => item.id !== event.id))
    } catch (err) {
      setError(err.message || 'Gagal menghapus event.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminLayout
      title="Event Kamu"
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
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              to={`/event-kamu/${event.id}`}
              className={`relative w-full overflow-hidden bg-linear-to-br from-brand-400 to-brand-600 ${
                event.imageUrl ? '' : 'aspect-video'
              }`}
            >
              <EventImage src={event.imageUrl} alt={event.name} />
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                  statusStyles[event.eventType] ?? 'bg-brand-600 text-white'
                }`}
              >
                {event.eventType}
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <Link to={`/event-kamu/${event.id}`} className="text-base font-bold text-gray-900 hover:text-brand-700">
                <MarqueeText text={event.name} />
              </Link>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                <span>{formatDateTime(event.dateLabel)}</span>
                <span>{event.city}</span>
                <span>{event.category}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 border-t border-gray-100 pt-3">
                <Stat label="Terjual" value={formatNumber(event.registered)} accent="text-brand-600" />
                <Stat label="Kuota" value={formatNumber(event.totalQuota)} accent="text-emerald-600" />
                <Stat
                  label="Visibilitas"
                  value={event.visibility ?? (event.isPublished ? 'Tampil' : 'Draf')}
                  accent="text-emerald-600"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                <Link
                  to={`/event-kamu/${event.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <FaEdit className="text-[11px]" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(event)}
                  disabled={deletingId === event.id}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaTrashAlt className="text-[11px]" />
                  {deletingId === event.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          </article>
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
