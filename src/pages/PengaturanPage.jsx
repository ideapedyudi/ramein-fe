import { useState } from 'react'
import { FaBell, FaLock, FaUser } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { useAuth } from '../context/authContext'

const tabs = [
  { key: 'profile', label: 'Profil', icon: FaUser },
  { key: 'security', label: 'Keamanan', icon: FaLock },
  { key: 'notifications', label: 'Notifikasi', icon: FaBell },
]

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#4a4a4a]">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-[#e2e2e2] bg-white px-3 py-2 text-sm outline-none focus:border-brand-500'

function PengaturanPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState('profile')
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: '',
    bio: '',
  })
  const [notifications, setNotifications] = useState({
    eventReminder: true,
    promo: false,
    transactionAlert: true,
  })

  return (
    <AdminLayout title="Pengaturan" subtitle="Atur profil, keamanan, dan preferensi notifikasi">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-[#eee] bg-white p-2">
          <nav className="flex flex-col gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  tab === t.key
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-[#4a4a4a] hover:bg-[#f4f4f4]'
                }`}
              >
                <t.icon className="text-base" />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="rounded-2xl border border-[#eee] bg-white p-5 sm:p-6">
          {tab === 'profile' && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <h2 className="text-base font-semibold text-[#1f1f1f]">Informasi Profil</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama Lengkap">
                  <input
                    className={inputClass}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className={inputClass}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Field>
                <Field label="No. HP">
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className={inputClass}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Bio">
                <textarea
                  rows={3}
                  placeholder="Ceritakan sedikit tentang kamu..."
                  className={`${inputClass} resize-none`}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          )}

          {tab === 'security' && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <h2 className="text-base font-semibold text-[#1f1f1f]">Ganti Kata Sandi</h2>
              <Field label="Kata Sandi Lama">
                <input type="password" className={inputClass} placeholder="••••••••" />
              </Field>
              <Field label="Kata Sandi Baru">
                <input type="password" className={inputClass} placeholder="••••••••" />
              </Field>
              <Field label="Konfirmasi Kata Sandi Baru">
                <input type="password" className={inputClass} placeholder="••••••••" />
              </Field>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Perbarui Kata Sandi
                </button>
              </div>
            </form>
          )}

          {tab === 'notifications' && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-[#1f1f1f]">Preferensi Notifikasi</h2>
              {[
                {
                  key: 'eventReminder',
                  label: 'Pengingat Event',
                  desc: 'Email H-1 sebelum event yang kamu ikuti.',
                },
                {
                  key: 'promo',
                  label: 'Promo & Penawaran',
                  desc: 'Update event baru dan diskon terbatas.',
                },
                {
                  key: 'transactionAlert',
                  label: 'Notifikasi Transaksi',
                  desc: 'Update status pembayaran, tiket, dan refund.',
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-[#eee] p-4 hover:bg-[#fafafa]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1f1f1f]">{item.label}</p>
                    <p className="mt-0.5 text-xs text-[#6d6d6d]">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={(e) =>
                      setNotifications({ ...notifications, [item.key]: e.target.checked })
                    }
                    className="mt-1 h-5 w-5 rounded border-[#d5d5d5] text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  )
}

export default PengaturanPage
