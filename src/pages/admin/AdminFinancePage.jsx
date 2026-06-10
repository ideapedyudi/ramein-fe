import { useEffect, useMemo, useState } from 'react'
import { FaFileExcel, FaSearch, FaSyncAlt } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDateTime, formatIDR } from '../../lib/format'

function escapeExcelCell(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function exportFinanceToExcel(rows, organizerName) {
  const headers = [
    'ID',
    'Pengguna',
    'Email',
    'Event',
    'Penyelenggara',
    'Jumlah Kotor',
    'Pendapatan Admin',
    'Waktu Transaksi',
    'Diterbitkan Oleh',
  ]
  const tableRows = rows.map((row) => [
    row.id,
    row.user.name,
    row.user.email,
    row.event.title,
    row.organizer.name,
    row.grossAmount,
    row.adminIncome,
    formatDateTime(row.transactionTime),
    row.publishedBy,
  ])
  const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead>
            <tr>${headers.map((header) => `<th>${escapeExcelCell(header)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${tableRows
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${escapeExcelCell(cell)}</td>`).join('')}</tr>`,
      )
      .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const safeOrganizer = String(organizerName || 'organizer')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  anchor.href = url
  anchor.download = `finance-${safeOrganizer || 'organizer'}.xls`
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function AdminFinancePage() {
  const [organizers, setOrganizers] = useState([])
  const [organizerId, setOrganizerId] = useState('')
  const [financeRows, setFinanceRows] = useState([])
  const [query, setQuery] = useState('')
  const [loadingMaster, setLoadingMaster] = useState(true)
  const [loadingFinance, setLoadingFinance] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    api
      .getMasterOrganizers()
      .then((res) => {
        if (cancelled) return
        setOrganizers(res)
        setOrganizerId((current) => current || res[0]?.id || '')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat penyelenggara.')
      })
      .finally(() => {
        if (!cancelled) setLoadingMaster(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!organizerId) {
      Promise.resolve().then(() => setFinanceRows([]))
      return
    }

    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return null
      setLoadingFinance(true)
      setError('')
      return api.getAdminFinance(organizerId)
    })
      .then((res) => {
        if (!cancelled && res) setFinanceRows(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat keuangan.')
      })
      .finally(() => {
        if (!cancelled) setLoadingFinance(false)
      })

    return () => {
      cancelled = true
    }
  }, [organizerId])

  const selectedOrganizer = organizers.find((organizer) => organizer.id === organizerId)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    if (!q) return financeRows

    return financeRows.filter((row) =>
      [
        row.id,
        row.transactionId,
        row.user.name,
        row.user.email,
        row.event.title,
        row.organizer.name,
        row.publishedBy,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    )
  }, [financeRows, query])

  const totals = useMemo(
    () => ({
      gross: filtered.reduce((sum, row) => sum + row.grossAmount, 0),
      adminIncome: filtered.reduce((sum, row) => sum + row.adminIncome, 0),
      count: filtered.length,
    }),
    [filtered],
  )

  function refreshFinance() {
    if (!organizerId) return
    setLoadingFinance(true)
    setError('')
    api
      .getAdminFinance(organizerId)
      .then(setFinanceRows)
      .catch((err) => setError(err.message || 'Gagal memuat keuangan.'))
      .finally(() => setLoadingFinance(false))
  }

  return (
    <AdminLayout title="Keuangan" subtitle="Laporan pemasukan admin berdasarkan penyelenggara">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Jumlah Kotor
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{formatIDR(totals.gross)}</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">{totals.count} transaksi</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Pendapatan Admin
          </p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">
            {formatIDR(totals.adminIncome)}
          </p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Dari data tersaring</p>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">
            Penyelenggara
          </p>
          <p className="mt-2 truncate text-2xl font-bold text-[#1f1f1f]">
            {selectedOrganizer?.name ?? '-'}
          </p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Saringan aktif</p>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-[#eee] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#eee] p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="grid gap-2 sm:grid-cols-[260px_260px]">
            <select
              value={organizerId}
              onChange={(event) => setOrganizerId(event.target.value)}
              disabled={loadingMaster}
              className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
            >
              <option value="">Pilih penyelenggara</option>
              {organizers.map((organizer) => (
                <option key={organizer.id} value={organizer.id}>
                  {organizer.name}
                </option>
              ))}
            </select>
            <label className="relative">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9a9a9a]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari transaksi..."
                className="w-full rounded-lg border border-[#e2e2e2] bg-white py-2 pl-8 pr-3 text-xs outline-none focus:border-brand-500"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={refreshFinance}
              disabled={!organizerId || loadingFinance}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e2e2e2] px-3 py-2 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaSyncAlt className="text-[10px]" />
              Muat Ulang
            </button>
            <button
              type="button"
              onClick={() => exportFinanceToExcel(filtered, selectedOrganizer?.name)}
              disabled={filtered.length === 0}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <FaFileExcel className="text-[10px]" />
              Ekspor Excel
            </button>
          </div>
        </div>

        {error && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-4 py-3 font-medium">Transaksi</th>
                <th className="px-4 py-3 font-medium">Pengguna</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Penyelenggara</th>
                <th className="px-4 py-3 text-right font-medium">Kotor</th>
                <th className="px-4 py-3 text-right font-medium">Pendapatan Admin</th>
                <th className="px-4 py-3 font-medium">Diterbitkan</th>
                <th className="px-4 py-3 font-medium">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-4 py-3">
                    <p className="font-mono text-xs text-[#1f1f1f]">{row.transactionId}</p>
                    <p className="font-mono text-[11px] text-[#6d6d6d]">{row.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1f1f1f]">{row.user.name}</p>
                    <p className="text-xs text-[#6d6d6d]">{row.user.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1f1f1f]">{row.event.title}</p>
                    <p className="font-mono text-[11px] text-[#6d6d6d]">{row.eventId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1f1f1f]">{row.organizer.name}</p>
                    <p className="font-mono text-[11px] text-[#6d6d6d]">{row.organizerId}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#1f1f1f]">
                    {formatIDR(row.grossAmount)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-brand-700">
                    {formatIDR(row.adminIncome)}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase text-[#4a4a4a]">{row.publishedBy}</td>
                  <td className="px-4 py-3 text-xs text-[#6d6d6d]">
                    {formatDateTime(row.transactionTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(loadingMaster || loadingFinance) && (
          <div className="p-10 text-center text-sm text-[#6d6d6d]">Memuat keuangan...</div>
        )}

        {!loadingMaster && !loadingFinance && filtered.length === 0 && (
          <div className="p-10 text-center text-sm text-[#6d6d6d]">
            Belum ada data keuangan untuk saringan ini.
          </div>
        )}
      </section>
    </AdminLayout>
  )
}

export default AdminFinancePage
