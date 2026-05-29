import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { formatIDR } from '../lib/format'
import MarqueeText from './MarqueeText'

function EventListCard({ event }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Link
      to={`/event/${event.id}`}
      className="group block overflow-hidden rounded-xl border border-[#ececec] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
    >
      <article className="flex flex-col">
        <div
          className={`relative aspect-video w-full overflow-hidden bg-linear-to-br ${event.bannerHue ?? 'from-brand-400 to-brand-600'}`}
        >
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          {event.badges?.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {event.badges.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-800 backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
          {event.city && (
            <div className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
              {event.city}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 p-3">
          <h4 className="text-sm font-semibold text-[#1f1f1f] group-hover:text-brand-600">
            <MarqueeText text={event.name} />
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
            <FaRegCalendarAlt className="text-brand-500" />
            <span>{event.dateLabel}</span>
          </div>
          <p className="text-sm font-bold text-[#1f1f1f]">
            {formatIDR(event.startingPrice)}
          </p>
          <div className="mt-1 flex items-center gap-2 border-t border-[#f0f0f0] pt-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e9f7f2] text-[10px] font-semibold text-[#2ea387]">
              {event.organizer.initial}
            </span>
            <p className="line-clamp-1 text-xs text-[#6d6d6d]">{event.organizer.name}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default EventListCard
