import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatIDR, formatNumber } from '../lib/format'

const dummyAttendees = [
  { name: 'Andi Pratama', email: 'andi@example.com', tier: 'VIP', status: 'Belum Hadir' },
  { name: 'Budi Santoso', email: 'budi@example.com', tier: 'Regular', status: 'Belum Hadir' },
  { name: 'Citra Dewi', email: 'citra@example.com', tier: 'VIP', status: 'Belum Hadir' },
  { name: 'Dimas Aji', email: 'dimas@example.com', tier: 'Regular', status: 'Belum Hadir' },
]

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
      <div className="mt-1 text-sm text-gray-900">{children ?? value}</div>
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
  const [notFound, setNotFound] = useState(false)
  const [tab, setTab] = useState('detail')

  useEffect(() => {
    let cancelled = false
    api.getMyEvent(eventId).then((res) => {
      if (cancelled) return
      if (!res) {
        setNotFound(true)
        return
      }
      setEvent(res)
    })
    return () => {
      cancelled = true
    }
  }, [eventId])

  if (notFound) {
    return (
      <AdminLayout title="Event tidak ditemukan">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-gray-900">Event tidak ditemukan</h2>
          <Link to="/event-kamu" className="mt-4 inline-block text-brand-600 hover:underline">
            ← Kembali ke Event Saya
          </Link>
        </div>
      </AdminLayout>
    )
  }

  if (!event) {
    return (
      <AdminLayout title="Memuat…">
        <p className="text-sm text-gray-500">Memuat detail event…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title={event.name}
      subtitle={`${event.dateLabel} • ${event.city}`}
      actions={
        <>
          <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 sm:text-sm">
            Share Link
          </button>
          <button className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700 sm:text-sm">
            📷 Scan QR
          </button>
        </>
      }
    >
      <Link
        to="/event-kamu"
        className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600"
      >
        ← Kembali ke Event Saya
      </Link>

      <div>
        <div className="-mx-4 overflow-x-auto border-b border-gray-200 px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-6 sm:gap-8">
            {[
              { key: 'detail', label: 'Detail Event' },
              { key: 'pendaftar', label: `Pendaftar (${formatNumber(event.registered)})` },
              { key: 'hadir', label: `Hadir (${formatNumber(event.attended)})` },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative -mb-px whitespace-nowrap border-b-2 px-1 pb-3 pt-2 text-sm font-medium transition ${
                  tab === t.key
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {tab === 'detail' && (
            <>
              <Card>
                <CardHeader title="Informasi Event" />
                <div
                  className={`relative mb-5 h-44 overflow-hidden rounded-xl bg-linear-to-br sm:h-56 md:h-64 ${event.bannerHue ?? 'from-brand-400 to-brand-600'}`}
                >
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
                  <Info label="Tanggal" value={`${event.dateLabel}, 18:00 WIB`} />
                  <Info label="Lokasi" value={event.city} />
                  <Info label="Kategori" value={event.category} />
                  <Info label="Status">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold uppercase text-emerald-700">
                      {event.status}
                    </span>
                  </Info>
                </div>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-500">Deskripsi</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">
                    Event ini dikelola oleh kamu sebagai organizer. Pendaftar bisa membeli tiket secara online
                    dan validasi tiket dilakukan menggunakan QR Code.
                  </p>
                </div>
              </Card>

              <Card>
                <CardHeader title="Statistik" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <BigStat label="Terdaftar" value={formatNumber(event.registered)} accent="text-brand-600" />
                  <BigStat label="Hadir" value={formatNumber(event.attended)} accent="text-emerald-600" />
                  <BigStat label="Kuota" value={formatNumber(event.totalQuota)} accent="text-amber-600" />
                  <BigStat
                    label="Revenue"
                    value={event.revenue > 0 ? formatIDR(event.revenue) : 'Gratis'}
                    accent="text-rose-600"
                  />
                </div>
              </Card>
            </>
          )}

          {tab === 'pendaftar' && (
            <Card>
              <CardHeader title="Daftar Pendaftar" />
              <div className="-mx-4 overflow-x-auto sm:mx-0">
                <div className="min-w-140 overflow-hidden border-y border-gray-100 sm:rounded-xl sm:border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Tiket</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {dummyAttendees.map((a) => (
                        <tr key={a.email} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                          <td className="px-4 py-3 text-gray-600">{a.email}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                              {a.tier}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{a.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}

          {tab === 'hadir' && (
            <Card>
              <CardHeader title="Validasi Kehadiran" />
              <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-4xl">📷</p>
                <p className="mt-3 font-medium text-gray-700">Scan QR Code peserta</p>
                <p className="mt-1 text-sm text-gray-500">Belum ada peserta yang melakukan check-in</p>
                <button className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  Mulai Scan
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default EventKamuDetailPage
