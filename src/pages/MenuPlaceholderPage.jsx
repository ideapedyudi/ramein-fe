import SiteLayout from '../components/SiteLayout'

function MenuPlaceholderPage({ title, description }) {
  return (
    <SiteLayout>
      <main className="mx-auto w-full max-w-[1240px] px-4 py-14">
        <section className="rounded-3xl border border-[#e4e4e4] bg-white p-10">
          <h1 className="text-5xl font-bold text-[#212121]">{title}</h1>
          <p className="mt-3 text-xl text-[#666]">{description}</p>
        </section>
      </main>
    </SiteLayout>
  )
}

export default MenuPlaceholderPage
