import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaPlus, FaSyncAlt } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDateTime } from '../../lib/format'

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
}

function roleLabel(role) {
  return String(role || '-').toUpperCase()
}

function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [admins, setAdmins] = useState([])
  const [roleFilter, setRoleFilter] = useState('all')
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [userRows, adminRows] = await Promise.all([
        api.getAdminUsers(),
        api.getAdminAdmins(),
      ])
      setUsers(userRows)
      setAdmins(adminRows)
    } catch (err) {
      setError(err.message || 'Gagal memuat data user.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers()
    }, 0)

    return () => clearTimeout(timer)
  }, [loadUsers])

  const rows = useMemo(() => {
    const merged = [...admins, ...users]
    if (roleFilter === 'all') return merged
    return merged.filter((row) => row.role === roleFilter)
  }, [admins, roleFilter, users])

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const created = await api.createAdminUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
      })
      if (created?.id) {
        setAdmins((current) => [created, ...current.filter((row) => row.id !== created.id)])
      } else {
        await loadUsers()
      }
      setForm(initialForm)
      setSuccess('Admin baru berhasil dibuat.')
    } catch (err) {
      setError(err.message || 'Gagal membuat admin baru.')
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.password.length >= 6 &&
    form.phone.trim()

  return (
    <AdminLayout title="Pengguna" subtitle="Manajemen pengguna dan admin">
      <section className="rounded-2xl border border-[#eee] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#1f1f1f]">Tambah Admin</h2>
        <form onSubmit={handleSubmit} className="mt-3 grid gap-3 lg:grid-cols-5">
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateForm('name', event.target.value)}
            placeholder="Nama"
            className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateForm('email', event.target.value)}
            placeholder="Email"
            className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateForm('password', event.target.value)}
            placeholder="Kata Sandi"
            className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateForm('phone', event.target.value)}
            placeholder="No. HP"
            className="rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FaPlus className="text-xs" />
            {submitting ? 'Menyimpan...' : 'Tambah Admin'}
          </button>
        </form>
        {success && (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </p>
        )}
      </section>

      <section className="mt-5 rounded-2xl border border-[#eee] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#eee] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1f1f1f]">Daftar Pengguna</h2>
            <p className="mt-1 text-xs text-[#6d6d6d]">
              {users.length} pengguna · {admins.length} admin
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { value: 'all', label: 'Semua' },
              { value: 'user', label: 'Pengguna' },
              { value: 'admin', label: 'Admin' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRoleFilter(item.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  roleFilter === item.value
                    ? 'bg-brand-600 text-white'
                    : 'border border-[#e2e2e2] text-[#4a4a4a] hover:bg-[#f7f7f7]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={loadUsers}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1.5 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7] disabled:opacity-50"
            >
              <FaSyncAlt className="text-[10px]" />
              Muat Ulang
            </button>
          </div>
        </div>

        {error && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">No. HP</th>
                <th className="px-5 py-3 font-medium">Peran</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Dibuat</th>
                <th className="px-5 py-3 font-medium">Diupdate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[#1f1f1f]">{row.name}</p>
                    <p className="font-mono text-[11px] text-[#6d6d6d]">{row.id}</p>
                  </td>
                  <td className="px-5 py-3 text-[#4a4a4a]">{row.email}</td>
                  <td className="px-5 py-3 text-[#4a4a4a]">{row.phone}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                      {roleLabel(row.role)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-bold ring-1 ${
                        row.isActive
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                          : 'bg-gray-100 text-gray-600 ring-gray-200'
                      }`}
                    >
                      {row.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">
                    {formatDateTime(row.createdAt)}
                  </td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">
                    {formatDateTime(row.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && <div className="p-10 text-center text-sm text-[#6d6d6d]">Memuat user...</div>}

        {!loading && rows.length === 0 && (
          <div className="p-10 text-center text-sm text-[#6d6d6d]">Belum ada data user.</div>
        )}
      </section>
    </AdminLayout>
  )
}

export default AdminUsersPage
