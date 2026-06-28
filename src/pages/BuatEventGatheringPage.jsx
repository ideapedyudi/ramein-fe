import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import EventCardPreview from '../components/EventCardPreview'
import { useAuth } from '../context/authContext'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'
import { FiChevronLeft } from 'react-icons/fi'

function BigField({ label, name, value, onChange, placeholder, required, big }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${big ? 'py-4 text-xl font-semibold sm:text-2xl' : 'py-3 text-sm'
          }`}
      />
    </label>
  )
}

function SmallField({ label, name, type = 'text', value, onChange, placeholder, required }) {
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
        <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
        <div className="grid grid-cols-[1fr_90px_90px] gap-2">
          <input
            name={name}
            type="date"
            value={dateValue}
            onChange={(e) => onChange(composeDateTimeValue(e.target.value, hourValue, minuteValue))}
            required={required}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <select
            value={hourValue}
            onChange={(e) => onChange(composeDateTimeValue(dateValue, e.target.value, minuteValue))}
            required={required}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function SmallSelect({ label, name, value, onChange, children, required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {children}
      </select>
    </label>
  )
}

function PriceMode({ title, desc, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition ${selected
          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-200'
          : 'border-gray-200 hover:border-brand-300'
        }`}
    >
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-0.5 text-xs text-gray-600">{desc}</p>
    </button>
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

function previewDate(value) {
  return value ? value.slice(0, 10) : ''
}

function previewTime(value) {
  return value ? value.slice(11, 16) : ''
}

function BuatEventGatheringPage() {
  const navigate = useNavigate()
  const { isUser } = useAuth()
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
  const [labelOnline, setLabelOnline] = useState('Zoom Meeting')
  const [urlOnline, setUrlOnline] = useState('')
  const [paymentType, setPaymentType] = useState('free')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [ticketName, setTicketName] = useState('Free Pass')
  const [ticketPrice, setTicketPrice] = useState('')
  const [ticketQuota, setTicketQuota] = useState('')
  const [saleStartAt, setSaleStartAt] = useState('')
  const [saleEndAt, setSaleEndAt] = useState('')
  const [categories, setCategories] = useState([])
  const [organizers, setOrganizers] = useState([])
  const [cities, setCities] = useState([])

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
        setOrganizerId(isUser ? '' : organizerRes[0]?.id ?? '')
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
  }, [isUser])

  const selectedCategory = categories.find((category) => category.id === categoryId)
  const selectedCity = cities.find((city) => city.id === cityId)
  const resolvedTicketName = paymentType === 'free' ? ticketName || 'Free Pass' : ticketName || 'Regular'
  const resolvedTicketPrice = paymentType === 'free' ? 0 : Number(ticketPrice) || 0
  const previewPrice = paymentType === 'free' ? 0 : ticketPrice === '' ? undefined : Number(ticketPrice)

  function handlePaymentTypeChange(nextType) {
    setPaymentType(nextType)
    if (nextType === 'free') {
      setTicketName((current) => current || 'Free Pass')
      setTicketPrice('')
    } else {
      setTicketName((current) => (current === 'Free Pass' ? 'Regular' : current || 'Regular'))
    }
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
        categoryId,
        organizerId: isUser ? '00000000-0000-0000-0000-000000000000' : organizerId,
        cityId,
        addressDetail,
        banner,
        event_type: 'online',
        label_online: labelOnline,
        url_online: urlOnline,
        payment_type: paymentType,
        startDateTime: toIsoDateTime(startDateTime),
        endDateTime: toIsoDateTime(endDateTime),
        ticketTypes: [
          {
            name: resolvedTicketName,
            price: resolvedTicketPrice,
            quota: Number(ticketQuota) || 0,
            saleStartAt: toIsoDateTime(saleStartAt),
            saleEndAt: toIsoDateTime(saleEndAt),
          },
        ],
      })
      navigate(`/event-kamu/${event.id}`)
    } catch (err) {
      setError(err.message || 'Gagal membuat event.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout
      title="Buat Meetup / Gathering"
      subtitle="Cocok untuk komunitas, workshop, webinar"
      actions={
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Meetup
        </span>
      }
    >
      <Link to="/buat-event" className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600">
        <FiChevronLeft className="inline-block" />
        <span className='ml-2'>Kembali</span>
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-6">
            <BigField
              label="Nama Event"
              name="title"
              required
              value={title}
              onChange={setTitle}
              placeholder="Konser Perunggu"
              big
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="konser musik yang megah"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">Data Master</p>
              <div className={`grid gap-3 ${isUser ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                <SmallSelect label="Kategori" name="categoryId" required value={categoryId} onChange={setCategoryId}>
                  {loadingMaster && <option value="">Memuat...</option>}
                  {!loadingMaster && categories.length === 0 && <option value="">Belum ada kategori</option>}
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </SmallSelect>
                {!isUser && (
                  <SmallSelect label="Penyelenggara" name="organizerId" required value={organizerId} onChange={setOrganizerId}>
                    {loadingMaster && <option value="">Memuat...</option>}
                    {!loadingMaster && organizers.length === 0 && <option value="">Belum ada penyelenggara</option>}
                    {organizers.map((organizer) => (
                      <option key={organizer.id} value={organizer.id}>
                        {organizer.name}
                      </option>
                    ))}
                  </SmallSelect>
                )}
                <SmallSelect label="Kota" name="cityId" required value={cityId} onChange={setCityId}>
                  {loadingMaster && <option value="">Memuat...</option>}
                  {!loadingMaster && cities.length === 0 && <option value="">Belum ada kota</option>}
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </SmallSelect>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">Waktu & Lokasi</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <SmallField label="Mulai Event" name="startDateTime" type="datetime-local" required value={startDateTime} onChange={setStartDateTime} />
                <SmallField label="Selesai Event" name="endDateTime" type="datetime-local" required value={endDateTime} onChange={setEndDateTime} />
              </div>
              <div className="mt-3">
                <SmallField
                  label="Detail Alamat"
                  name="addressDetail"
                  required
                  value={addressDetail}
                  onChange={setAddressDetail}
                  placeholder="Jl soekarto hatta nomer 89"
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <SmallField label="Label Online" name="label_online" required value={labelOnline} onChange={setLabelOnline} placeholder="Zoom Meeting" />
                <SmallField label="URL Online" name="url_online" type="url" required value={urlOnline} onChange={setUrlOnline} placeholder="https://zoom.us/j/123456789" />
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">Banner</p>
              <label className="block rounded-xl border-2 border-dashed border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-600">Upload banner event sebagai base64, maks. 5MB</p>
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
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-900">Pembayaran & Tiket</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <PriceMode title="Gratis" desc="tanpa biaya" selected={paymentType === 'free'} onClick={() => handlePaymentTypeChange('free')} />
                <PriceMode title="Berbayar" desc="dengan biaya" selected={paymentType === 'paid'} onClick={() => handlePaymentTypeChange('paid')} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <SmallField label="Nama Tiket" name="ticketName" required value={ticketName} onChange={setTicketName} placeholder={paymentType === 'free' ? 'Free Pass' : 'Regular'} />
                {paymentType === 'paid' && (
                  <SmallField label="Harga (Rp)" name="ticketPrice" type="number" required value={ticketPrice} onChange={setTicketPrice} placeholder="100000" />
                )}
                <SmallField label="Kuota" name="ticketQuota" type="number" required value={ticketQuota} onChange={setTicketQuota} placeholder="100" />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <SmallField label="Mulai Penjualan" name="saleStartAt" type="datetime-local" required value={saleStartAt} onChange={setSaleStartAt} />
                <SmallField label="Akhir Penjualan" name="saleEndAt" type="datetime-local" required value={saleEndAt} onChange={setSaleEndAt} />
              </div>
              {paymentType === 'paid' && ticketPrice && Number(ticketPrice) > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Peserta bayar {formatIDR(Number(ticketPrice))} per tiket.
                </p>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || loadingMaster}
              className="w-full cursor-pointer rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Mempublikasikan...' : `Buat Event${title ? ` - ${title}` : ''}`}
            </button>
          </div>

          <aside className="md:sticky md:top-6 md:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Pratinjau</h2>
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Langsung</span>
              </div>
              <EventCardPreview
                name={title}
                category={selectedCategory?.name ?? 'Kategori'}
                region={selectedCity?.name ?? 'Kota'}
                dateLabel={previewDate(startDateTime)}
                timeLabel={previewTime(startDateTime)}
                location={labelOnline}
                isOnline
                price={previewPrice}
                imageUrl={banner}
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
