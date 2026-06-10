import { Link } from 'react-router-dom'

function RegionCard({ region }) {
  return (
    <Link
      to={`/jelajahi?wilayah=${encodeURIComponent(region.name)}`}
      className="group relative block overflow-hidden rounded-3xl transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <img
        src={region.image}
        alt={region.name}
        className="h-40 w-full object-cover transition group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      <div className="absolute inset-x-4 bottom-4 text-white">
        <p className="text-sm font-medium">Lokasi: {region.name}</p>
        <p className="text-lg">{region.count}</p>
      </div>
    </Link>
  )
}

export default RegionCard
