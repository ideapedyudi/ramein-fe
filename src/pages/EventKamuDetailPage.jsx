import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatDateTime, formatIDR, formatNumber } from '../lib/format'

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">{children}</div>
  )
}

function CardHeader({ title }) {
  return <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
}

function Info({ label, value, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <div className="mt-1 text-sm text-gray-900">{children ?? value ?? '-'}</div>
    </div>
  )
}

function BigStat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-black/5 bg-gray-50/40 p-4">
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  )
}

function EventKamuDetailPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('detail')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    api
      .getMyEvent(eventId)
      .then((res) => {
        if (cancelled) return
        if (!res) setError('Event tidak ditemukan.')
        else setEvent(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Event tidak ditemukan.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [eventId])

  if (loading) {
    return (
      <AdminLayout title="Memuat...">
        <p className="text-sm text-gray-500">Memuat detail event...</p>
      </AdminLayout>
    )
  }

  if (error || !event) {
    return (
      <AdminLayout title="Event tidak ditemukan">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-gray-900">{error || 'Event tidak ditemukan.'}</h2>
          <Link to="/event-kamu" className="mt-4 inline-block text-brand-600 hover:underline">
            Kembali ke Event Saya
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title={event.name ?? '-'}
      subtitle={`${formatDateTime(event.startDateTime)} - ${event.city}`}
      actions={
        <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 sm:text-sm">
          Share Link
        </button>
      }
    >
      <Link to="/event-kamu" className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600">
        Kembali ke Event Saya
      </Link>

      <div>
        <div className="-mx-4 overflow-x-auto border-b border-gray-200 px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-6 sm:gap-8">
            {[
              { key: 'detail', label: 'Detail Event' },
              { key: 'ticket', label: `Tiket (${event.ticketTypes?.length ?? 0})` },
              { key: 'statistik', label: 'Statistik' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`relative -mb-px whitespace-nowrap border-b-2 px-1 pb-3 pt-2 text-sm font-medium transition ${tab === item.key
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {tab === 'detail' && (
            <Card>
              <CardHeader title="Informasi Event" />
              <div className="relative mb-5 h-44 overflow-hidden rounded-xl bg-linear-to-br from-brand-400 to-brand-600 sm:h-56 md:h-64">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="Mulai" value={formatDateTime(event.startDateTime)} />
                <Info label="Selesai" value={formatDateTime(event.endDateTime)} />
                <Info label="Kota" value={event.city} />
                <Info label="Alamat" value={event.addressDetail} />
                <Info label="Kategori" value={event.category} />
                <Info label="Organizer" value={event.organizer?.name} />
                <Info label="Status">
                  <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold uppercase text-amber-700">
                    {event.status ?? '-'}
                  </span>
                </Info>
                <Info label="Published" value={event.isPublished ? 'Ya' : 'Belum'} />
              </div>
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500">Deskripsi</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{event.description || '-'}</p>
              </div>
            </Card>
          )}

          {tab === 'ticket' && (
            <Card>
              <CardHeader title="Tipe Tiket" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Nama</th>
                      <th className="px-4 py-3">Harga</th>
                      <th className="px-4 py-3">Kuota</th>
                      <th className="px-4 py-3">Terjual</th>
                      <th className="px-4 py-3">Mulai Jual</th>
                      <th className="px-4 py-3">Akhir Jual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(event.ticketTypes ?? []).map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="px-4 py-3 font-medium text-gray-900">{ticket.name}</td>
                        <td className="px-4 py-3 text-gray-600">{formatIDR(ticket.price)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatNumber(ticket.quota)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatNumber(ticket.sold ?? 0)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDateTime(ticket.saleStartAt)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDateTime(ticket.saleEndAt)}</td>
                      </tr>
                    ))}
                    {(event.ticketTypes ?? []).length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          Belum ada tipe tiket.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {tab === 'statistik' && (
            <Card>
              <CardHeader title="Statistik" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <BigStat label="Terjual" value={formatNumber(event.registered)} accent="text-brand-600" />
                <BigStat label="Hadir" value={formatNumber(event.attended)} accent="text-emerald-600" />
                <BigStat label="Kuota" value={formatNumber(event.totalQuota)} accent="text-amber-600" />
                <BigStat
                  label="Revenue"
                  value={event.revenue > 0 ? formatIDR(event.revenue) : formatIDR(0)}
                  accent="text-rose-600"
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default EventKamuDetailPage
