import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDate } from '../../lib/format'

function AdminKategoriPage() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    api
      .getMasterCategories()
      .then((res) => {
        if (!cancelled) setItems(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat kategori.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const value = name.trim()
    if (!value) return
    setBusy(true)
    setError('')
    try {
      const row = await api.createMasterCategory({ name: value })
      setItems((curr) => [row, ...curr])
      setName('')
    } catch (err) {
      setError(err.message || 'Gagal menambah kategori.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminLayout
      title="Kategori"
      subtitle="Master data kategori event"
    >
      <section className="rounded-2xl border border-[#eee] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#1f1f1f]">Tambah Kategori</h2>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="cth. Music"
            className="flex-1 rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={busy || !name.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            <FaPlus className="text-xs" />
            Tambah
          </button>
        </form>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
      </section>

      <section className="mt-5 rounded-2xl border border-[#eee] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#1f1f1f]">
            Daftar Kategori
          </h2>
          <span className="text-xs text-[#6d6d6d]">{items.length} item</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {loading && (
                <tr>
                  <td colSpan={2} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
                    Memuat kategori...
                  </td>
                </tr>
              )}
              {!loading && items.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3 font-medium text-[#1f1f1f]">{row.name}</td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">
                    {formatDate(row.createdAt ?? row.created_at)}
                  </td>
                </tr>
              ))}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
                    Belum ada kategori.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}

export default AdminKategoriPage
