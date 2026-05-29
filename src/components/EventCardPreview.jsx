import { formatIDR } from '../lib/format'
import EventImage from './EventImage'

function CalendarMini({ className }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function PinMini({ className }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function LockMini() {
  return (
    <svg
      className="h-2.5 w-2.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function BroadcastMini() {
  return (
    <svg
      className="h-2.5 w-2.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M20.24 3.76a10 10 0 0 1 0 16.49M3.76 20.24a10 10 0 0 1 0-16.49" />
    </svg>
  )
}

function EventCardPreview({
  name,
  category,
  region,
  dateLabel,
  timeLabel,
  location,
  isOnline = false,
  visibility = 'public',
  price,
  organizerName = 'Kamu',
  coverEmoji,
  imageUrl,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-500 via-brand-400 to-emerald-400">
        <EventImage src={imageUrl} alt={name || 'Preview event'} />
        {coverEmoji && (
          <div className="absolute inset-0 grid place-items-center text-5xl">
            <span>{coverEmoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {visibility === 'private' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              <LockMini /> Private
            </span>
          )}
          {isOnline && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700 backdrop-blur">
              <BroadcastMini /> Online
            </span>
          )}
          {category && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-800 backdrop-blur">
              {category}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900">
          {name || 'Nama event kamu'}
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-600">
          <li className="flex items-center gap-2">
            <CalendarMini className="text-gray-400" />
            <span>
              {dateLabel || 'Tanggal'}
              {timeLabel ? ` · ${timeLabel}` : ''}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <PinMini className="text-gray-400" />
            <span className="truncate">
              {location || (isOnline ? 'Platform online' : 'Lokasi venue')}
              {region ? ` · ${region}` : ''}
            </span>
          </li>
        </ul>
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-700">
              {organizerName.charAt(0).toUpperCase() || 'K'}
            </div>
            <span className="truncate text-xs text-gray-500">{organizerName}</span>
          </div>
          <span className="text-base font-bold text-brand-600">
            {price === undefined || price === null
              ? 'Rp—'
              : price === 0
                ? 'Gratis'
                : formatIDR(price)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default EventCardPreview
