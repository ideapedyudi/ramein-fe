import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import EventCardPreview from '../components/EventCardPreview'
import { api, apiCategories, apiRegions } from '../lib/api'
import { formatIDR } from '../lib/format'

function BigField({ label, name, value, onChange, placeholder, required, big }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
          big ? 'py-4 text-xl font-semibold sm:text-2xl' : 'py-3 text-sm'
        }`}
      />
    </label>
  )
}

function SmallField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function SmallSelect({ label, name, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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

function PriceMode({ title, desc, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition ${
        selected
          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-200'
          : 'border-gray-200 hover:border-brand-300'
      }`}
    >
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-0.5 text-xs text-gray-600">{desc}</p>
    </button>
  )
}

function Visibility({ icon, title, desc, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition ${
        selected
          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-200'
          : 'border-gray-200 hover:border-brand-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-sm font-semibold text-gray-900">{title}</span>
      </div>
      <p className="text-xs text-gray-600">{desc}</p>
    </button>
  )
}

function BuatEventGatheringPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Kreatif')
  const [region, setRegion] = useState('JABODETABEK')
  const [isOnline, setIsOnline] = useState(true)
  const [priceMode, setPriceMode] = useState('free')
  const [price, setPrice] = useState('')
  const [capacity, setCapacity] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [attachmentLabel, setAttachmentLabel] = useState('')
  const [attachmentUrl, setAttachmentUrl] = useState('')

  const previewPrice = priceMode === 'free' ? 0 : price === '' ? undefined : Number(price)
  const previewDateLabel = formatDateLabel(date)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const isFree = priceMode === 'free'
    const event = await api.createEvent({
      name,
      category,
      region,
      date,
      time,
      location,
      description,
      visibility,
      isOnline,
      attachmentLabel: attachmentLabel.trim() || undefined,
      attachmentUrl: attachmentUrl.trim() || undefined,
      tiers: [
        {
          name: isFree ? 'Free RSVP' : 'Ticket',
          price: isFree ? 0 : Number(price) || 0,
          quotaTotal: Number(capacity) || 50,
          perks: [],
        },
      ],
    })
    navigate(`/event-kamu/${event.id}`)
  }

  return (
    <AdminLayout
      title="Buat Meetup / Gathering"
      subtitle="Cocok untuk komunitas, workshop, webinar — link akses dikirim otomatis"
      actions={
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          ✨ Meetup
        </span>
      }
    >
      <Link
        to="/buat-event"
        className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600"
      >
        ← Pilih tipe event lain
      </Link>

      <form onSubmit={handleSubmit}>

        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-6">
            <BigField
              label="Nama Event"
              name="name"
              required
              value={name}
              onChange={setName}
              placeholder="e.g. React Jakarta Monthly Meetup"
              big
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cerita singkat — apa yang dibahas, siapa yang cocok ikut, expected outcome..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">📅 Kapan</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <SmallField
                  label="Tanggal"
                  name="date"
                  type="date"
                  required
                  value={date}
                  onChange={setDate}
                />
                <SmallField
                  label="Waktu"
                  name="time"
                  type="time"
                  required
                  value={time}
                  onChange={setTime}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">📍 Di Mana</p>
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
                  <input
                    type="checkbox"
                    name="isOnline"
                    checked={isOnline}
                    onChange={(e) => setIsOnline(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  Online event
                </label>
              </div>
              <div className="mt-3">
                <SmallField
                  label={isOnline ? 'Platform' : 'Lokasi'}
                  name="location"
                  required
                  value={location}
                  onChange={setLocation}
                  placeholder={
                    isOnline ? 'e.g. Zoom, Google Meet, Discord' : 'Alamat venue / kafe / co-working'
                  }
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <SmallSelect label="Kategori" name="category" value={category} onChange={setCategory}>
                  {apiCategories.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </SmallSelect>
                <SmallSelect label="Wilayah" name="region" value={region} onChange={setRegion}>
                  {apiRegions.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region}
                    </option>
                  ))}
                </SmallSelect>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">🎟️ Tiket</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <PriceMode
                  title="Gratis"
                  desc="RSVP terbuka, tanpa biaya"
                  selected={priceMode === 'free'}
                  onClick={() => setPriceMode('free')}
                />
                <PriceMode
                  title="Berbayar"
                  desc="Set harga tiket"
                  selected={priceMode === 'paid'}
                  onClick={() => setPriceMode('paid')}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {priceMode === 'paid' && (
                  <SmallField
                    label="Harga per orang (Rp)"
                    name="price"
                    type="number"
                    required
                    value={price}
                    onChange={setPrice}
                    placeholder="50000"
                  />
                )}
                <SmallField
                  label="Kapasitas peserta"
                  name="capacity"
                  type="number"
                  required
                  value={capacity}
                  onChange={setCapacity}
                  placeholder="50"
                />
              </div>
              {priceMode === 'paid' && price && Number(price) > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Peserta bayar {formatIDR(Number(price))} per tiket.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-brand-800">🎁 Akses untuk Peserta</p>
                  <p className="mt-0.5 text-xs text-brand-800/80">
                    Link yang otomatis dikirim ke peserta <strong>setelah RSVP</strong>. Sembunyi dari halaman
                    publik — cuma yang RSVP yang lihat.
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <SmallField
                  label="Label"
                  name="attachmentLabel"
                  value={attachmentLabel}
                  onChange={setAttachmentLabel}
                  placeholder={isOnline ? 'Link Zoom Meeting' : 'Petunjuk Akses & Parkir'}
                />
                <SmallField
                  label="URL"
                  name="attachmentUrl"
                  type="url"
                  value={attachmentUrl}
                  onChange={setAttachmentUrl}
                  placeholder={isOnline ? 'https://zoom.us/j/...' : 'https://maps.app.goo.gl/...'}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">👀 Siapa yang bisa lihat?</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <Visibility
                  icon="🌐"
                  title="Publik"
                  desc="Muncul di Jelajahi & Beranda"
                  selected={visibility === 'public'}
                  onClick={() => setVisibility('public')}
                />
                <Visibility
                  icon="🔒"
                  title="Private"
                  desc="Hanya via link langsung"
                  selected={visibility === 'private'}
                  onClick={() => setVisibility('private')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Mempublikasikan...' : `Buat Event${name ? ` — ${name}` : ''}`}
            </button>
            <p className="text-center text-xs text-gray-500">
              Dengan publikasi, kamu setuju dengan{' '}
              <Link to="/terms" className="text-brand-600 hover:underline">
                Syarat & Ketentuan
              </Link>{' '}
              Ramein.
            </p>
          </div>

          <aside className="md:sticky md:top-6 md:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Preview</h2>
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Live</span>
              </div>
              <EventCardPreview
                name={name}
                category={category}
                region={region}
                dateLabel={previewDateLabel}
                timeLabel={time}
                location={location}
                isOnline={isOnline}
                visibility={visibility}
                price={previewPrice}
              />
              <p className="mt-3 text-center text-xs text-gray-500">
                Tampilan kartu event saat dibuka peserta
              </p>
            </div>
          </aside>
        </div>
      </form>
    </AdminLayout>
  )
}

export default BuatEventGatheringPage
