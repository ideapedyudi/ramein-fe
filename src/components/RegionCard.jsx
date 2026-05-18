function RegionCard({ region }) {
  return (
    <article className="relative overflow-hidden rounded-3xl">
      <img src={region.image} alt={region.name} className="h-40 w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      <div className="absolute inset-x-4 bottom-4 text-white">
        <p className="text-sm font-medium">Loc: {region.name}</p>
        <p className="text-lg">{region.count}</p>
      </div>
    </article>
  )
}

export default RegionCard
