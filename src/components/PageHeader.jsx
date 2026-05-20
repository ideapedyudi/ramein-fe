function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-white/90 sm:text-base">{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHeader
