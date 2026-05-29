import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from 'react-icons/fa'
import EventImage from './EventImage'
import MarqueeText from './MarqueeText'

function EventCard({ event }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Link
      to={`/event/${event.id}`}
      className="group block overflow-hidden rounded-xl border border-[#ececec] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
    >
      <article className="flex flex-col">
        <div
          className={`relative aspect-video w-full overflow-hidden bg-[#f3f3f3] ${
            imgLoaded ? '' : 'skeleton'
          }`}
        >
          <EventImage
            src={event.image}
            alt={event.title}
            hoverZoom
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <h4 className="text-sm font-semibold text-[#1f1f1f]">
            <MarqueeText text={event.title} />
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
            <FaRegCalendarAlt className="text-brand-500" />
            <span>{event.date}</span>
          </div>
          <p className="text-sm font-bold text-[#1f1f1f]">{event.price}</p>
          <div className="mt-1 flex items-center gap-2 border-t border-[#f0f0f0] pt-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e9f7f2] text-[10px] font-semibold text-[#2ea387]">
              {event.organizerInitial}
            </span>
            <p className="line-clamp-1 text-xs text-[#6d6d6d]">{event.organizer}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default EventCard
