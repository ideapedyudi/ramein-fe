import { useEffect, useState } from 'react'
import { FaEnvelope, FaPhone, FaPlus, FaTrash, FaUser } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'

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

  useEffect(() => {
    let cancelled = false
    api.getMasterOrganizers().then((res) => {
      if (!cancelled) setItems(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  function update(key, value) {
    setForm((curr) => ({ ...curr, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setBusy(true)
    const row = await api.createMasterOrganizer(form)
    setItems((curr) => [row, ...curr])
    setForm(emptyForm)
    setBusy(false)
  }

  async function handleDelete(id) {
    if (!confirm('Hapus organizer ini?')) return
    await api.deleteMasterOrganizer(id)
    setItems((curr) => curr.filter((o) => o.id !== id))
  }

  return (
    <AdminLayout
      title="Organizer"
      subtitle="Daftar partner resmi yang menyelenggarakan event"
    >
      <section className="rounded-2xl border border-[#eee] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#1f1f1f]">Tambah Organizer</h2>
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
              <FaPlus className="text-xs" />
              Tambah Organizer
            </button>
          </div>
        </form>
      </section>

      <section className="mt-5 rounded-2xl border border-[#eee] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#1f1f1f]">Daftar Organizer</h2>
          <span className="text-xs text-[#6d6d6d]">{items.length} item</span>
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
              {items.map((row) => (
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
                  <td className="px-5 py-3 align-top text-xs text-[#6d6d6d]">{row.createdAt}</td>
                  <td className="px-5 py-3 align-top text-right">
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
