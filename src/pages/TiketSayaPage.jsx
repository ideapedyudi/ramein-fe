import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaLink,
  FaMapMarkerAlt,
  FaQrcode,
  FaShareAlt,
  FaTicketAlt,
  FaTimes,
} from 'react-icons/fa'
import { QRCodeSVG } from 'qrcode.react'
import AdminLayout from '../components/AdminLayout'
import EventImage from '../components/EventImage'
import MarqueeText from '../components/MarqueeText'
import { api } from '../lib/api'
import { formatDateTime, formatIDR } from '../lib/format'

const statusStyle = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  used: 'bg-gray-100 text-gray-600 ring-gray-200',
  refunded: 'bg-amber-50 text-amber-700 ring-amber-200',
}

const statusLabel = {
  active: 'aktif',
  used: 'sudah dipakai',
  refunded: 'refund',
}

const filters = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'used', label: 'Sudah Dipakai' },
]

function TicketQrModal({ open, ticket, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const ticketItems = ticket?.tickets?.length
    ? ticket.tickets
    : ticket
      ? [
          {
            id: ticket.id,
            qrCode: ticket.qrCode,
            status: ticket.status,
            attendedAt: ticket.attendedAt,
            number: 1,
          },
        ]
      : []
  const activeTicket = ticketItems[Math.min(activeIndex, ticketItems.length - 1)]
  const canSlide = ticketItems.length > 1

  if (!open || !ticket || !activeTicket) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">QR Tiket</p>
            <h3 className="mt-1 text-lg font-bold text-[#1f1f1f]">{ticket.eventName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#6d6d6d] hover:bg-[#f6f6f6]"
            aria-label="Tutup modal QR"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-[#d9d9d9] bg-[#fafafa] p-6 text-center">
          {canSlide && (
            <div className="mb-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
                disabled={activeIndex === 0}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#e2e2e2] bg-white text-[#4a4a4a] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="QR tiket sebelumnya"
              >
                <FaChevronLeft />
              </button>
              <p className="text-xs font-semibold text-[#6d6d6d]">
                Tiket {activeIndex + 1} dari {ticketItems.length}
              </p>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((index) => Math.min(ticketItems.length - 1, index + 1))
                }
                disabled={activeIndex === ticketItems.length - 1}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#e2e2e2] bg-white text-[#4a4a4a] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="QR tiket berikutnya"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
          <div className="mx-auto inline-flex rounded-2xl bg-white p-3 shadow-sm">
            <QRCodeSVG value={activeTicket.qrCode || activeTicket.id} size={192} level="M" includeMargin />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#1f1f1f]">Tiket siap dipakai untuk check-in</p>
          <p className="mt-1 text-xs text-[#6d6d6d]">Tunjukkan tiket ini ke petugas saat masuk event.</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-[#efefef] p-3">
            <p className="text-[10px] uppercase text-[#9a9a9a]">Order ID</p>
            <p className="mt-1 font-mono text-xs text-[#1f1f1f]">{ticket.orderId}</p>
          </div>
          <div className="rounded-xl border border-[#efefef] p-3">
            <p className="text-[10px] uppercase text-[#9a9a9a]">Status</p>
            <p className="mt-1 font-semibold text-[#1f1f1f]">
              {statusLabel[activeTicket.status] ?? activeTicket.status}
            </p>
          </div>
          <div className="rounded-xl border border-[#efefef] p-3">
            <p className="text-[10px] uppercase text-[#9a9a9a]">Tanggal Event</p>
            <p className="mt-1 font-semibold text-[#1f1f1f]">{ticket.dateLabel}</p>
          </div>
          <div className="rounded-xl border border-[#efefef] p-3">
            <p className="text-[10px] uppercase text-[#9a9a9a]">Check-in</p>
            <p className="mt-1 font-semibold text-[#1f1f1f]">
              {activeTicket.attendedAt ? formatDateTime(activeTicket.attendedAt) : 'Belum hadir'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TicketCard({
  ticket,
  onShowQr,
  onOpenOnlineEvent,
  onShareSocialMedia,
  sharing,
  openingOnlineLink,
}) {
  const onlineUrl = String(ticket.eventOnlineUrl ?? '').trim()
  const hasOnlineUrl = onlineUrl.length > 0
  const canOpenOnlineLink = hasOnlineUrl && !openingOnlineLink

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`relative w-full overflow-hidden bg-[#f3f3f3] ${
          ticket.imageUrl ? '' : 'aspect-video'
        }`}
      >
        <EventImage src={ticket.imageUrl} alt={ticket.eventName} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">
              {ticket.orderId}
            </p>
            <h3 className="mt-0.5 text-base font-bold text-[#1f1f1f] sm:text-lg">
              <MarqueeText text={ticket.eventName} />
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ring-1 ${
              statusStyle[ticket.status] ?? 'bg-gray-100 text-gray-600 ring-gray-200'
            }`}
          >
            {statusLabel[ticket.status] ?? ticket.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6d6d6d]">
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt className="text-brand-500" />
            {ticket.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-brand-500" />
            {ticket.location}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[#f0f0f0] pt-3">
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Tier</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{ticket.tier}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Jumlah</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{ticket.quantity}x</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9a9a9a]">Total</p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">
              {formatIDR(ticket.total)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {hasOnlineUrl ? (
            <a
              href={onlineUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                if (!canOpenOnlineLink) return
                onOpenOnlineEvent(ticket)
              }}
              aria-disabled={!canOpenOnlineLink}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition ${
                canOpenOnlineLink
                  ? 'bg-brand-600 hover:bg-brand-700'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              <FaLink /> {openingOnlineLink ? 'Membuka Link...' : 'Akses Link'}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onShowQr(ticket)}
              disabled={ticket.status !== 'active'}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <FaQrcode /> Tampilkan QR
            </button>
          )}
          <button
            type="button"
            onClick={() => onShareSocialMedia(ticket)}
            disabled={sharing}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaShareAlt /> {sharing ? 'Menyiapkan...' : 'Pamerin'}
          </button>
          <Link
            to={`/event/${ticket.eventId}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[#e2e2e2] px-3 py-2 text-xs font-semibold text-[#373737] hover:bg-[#f9f9f9]"
          >
            Detail Event
          </Link>
        </div>
      </div>
    </article>
  )
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text ?? '').split(' ')
  const lines = []
  let current = ''

  words.forEach((word) => {
    const trial = current ? `${current} ${word}` : word
    if (ctx.measureText(trial).width <= maxWidth) {
      current = trial
    } else if (current) {
      lines.push(current)
      current = word
    } else {
      lines.push(word)
      current = ''
    }
  })

  if (current) lines.push(current)

  lines.slice(0, maxLines).forEach((line, index) => {
    const visible = index === maxLines - 1 && lines.length > maxLines ? `${line}...` : line
    ctx.fillText(visible, x, y + lineHeight * index)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('Image source missing'))
      return
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image'))
    image.src = src
  })
}

async function buildSocialShareBlob(ticket) {
  const width = 1080
  const height = 1920
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas tidak tersedia.')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#171717')
  gradient.addColorStop(0.45, '#2563eb')
  gradient.addColorStop(1, '#06b6d4')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  try {
    const image = await loadImage(ticket.imageUrl)
    ctx.save()
    ctx.globalAlpha = 0.32
    const imageRatio = image.width / image.height
    const canvasRatio = width / 720
    let drawWidth = width
    let drawHeight = width / imageRatio

    if (imageRatio < canvasRatio) {
      drawHeight = 720
      drawWidth = drawHeight * imageRatio
    }

    ctx.drawImage(image, (width - drawWidth) / 2, 0, drawWidth, drawHeight)
    ctx.restore()
  } catch {
    // Keep the gradient-only background when the event image cannot be loaded.
  }

  ctx.fillStyle = 'rgba(255,255,255,0.14)'
  ctx.fillRect(72, 72, width - 144, height - 144)

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 42px Inter, Arial, sans-serif'
  ctx.fillText('Aku baru beli tiket di', 108, 162)

  ctx.font = '700 68px Inter, Arial, sans-serif'
  ctx.fillText('ramein.fun', 108, 238)

  ctx.fillStyle = '#f5f5f5'
  ctx.font = '700 72px Inter, Arial, sans-serif'
  wrapCanvasText(ctx, ticket.eventName, 108, 980, width - 216, 88, 3)

  ctx.fillStyle = '#e0f2fe'
  ctx.font = '500 38px Inter, Arial, sans-serif'
  ctx.fillText(ticket.dateLabel, 108, 1270)
  wrapCanvasText(ctx, ticket.location, 108, 1328, width - 216, 48, 2)

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 44px Inter, Arial, sans-serif'
  ctx.fillText(`${ticket.tier} • ${ticket.quantity}x`, 108, 1460)
  ctx.fillText(formatIDR(ticket.total), 108, 1528)

  ctx.fillStyle = '#111827'
  ctx.fillRect(108, 1640, width - 216, 132)
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 46px Inter, Arial, sans-serif'
  ctx.fillText('Beli ticket kamu di ramein.fun', 154, 1722)

  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '500 28px Inter, Arial, sans-serif'
  ctx.fillText('#Ramein #EventSeru #TicketReady', 108, 1830)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result)
      else reject(new Error('Gagal membuat gambar share.'))
    }, 'image/png')
  })

  return blob
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function TiketSayaPage() {
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [sharingTicketId, setSharingTicketId] = useState('')
  const [openingOnlineTicketId, setOpeningOnlineTicketId] = useState('')
  const [autoScannedOnlineTicketIds, setAutoScannedOnlineTicketIds] = useState(() => new Set())
  const [shareNotice, setShareNotice] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .getMyTickets()
      .then((res) => {
        if (!cancelled) setTickets(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat tiket.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (shareNotice?.type !== 'success') return undefined

    const timeoutId = window.setTimeout(() => {
      setShareNotice(null)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [shareNotice])

  const filtered = useMemo(() => {
    if (filter === 'all') return tickets
    return tickets.filter((ticket) => ticket.status === filter)
  }, [filter, tickets])

  async function handleShareSocialMedia(ticket) {
    setSharingTicketId(ticket.id)
    setShareNotice(null)

    try {
      const blob = await buildSocialShareBlob(ticket)
      const file = new File([blob], `ramein-share-${ticket.id}.webp`, { type: 'image/png' })
      const promoText = `Aku baru beli tiket ${ticket.eventName}. Beli ticket kamu di ramein.fun`

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: `Share ${ticket.eventName}`,
          text: promoText,
        })
        setShareNotice({
          type: 'success',
          text: 'Gambar share sudah dibuka di share sheet. Pilih social media yang ingin dipakai.',
        })
      } else {
        downloadBlob(blob, `ramein-share-${ticket.id}.webp`)

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(promoText)
        }

        setShareNotice({
          type: 'info',
          text: 'Gambar share sudah diunduh. Teks promo siap dipakai untuk caption atau status.',
        })
      }
    } catch (err) {
      setShareNotice({
        type: 'error',
        text: err.message || 'Gagal menyiapkan gambar share.',
      })
    } finally {
      setSharingTicketId('')
    }
  }

  function markTicketAsAttended(ticket, qrCode, attendedAt) {
    const fallbackAttendedAt = attendedAt ?? new Date().toISOString()

    const nextTickets = (ticket.tickets ?? []).map((item) => {
      const shouldUpdate = qrCode ? item.qrCode === qrCode : item.status === 'active'
      if (!shouldUpdate) return item

      return {
        ...item,
        status: 'used',
        attendanceStatus: 'attended',
        attendedAt: item.attendedAt ?? fallbackAttendedAt,
      }
    })

    const cardStatus = nextTickets.some((item) => item.status === 'active') ? 'active' : 'used'
    const firstTicket = nextTickets[0] ?? null

    return {
      ...ticket,
      status: cardStatus,
      attendanceStatus: firstTicket?.attendanceStatus ?? ticket.attendanceStatus,
      attendedAt: firstTicket?.attendedAt ?? ticket.attendedAt ?? fallbackAttendedAt,
      tickets: nextTickets,
    }
  }

  function hasAnyAttendedEntry(ticket) {
    const normalizedStatus = String(ticket.attendanceStatus ?? '').toLowerCase()
    if (normalizedStatus === 'attended' || normalizedStatus === 'hadir' || ticket.status === 'used') {
      return true
    }

    if (ticket.attendedAt) return true

    return (ticket.tickets ?? []).some((item) => {
      const itemStatus = String(item.attendanceStatus ?? item.status ?? '').toLowerCase()
      return item.attendedAt || itemStatus === 'attended' || itemStatus === 'hadir' || itemStatus === 'used'
    })
  }

  async function handleOpenOnlineEvent(ticket) {
    const eventLink = String(ticket.eventOnlineUrl ?? '').trim()
    if (!eventLink) {
      setShareNotice({
        type: 'error',
        text: 'Link event online belum tersedia.',
      })
      return
    }

    setOpeningOnlineTicketId(ticket.id)
    setShareNotice(null)

    const ticketItems = Array.isArray(ticket.tickets) ? ticket.tickets : []
    const activeTicket = ticketItems.find((item) => item.status === 'active' && item.qrCode)
    const fallbackTicket = ticketItems.find((item) => item.qrCode)
    const targetQrCode = activeTicket?.qrCode ?? fallbackTicket?.qrCode ?? ticket.qrCode ?? null
    const alreadyScannedOnline = autoScannedOnlineTicketIds.has(ticket.id)
    const alreadyAttended = hasAnyAttendedEntry(ticket)
    const shouldAutoScan =
      ticket.status === 'active' && Boolean(targetQrCode) && !alreadyScannedOnline && !alreadyAttended
    let attendanceMarked = false
    let attendanceMessage = ''
    const attendedAt = new Date().toISOString()

    try {
      if (shouldAutoScan) {
        const result = await api.scanTicketQrCode(targetQrCode)
        attendanceMarked = true
        attendanceMessage = result?.message ?? ''
        setAutoScannedOnlineTicketIds((prev) => new Set(prev).add(ticket.id))

        setTickets((prev) =>
          prev.map((item) => (item.id === ticket.id ? markTicketAsAttended(item, targetQrCode, attendedAt) : item)),
        )
      }
    } catch (err) {
      setShareNotice({
        type: 'info',
        text: err.message || 'Link event dibuka, tapi status hadir belum berhasil diproses otomatis.',
      })
    } finally {
      window.open(eventLink, '_blank', 'noopener,noreferrer')

      if (attendanceMarked) {
        setShareNotice({
          type: 'success',
          text: attendanceMessage || 'Link event dibuka dan status hadir berhasil diproses.',
        })
      } else if (!shouldAutoScan) {
        setShareNotice({
          type: 'info',
          text: 'Link event online dibuka.',
        })
      }

      setOpeningOnlineTicketId('')
    }
  }

  return (
    <AdminLayout title="Tiket Saya" subtitle="Semua tiket berbayar yang sudah kamu beli">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              filter === item.value
                ? 'bg-brand-600 text-white'
                : 'border border-[#e2e2e2] bg-white text-[#4a4a4a] hover:bg-[#f9f9f9]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {shareNotice && (
        <div
          className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
            shareNotice.type === 'success'
              ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              : shareNotice.type === 'error'
                ? 'border border-red-100 bg-red-50 text-red-700'
                : 'border border-sky-100 bg-sky-50 text-sky-700'
          }`}
        >
          {shareNotice.text}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-dashed border-[#d5d5d5] bg-white p-10 text-center text-sm text-[#6d6d6d]">
          Memuat tiket...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d5d5d5] bg-white p-10 text-center">
          <FaTicketAlt className="mx-auto text-3xl text-[#c5c5c5]" />
          <p className="mt-3 text-sm font-medium text-[#4a4a4a]">Belum ada tiket di kategori ini.</p>
          <Link
            to="/jelajahi"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Jelajahi Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onShowQr={setSelectedTicket}
              onOpenOnlineEvent={handleOpenOnlineEvent}
              onShareSocialMedia={handleShareSocialMedia}
              sharing={sharingTicketId === ticket.id}
              openingOnlineLink={openingOnlineTicketId === ticket.id}
            />
          ))}
        </div>
      )}

      <TicketQrModal
        key={selectedTicket?.id ?? 'closed'}
        open={Boolean(selectedTicket)}
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </AdminLayout>
  )
}

export default TiketSayaPage
