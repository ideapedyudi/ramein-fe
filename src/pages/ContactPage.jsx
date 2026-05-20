import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'

const channels = [
  { icon: '📧', label: 'Email', value: 'halo@ramein.id', href: 'mailto:halo@ramein.id' },
  { icon: '💬', label: 'WhatsApp', value: '+62 812 0000 0000', href: 'https://wa.me/6281200000000' },
  { icon: '📍', label: 'Alamat', value: 'Jakarta, Indonesia', href: null },
]

function Field({ label, name, type = 'text', placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    setSent(true)
  }

  return (
    <SiteLayout>
      <PageHeader title="Hubungi Kami" subtitle="Ada pertanyaan atau butuh bantuan? Tim Ramein siap membantu." />

      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="space-y-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href ?? '#'}
              onClick={(e) => !c.href && e.preventDefault()}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{c.label}</p>
                <p className="text-base font-semibold text-gray-900">{c.value}</p>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
            <p className="mt-2 text-sm text-gray-600">Senin – Jumat: 09.00 – 18.00 WIB</p>
            <p className="text-sm text-gray-600">Sabtu: 09.00 – 14.00 WIB</p>
            <p className="text-sm text-gray-600">Minggu & Libur Nasional: tutup</p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">Kirim Pesan</h2>
          <p className="mt-1 text-sm text-gray-600">Isi form di bawah, tim kami akan membalas dalam 1×24 jam.</p>

          {sent ? (
            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-700">
              ✓ Terima kasih{form.name ? `, ${form.name}` : ''}! Pesan kamu sudah masuk.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <Field label="Nama" name="name" placeholder="Nama lengkap kamu" value={form.name} onChange={update('name')} />
              <Field label="Email" name="email" type="email" placeholder="nama@email.com" value={form.email} onChange={update('email')} />
              <Field label="Subjek" name="subject" placeholder="Tentang apa pesan kamu?" value={form.subject} onChange={update('subject')} />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">Pesan</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tulis pesan kamu di sini..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          )}
        </div>
      </div>
      <SiteFooter />
    </SiteLayout>
  )
}

export default ContactPage
