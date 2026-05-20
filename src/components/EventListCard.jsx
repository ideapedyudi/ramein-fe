import { Link } from 'react-router-dom'
import { formatIDR } from '../lib/format'

function CalendarIcon({ className }) {
  return (
    <svg
      className={className}
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

function EventListCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className={`relative h-44 overflow-hidden bg-gradient-to-br ${event.bannerHue ?? 'from-brand-400 to-brand-600'}`}
      >
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {event.badges?.map((b) => (
            <span
              key={b}
              className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-800 backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
          {event.city}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-brand-600">
          {event.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4 text-brand-500" />
          <span>{event.dateLabel}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
              {event.organizer.initial}
            </div>
            <span className="line-clamp-1 text-xs text-gray-500">{event.organizer.name}</span>
          </div>
          <div className="text-right">
            <div className="text-base font-bold text-brand-600">
              {formatIDR(event.startingPrice)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventListCard
