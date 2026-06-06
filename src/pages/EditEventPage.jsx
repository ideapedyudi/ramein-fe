import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'

const initialTicket = {
  name: 'Regular',
  price: '0',
  quota: '0',
  sold: '0',
  saleStartAt: '',
  saleEndAt: '',
}

const initialForm = {
  title: '',
  description: '',
  categoryId: '',
  organizerId: '',
  cityId: '',
  addressDetail: '',
  banner: '',
  eventType: 'offline',
  labelOnline: '',
  urlOnline: '',
  paymentType: 'paid',
  startDateTime: '',
  endDateTime: '',
  status: 'published',
  isPublished: true,
  ticketTypes: [{ ...initialTicket }],
}

function toInputDateTime(value) {
  return value ? String(value).slice(0, 16) : ''
}

function toIsoDateTime(value) {
  return value ? new Date(value).toISOString() : null
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function Select({ label, value, onChange, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {children}
      </select>
    </label>
  )
}

function ticketToForm(ticket) {
  return {
    name: ticket.name ?? 'Regular',
    price: String(Number(ticket.price) || 0),
    quota: String(Number(ticket.quota) || 0),
    sold: String(Number(ticket.sold) || 0),
    saleStartAt: toInputDateTime(ticket.saleStartAt ?? ticket.sale_start_at),
    saleEndAt: toInputDateTime(ticket.saleEndAt ?? ticket.sale_end_at),
  }
}

function EditEventPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [categories, setCategories] = useState([])
  const [organizers, setOrganizers] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const loadEvent = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [event, categoryRows, organizerRows, cityRows] = await Promise.all([
        api.getMyEvent(eventId),
        api.getMasterCategories(),
        api.getMasterOrganizers(),
        api.getMasterCities(),
      ])

      if (!event) {
        setError('Event tidak ditemukan.')
        return
      }

      setCategories(categoryRows)
      setOrganizers(organizerRows)
      setCities(cityRows)
      setForm({
        title: event.title ?? event.name ?? '',
        description: event.description ?? '',
        categoryId: event.categoryId ?? categoryRows[0]?.id ?? '',
        organizerId: event.organizerId ?? organizerRows[0]?.id ?? '',
        cityId: event.cityId ?? cityRows[0]?.id ?? '',
        addressDetail: event.addressDetail ?? '',
        banner: event.banner ?? event.imageUrl ?? '',
        eventType: event.eventType === 'online' ? 'online' : 'offline',
        labelOnline: event.labelOnline ?? '',
        urlOnline: event.urlOnline ?? '',
        paymentType: event.paymentType ?? 'paid',
        startDateTime: toInputDateTime(event.startDateTime),
        endDateTime: toInputDateTime(event.endDateTime),
        status: event.status ?? (event.isPublished ? 'published' : 'draft'),
        isPublished: Boolean(event.isPublished),
        ticketTypes: event.ticketTypes?.length
          ? event.ticketTypes.map(ticketToForm)
          : [{ ...initialTicket }],
      })
    } catch (err) {
      setError(err.message || 'Gagal memuat event.')
    } finally {
      setLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEvent()
    }, 0)

    return () => clearTimeout(timer)
  }, [loadEvent])

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function updateTicket(index, key, value) {
    setForm((current) => ({
      ...current,
      ticketTypes: current.ticketTypes.map((ticket, ticketIndex) =>
        ticketIndex === index ? { ...ticket, [key]: value } : ticket,
      ),
    }))
  }

  function addTicket() {
    setForm((current) => ({
      ...current,
      ticketTypes: [...current.ticketTypes, { ...initialTicket }],
    }))
  }

  function removeTicket(index) {
    setForm((current) => ({
      ...current,
      ticketTypes:
        current.ticketTypes.length === 1
          ? current.ticketTypes
          : current.ticketTypes.filter((_, ticketIndex) => ticketIndex !== index),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.updateEvent(eventId, {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        addressDetail: form.addressDetail.trim(),
        banner: form.banner.trim() || null,
        labelOnline: form.eventType === 'online' ? form.labelOnline.trim() || null : null,
        urlOnline: form.eventType === 'online' ? form.urlOnline.trim() || null : null,
        startDateTime: toIsoDateTime(form.startDateTime),
        endDateTime: toIsoDateTime(form.endDateTime),
        ticketTypes: form.ticketTypes.map((ticket) => ({
          name: ticket.name.trim(),
          price: Number(ticket.price) || 0,
          quota: Number(ticket.quota) || 0,
          sold: Number(ticket.sold) || 0,
          saleStartAt: toIsoDateTime(ticket.saleStartAt),
          saleEndAt: toIsoDateTime(ticket.saleEndAt),
        })),
      })
      navigate(`/event-kamu/${eventId}`)
    } catch (err) {
      setError(err.message || 'Gagal mengupdate event.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout
      title="Edit Event"
      subtitle="Update data lengkap event"
      actions={
        <Link
          to="/event-kamu"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 sm:px-4 sm:text-sm"
        >
          Event Saya
        </Link>
      }
    >
      <section className="rounded-2xl border border-[#eee] bg-white p-5 sm:p-6">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Memuat event...</div>
        ) : error && !form.title ? (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-3">
                <Field
                  label="Judul Event"
                  value={form.title}
                  onChange={(value) => updateForm('title', value)}
                  required
                  placeholder="Konser Akhir Tahun Updated"
                />
              </div>

              <Select
                label="Kategori"
                value={form.categoryId}
                onChange={(value) => updateForm('categoryId', value)}
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Select
                label="Organizer"
                value={form.organizerId}
                onChange={(value) => updateForm('organizerId', value)}
                required
              >
                <option value="">Pilih organizer</option>
                {organizers.map((organizer) => (
                  <option key={organizer.id} value={organizer.id}>
                    {organizer.name}
                  </option>
                ))}
              </Select>
              <Select
                label="Kota"
                value={form.cityId}
                onChange={(value) => updateForm('cityId', value)}
                required
              >
                <option value="">Pilih kota</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(event) => updateForm('description', event.target.value)}
                placeholder="Konser musik dengan banyak artis dan guest star."
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Field
                label="Detail Alamat"
                value={form.addressDetail}
                onChange={(value) => updateForm('addressDetail', value)}
                required
                placeholder="Gate B, lantai 1"
              />
              <Field
                label="Banner"
                value={form.banner}
                onChange={(value) => updateForm('banner', value)}
                placeholder="URL/base64 banner, kosongkan untuk null"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              <Select
                label="Tipe Event"
                value={form.eventType}
                onChange={(value) => updateForm('eventType', value)}
                required
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </Select>
              <Select
                label="Payment"
                value={form.paymentType}
                onChange={(value) => updateForm('paymentType', value)}
                required
              >
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </Select>
              <Select
                label="Status"
                value={form.status}
                onChange={(value) => updateForm('status', value)}
                required
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
              </Select>
              <Select
                label="Published"
                value={form.isPublished ? 'true' : 'false'}
                onChange={(value) => updateForm('isPublished', value === 'true')}
                required
              >
                <option value="true">Ya</option>
                <option value="false">Tidak</option>
              </Select>
            </div>

            {form.eventType === 'online' && (
              <div className="grid gap-4 lg:grid-cols-2">
                <Field
                  label="Label Online"
                  value={form.labelOnline}
                  onChange={(value) => updateForm('labelOnline', value)}
                  placeholder="Zoom Meeting"
                />
                <Field
                  label="URL Online"
                  value={form.urlOnline}
                  onChange={(value) => updateForm('urlOnline', value)}
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Mulai Event"
                type="datetime-local"
                value={form.startDateTime}
                onChange={(value) => updateForm('startDateTime', value)}
                required
              />
              <Field
                label="Selesai Event"
                type="datetime-local"
                value={form.endDateTime}
                onChange={(value) => updateForm('endDateTime', value)}
                required
              />
            </div>

            <div className="rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-gray-900">Ticket Types</h2>
                <button
                  type="button"
                  onClick={addTicket}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <FaPlus className="text-[10px]" />
                  Tambah Tiket
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {form.ticketTypes.map((ticket, index) => (
                  <div key={index} className="rounded-xl border border-gray-100 bg-gray-50/40 p-4">
                    <div className="grid gap-3 lg:grid-cols-6">
                      <Field
                        label="Nama"
                        value={ticket.name}
                        onChange={(value) => updateTicket(index, 'name', value)}
                        required
                      />
                      <Field
                        label="Harga"
                        type="number"
                        value={ticket.price}
                        onChange={(value) => updateTicket(index, 'price', value)}
                        required
                      />
                      <Field
                        label="Quota"
                        type="number"
                        value={ticket.quota}
                        onChange={(value) => updateTicket(index, 'quota', value)}
                        required
                      />
                      <Field
                        label="Sold"
                        type="number"
                        value={ticket.sold}
                        onChange={(value) => updateTicket(index, 'sold', value)}
                        required
                      />
                      <Field
                        label="Sale Start"
                        type="datetime-local"
                        value={ticket.saleStartAt}
                        onChange={(value) => updateTicket(index, 'saleStartAt', value)}
                      />
                      <Field
                        label="Sale End"
                        type="datetime-local"
                        value={ticket.saleEndAt}
                        onChange={(value) => updateTicket(index, 'saleEndAt', value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTicket(index)}
                      disabled={form.ticketTypes.length === 1}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaTrashAlt className="text-[10px]" />
                      Hapus Tiket
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {submitting ? 'Menyimpan...' : 'Simpan Update'}
              </button>
              <Link
                to={`/event-kamu/${eventId}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Link>
            </div>
          </form>
        )}
      </section>
    </AdminLayout>
  )
}

export default EditEventPage
