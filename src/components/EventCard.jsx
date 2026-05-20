import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="block overflow-hidden rounded-xl border border-[#e6e6e6] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
    >
      <article>
        <img src={event.image} alt={event.title} className="h-45 w-full object-cover" loading="lazy" />
        <div className="p-4">
          <p className="line-clamp-2 min-h-14 text-2xl font-semibold text-[#252525]">
            {event.title}
          </p>
          <p className="mt-3 text-lg text-[#818181]">Date: {event.date}</p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{event.price}</p>
          <div className="mt-4 border-t border-[#efefef] pt-3">
            <p className="flex items-center gap-2 text-md text-[#6d6d6d]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f7f2] text-xs font-semibold text-[#2ea387]">
                {event.organizerInitial}
              </span>
              {event.organizer}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default EventCard
