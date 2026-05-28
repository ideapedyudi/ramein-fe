import { useCallback, useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaSyncAlt, FaTimes } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDate } from '../../lib/format'

const provinsiOptions = [
  'sumatra',
  'jabodetabek',
  'jawa barat',
  'diy-jateng',
  'jawa timur',
  'kalimantan',
  'sulawesi',
  'indonesia timur',
]

function AdminKotaPage() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [provinsi, setProvinsi] = useState(provinsiOptions[0])
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getMasterCities()
      setItems(res)
    } catch (err) {
      setError(err.message || 'Gagal memuat kota.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  function resetForm() {
    setName('')
    setProvinsi(provinsiOptions[0])
    setEditingId(null)
  }

  function startEdit(row) {
    setName(row.name ?? '')
    setProvinsi(row.provinsi ?? provinsiOptions[0])
    setEditingId(row.id)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const value = name.trim()
    if (!value) return
    setBusy(true)
    setError('')
    try {
      if (editingId) {
        const row = await api.updateMasterCity(editingId, { name: value, provinsi })
        setItems((curr) =>
          curr.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  ...(row ?? {}),
                  name: row?.name ?? value,
                  provinsi: row?.provinsi ?? provinsi,
                }
              : item,
          ),
        )
      } else {
        const row = await api.createMasterCity({ name: value, provinsi })
        setItems((curr) => [row, ...curr])
      }
      resetForm()
    } catch (err) {
      setError(err.message || `Gagal ${editingId ? 'mengupdate' : 'menambah'} kota.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminLayout title="Kota" subtitle="Master data kota tempat event berlangsung">
      <section className="rounded-2xl border border-[#eee] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#1f1f1f]">
          {editingId ? 'Update Kota' : 'Tambah Kota'}
        </h2>
        <form onSubmit={handleSubmit} className="mt-3 grid gap-3 lg:grid-cols-[1fr_220px_auto]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="cth. Jakarta"
            className="flex-1 rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <select
            value={provinsi}
            onChange={(e) => setProvinsi(e.target.value)}
            className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm capitalize outline-none focus:border-brand-500"
          >
            {provinsiOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={busy || !name.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            {editingId ? <FaEdit className="text-xs" /> : <FaPlus className="text-xs" />}
            {editingId ? 'Simpan Update' : 'Tambah'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e2e2e2] px-4 py-2 text-sm font-semibold text-[#4a4a4a] transition hover:bg-[#f7f7f7]"
            >
              <FaTimes className="text-xs" />
              Batal
            </button>
          )}
        </form>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
      </section>

      <section className="mt-5 rounded-2xl border border-[#eee] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#1f1f1f]">Daftar Kota</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6d6d6d]">{items.length} item</span>
            <button
              type="button"
              onClick={loadItems}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7] disabled:opacity-50"
            >
              <FaSyncAlt className="text-[10px]" />
              Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Provinsi</th>
                <th className="px-5 py-3 font-medium">Dibuat</th>
                <th className="px-5 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
                    Memuat kota...
                  </td>
                </tr>
              )}
              {!loading && items.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3 font-medium text-[#1f1f1f]">{row.name}</td>
                  <td className="px-5 py-3 text-xs capitalize text-[#6d6d6d]">
                    {row.provinsi ?? '-'}
                  </td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">
                    {formatDate(row.createdAt ?? row.created_at)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50"
                    >
                      <FaEdit className="text-[10px]" />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
                    Belum ada kota.
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

export default AdminKotaPage
