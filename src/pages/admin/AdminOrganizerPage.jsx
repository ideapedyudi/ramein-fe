import { useCallback, useEffect, useState } from 'react'
import { FaEdit, FaEnvelope, FaPhone, FaPlus, FaSyncAlt, FaTimes, FaUser } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDate } from '../../lib/format'

const emptyForm = {
  name: '',
  description: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
}

const inputClass =
  'w-full rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#4a4a4a]">{label}</span>
      {children}
    </label>
  )
}

function AdminOrganizerPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getMasterOrganizers()
      setItems(res)
    } catch (err) {
      setError(err.message || 'Gagal memuat organizer.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => {
      if (!cancelled) loadItems()
    })
    return () => {
      cancelled = true
    }
  }, [loadItems])

  function update(key, value) {
    setForm((curr) => ({ ...curr, [key]: value }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
  }

  function startEdit(row) {
    setForm({
      name: row.name ?? '',
      description: row.description ?? '',
      contactName: row.contactName ?? '',
      contactEmail: row.contactEmail ?? '',
      contactPhone: row.contactPhone ?? '',
    })
    setEditingId(row.id)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setBusy(true)
    setError('')
    try {
      if (editingId) {
        const row = await api.updateMasterOrganizer(editingId, form)
        setItems((curr) =>
          curr.map((item) =>
            item.id === editingId ? { ...item, ...(row ?? {}), ...form } : item,
          ),
        )
      } else {
        const row = await api.createMasterOrganizer(form)
        setItems((curr) => [row, ...curr])
      }
      resetForm()
    } catch (err) {
      setError(err.message || `Gagal ${editingId ? 'mengupdate' : 'menambah'} organizer.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminLayout
      title="Organizer"
      subtitle="Daftar partner resmi yang menyelenggarakan event"
    >
      <section className="rounded-2xl border border-[#eee] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#1f1f1f]">
          {editingId ? 'Update Organizer' : 'Tambah Organizer'}
        </h2>
        <form onSubmit={handleSubmit} className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Nama Organizer">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Promotor Ramein"
            />
          </Field>
          <Field label="Deskripsi">
            <input
              className={inputClass}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Organizer resmi konser"
            />
          </Field>
          <Field label="Kontak (Nama)">
            <input
              className={inputClass}
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              placeholder="Tim Promotor"
            />
          </Field>
          <Field label="Kontak (Email)">
            <input
              type="email"
              className={inputClass}
              value={form.contactEmail}
              onChange={(e) => update('contactEmail', e.target.value)}
              placeholder="promotor@demo.com"
            />
          </Field>
          <Field label="Kontak (No. HP)">
            <input
              className={inputClass}
              value={form.contactPhone}
              onChange={(e) => update('contactPhone', e.target.value)}
              placeholder="08123456789"
            />
          </Field>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={busy || !form.name.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50 sm:w-auto"
            >
              {editingId ? <FaEdit className="text-xs" /> : <FaPlus className="text-xs" />}
              {editingId ? 'Simpan Update' : 'Tambah Organizer'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-2 inline-flex items-center justify-center gap-2 rounded-lg border border-[#e2e2e2] px-4 py-2 text-sm font-semibold text-[#4a4a4a] transition hover:bg-[#f7f7f7]"
              >
                <FaTimes className="text-xs" />
                Batal
              </button>
            )}
          </div>
        </form>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
      </section>

      <section className="mt-5 rounded-2xl border border-[#eee] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#1f1f1f]">Daftar Organizer</h2>
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
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-5 py-3 font-medium">Organizer</th>
                <th className="px-5 py-3 font-medium">Kontak</th>
                <th className="px-5 py-3 font-medium">Dibuat</th>
                <th className="px-5 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-[#6d6d6d]">
                    Memuat organizer...
                  </td>
                </tr>
              )}
              {!loading && items.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3 align-top">
                    <p className="font-semibold text-[#1f1f1f]">{row.name}</p>
                    {row.description && (
                      <p className="mt-0.5 text-xs text-[#6d6d6d]">{row.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 align-top text-xs text-[#4a4a4a]">
                    <p className="inline-flex items-center gap-1.5">
                      <FaUser className="text-[10px] text-[#9a9a9a]" />
                      {row.contactName || '-'}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1.5">
                      <FaEnvelope className="text-[10px] text-[#9a9a9a]" />
                      {row.contactEmail || '-'}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1.5">
                      <FaPhone className="text-[10px] text-[#9a9a9a]" />
                      {row.contactPhone || '-'}
                    </p>
                  </td>
                  <td className="px-5 py-3 align-top text-xs text-[#6d6d6d]">
                    {formatDate(row.createdAt ?? row.created_at)}
                  </td>
                  <td className="px-5 py-3 align-top text-right">
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
                    Belum ada organizer.
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

export default AdminOrganizerPage
