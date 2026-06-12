import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaLaptop, FaMapMarkerAlt } from "react-icons/fa";
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

const eventWarnings = [
  "Pastikan nama event, tanggal, jam, lokasi, dan penyelenggara sudah sesuai sebelum membeli tiket.",
  "Jangan bagikan QR code, kode booking, atau link akses online ke orang lain.",
  "Baca ketentuan refund, batas check-in, dan aturan usia atau identitas jika tersedia.",
  "Waspadai ajakan pembayaran di luar platform atau kontak yang tidak resmi.",
];

const offlinePreparations = [
  "Bawa e-ticket atau QR code yang bisa diakses tanpa internet.",
  "Siapkan identitas sesuai nama pada tiket jika diminta di venue.",
  "Datang lebih awal untuk antrean check-in, parkir, dan pemeriksaan keamanan.",
  "Cek rute, cuaca, dress code, dan barang yang tidak boleh dibawa.",
];

const onlinePreparations = [
  "Pastikan link akses, email tiket, dan jadwal sudah tersimpan.",
  "Gunakan koneksi internet stabil dan perangkat yang baterainya cukup.",
  "Tes kamera, mikrofon, speaker, dan aplikasi meeting sebelum event dimulai.",
  "Masuk beberapa menit lebih awal agar tidak tertinggal sesi pembuka.",
];

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
              title="Kategori"
              subtitle="Temukan event sesuai minatmu"
            />
            <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <div className="flex w-max gap-4 pb-1 sm:grid sm:w-full sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
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
              title="Rekomendasi Buat Kamu"
              subtitle="Berdasarkan minat favorit kamu"
            />
            {renderEventSection(recommendedState)}
          </section>
        </Container>

        <Container className="mt-12">
          <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Panduan sebelum ikut event
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Perhatikan ini sebelum berangkat atau join online
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-gray-500">
                Checklist singkat supaya pengalaman event lebih aman, lancar, dan tidak ada detail penting yang terlewat.
              </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                    <FaExclamationTriangle />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Peringatan untuk kamu</h3>
                    <p className="text-xs text-gray-600">Cek ulang sebelum transaksi dan hadir.</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
                  {eventWarnings.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FaCheckCircle className="mt-1 shrink-0 text-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Persiapan event offline</h3>
                    <p className="text-xs text-gray-600">Untuk event di venue atau lokasi fisik.</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
                  {offlinePreparations.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FaCheckCircle className="mt-1 shrink-0 text-brand-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-100 text-sky-700">
                    <FaLaptop />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Persiapan event online</h3>
                    <p className="text-xs text-gray-600">Untuk webinar, kelas, atau live session.</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
                  {onlinePreparations.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FaCheckCircle className="mt-1 shrink-0 text-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Container>

        <Container className="mt-16">
          <section>
            <SectionTitle
              title="Jelajahi per Wilayah"
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
