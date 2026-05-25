import { useEffect, useState } from 'react'
import Container from '../components/Container'
import EventListCard from '../components/EventListCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import { api } from '../lib/api'

function Group({ title, events }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {events.map((e) => (
          <EventListCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  )
}

function UntukKamuPage() {
  const [data, setData] = useState({
    interests: [],
    recentlyViewed: [],
    wishlist: [],
    trendingInCity: [],
  })

  useEffect(() => {
    let cancelled = false
    api.getForYou().then((res) => {
      if (!cancelled) setData(res)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const { interests, recentlyViewed, wishlist, trendingInCity } = data

  return (
    <SiteLayout>
      <section className="bg-linear-to-r from-brand-500 via-brand-400 to-accent-400 py-10 text-white sm:py-12">
        <Container>
          <h1 className="text-3xl font-bold sm:text-4xl">Untuk Kamu</h1>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Rekomendasi event berdasarkan minat dan aktivitasmu
          </p>
        </Container>
      </section>

      <Container className="space-y-8 py-8 sm:space-y-10 sm:py-10">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Minat Kamu</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {interests.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
            <button className="rounded-full border border-dashed border-brand-400 px-3 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50">
              + Tambah Minat
            </button>
          </div>
        </div>

        <Group title="Terakhir Dilihat" events={recentlyViewed} />
        <Group title="Wishlist Kamu" events={wishlist} />
        <Group title="Trending di Jakarta" events={trendingInCity} />
      </Container>
      <SiteFooter />
    </SiteLayout>
  )
}

export default UntukKamuPage
