import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import Container from "../components/Container";
import EventCard from "../components/EventCard";
import HeroSlideshow from "../components/HeroSlideshow";
import RegionCard from "../components/RegionCard";
import SectionTitle from "../components/SectionTitle";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";
import {
  categories,
  heroSlides,
  recommendedEvents,
  regions,
  trendingEvents,
} from "../data/homeData";

const eventItemsPerView = { base: 2, sm: 3, md: 4, lg: 5, xl: 6 };

function HomePage() {
  return (
    <SiteLayout>
      <main className="pb-10">
        <HeroSlideshow slides={heroSlides} />

        <Container className="mt-12">
          <section>
            <SectionTitle
              title="Browse by Category"
              subtitle="Temukan event sesuai minatmu"
            />
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </Container>

        <Container className="mt-12">
          <section>
            <SectionTitle
              title="Trending"
              subtitle="Event populer yang lagi ramai saat ini"
              action={
                <button
                  type="button"
                  className="rounded-xl border border-[#e2e2e2] px-4 py-2 text-sm font-semibold text-[#373737] hover:bg-white"
                >
                  Lihat Semua
                </button>
              }
            />
            <Carousel
              items={trendingEvents}
              itemsPerView={eventItemsPerView}
              gap={12}
              showDots={false}
              renderItem={(event) => <EventCard event={event} />}
            />
          </section>
        </Container>

        <Container className="mt-12">
          <section>
            <SectionTitle
              title="Recommended For You"
              subtitle="Berdasarkan minat favorit kamu"
            />
            <Carousel
              items={recommendedEvents}
              itemsPerView={eventItemsPerView}
              gap={12}
              showDots={false}
              renderItem={(event) => <EventCard event={event} />}
            />
          </section>
        </Container>

        <Container className="mt-16">
          <section>
            <SectionTitle
              title="Browse by Region"
              subtitle="Jelajahi event di wilayah Indonesia"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {regions.map((region) => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </SiteLayout>
  );
}

export default HomePage;
