import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";

import { apiCategories, apiRegions, eventCatalog } from "../lib/api";

export const navMenus = [
  { label: "Beranda", to: "/home" },
  { label: "Jelajah", to: "/jelajahi" },
  { label: "Untuk Kamu", to: "/untuk-kamu" },
  { label: "Tentang", to: "/about" },
  { label: "Hubungi Kami", to: "/contact" },
];

export const heroSlides = [
  { id: "hero-1", image: banner1 },
  { id: "hero-2", image: banner2 },
  { id: "hero-3", image: banner3 },
  { id: "hero-4", image: banner4 },
];

const formatPrice = (value) =>
  value === 0 || value === null || value === undefined
    ? "Gratis"
    : `Rp${value.toLocaleString("id-ID")}`;

const toCardEvent = (e) => ({
  id: e.id,
  title: e.name,
  date: e.dateLabel,
  price: formatPrice(e.startingPrice),
  organizer: e.organizer.name,
  organizerInitial: e.organizer.initial,
  image: e.imageUrl,
});

const publicCatalog = eventCatalog.filter((e) => e.visibility === "public");

export const trendingEvents = publicCatalog.map(toCardEvent);
export const recommendedEvents = [...publicCatalog].reverse().map(toCardEvent);

const categoryStyleByName = {
  Konser: { icon: "music", from: "#ff1f8f", to: "#f9427f" },
  Seminar: { icon: "seminar", from: "#2384ff", to: "#2ab5ff" },
  Esports: { icon: "esports", from: "#ff8a00", to: "#ffb000" },
  Teknologi: { icon: "technology", from: "#6153f9", to: "#9747ff" },
  Edukasi: { icon: "education", from: "#0cc96b", to: "#02af73" },
  Bisnis: { icon: "business", from: "#36485f", to: "#1f2e48" },
  Kreatif: { icon: "creative", from: "#ffbf00", to: "#ff8a00" },
  Olahraga: { icon: "sport", from: "#ff295a", to: "#ff2a9a" },
  Kesehatan: { icon: "health", from: "#1ac7c2", to: "#14b2d6" },
  Lifestyle: { icon: "lifestyle", from: "#ffb200", to: "#ff9f00" },
  Investasi: { icon: "investment", from: "#03b15f", to: "#009f57" },
  Spiritual: { icon: "spiritual", from: "#8f42ff", to: "#7a2dff" },
};

export const categories = apiCategories.map((c, i) => ({
  id: `cat-${i + 1}`,
  name: c.category,
  ...(categoryStyleByName[c.category] ?? {
    icon: "creative",
    from: "#888",
    to: "#666",
  }),
}));

export const regions = apiRegions.map((r, i) => ({
  id: `region-${i + 1}`,
  name: r.region,
  count: `${r.eventCount}+ Events`,
  image: r.imageUrl,
}));
