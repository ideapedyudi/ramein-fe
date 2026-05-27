import { useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'

function AdminKategoriPage() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    api.getMasterCategories().then((res) => {
      if (!cancelled) setItems(res)
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
    const row = await api.createMasterCategory({ name: value })
    setItems((curr) => [row, ...curr])
    setName('')
    setBusy(false)
  }

  async function handleDelete(id) {
    if (!confirm('Hapus kategori ini?')) return
    await api.deleteMasterCategory(id)
    setItems((curr) => curr.filter((c) => c.id !== id))
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
                <th className="px-5 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {items.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3 font-medium text-[#1f1f1f]">{row.name}</td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">{row.createdAt}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(row.id)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <FaTrash className="text-[10px]" />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
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
