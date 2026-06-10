import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaCheck, FaMoneyBillWave, FaSearch, FaSyncAlt, FaTimes } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDateTime, formatIDR } from '../../lib/format'

const statusStyle = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  rejected: 'bg-red-50 text-red-700 ring-red-200',
}

const statusLabel = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak',
}

const filters = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' },
]

function AdminWithdrawPage() {
  const [withdraws, setWithdraws] = useState([])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState('')

  const loadWithdraws = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const res = await api.getAllWithdraws()
      setWithdraws(res)
    } catch (err) {
      setError(err.message || 'Gagal memuat data pencairan dana.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => {
      if (!cancelled) loadWithdraws()
    })
    return () => {
      cancelled = true
    }
  }, [loadWithdraws])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    return withdraws.filter((withdraw) => {
      if (filter !== 'all' && withdraw.status !== filter) return false
      if (!q) return true

      return (
        withdraw.id.toLowerCase().includes(q) ||
        withdraw.event.title.toLowerCase().includes(q) ||
        withdraw.user.name.toLowerCase().includes(q) ||
        withdraw.user.email.toLowerCase().includes(q) ||
        withdraw.bankName.toLowerCase().includes(q) ||
        withdraw.bankAccount.toLowerCase().includes(q) ||
        withdraw.accountNumber.toLowerCase().includes(q)
      )
    })
  }, [filter, query, withdraws])

  const totals = useMemo(
    () => ({
      count: withdraws.length,
      amount: withdraws.reduce((sum, withdraw) => sum + withdraw.totalAmount, 0),
      pending: withdraws.filter((withdraw) => withdraw.status === 'pending').length,
    }),
    [withdraws],
  )

  async function handleUpdateStatus(withdraw, status) {
    setUpdatingId(withdraw.id)
    setError('')

    try {
      const updated = await api.updateWithdrawStatus(withdraw.id, status)
      setWithdraws((current) =>
        current.map((item) =>
          item.id === withdraw.id
            ? {
                ...item,
                ...(updated?.id ? updated : {}),
                status,
                isApproval: status === 'approved',
              }
            : item,
        ),
      )
    } catch (err) {
      setError(err.message || 'Gagal mengubah status pencairan dana.')
    } finally {
      setUpdatingId('')
    }
  }

  return (
    <AdminLayout title="Tarik Dana" subtitle="Persetujuan pencairan pendapatan event">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Total Pengajuan
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{formatIDR(totals.amount)}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">{totals.count} pencairan</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Menunggu Persetujuan
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{totals.pending}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Perlu ditinjau admin</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Data Ditampilkan
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{filtered.length}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Sesuai saringan aktif</p>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-[#eee] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#eee] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  filter === item.value
                    ? 'bg-brand-600 text-white'
                    : 'border border-[#e2e2e2] bg-white text-[#4a4a4a] hover:bg-[#f9f9f9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9a9a9a]" />
              <input
                type="search"
                placeholder="Cari pengguna / event / bank"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-lg border border-[#e2e2e2] py-2 pl-9 pr-3 text-xs outline-none focus:border-brand-500 sm:w-72"
              />
            </div>
            <button
              type="button"
              onClick={loadWithdraws}
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e2e2e2] px-3 py-2 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7] disabled:opacity-50"
            >
              <FaSyncAlt className="text-[10px]" />
              Muat Ulang
            </button>
          </div>
        </div>

        {error && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Pengguna</th>
                <th className="px-4 py-3 font-medium">Bank</th>
                <th className="px-4 py-3 font-medium">Rekening</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {filtered.map((withdraw) => {
                const busy = updatingId === withdraw.id
                const isFinal = withdraw.status !== 'pending'

                return (
                  <tr key={withdraw.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1f1f1f]">{withdraw.event.title}</p>
                      <p className="font-mono text-[11px] text-[#6d6d6d]">{withdraw.eventId}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1f1f1f]">{withdraw.user.name}</p>
                      <p className="text-xs text-[#6d6d6d]">{withdraw.user.email}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#1f1f1f]">{withdraw.bankName}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1f1f1f]">{withdraw.bankAccount}</p>
                      <p className="font-mono text-xs text-[#6d6d6d]">{withdraw.accountNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#1f1f1f]">
                      {formatIDR(withdraw.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${
                          statusStyle[withdraw.status] ?? 'bg-gray-100 text-gray-600 ring-gray-200'
                        }`}
                      >
                        {statusLabel[withdraw.status] ?? withdraw.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6d6d6d]">
                      {formatDateTime(withdraw.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(withdraw, 'approved')}
                          disabled={busy || isFinal}
                          className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaCheck className="text-[10px]" />
                          Setujui
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(withdraw, 'rejected')}
                          disabled={busy || isFinal}
                          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTimes className="text-[10px]" />
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {loading && <div className="p-10 text-center text-sm text-[#6d6d6d]">Memuat pencairan dana...</div>}

        {!loading && filtered.length === 0 && (
          <div className="p-10 text-center">
            <FaMoneyBillWave className="mx-auto text-3xl text-[#c5c5c5]" />
            <p className="mt-3 text-sm font-medium text-[#4a4a4a]">Belum ada data pencairan dana.</p>
          </div>
        )}
      </section>
    </AdminLayout>
  )
}

export default AdminWithdrawPage
