import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import Container from "../components/Container";
import EventCardSkeleton from "../components/EventCardSkeleton";
import EventListCard from "../components/EventListCard";
import HeroSlideshow from "../components/HeroSlideshow";
import RegionCard from "../components/RegionCard";
import SectionTitle from "../components/SectionTitle";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";
import {
  categories,
  heroSlides,
  regions,
} from "../data/homeData";
import { api } from "../lib/api";

const eventItemsPerView = { base: 2, sm: 2, md: 3, lg: 4, xl: 4 };

function HomePage() {
  const [trendingState, setTrendingState] = useState({
    items: [],
    loading: true,
    error: "",
  });
  const [recommendedState, setRecommendedState] = useState({
    items: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadSection(loader, setter) {
      try {
        const items = await loader();
        if (cancelled) return;
        setter({ items, loading: false, error: "" });
      } catch (error) {
        if (cancelled) return;
        setter({
          items: [],
          loading: false,
          error: error.message || "Gagal memuat event terbaru.",
        });
      }
    }

    loadSection(api.getTrendingEvents, setTrendingState);
    loadSection(api.getRecommendedEvents, setRecommendedState);

    return () => {
      cancelled = true;
    };
  }, []);

  const renderEventSection = ({ items, loading, error }) => {
    if (loading) {
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-2xl border border-[#ffd9d5] bg-[#fff4f2] px-5 py-8 text-sm text-[#b54737]">
          {error}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-[#d9d9d9] bg-white/70 px-5 py-8 text-sm text-[#6d6d6d]">
          Belum ada event untuk ditampilkan.
        </div>
      );
    }

    return (
      <Carousel
        items={items}
        itemsPerView={eventItemsPerView}
        gap={12}
        showDots={false}
        renderItem={(event) => <EventListCard event={event} />}
      />
    );
  };

  return (
    <SiteLayout>
      <main className="pb-10">
        <h1 className="sr-only">Ramein - Platform Tiket Event Indonesia</h1>
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
                <Link
                  to="/jelajahi"
                  className="rounded-xl border border-[#e2e2e2] px-4 py-2 text-sm font-semibold text-[#373737] hover:bg-white"
                >
                  Lihat Semua
                </Link>
              }
            />
            {renderEventSection(trendingState)}
          </section>
        </Container>

        <Container className="mt-12">
          <section>
            <SectionTitle
              title="Recommended For You"
              subtitle="Berdasarkan minat favorit kamu"
            />
            {renderEventSection(recommendedState)}
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
