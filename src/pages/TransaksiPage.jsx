import { useEffect, useMemo, useState } from 'react'
import { FaDownload, FaReceipt, FaSearch } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'

const statusStyle = {
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  failed: 'bg-red-50 text-red-700 ring-red-200',
  refunded: 'bg-gray-100 text-gray-600 ring-gray-200',
}

const filters = [
  { value: 'all', label: 'Semua' },
  { value: 'paid', label: 'Lunas' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'failed', label: 'Gagal' },
]

function TransaksiPage() {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    api.getMyTransactions().then((res) => {
      if (!cancelled) setTransactions(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return transactions.filter((t) => {
      if (filter !== 'all' && t.status !== filter) return false
      if (!q) return true
      return (
        t.id.toLowerCase().includes(q) ||
        t.eventName.toLowerCase().includes(q) ||
        t.paymentMethod.toLowerCase().includes(q)
      )
    })
  }, [filter, query, transactions])

  const totals = useMemo(() => {
    const paid = transactions.filter((t) => t.status === 'paid')
    return {
      count: paid.length,
      sum: paid.reduce((s, t) => s + t.total, 0),
      pending: transactions.filter((t) => t.status === 'pending').length,
    }
  }, [transactions])

  return (
    <AdminLayout title="Transaksi" subtitle="Riwayat pembelian dan status pembayaran">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Total Pembayaran
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{formatIDR(totals.sum)}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">{totals.count} transaksi sukses</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Menunggu Pembayaran
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{totals.pending}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Selesaikan sebelum kedaluwarsa</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Total Transaksi
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{transactions.length}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Sepanjang waktu</p>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-[#eee] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#eee] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  filter === f.value
                    ? 'bg-brand-600 text-white'
                    : 'border border-[#e2e2e2] bg-white text-[#4a4a4a] hover:bg-[#f9f9f9]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9a9a9a]" />
            <input
              type="search"
              placeholder="Cari order / event / metode"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-[#e2e2e2] py-2 pl-9 pr-3 text-xs outline-none focus:border-brand-500 sm:w-72"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Metode</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#fafafa]">
                  <td className="px-4 py-3 font-mono text-xs text-[#4a4a4a]">{t.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1f1f1f]">{t.eventName}</p>
                    <p className="text-xs text-[#6d6d6d]">
                      {t.tier} • {t.quantity}x
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6d6d6d]">{t.createdAt}</td>
                  <td className="px-4 py-3 text-xs text-[#4a4a4a]">{t.paymentMethod}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#1f1f1f]">
                    {formatIDR(t.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${
                        statusStyle[t.status] ?? 'bg-gray-100 text-gray-600 ring-gray-200'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      disabled={t.status !== 'paid'}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-xs font-medium text-[#4a4a4a] hover:bg-[#f9f9f9] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaDownload className="text-[10px]" /> Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center">
            <FaReceipt className="mx-auto text-3xl text-[#c5c5c5]" />
            <p className="mt-3 text-sm font-medium text-[#4a4a4a]">Tidak ada transaksi.</p>
          </div>
        )}
      </section>
    </AdminLayout>
  )
}

export default TransaksiPage
