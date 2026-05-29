import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'

function CopyButton({ value }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard?.writeText(value)
        }
      }}
      className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
    >
      Copy Link
    </button>
  )
}

function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') ?? params.get('order_id') ?? ''
  const totalQuery = params.get('total') ?? params.get('gross_amount')
  const initialTotal = Number(totalQuery ?? '0')
  const [eventId, setEventId] = useState(params.get('eventId') ?? '')
  const [total, setTotal] = useState(Number.isFinite(initialTotal) ? initialTotal : 0)
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (eventId) return
    if (!orderId || typeof window === 'undefined') {
      setError('Missing event')
      return
    }

    try {
      const rawMeta = window.localStorage.getItem(`checkout_meta_${orderId}`)
      if (!rawMeta) {
        setError('Missing event')
        return
      }

      const meta = JSON.parse(rawMeta)
      if (!meta?.eventId) {
        setError('Missing event')
        return
      }

      setEventId(String(meta.eventId))
      if (!params.get('total') && Number.isFinite(Number(meta.total))) {
        setTotal(Number(meta.total))
      }
    } catch {
      setError('Missing event')
    }
  }, [eventId, orderId, params])

  useEffect(() => {
    let cancelled = false
    if (!eventId) return

    setError('')
    api.getEvent(eventId).then((res) => {
      if (cancelled) return
      if (!res) {
        setError('Event not found')
        return
      }
      setEvent(res)
    })
    return () => {
      cancelled = true
    }
  }, [eventId])

  if (error) {
    return (
      <div className="mx-auto max-w-[920px] px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
        <Link to="/home" className="mt-4 inline-block text-brand-600 hover:underline">
          ← Kembali ke Beranda
        </Link>
      </div>
    )
  }

  if (!event) {
    return <div className="mx-auto max-w-[920px] px-4 py-20 text-center text-gray-500">Memuat...</div>
  }

  const isRsvp = total === 0

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-[920px] px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/home" className="text-sm text-gray-600 hover:text-brand-600">
            ← Beranda
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-3xl">✓</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {isRsvp ? 'RSVP Berhasil!' : 'Pembayaran Berhasil!'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isRsvp
              ? 'Kamu sudah terdaftar di event ini. Detail akses sudah kami siapkan di bawah.'
              : 'E-ticket sudah dikirim ke email kamu. Tunjukkan QR code di lokasi untuk validasi.'}
          </p>

          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/40 p-5">
            <p className="text-xs font-medium uppercase text-gray-500">Order ID</p>
            <p className="mt-0.5 font-mono text-sm text-gray-900">{orderId || '—'}</p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="font-semibold text-gray-900">{event.name}</p>
              <p className="mt-0.5 text-sm text-gray-600">
                📅 {event.dateLabel} · 📍 {event.location}
              </p>
              {!isRsvp && (
                <p className="mt-3 text-sm">
                  <span className="text-gray-500">Total dibayar: </span>
                  <span className="font-bold text-brand-600">{formatIDR(total)}</span>
                </p>
              )}
            </div>
          </div>

          {event.attachmentUrl ? (
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
              <p className="text-sm font-semibold text-brand-700">
                🎁 {event.attachmentLabel ?? 'Akses Event'}
              </p>
              <p className="mt-1 text-xs text-brand-700/80">
                Berikut link akses yang disiapkan organizer untuk peserta:
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={event.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all rounded-lg border border-brand-300 bg-white px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
                >
                  {event.attachmentUrl}
                </a>
                <CopyButton value={event.attachmentUrl} />
              </div>
              <p className="mt-3 text-xs text-brand-700/70">
                💡 Simpan link ini. Link juga sudah dikirim ke email kamu.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/40 p-5 text-sm text-gray-600">
              {event.isOnline
                ? 'Detail akses online akan dikirim ke email kamu menjelang acara.'
                : 'Tunjukkan e-ticket di pintu masuk untuk validasi QR Code.'}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/event/${event.id}`}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Kembali ke Event
            </Link>
            <Link
              to="/jelajahi"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Jelajahi Event Lain
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
