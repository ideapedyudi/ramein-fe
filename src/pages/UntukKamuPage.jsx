import { useEffect, useState } from 'react'
import EventListCard from '../components/EventListCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import { api } from '../lib/api'

function Group({ title, events }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
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
      <section className="bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-3xl font-bold sm:text-4xl">Untuk Kamu</h1>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Rekomendasi event berdasarkan minat dan aktivitasmu
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] space-y-8 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-10 lg:px-8">
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
      </div>
      <SiteFooter />
    </SiteLayout>
  )
}

export default UntukKamuPage
