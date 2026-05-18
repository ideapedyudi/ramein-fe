function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h3 className="text-4xl font-bold text-[#1f1f1f]">{title}</h3>
        <p className="mt-1 text-lg text-[#717171]">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

export default SectionTitle
