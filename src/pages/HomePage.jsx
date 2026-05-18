import CategoryCard from '../components/CategoryCard'
import EventCard from '../components/EventCard'
import HeroSlideshow from '../components/HeroSlideshow'
import SectionTitle from '../components/SectionTitle'
import RegionCard from '../components/RegionCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import {
  categories,
  heroSlides,
  recommendedEvents,
  regions,
  trendingEvents,
} from '../data/homeData'

function HomePage() {
  return (
    <SiteLayout>
      <main className="pb-10">
        <div className="w-full px-0">
          <HeroSlideshow slides={heroSlides} />
        </div>
        <div className="mx-auto w-full max-w-370 px-2 md:px-3">
          <section className="mt-16">
            <SectionTitle
              title="Trending Events"
              subtitle="Event populer yang lagi ramai saat ini"
              action={
                <button
                  type="button"
                  className="rounded-xl border border-[#e2e2e2] px-4 py-2 text-lg font-semibold text-[#373737] hover:bg-white"
                >
                  Lihat Semua
                </button>
              }
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {trendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionTitle
              title="Browse by Category"
              subtitle="Temukan event sesuai minatmu"
            />
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionTitle
              title="Recommended For You"
              subtitle="Berdasarkan minat favorit kamu"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionTitle title="Browse by Region" subtitle="Jelajahi event di wilayah Indonesia" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {regions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </SiteLayout>
  )
}

export default HomePage
