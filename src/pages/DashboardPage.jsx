import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaReceipt,
  FaTicketAlt,
  FaWallet,
} from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'

const statusBadge = {
  paid: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
  active: 'bg-emerald-50 text-emerald-700',
  used: 'bg-gray-100 text-gray-600',
  ended: 'bg-gray-100 text-gray-600',
}

function StatCard({ icon: Icon, label, value, accent, hint }) {
  return (
    <div className="rounded-2xl border border-[#eee] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{value}</p>
          {hint && <p className="mt-1 text-xs text-[#6d6d6d]">{hint}</p>}
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>
          <Icon className="text-base" />
        </span>
      </div>
    </div>
  )
}

function DashboardPage() {
  const { user, isAdmin } = useAuth()
  const [tickets, setTickets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    let cancelled = false
    Promise.all([
      api.getMyTickets(),
      api.getMyTransactions(),
      isAdmin ? api.getMyEvents() : Promise.resolve([]),
    ]).then(([t, tx, ev]) => {
      if (cancelled) return
      setTickets(t)
      setTransactions(tx)
      setEvents(ev)
    })
    return () => {
      cancelled = true
    }
  }, [isAdmin])

  const activeTickets = tickets.filter((t) => t.status === 'active').length
  const totalSpent = transactions
    .filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + t.total, 0)
  const pendingCount = transactions.filter((t) => t.status === 'pending').length
  const recentTx = transactions.slice(0, 4)
  const upcomingTickets = tickets.filter((t) => t.status === 'active').slice(0, 3)

  return (
    <AdminLayout title={`Selamat datang, ${user.name}`} subtitle="Ringkasan akun & aktivitas kamu">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FaTicketAlt}
          label="Tiket Aktif"
          value={activeTickets}
          accent="bg-emerald-50 text-emerald-700"
          hint={`${tickets.length} total tiket`}
        />
        <StatCard
          icon={FaWallet}
          label="Total Pembelian"
          value={formatIDR(totalSpent)}
          accent="bg-brand-50 text-brand-700"
          hint={`${transactions.length} transaksi`}
        />
        <StatCard
          icon={FaReceipt}
          label="Menunggu Pembayaran"
          value={pendingCount}
          accent="bg-amber-50 text-amber-700"
          hint={pendingCount > 0 ? 'Selesaikan pembayaran' : 'Semua lunas'}
        />
        <StatCard
          icon={FaCalendarAlt}
          label={isAdmin ? 'Event Saya' : 'Event Diikuti'}
          value={isAdmin ? events.length : new Set(tickets.map((t) => t.eventId)).size}
          accent="bg-violet-50 text-violet-700"
          hint={isAdmin ? 'Sebagai organizer' : 'Sebagai peserta'}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-[#eee] bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1f1f1f]">Transaksi Terbaru</h2>
            <Link
              to="/transaksi"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              Lihat semua <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#eee] text-xs uppercase text-[#9a9a9a]">
                  <th className="pb-2 font-medium">Order ID</th>
                  <th className="pb-2 font-medium">Event</th>
                  <th className="pb-2 font-medium text-right">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {recentTx.map((t) => (
                  <tr key={t.id}>
                    <td className="py-3 text-xs font-mono text-[#6d6d6d]">{t.id}</td>
                    <td className="py-3">
                      <p className="font-medium text-[#1f1f1f]">{t.eventName}</p>
                      <p className="text-xs text-[#6d6d6d]">{t.createdAt}</p>
                    </td>
                    <td className="py-3 text-right font-semibold text-[#1f1f1f]">
                      {formatIDR(t.total)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          statusBadge[t.status] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-[#eee] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1f1f1f]">Tiket Mendatang</h2>
            <Link
              to="/tiket-saya"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              Lihat semua <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingTickets.length === 0 && (
              <p className="rounded-lg bg-[#f9fbfa] p-4 text-center text-xs text-[#6d6d6d]">
                Belum ada tiket aktif.
              </p>
            )}
            {upcomingTickets.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-xl border border-[#eee] p-3"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f3f3f3]">
                  {t.imageUrl && (
                    <img src={t.imageUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1f1f1f]">{t.eventName}</p>
                  <p className="truncate text-xs text-[#6d6d6d]">
                    {t.dateLabel} • {t.tier}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage
