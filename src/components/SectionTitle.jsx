function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h3 className="text-2xl font-bold text-[#1f1f1f]">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-[#717171]">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export default SectionTitle
