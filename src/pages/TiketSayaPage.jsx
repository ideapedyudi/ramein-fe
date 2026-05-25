import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaMapMarkerAlt, FaQrcode, FaTicketAlt } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'

const statusStyle = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  used: 'bg-gray-100 text-gray-600 ring-gray-200',
  refunded: 'bg-amber-50 text-amber-700 ring-amber-200',
}

const filters = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'used', label: 'Sudah Dipakai' },
]

function TicketCard({ ticket }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row">
      <div className="h-32 w-full shrink-0 overflow-hidden bg-[#f3f3f3] sm:h-auto sm:w-48">
        {ticket.imageUrl && (
          <img src={ticket.imageUrl} alt={ticket.eventName} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">
              {ticket.id}
            </p>
            <h3 className="mt-0.5 truncate text-base font-bold text-[#1f1f1f] sm:text-lg">
              {ticket.eventName}
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ring-1 ${
              statusStyle[ticket.status] ?? 'bg-gray-100 text-gray-600 ring-gray-200'
            }`}
          >
            {ticket.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6d6d6d]">
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt className="text-brand-500" />
            {ticket.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-brand-500" />
            {ticket.location}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[#f0f0f0] pt-3">
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Tier</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{ticket.tier}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Jumlah</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{ticket.quantity}x</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Total</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{formatIDR(ticket.price * ticket.quantity)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            disabled={ticket.status !== 'active'}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FaQrcode /> Tampilkan QR
          </button>
          <Link
            to={`/event/${ticket.eventId}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[#e2e2e2] px-3 py-2 text-xs font-semibold text-[#373737] hover:bg-[#f9f9f9]"
          >
            Detail Event
          </Link>
        </div>
      </div>
    </article>
  )
}

function TiketSayaPage() {
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let cancelled = false
    api.getMyTickets().then((res) => {
      if (!cancelled) setTickets(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return tickets
    return tickets.filter((t) => t.status === filter)
  }, [filter, tickets])

  return (
    <AdminLayout title="Tiket Saya" subtitle="Semua tiket yang sudah kamu beli">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              filter === f.value
                ? 'bg-brand-600 text-white'
                : 'border border-[#e2e2e2] bg-white text-[#4a4a4a] hover:bg-[#f9f9f9]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d5d5d5] bg-white p-10 text-center">
          <FaTicketAlt className="mx-auto text-3xl text-[#c5c5c5]" />
          <p className="mt-3 text-sm font-medium text-[#4a4a4a]">Belum ada tiket di kategori ini.</p>
          <Link
            to="/jelajahi"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Jelajahi Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default TiketSayaPage
