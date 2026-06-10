import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import EventCardPreview from '../components/EventCardPreview'
import { api } from '../lib/api'
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
  if (type === 'datetime-local') {
    const dateValue = value ? value.slice(0, 10) : ''
    const parsedTime = value ? value.slice(11, 16) : ''
    const hourValue = /^\d{2}:\d{2}$/.test(parsedTime) ? parsedTime.slice(0, 2) : '00'
    const minuteValue = /^\d{2}:\d{2}$/.test(parsedTime) ? parsedTime.slice(3, 5) : '00'

    const hourOptions = Array.from({ length: 24 }, (_, idx) => String(idx).padStart(2, '0'))
    const minuteOptions = Array.from({ length: 60 }, (_, idx) => String(idx).padStart(2, '0'))

    const composeDateTimeValue = (datePart, hourPart, minutePart) =>
      datePart ? `${datePart}T${hourPart}:${minutePart}` : ''

    return (
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
        <div className="grid grid-cols-[1fr_90px_90px] gap-2">
          <input
            name={name}
            type="date"
            value={dateValue}
            onChange={(e) => onChange(composeDateTimeValue(e.target.value, hourValue, minuteValue))}
            required={required}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <select
            value={hourValue}
            onChange={(e) => onChange(composeDateTimeValue(dateValue, e.target.value, minuteValue))}
            required={required}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={minuteValue}
            onChange={(e) => onChange(composeDateTimeValue(dateValue, hourValue, e.target.value))}
            required={required}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {minuteOptions.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </label>
    )
  }

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function Select({ label, name, value, onChange, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <select
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {children}
      </select>
    </label>
  )
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function toIsoDateTime(value) {
  return value ? new Date(value).toISOString() : ''
}

function datePart(value) {
  return value ? value.slice(0, 10) : ''
}

function timePart(value) {
  return value ? value.slice(11, 16) : ''
}

function BuatEventFestivalPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [loadingMaster, setLoadingMaster] = useState(true)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [organizerId, setOrganizerId] = useState('')
  const [cityId, setCityId] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [banner, setBanner] = useState('')
  const [bannerName, setBannerName] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [categories, setCategories] = useState([])
  const [organizers, setOrganizers] = useState([])
  const [cities, setCities] = useState([])
  const [tiers, setTiers] = useState([
    { id: 1, name: 'Regular', price: '100000', quota: '100', saleStartAt: '', saleEndAt: '' },
  ])

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return null
      setLoadingMaster(true)
      setError('')

      return Promise.all([api.getMasterCategories(), api.getMasterOrganizers(), api.getMasterCities()])
    })
      .then((result) => {
        if (cancelled || !result) return
        const [categoryRes, organizerRes, cityRes] = result
        setCategories(categoryRes)
        setOrganizers(organizerRes)
        setCities(cityRes)
        setCategoryId(categoryRes[0]?.id ?? '')
        setOrganizerId(organizerRes[0]?.id ?? '')
        setCityId(cityRes[0]?.id ?? '')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat master data.')
      })
      .finally(() => {
        if (!cancelled) setLoadingMaster(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const selectedCategory = categories.find((c) => c.id === categoryId)
  const selectedCity = cities.find((c) => c.id === cityId)
  const totalQuota = tiers.reduce((sum, t) => sum + (Number(t.quota) || 0), 0)
  const prices = tiers.map((t) => Number(t.price)).filter((n) => !Number.isNaN(n) && n > 0)
  const minPrice = prices.length ? Math.min(...prices) : undefined
  const maxPrice = prices.length ? Math.max(...prices) : undefined

  function updateTier(index, key, value) {
    setTiers((prev) => prev.map((tier, i) => (i === index ? { ...tier, [key]: value } : tier)))
  }

  async function handleBannerChange(file) {
    if (!file) return
    setError('')
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran banner maksimal 5MB.')
      return
    }
    const dataUrl = await readFileAsDataUrl(file)
    setBanner(dataUrl)
    setBannerName(file.name)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const event = await api.createTicketedEvent({
        title,
        description,
        event_type: 'offline',
        payment_type: 'paid',
        categoryId,
        organizerId,
        cityId,
        addressDetail,
        banner,
        startDateTime: toIsoDateTime(startDateTime),
        endDateTime: toIsoDateTime(endDateTime),
        ticketTypes: tiers.map((tier) => ({
          name: tier.name,
          price: Number(tier.price) || 0,
          quota: Number(tier.quota) || 0,
          saleStartAt: toIsoDateTime(tier.saleStartAt),
          saleEndAt: toIsoDateTime(tier.saleEndAt),
        })),
      })
      navigate(`/event-kamu/${event.id}`)
    } catch (err) {
      setError(err.message || 'Gagal mempublikasikan event.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout
      title="Buat Event Festival / Tiket"
      subtitle="Cocok untuk konser, festival, dan seminar berbayar"
      actions={
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          Festival
        </span>
      }
    >
      <Link to="/buat-event" className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600">
        Pilih tipe event lain
      </Link>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Informasi Event" />
            <Field label="Judul Event" name="title" required value={title} onChange={setTitle} placeholder="Konser Musik Jakarta" />

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Select label="Kategori" name="categoryId" required value={categoryId} onChange={setCategoryId}>
                {loadingMaster && <option value="">Memuat kategori...</option>}
                {!loadingMaster && categories.length === 0 && <option value="">Belum ada kategori</option>}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Select label="Penyelenggara" name="organizerId" required value={organizerId} onChange={setOrganizerId}>
                {loadingMaster && <option value="">Memuat penyelenggara...</option>}
                {!loadingMaster && organizers.length === 0 && <option value="">Belum ada penyelenggara</option>}
                {organizers.map((organizer) => (
                  <option key={organizer.id} value={organizer.id}>
                    {organizer.name}
                  </option>
                ))}
              </Select>
              <Select label="Kota" name="cityId" required value={cityId} onChange={setCityId}>
                {loadingMaster && <option value="">Memuat kota...</option>}
                {!loadingMaster && cities.length === 0 && <option value="">Belum ada kota</option>}
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Mulai Event" name="startDateTime" type="datetime-local" required value={startDateTime} onChange={setStartDateTime} />
              <Field label="Selesai Event" name="endDateTime" type="datetime-local" required value={endDateTime} onChange={setEndDateTime} />
            </div>

            <div className="mt-4">
              <Field label="Detail Alamat" name="addressDetail" required value={addressDetail} onChange={setAddressDetail} placeholder="Jl. Sudirman No. 10, Jakarta" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi Event</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Konser musik malam tahun baru di Jakarta."
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Banner Event" />
            <label className="block rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-600">Upload banner event sebagai base64 (rasio 16:9, maks. 5MB)</p>
              <span className="mt-3 inline-flex cursor-pointer rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                Pilih Gambar
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(e) => handleBannerChange(e.target.files?.[0])}
              />
              {bannerName && <p className="mt-3 text-xs font-medium text-gray-700">{bannerName}</p>}
            </label>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tipe Tiket</h2>
                <p className="mt-1 text-xs text-gray-600">
                  Atur nama tiket, harga, kuota, dan periode penjualan.
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                {tiers.length} kategori
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {tiers.map((tier, idx) => (
                <div key={tier.id} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-gray-500">Kategori #{idx + 1}</span>
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
                    <Field label="Nama Tiket" name="ticketName" required value={tier.name} onChange={(v) => updateTier(idx, 'name', v)} placeholder="VIP" />
                    <Field label="Harga (Rp)" name="ticketPrice" type="number" required value={tier.price} onChange={(v) => updateTier(idx, 'price', v)} placeholder="250000" />
                    <Field label="Kuota" name="ticketQuota" type="number" required value={tier.quota} onChange={(v) => updateTier(idx, 'quota', v)} placeholder="30" />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Mulai Penjualan" name="saleStartAt" type="datetime-local" required value={tier.saleStartAt} onChange={(v) => updateTier(idx, 'saleStartAt', v)} />
                    <Field label="Akhir Penjualan" name="saleEndAt" type="datetime-local" required value={tier.saleEndAt} onChange={(v) => updateTier(idx, 'saleEndAt', v)} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTiers((prev) => [
                    ...prev,
                    { id: Date.now(), name: '', price: '', quota: '', saleStartAt: '', saleEndAt: '' },
                  ])
                }
                className="w-full rounded-lg border-2 border-dashed border-brand-300 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
              >
                + Tambah Tipe Tiket
              </button>
            </div>
          </Card>
        </div>

        <aside className="space-y-4 md:sticky md:top-6 md:self-start">
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Pratinjau</h2>
              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Langsung</span>
            </div>
            <EventCardPreview
              name={title}
              category={selectedCategory?.name ?? 'Kategori'}
              region={selectedCity?.name ?? 'Kota'}
              dateLabel={datePart(startDateTime)}
              timeLabel={timePart(startDateTime)}
              location={addressDetail}
              price={minPrice ?? undefined}
              imageUrl={banner}
            />
            <p className="mt-3 text-center text-xs text-gray-500">Tampilan kartu event di Jelajahi</p>
          </div>

          <Card>
            <CardHeader title="Ringkasan" />
            <div className="space-y-2.5 text-sm">
              <Row label="Tipe Event" value="Festival / Tiket" />
              <Row label="Jumlah Kategori" value={`${tiers.length}`} />
              <Row label="Total Kuota" value={totalQuota.toLocaleString('id-ID')} />
              <Row
                label="Rentang Harga"
                value={
                  minPrice && maxPrice
                    ? minPrice === maxPrice
                      ? formatIDR(minPrice)
                      : `${formatIDR(minPrice)} - ${formatIDR(maxPrice)}`
                    : '-'
                }
              />
            </div>
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting || loadingMaster}
              className="mt-5 w-full cursor-pointer rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Mempublikasikan...' : 'Publikasikan Event'}
            </button>
          </Card>
        </aside>
      </form>
    </AdminLayout>
  )
}

export default BuatEventFestivalPage
