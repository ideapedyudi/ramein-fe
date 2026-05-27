import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import EventCardPreview from '../components/EventCardPreview'
import { useAuth } from '../context/AuthContext'
import { api, apiCategories, apiRegions } from '../lib/api'
import { formatIDR } from '../lib/format'

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">{children}</div>
  )
}

function CardHeader({ title }) {
  return <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function Select({ label, name, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {children}
      </select>
    </label>
  )
}

function formatDateLabel(iso) {
  if (!iso) return ''
  const parts = iso.split('-')
  if (parts.length !== 3) return iso
  const [y, m, d] = parts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const mi = Number(m) - 1
  return `${Number(d)} ${months[mi] ?? m} ${y}`
}

function BuatEventFestivalPage() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Konser')
  const [region, setRegion] = useState('JABODETABEK')
  const [organizers, setOrganizers] = useState([])
  const [organizerId, setOrganizerId] = useState('')
  const [tiers, setTiers] = useState([
    { id: 1, name: 'Regular', price: '150000', quota: '500', perks: 'Standing Area, Event Merchandise' },
  ])

  useEffect(() => {
    let cancelled = false
    api.getMasterOrganizers().then((res) => {
      if (cancelled) return
      setOrganizers(res)
      if (res.length && !organizerId) setOrganizerId(res[0].id)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedOrganizer = organizers.find((o) => o.id === organizerId)

  const totalQuota = tiers.reduce((sum, t) => sum + (Number(t.quota) || 0), 0)
  const prices = tiers.map((t) => Number(t.price)).filter((n) => !Number.isNaN(n) && n > 0)
  const minPrice = prices.length ? Math.min(...prices) : undefined
  const maxPrice = prices.length ? Math.max(...prices) : undefined

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const event = await api.createEvent({
      name,
      category,
      region,
      date,
      time,
      location,
      description,
      visibility: 'public',
      isOnline: false,
      organizerId: organizerId || undefined,
      onBehalfOf: isAdmin && selectedOrganizer ? selectedOrganizer.name : null,
      tiers: tiers.map((t) => ({
        name: t.name,
        price: Number(t.price) || 0,
        quotaTotal: Number(t.quota) || 0,
        perks: (t.perks ?? '')
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
      })),
    })
    navigate(`/event-kamu/${event.id}`)
  }

  return (
    <AdminLayout
      title="Buat Event Festival / Ticketing"
      subtitle="Cocok untuk konser, festival, dan seminar berbayar — tiket berjenjang & validasi QR"
      actions={
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          🎟️ Festival
        </span>
      }
    >
      <Link
        to="/buat-event"
        className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600"
      >
        ← Pilih tipe event lain
      </Link>

      <div>
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card>
              <CardHeader title="Informasi Event" />
              <Field
                label="Nama Event"
                name="name"
                required
                value={name}
                onChange={setName}
                placeholder="e.g. Java Jazz Festival 2026"
              />
              <div className="mt-4">
                <Select
                  label={
                    isAdmin
                      ? 'Atas Nama Organizer'
                      : 'Penyelenggara (Organizer)'
                  }
                  name="organizerId"
                  value={organizerId}
                  onChange={setOrganizerId}
                >
                  {organizers.length === 0 && (
                    <option value="">Belum ada organizer terdaftar</option>
                  )}
                  {organizers.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </Select>
                {isAdmin && (
                  <p className="mt-1.5 text-xs text-[#6d6d6d]">
                    Event akan tampil atas nama organizer ini.
                  </p>
                )}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Select label="Kategori" name="category" value={category} onChange={setCategory}>
                  {apiCategories.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </Select>
                <Select label="Wilayah" name="region" value={region} onChange={setRegion}>
                  {apiRegions.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Tanggal" name="date" type="date" required value={date} onChange={setDate} />
                <Field label="Waktu" name="time" type="time" required value={time} onChange={setTime} />
              </div>
              <div className="mt-4">
                <Field
                  label="Venue / Lokasi"
                  name="location"
                  required
                  value={location}
                  onChange={setLocation}
                  placeholder="e.g. Jakarta International Expo, Kemayoran"
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi Event</label>
                <textarea
                  name="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan tentang event, lineup, dan hal menarik lainnya..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </Card>

            <Card>
              <CardHeader title="Banner Event" />
              <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                <p className="text-sm text-gray-600">Upload banner event (rasio 16:9, maks. 5MB)</p>
                <button
                  type="button"
                  className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Pilih Gambar
                </button>
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Tier Tiket</h2>
                  <p className="mt-1 text-xs text-gray-600">
                    Atur jenis tiket dengan harga dan kuota berbeda. Tambah Regular, VIP, atau VVIP sesuai
                    kebutuhan.
                  </p>
                </div>
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                  {tiers.length} tier
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {tiers.map((tier, idx) => (
                  <div key={tier.id} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase text-gray-500">Tier #{idx + 1}</span>
                      {tiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setTiers((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-xs font-medium text-rose-600 hover:underline"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field
                        label="Nama Tiket"
                        name="tierName"
                        required
                        value={tier.name}
                        onChange={(v) =>
                          setTiers((prev) => prev.map((t, i) => (i === idx ? { ...t, name: v } : t)))
                        }
                        placeholder="e.g. VIP"
                      />
                      <Field
                        label="Harga (Rp)"
                        name="tierPrice"
                        type="number"
                        required
                        value={tier.price}
                        onChange={(v) =>
                          setTiers((prev) => prev.map((t, i) => (i === idx ? { ...t, price: v } : t)))
                        }
                        placeholder="500000"
                      />
                      <Field
                        label="Kuota"
                        name="tierQuota"
                        type="number"
                        required
                        value={tier.quota}
                        onChange={(v) =>
                          setTiers((prev) => prev.map((t, i) => (i === idx ? { ...t, quota: v } : t)))
                        }
                        placeholder="500"
                      />
                    </div>
                    <div className="mt-3">
                      <Field
                        label="Perks (pisahkan dengan koma)"
                        name="tierPerks"
                        value={tier.perks}
                        onChange={(v) =>
                          setTiers((prev) => prev.map((t, i) => (i === idx ? { ...t, perks: v } : t)))
                        }
                        placeholder="Standing Area, Event Merchandise, Welcome Drink"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setTiers((prev) => [
                      ...prev,
                      { id: Date.now(), name: '', price: '', quota: '', perks: '' },
                    ])
                  }
                  className="w-full rounded-lg border-2 border-dashed border-brand-300 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
                >
                  + Tambah Tier Tiket
                </button>
              </div>
            </Card>

            <Card>
              <CardHeader title="Validasi & Pencairan Dana" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-lg">📱</span>
                  <div>
                    <p className="font-medium text-gray-900">QR Code Validation</p>
                    <p className="text-xs text-gray-600">
                      Setiap tiket otomatis menghasilkan QR Code unik. Validasi peserta via aplikasi atau
                      halaman scan di dashboard organizer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">💸</span>
                  <div>
                    <p className="font-medium text-gray-900">Pencairan Dana H+3</p>
                    <p className="text-xs text-gray-600">
                      Dana dicairkan ke rekening organizer 3 hari kerja setelah event selesai. Fee admin: 2%
                      + Rp 25.000 per transaksi.
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <aside className="space-y-4 md:sticky md:top-6 md:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Preview</h2>
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Live</span>
              </div>
              <EventCardPreview
                name={name}
                category={category}
                region={region}
                dateLabel={formatDateLabel(date)}
                timeLabel={time}
                location={location}
                price={minPrice ?? undefined}
              />
              <p className="mt-3 text-center text-xs text-gray-500">Tampilan kartu event di Jelajahi</p>
            </div>

            <Card>
              <CardHeader title="Ringkasan" />
              <div className="space-y-2.5 text-sm">
                <Row label="Tipe Event" value="Festival / Ticketing" />
                <Row label="Visibilitas" value="Publik" />
                <Row label="Jumlah Tier" value={`${tiers.length}`} />
                <Row label="Total Kuota" value={totalQuota.toLocaleString('id-ID')} />
                <Row
                  label="Range Harga"
                  value={
                    minPrice && maxPrice
                      ? minPrice === maxPrice
                        ? formatIDR(minPrice)
                        : `${formatIDR(minPrice)} – ${formatIDR(maxPrice)}`
                      : '—'
                  }
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full cursor-pointer rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? 'Mempublikasikan...' : 'Publikasikan Event'}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                Event akan langsung muncul di halaman Jelajahi setelah dipublikasikan.
              </p>
            </Card>
          </aside>
        </form>
      </div>
    </AdminLayout>
  )
}

export default BuatEventFestivalPage
