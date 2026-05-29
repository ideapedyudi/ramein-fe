import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaCamera, FaKeyboard, FaTimes } from 'react-icons/fa'
import { useZxing } from 'react-zxing'
import AdminLayout from '../components/AdminLayout'
import { api } from '../lib/api'
import { formatDateTime, formatIDR, formatNumber } from '../lib/format'

const attendeeTabs = [
  { value: 'all', label: 'Semua' },
  { value: 'tidak_hadir', label: 'Tidak Hadir' },
  { value: 'hadir', label: 'Hadir' },
]

const bankOptions = [
  'BCA',
  'Mandiri',
  'BRI',
  'BNI',
  'BTN',
  'BSI',
  'CIMB Niaga',
  'Permata Bank',
  'Danamon',
  'OCBC',
  'Maybank',
  'Panin Bank',
]

function isAttendedStatus(value) {
  const status = String(value ?? '').toLowerCase()
  return status === 'hadir' || status === 'attended'
}

function formatAttendeeStatus(value) {
  return isAttendedStatus(value) ? 'Hadir' : 'Tidak Hadir'
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">{children}</div>
  )
}

function CardHeader({ title }) {
  return <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
}

function Info({ label, value, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <div className="mt-1 text-sm text-gray-900">{children ?? value ?? '-'}</div>
    </div>
  )
}

function BigStat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-black/5 bg-gray-50/40 p-4">
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  )
}

function getPublicEventUrl(eventId) {
  return `${window.location.origin}/event/${eventId}`
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function ScanAttendanceModal({ open, onClose, onScanSuccess }) {
  const [mode, setMode] = useState('camera')
  const [manualQr, setManualQr] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [cameraError, setCameraError] = useState('')
  const [cameraRetry, setCameraRetry] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [scanLocked, setScanLocked] = useState(false)

  const submitQrCode = useCallback(
    async (value) => {
      const qrCode = String(value ?? '').trim()
      if (!qrCode || submitting || scanLocked) return

      setSubmitting(true)
      setSubmitError('')
      setSubmitMessage('')
      setScanLocked(true)

      try {
        const result = await api.scanTicketQrCode(qrCode)
        setSubmitMessage(result?.message ?? 'Scan kehadiran berhasil diproses.')
        setManualQr(qrCode)
        onScanSuccess?.()
      } catch (err) {
        setSubmitError(err.message || 'Gagal memproses scan QR.')
      } finally {
        setSubmitting(false)
        setTimeout(() => setScanLocked(false), 1200)
      }
    },
    [onScanSuccess, scanLocked, submitting],
  )

  const scannerOptions = useMemo(
    () =>
      open && mode === 'camera'
        ? {
        paused: submitting || scanLocked,
        constraints: {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        },
        timeBetweenDecodingAttempts: 250,
        onDecodeResult(result) {
          setCameraError('')
          submitQrCode(result.getText())
        },
        onError(error) {
          const errorName = error?.name ?? ''
          const fallback =
            window.isSecureContext || window.location.hostname === 'localhost'
              ? 'Kamera tidak bisa dibuka. Pastikan izin kamera diberikan dan tidak sedang dipakai aplikasi lain.'
              : 'Kamera hanya bisa dibuka di HTTPS atau localhost.'

          setCameraError(
            errorName === 'NotAllowedError'
              ? 'Izin kamera ditolak. Aktifkan permission kamera di browser.'
              : errorName === 'NotFoundError'
                ? 'Kamera tidak ditemukan di perangkat ini.'
                : errorName === 'NotReadableError'
                  ? 'Kamera sedang dipakai aplikasi lain.'
                  : fallback,
          )
        },
      }
        : {
        paused: true,
        onDecodeResult() { },
        onError() { },
      },
    [cameraRetry, mode, open, scanLocked, submitQrCode, submitting],
  )
  const { ref } = useZxing(scannerOptions)

  if (!open) return null

  function handleClose() {
    setMode('camera')
    setManualQr('')
    setSubmitError('')
    setSubmitMessage('')
    setCameraError('')
    setSubmitting(false)
    setScanLocked(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Scan Kehadiran</h3>
            <p className="text-sm text-gray-500">Scan QR peserta atau masukkan kode QR secara manual.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup modal scan"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode('camera')}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${mode === 'camera'
                ? 'bg-brand-600 text-white'
                : 'border border-[#e2e2e2] bg-white text-[#4a4a4a]'
                }`}
            >
              <FaCamera /> Kamera
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${mode === 'manual'
                ? 'bg-brand-600 text-white'
                : 'border border-[#e2e2e2] bg-white text-[#4a4a4a]'
                }`}
            >
              <FaKeyboard /> Input Manual
            </button>
          </div>

          {mode === 'camera' ? (
            <div className="mt-4">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black">
                <video
                  key={cameraRetry}
                  ref={ref}
                  autoPlay
                  muted
                  playsInline
                  onLoadedMetadata={(event) => event.currentTarget.play().catch(() => {})}
                  className="h-[320px] w-full object-cover"
                />
              </div>
              {cameraError && (
                <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p>{cameraError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCameraError('')
                      setCameraRetry((value) => value + 1)
                    }}
                    className="mt-2 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                  >
                    Coba buka kamera lagi
                  </button>
                </div>
              )}
              <p className="mt-3 text-xs text-gray-500">
                Arahkan kamera ke QR peserta. Scan akan langsung diproses.
              </p>
            </div>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
                submitQrCode(manualQr)
              }}
            >
              <div>
                <label htmlFor="manual-qr" className="mb-1 block text-xs font-medium text-gray-600">
                  Kode QR
                </label>
                <input
                  id="manual-qr"
                  type="text"
                  value={manualQr}
                  onChange={(event) => setManualQr(event.target.value)}
                  placeholder="EVP-..."
                  className="w-full rounded-xl border border-[#e2e2e2] px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !manualQr.trim()}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {submitting ? 'Memproses...' : 'Submit Scan'}
              </button>
            </form>
          )}

          {submitMessage && (
            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {submitMessage}
            </div>
          )}

          {submitError && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function WithdrawModal({ open, eventId, totalAmount, onClose, onSuccess }) {
  const [form, setForm] = useState({
    bank_name: 'BCA',
    bank_account: '',
    account_number: '',
    totalAmount: totalAmount || 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await api.createWithdraw({
        eventId,
        bank_name: form.bank_name,
        bank_account: form.bank_account,
        account_number: form.account_number,
        totalAmount: Number(totalAmount) || 0,
      })
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Gagal mengajukan withdraw.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Withdraw Revenue</h3>
            <p className="text-sm text-gray-500">Ajukan pencairan dana untuk event ini.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup modal withdraw"
          >
            <FaTimes />
          </button>
        </div>

        <form className="space-y-4 p-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bank-name" className="mb-1 block text-xs font-medium text-gray-600">
              Nama Bank
            </label>
            <select
              id="bank-name"
              required
              value={form.bank_name}
              onChange={(event) => updateField('bank_name', event.target.value)}
              className="w-full rounded-xl border border-[#e2e2e2] px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {bankOptions.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bank-account" className="mb-1 block text-xs font-medium text-gray-600">
              Nama Pemilik Rekening
            </label>
            <input
              id="bank-account"
              type="text"
              required
              value={form.bank_account}
              onChange={(event) => updateField('bank_account', event.target.value)}
              className="w-full rounded-xl border border-[#e2e2e2] px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label htmlFor="account-number" className="mb-1 block text-xs font-medium text-gray-600">
              Nomor Rekening
            </label>
            <input
              id="account-number"
              type="text"
              required
              value={form.account_number}
              onChange={(event) => updateField('account_number', event.target.value)}
              className="w-full rounded-xl border border-[#e2e2e2] px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label htmlFor="total-amount" className="mb-1 block text-xs font-medium text-gray-600">
              Total Withdraw
            </label>
            <input
              id="total-amount"
              type="text"
              readOnly
              value={formatIDR(totalAmount)}
              className="w-full rounded-xl border border-[#e2e2e2] bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">Jumlah withdraw mengikuti seluruh revenue event.</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {submitting ? 'Menyimpan...' : 'Ajukan Withdraw'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AttendeeSection({ eventId, onScanSuccess }) {
  const [activeTab, setActiveTab] = useState('all')
  const [attendeesByTab, setAttendeesByTab] = useState({})
  const [loadingTab, setLoadingTab] = useState('all')
  const [error, setError] = useState('')
  const [scanModalOpen, setScanModalOpen] = useState(false)

  const loadAttendees = useCallback(
    async (tab, { force = false } = {}) => {
      if (!force && attendeesByTab[tab]) {
        setActiveTab(tab)
        return
      }

      setActiveTab(tab)
      setError('')
      setLoadingTab(tab)

      try {
        const res = await api.getEventAttendees(eventId, tab)
        setAttendeesByTab((current) => ({ ...current, [tab]: res }))
      } catch (err) {
        setError(err.message || 'Gagal memuat daftar peserta.')
      } finally {
        setLoadingTab('')
      }
    },
    [attendeesByTab, eventId],
  )

  useEffect(() => {
    let active = true

      ; (async () => {
        setError('')
        setLoadingTab('all')
        try {
          const res = await api.getEventAttendees(eventId, 'all')
          if (active) setAttendeesByTab({ all: res })
        } catch (err) {
          if (active) setError(err.message || 'Gagal memuat daftar peserta.')
        } finally {
          if (active) setLoadingTab('')
        }
      })()

    return () => {
      active = false
    }
  }, [eventId])

  const attendees = attendeesByTab[activeTab] ?? []

  async function handleScanSuccess() {
    await Promise.all([
      loadAttendees('all', { force: true }),
      activeTab !== 'all' ? loadAttendees(activeTab, { force: true }) : Promise.resolve(),
      onScanSuccess?.() ?? Promise.resolve(),
    ])
  }

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Peserta Terdaftar</h3>
          <p className="text-sm text-gray-500">Daftar pembeli tiket berdasarkan status kehadiran.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {attendeeTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => loadAttendees(tab.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${activeTab === tab.value
                ? 'bg-brand-600 text-white'
                : 'border border-[#e2e2e2] bg-white text-[#4a4a4a] hover:bg-[#f9f9f9]'
                }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setScanModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black"
          >
            <FaCamera /> Scan Kehadiran
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loadingTab === activeTab ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
          Memuat peserta...
        </div>
      ) : attendees.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
          Belum ada peserta untuk filter ini.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Peserta</th>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{attendee.name}</p>
                    <p className="text-xs text-gray-500">{attendee.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{attendee.orderId}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${isAttendedStatus(attendee.attendanceStatus)
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                        }`}
                    >
                      {formatAttendeeStatus(attendee.attendanceStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {formatDateTime(attendee.attendedAt ?? attendee.registeredAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ScanAttendanceModal
        open={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  )
}

function EventKamuDetailPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('detail')
  const [statistic, setStatistic] = useState(null)
  const [statisticLoading, setStatisticLoading] = useState(false)
  const [statisticError, setStatisticError] = useState('')
  const [shareMessage, setShareMessage] = useState('')
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [withdrawMessage, setWithdrawMessage] = useState('')

  const loadStatistic = useCallback(async () => {
    await Promise.resolve()
    setStatisticLoading(true)
    setStatisticError('')

    try {
      const res = await api.getEventStatistic(eventId)
      setStatistic(res)
    } catch (err) {
      setStatisticError(err.message || 'Gagal memuat statistik event.')
    } finally {
      setStatisticLoading(false)
    }
  }, [eventId])

  async function handleShareLink() {
    const publicUrl = getPublicEventUrl(eventId)

    try {
      await copyText(publicUrl)
      setShareMessage('Link event disalin.')
    } catch {
      setShareMessage(publicUrl)
    }

    window.setTimeout(() => setShareMessage(''), 2500)
  }

  useEffect(() => {
    let cancelled = false
    api
      .getMyEvent(eventId)
      .then((res) => {
        if (cancelled) return
        if (!res) setError('Event tidak ditemukan.')
        else setEvent(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Event tidak ditemukan.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [eventId])

  useEffect(() => {
    if (tab !== 'statistik') return

    const timeoutId = window.setTimeout(() => {
      loadStatistic()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadStatistic, tab])

  if (loading) {
    return (
      <AdminLayout title="Memuat...">
        <p className="text-sm text-gray-500">Memuat detail event...</p>
      </AdminLayout>
    )
  }

  if (error || !event) {
    return (
      <AdminLayout title="Event tidak ditemukan">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-gray-900">{error || 'Event tidak ditemukan.'}</h2>
          <Link to="/event-kamu" className="mt-4 inline-block text-brand-600 hover:underline">
            Kembali ke Event Saya
          </Link>
        </div>
      </AdminLayout>
    )
  }

  const stats = {
    terjual: statistic?.terjual ?? event.registered ?? 0,
    hadir: statistic?.hadir ?? event.attended ?? 0,
    kuota: statistic?.kuota ?? event.totalQuota ?? 0,
    revenue: statistic?.revenue ?? event.revenue ?? 0,
  }
  const isWithdraw = Boolean(event.isWithdraw ?? event.is_withdraw)
  const isRevenueEmpty = Number(stats.revenue) <= 0
  const isWithdrawDisabled = isWithdraw || isRevenueEmpty

  return (
    <AdminLayout
      title={event.name ?? '-'}
      subtitle={`${formatDateTime(event.startDateTime)} - ${event.city}`}
      actions={
        <div className="text-right">
          <button
            type="button"
            onClick={handleShareLink}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium hover:bg-gray-50 sm:text-sm"
          >
            Share Link
          </button>
          {shareMessage && (
            <p className="mt-2 max-w-[240px] break-words text-xs text-emerald-600">{shareMessage}</p>
          )}
        </div>
      }
    >
      <Link to="/event-kamu" className="mb-4 inline-block text-sm text-gray-600 hover:text-brand-600">
        Kembali ke Event Saya
      </Link>

      <div>
        <div className="-mx-4 overflow-x-auto border-b border-gray-200 px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-6 sm:gap-8">
            {[
              { key: 'detail', label: 'Detail Event' },
              { key: 'ticket', label: `Tiket (${event.ticketTypes?.length ?? 0})` },
              { key: 'statistik', label: 'Statistik' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`relative -mb-px whitespace-nowrap border-b-2 px-1 pb-3 pt-2 text-sm font-medium transition ${tab === item.key
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {tab === 'detail' && (
            <Card>
              <CardHeader title="Informasi Event" />
              <div className="relative mb-5 h-44 overflow-hidden rounded-xl bg-linear-to-br from-brand-400 to-brand-600 sm:h-56 md:h-64">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="Mulai" value={formatDateTime(event.startDateTime)} />
                <Info label="Selesai" value={formatDateTime(event.endDateTime)} />
                <Info label="Kota" value={event.city} />
                <Info label="Alamat" value={event.addressDetail} />
                <Info label="Kategori" value={event.category} />
                <Info label="Organizer" value={event.organizer?.name} />
                <Info label="Status">
                  <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold uppercase text-amber-700">
                    {event.status ?? '-'}
                  </span>
                </Info>
                <Info label="Published" value={event.isPublished ? 'Ya' : 'Belum'} />
              </div>
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500">Deskripsi</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{event.description || '-'}</p>
              </div>
            </Card>
          )}

          {tab === 'ticket' && (
            <Card>
              <CardHeader title="Tipe Tiket" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Nama</th>
                      <th className="px-4 py-3">Harga</th>
                      <th className="px-4 py-3">Kuota</th>
                      <th className="px-4 py-3">Terjual</th>
                      <th className="px-4 py-3">Mulai Jual</th>
                      <th className="px-4 py-3">Akhir Jual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(event.ticketTypes ?? []).map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="px-4 py-3 font-medium text-gray-900">{ticket.name}</td>
                        <td className="px-4 py-3 text-gray-600">{formatIDR(ticket.price)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatNumber(ticket.quota)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatNumber(ticket.sold ?? 0)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDateTime(ticket.saleStartAt)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDateTime(ticket.saleEndAt)}</td>
                      </tr>
                    ))}
                    {(event.ticketTypes ?? []).length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          Belum ada tipe tiket.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {tab === 'statistik' && (
            <Card>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <CardHeader title="Statistik" />
                <div className="text-left sm:text-right">
                  <button
                    type="button"
                    onClick={() => setWithdrawModalOpen(true)}
                    disabled={isWithdrawDisabled}
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {isWithdraw ? 'Withdraw' : 'Withdraw'}
                  </button>
                </div>
              </div>
              {withdrawMessage && (
                <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {withdrawMessage}
                </div>
              )}
              {statisticError && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {statisticError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <BigStat
                  label={statisticLoading ? 'Memuat terjual...' : 'Terjual'}
                  value={formatNumber(stats.terjual)}
                  accent="text-brand-600"
                />
                <BigStat
                  label={statisticLoading ? 'Memuat hadir...' : 'Hadir'}
                  value={formatNumber(stats.hadir)}
                  accent="text-emerald-600"
                />
                <BigStat
                  label={statisticLoading ? 'Memuat kuota...' : 'Kuota'}
                  value={formatNumber(stats.kuota)}
                  accent="text-amber-600"
                />
                <BigStat
                  label="Revenue"
                  value={formatIDR(stats.revenue)}
                  accent="text-rose-600"
                />
              </div>

              <AttendeeSection eventId={eventId} onScanSuccess={loadStatistic} />
              {withdrawModalOpen && (
                <WithdrawModal
                  open={withdrawModalOpen}
                  eventId={eventId}
                  totalAmount={stats.revenue}
                  onClose={() => setWithdrawModalOpen(false)}
                  onSuccess={() => {
                    setWithdrawModalOpen(false)
                    setWithdrawMessage('Pengajuan withdraw berhasil disimpan.')
                    setEvent((current) =>
                      current ? { ...current, isWithdraw: true, is_withdraw: true } : current,
                    )
                  }}
                />
              )}
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default EventKamuDetailPage
