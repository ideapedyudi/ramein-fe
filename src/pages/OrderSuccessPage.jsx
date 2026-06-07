import confetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatIDR } from '../lib/format'

const ratingOptions = [
  { value: 'Sangat Puas', emoji: '😍' },
  { value: 'Puas', emoji: '🙂' },
  { value: 'Cukup Puas', emoji: '😐' },
  { value: 'Tidak Puas', emoji: '🙁' },
  { value: 'Sangat Tidak Puas', emoji: '😠' },
]

const CONFETTI_DURATION_MS = 2400
const CONFETTI_SETTLE_DELAY_MS = 1800
const FEEDBACK_AFTER_CONFETTI_DELAY_MS = CONFETTI_DURATION_MS + CONFETTI_SETTLE_DELAY_MS
const RSVP_FEEDBACK_DELAY_MS = 1400

function fireRealisticConfetti() {
  if (typeof window === 'undefined') return undefined

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return undefined

  const duration = CONFETTI_DURATION_MS
  const animationEnd = Date.now() + duration
  const defaults = {
    disableForReducedMotion: true,
    origin: { y: 0.7 },
    zIndex: 70,
  }

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(220 * particleRatio),
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    decay: 0.91,
    scalar: 0.8,
    spread: 100,
  })
  fire(0.1, {
    decay: 0.92,
    scalar: 1.2,
    spread: 120,
    startVelocity: 25,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })

  const intervalId = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      window.clearInterval(intervalId)
      return
    }

    const particleCount = 40 * (timeLeft / duration)
    confetti({
      ...defaults,
      angle: 60,
      origin: { x: 0, y: 0.72 },
      particleCount,
      spread: 55,
      startVelocity: 38,
    })
    confetti({
      ...defaults,
      angle: 120,
      origin: { x: 1, y: 0.72 },
      particleCount,
      spread: 55,
      startVelocity: 38,
    })
  }, 250)

  return () => window.clearInterval(intervalId)
}

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

function FeedbackModal({
  open,
  feedback,
  onChange,
  onClose,
  onSubmit,
  submitting,
  submitError,
}) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Feedback Transaksi
            </p>
            <h2 id="feedback-modal-title" className="mt-2 text-2xl font-bold text-gray-900">
              Gimana pengalaman transaksi kamu?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Contoh feedback: rating <strong>Sangat Puas</strong>, review{' '}
              <strong>Proses transaksi mudah dan cepat</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Nanti
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Rating</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {ratingOptions.map((option) => {
                const isActive = feedback.rating === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange('rating', option.value)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${isActive
                      ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-100'
                      : 'border-gray-200 text-gray-700 hover:border-brand-200 hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl leading-none">{option.emoji}</span>
                      <span>{option.value}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-gray-900">
              Review <span className="font-normal text-gray-500">(opsional)</span>
            </span>
            <textarea
              value={feedback.review}
              onChange={(event) => onChange('review', event.target.value)}
              rows={4}
              placeholder="Proses transaksi mudah dan cepat"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          {submitError && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Lewati dulu
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Mengirim...' : 'Kirim feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
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
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')
  const [feedbackNotice, setFeedbackNotice] = useState('')
  const [feedback, setFeedback] = useState({
    rating: ratingOptions[0].value,
    review: '',
  })
  const hasCelebratedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled || eventId) return
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
    })

    return () => {
      cancelled = true
    }
  }, [eventId, orderId, params])

  useEffect(() => {
    let cancelled = false
    if (!eventId) return undefined

    Promise.resolve().then(() => {
      if (cancelled) return
      setError('')
      return api.getEvent(eventId).then((res) => {
        if (cancelled) return
        if (!res) {
          setError('Event not found')
          return
        }
        setEvent(res)
      })
    })

    return () => {
      cancelled = true
    }
  }, [eventId])

  useEffect(() => {
    if (!event || !orderId) return

    const feedbackDelay = total > 0 ? FEEDBACK_AFTER_CONFETTI_DELAY_MS : RSVP_FEEDBACK_DELAY_MS
    const timeoutId = window.setTimeout(() => {
      setFeedback({
        rating: ratingOptions[0].value,
        review: '',
      })
      setFeedbackOpen(true)
    }, feedbackDelay)

    return () => window.clearTimeout(timeoutId)
  }, [event, orderId, total])

  useEffect(() => {
    if (!event || !orderId || total <= 0 || hasCelebratedRef.current) return

    hasCelebratedRef.current = true
    return fireRealisticConfetti()
  }, [event, orderId, total])

  useEffect(() => {
    if (!feedbackNotice) return undefined

    const timeoutId = window.setTimeout(() => {
      setFeedbackNotice('')
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [feedbackNotice])

  const updateFeedback = (key, value) => {
    setFeedback((current) => ({ ...current, [key]: value }))
  }

  const closeFeedbackModal = () => {
    setFeedbackOpen(false)
    setFeedbackError('')
  }

  const openFeedbackModal = () => {
    setFeedbackError('')
    setFeedbackOpen(true)
  }

  const handleSubmitFeedback = async (eventSubmit) => {
    eventSubmit.preventDefault()
    setFeedbackSubmitting(true)
    setFeedbackError('')

    try {
      const trimmedReview = feedback.review.trim()
      await api.createFeedback({
        rating: feedback.rating,
        review: trimmedReview,
      })

      const nextFeedback = {
        orderId,
        eventId: event?.id ?? eventId,
        eventName: event?.name ?? '',
        rating: feedback.rating,
        review: trimmedReview,
        submittedAt: new Date().toISOString(),
      }
      setFeedbackNotice('Feedback berhasil dikirim. Terima kasih.')
      setFeedbackOpen(false)
      setFeedback(nextFeedback)
    } catch (submitError) {
      setFeedbackError(submitError.message || 'Feedback belum berhasil dikirim. Coba lagi.')
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[920px] px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
        <Link to="/" className="mt-4 inline-block text-brand-600 hover:underline">
          &larr; Kembali ke Beranda
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
          <Link to="/" className="text-sm text-gray-600 hover:text-brand-600">
            &larr; Beranda
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-3xl">
            &#10003;
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {isRsvp ? 'Hore!!! RSVP Berhasil!' : 'Hore!!! Pembayaran Berhasil!'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isRsvp
              ? 'Kamu sudah terdaftar di event ini. Detail akses sudah kami siapkan di bawah.'
              : 'E-ticket sudah dikirim ke email kamu. Tunjukkan QR code di lokasi untuk validasi.'}
          </p>

          {feedbackNotice && (
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {feedbackNotice}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/40 p-5">
            <p className="text-xs font-medium uppercase text-gray-500">Order ID</p>
            <p className="mt-0.5 font-mono text-sm text-gray-900">{orderId || '-'}</p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="font-semibold text-gray-900">{event.name}</p>
              <p className="mt-0.5 text-sm text-gray-600">
                Tanggal: {event.dateLabel} | Lokasi: {event.location}
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
                Akses: {event.attachmentLabel ?? 'Akses Event'}
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
                Simpan link ini. Link juga sudah dikirim ke email kamu.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/40 p-5 text-sm text-gray-600">
              {event.isOnline
                ? 'Detail akses online akan dikirim ke email kamu menjelang acara.'
                : 'Tunjukkan e-ticket di pintu masuk untuk validasi QR Code.'}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-black/5 bg-[#fffaf1] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
                  Feedback
                </p>
                <h2 className="mt-2 text-lg font-semibold text-gray-900">
                  Bantu kami nilai pengalaman transaksi kamu
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Rating wajib dipilih, review boleh dikosongkan.
                </p>
              </div>
              <button
                type="button"
                onClick={openFeedbackModal}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Beri feedback
              </button>
            </div>
          </div>

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

      <FeedbackModal
        open={feedbackOpen}
        feedback={feedback}
        onChange={updateFeedback}
        onClose={closeFeedbackModal}
        onSubmit={handleSubmitFeedback}
        submitting={feedbackSubmitting}
        submitError={feedbackError}
      />
    </div>
  )
}

export default OrderSuccessPage
