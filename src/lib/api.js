// Event images — swap any individual source by changing one import below.
import jazzImg from "../assets/eventtest.png";
import concertImg from "../assets/eventtest.png";
import esportsImg from "../assets/eventtest.png";
import workshopImg from "../assets/eventtest.png";
import festivalImg from "../assets/eventtest.png";
import techImg from "../assets/eventtest.png";
import foodImg from "../assets/eventtest.png";
import ticketImg from "../assets/eventtest.png";

// Region images — swap any individual source by changing one import below.
import sumatraImg from "../assets/sumatra.png";
import jakartaImg from "../assets/jakarta.png";
import jabarImg from "../assets/jabar.png";
import diyjatengImg from "../assets/jateng.png";
import jatimImg from "../assets/jatim.png";
import kalimantanImg from "../assets/kalimantan.png";
import sulawesiImg from "../assets/sulawesi.png";
import indtimurImg from "../assets/bali.png";

const eventImages = {
  jazz: jazzImg,
  concert: concertImg,
  esports: esportsImg,
  workshop: workshopImg,
  festival: festivalImg,
  tech: techImg,
  food: foodImg,
  ticket: ticketImg,
};

const regionImages = {
  sumatra: sumatraImg,
  jakarta: jakartaImg,
  jabar: jabarImg,
  diyjateng: diyjatengImg,
  jatim: jatimImg,
  kalimantan: kalimantanImg,
  sulawesi: sulawesiImg,
  indtimur: indtimurImg,
};

export const carousel = [
  {
    id: "slide-1",
    badge: "Music Festival",
    title: "Java Jazz Festival 2026",
    hue: "from-amber-400 to-rose-400",
    imageUrl: eventImages.jazz,
  },
  {
    id: "slide-2",
    badge: "Recommended Event",
    title: "Solusi Praktis Cetak Tiket Gelang",
    hue: "from-emerald-400 to-teal-500",
    imageUrl: eventImages.ticket,
  },
  {
    id: "slide-3",
    badge: "Esports Championship",
    title: "Mobile Legends Tournament 2026",
    hue: "from-indigo-500 to-purple-600",
    imageUrl: eventImages.esports,
  },
  {
    id: "slide-4",
    badge: "Workshop & Seminar",
    title: "Tech Startup Summit Jakarta",
    hue: "from-sky-400 to-blue-600",
    imageUrl: eventImages.tech,
  },
];

export const apiCategories = [
  { category: "Konser", emoji: "🎵", color: "from-pink-500 to-rose-500" },
  { category: "Seminar", emoji: "🎓", color: "from-blue-500 to-indigo-500" },
  { category: "Esports", emoji: "🎮", color: "from-orange-500 to-amber-500" },
  {
    category: "Teknologi",
    emoji: "💻",
    color: "from-purple-500 to-fuchsia-500",
  },
  { category: "Edukasi", emoji: "📚", color: "from-emerald-500 to-green-500" },
  { category: "Bisnis", emoji: "💼", color: "from-slate-700 to-gray-800" },
  { category: "Kreatif", emoji: "🎨", color: "from-amber-500 to-orange-500" },
  { category: "Olahraga", emoji: "⚽", color: "from-red-500 to-pink-500" },
  { category: "Kesehatan", emoji: "💪", color: "from-teal-500 to-cyan-500" },
  { category: "Lifestyle", emoji: "✨", color: "from-yellow-500 to-amber-400" },
  {
    category: "Investasi",
    emoji: "📈",
    color: "from-green-600 to-emerald-700",
  },
  {
    category: "Spiritual",
    emoji: "🕊️",
    color: "from-violet-500 to-purple-500",
  },
];

export const apiRegions = [
  { region: "SUMATERA", eventCount: 250, imageUrl: regionImages.sumatra },
  { region: "JABODETABEK", eventCount: 450, imageUrl: regionImages.jakarta },
  { region: "JAWA BARAT", eventCount: 280, imageUrl: regionImages.jabar },
  { region: "DIY-JATENG", eventCount: 220, imageUrl: regionImages.diyjateng },
  { region: "JAWA TIMUR", eventCount: 310, imageUrl: regionImages.jatim },
  { region: "KALIMANTAN", eventCount: 140, imageUrl: regionImages.kalimantan },
  { region: "SULAWESI", eventCount: 180, imageUrl: regionImages.sulawesi },
  {
    region: "INDONESIA TIMUR",
    eventCount: 120,
    imageUrl: regionImages.indtimur,
  },
];

const javaJazz = {
  id: "java-jazz-2026",
  name: "Java Jazz Festival 2026",
  category: "Konser",
  region: "JABODETABEK",
  city: "Jakarta",
  date: "2026-05-15",
  dateLabel: "15 Mei 2026",
  timeLabel: "15-17 Juni 2026, 18:00 WIB",
  location: "Jakarta International Expo, Jakarta Pusat",
  startingPrice: 500000,
  organizer: { id: "org-1", name: "Java Festival Production", initial: "J" },
  badges: ["Music", "Festival"],
  bannerHue: "from-amber-400 to-rose-400",
  imageUrl: eventImages.jazz,
  visibility: "public",
  isOnline: false,
  attachmentLabel: "Lokasi & Petunjuk Akses",
  attachmentUrl: "https://maps.app.goo.gl/JIExpoJakarta",
  attendees: 45000,
  description:
    "Java Jazz Festival adalah festival musik jazz terbesar di Indonesia yang menampilkan artis-artis jazz ternama dari dalam dan luar negeri. Nikmati 3 hari penuh musik berkualitas, kuliner lezat, dan pengalaman yang tak terlupakan bersama keluarga dan teman-teman.",
  tiers: [
    {
      id: "tier-regular",
      name: "Regular",
      price: 500000,
      quotaTotal: 1000,
      quotaAvailable: 150,
      perks: ["Standing Area", "Event Merchandise"],
    },
    {
      id: "tier-vip",
      name: "VIP",
      price: 1500000,
      quotaTotal: 200,
      quotaAvailable: 50,
      perks: [
        "Reserved Seating",
        "VIP Lounge Access",
        "Meet & Greet",
        "Event Merchandise",
      ],
    },
    {
      id: "tier-vvip",
      name: "VVIP",
      price: 3000000,
      quotaTotal: 50,
      quotaAvailable: 20,
      perks: [
        "Front Row Seats",
        "Exclusive Lounge",
        "Meet & Greet",
        "Premium Merchandise",
        "Free Drinks",
      ],
    },
  ],
};

const mlChampionship = {
  id: "ml-championship-2026",
  name: "Mobile Legends Championship",
  category: "Esports",
  region: "JABODETABEK",
  city: "Tangerang",
  date: "2026-05-20",
  dateLabel: "20 Mei 2026",
  timeLabel: "20 Mei 2026, 13:00 WIB",
  location: "ICE BSD City",
  startingPrice: 150000,
  organizer: { id: "org-2", name: "Moonton Indonesia", initial: "M" },
  badges: ["Esports", "Gaming"],
  bannerHue: "from-indigo-500 to-purple-600",
  imageUrl: eventImages.esports,
  visibility: "public",
  isOnline: false,
  attendees: 12000,
  description:
    "Turnamen Mobile Legends terbesar tahun ini! Saksikan pertarungan tim-tim top Indonesia memperebutkan total hadiah miliaran rupiah.",
  tiers: [
    {
      id: "tier-regular",
      name: "Regular",
      price: 150000,
      quotaTotal: 500,
      quotaAvailable: 200,
      perks: ["General Seating", "Event Lanyard"],
    },
    {
      id: "tier-vip",
      name: "VIP",
      price: 500000,
      quotaTotal: 100,
      quotaAvailable: 30,
      perks: [
        "Premium Seating",
        "Player Meet & Greet",
        "Exclusive Merchandise",
      ],
    },
  ],
};

const uiUxWorkshop = {
  id: "uiux-workshop-2026",
  name: "UI/UX Design Workshop",
  category: "Edukasi",
  region: "JABODETABEK",
  city: "Online",
  date: "2026-05-25",
  dateLabel: "25 Mei 2026",
  timeLabel: "25 Mei 2026, 09:00 WIB",
  location: "Online Event (Zoom)",
  startingPrice: 0,
  organizer: { id: "org-3", name: "Design Community ID", initial: "D" },
  badges: ["Workshop", "Online"],
  bannerHue: "from-emerald-400 to-teal-500",
  imageUrl: eventImages.workshop,
  visibility: "public",
  isOnline: true,
  attachmentLabel: "Link Zoom Meeting",
  attachmentUrl: "https://zoom.us/j/9876543210?pwd=demoroom",
  attendees: 1500,
  description:
    "Workshop UI/UX gratis untuk pemula. Belajar dasar design thinking, wireframing, dan prototyping bersama mentor berpengalaman.",
  tiers: [
    {
      id: "tier-free",
      name: "Free Pass",
      price: 0,
      quotaTotal: 500,
      quotaAvailable: 180,
      perks: ["Akses Workshop", "E-Certificate"],
    },
  ],
};

const soundrenaline = {
  id: "soundrenaline-2026",
  name: "Soundrenaline Festival",
  category: "Konser",
  region: "JAWA BARAT",
  city: "Bandung",
  date: "2026-06-01",
  dateLabel: "1 Jun 2026",
  timeLabel: "1-2 Juni 2026, 16:00 WIB",
  location: "Gelora Bandung Lautan Api",
  startingPrice: 500000,
  organizer: { id: "org-4", name: "Soundrenaline Indonesia", initial: "S" },
  badges: ["Music", "Festival"],
  bannerHue: "from-rose-500 to-orange-500",
  imageUrl: eventImages.festival,
  visibility: "public",
  isOnline: false,
  attendees: 30000,
  description:
    "Festival musik dua hari menghadirkan band-band lokal dan internasional di panggung megah Bandung.",
  tiers: [
    {
      id: "tier-festival",
      name: "Festival Pass",
      price: 500000,
      quotaTotal: 5000,
      quotaAvailable: 1200,
      perks: ["Akses 2 hari", "Welcome Drink"],
    },
    {
      id: "tier-vip",
      name: "VIP",
      price: 1200000,
      quotaTotal: 500,
      quotaAvailable: 100,
      perks: ["VIP Area", "Free Food & Drink", "Exclusive Merch"],
    },
  ],
};

const techSummit = {
  id: "tech-summit-2026",
  name: "Tech Startup Summit 2026",
  category: "Teknologi",
  region: "JABODETABEK",
  city: "Jakarta",
  date: "2026-06-10",
  dateLabel: "10 Jun 2026",
  timeLabel: "10 Juni 2026, 09:00 WIB",
  location: "The Ritz-Carlton Mega Kuningan",
  startingPrice: 2500000,
  organizer: { id: "org-5", name: "Startup Indonesia", initial: "S" },
  badges: ["Tech", "Summit"],
  bannerHue: "from-sky-400 to-blue-600",
  imageUrl: eventImages.tech,
  visibility: "public",
  isOnline: false,
  attachmentLabel: "Event Brief & Speaker Lineup (PDF)",
  attachmentUrl: "https://drive.google.com/file/d/demo-techsummit-brief",
  attendees: 2000,
  description:
    "Konferensi tahunan founder, investor, dan talenta tech terbaik Indonesia. Talk, panel, dan networking.",
  tiers: [
    {
      id: "tier-pro",
      name: "Pro Pass",
      price: 2500000,
      quotaTotal: 1000,
      quotaAvailable: 350,
      perks: ["Full Conference Access", "Lunch & Coffee", "Networking Dinner"],
    },
  ],
};

const streetFood = {
  id: "street-food-2026",
  name: "Jakarta Street Food Festival",
  category: "Lifestyle",
  region: "JABODETABEK",
  city: "Jakarta",
  date: "2026-06-15",
  dateLabel: "15 Jun 2026",
  timeLabel: "15-16 Juni 2026, 11:00 WIB",
  location: "Senayan Park, Jakarta",
  startingPrice: 50000,
  organizer: { id: "org-6", name: "Food Festival ID", initial: "F" },
  badges: ["Food", "Festival"],
  bannerHue: "from-orange-400 to-red-500",
  imageUrl: eventImages.food,
  visibility: "public",
  isOnline: false,
  attendees: 8000,
  description:
    "Kumpulan ratusan tenant makanan jalanan terbaik se-Jabodetabek dalam satu tempat. Live music, photo spots, dan kompetisi makan.",
  tiers: [
    {
      id: "tier-entry",
      name: "Entry Pass",
      price: 50000,
      quotaTotal: 5000,
      quotaAvailable: 2400,
      perks: ["Akses 1 hari", "Welcome Snack"],
    },
  ],
};

const valorant = {
  id: "valorant-2026",
  name: "VALORANT Champions Tour",
  category: "Esports",
  region: "JABODETABEK",
  city: "Jakarta",
  date: "2026-06-22",
  dateLabel: "22 Jun 2026",
  timeLabel: "22 Juni 2026, 14:00 WIB",
  location: "Indonesia Convention Exhibition",
  startingPrice: 200000,
  organizer: { id: "org-7", name: "Riot Games Indonesia", initial: "R" },
  badges: ["Esports", "Gaming"],
  bannerHue: "from-red-500 to-rose-700",
  imageUrl: eventImages.concert,
  visibility: "public",
  isOnline: false,
  attendees: 6000,
  description:
    "Babak kualifikasi regional VALORANT Champions Tour. Saksikan langsung tim-tim VCT terkuat Asia Pasifik beraksi.",
  tiers: [
    {
      id: "tier-regular",
      name: "Regular",
      price: 200000,
      quotaTotal: 2000,
      quotaAvailable: 600,
      perks: ["General Seating", "Event Merch"],
    },
  ],
};

const investorRoundtable = {
  id: "investor-roundtable-2026",
  name: "Private Investor Roundtable — Series B Pitches",
  category: "Investasi",
  region: "JABODETABEK",
  city: "Jakarta",
  date: "2026-07-04",
  dateLabel: "4 Jul 2026",
  timeLabel: "4 Juli 2026, 19:00 WIB",
  location: "Closed Door — Mega Kuningan",
  startingPrice: 0,
  organizer: { id: "org-8", name: "East Ventures Circle", initial: "E" },
  badges: ["Private", "Invite Only"],
  bannerHue: "from-slate-700 to-gray-900",
  imageUrl: eventImages.tech,
  visibility: "private",
  isOnline: false,
  attachmentLabel: "Investor Brief & Pitch Deck (Private)",
  attachmentUrl: "https://drive.google.com/file/d/private-investor-brief",
  attendees: 60,
  description:
    "Invite-only roundtable untuk LP dan investor terpilih. Sesi pitch tertutup dari 6 startup Series B unggulan. Tautan brief dan pitch deck akan dikirim setelah RSVP dikonfirmasi.",
  tiers: [
    {
      id: "tier-invite",
      name: "Invite-only RSVP",
      price: 0,
      quotaTotal: 60,
      quotaAvailable: 12,
      perks: [
        "Akses Roundtable",
        "Networking Dinner",
        "Closed-door Pitch Deck",
      ],
    },
  ],
};

export const eventCatalog = [
  javaJazz,
  mlChampionship,
  uiUxWorkshop,
  soundrenaline,
  techSummit,
  streetFood,
  valorant,
  investorRoundtable,
];

const userMyTickets = [
  {
    id: "TKT-2026-0001",
    eventId: "java-jazz-2026",
    eventName: "Java Jazz Festival 2026",
    dateLabel: "15 Mei 2026",
    location: "Jakarta International Expo",
    tier: "VIP",
    quantity: 2,
    price: 1500000,
    status: "active",
    purchasedAt: "2026-04-12",
    imageUrl: javaJazz.imageUrl,
  },
  {
    id: "TKT-2026-0002",
    eventId: "ml-championship-2026",
    eventName: "Mobile Legends Championship",
    dateLabel: "20 Mei 2026",
    location: "ICE BSD City",
    tier: "Regular",
    quantity: 1,
    price: 150000,
    status: "active",
    purchasedAt: "2026-04-20",
    imageUrl: mlChampionship.imageUrl,
  },
  {
    id: "TKT-2026-0003",
    eventId: "uiux-workshop-2026",
    eventName: "UI/UX Design Workshop",
    dateLabel: "25 Apr 2026",
    location: "Online (Zoom)",
    tier: "Free Pass",
    quantity: 1,
    price: 0,
    status: "used",
    purchasedAt: "2026-04-01",
    imageUrl: uiUxWorkshop.imageUrl,
  },
];

const userMyTransactions = [
  {
    id: "ORD-2026-0001",
    eventName: "Java Jazz Festival 2026",
    tier: "VIP",
    quantity: 2,
    subtotal: 3000000,
    fees: 25000,
    total: 3025000,
    paymentMethod: "BCA Virtual Account",
    status: "paid",
    createdAt: "2026-04-12 14:32",
  },
  {
    id: "ORD-2026-0002",
    eventName: "Mobile Legends Championship",
    tier: "Regular",
    quantity: 1,
    subtotal: 150000,
    fees: 25000,
    total: 175000,
    paymentMethod: "GoPay",
    status: "paid",
    createdAt: "2026-04-20 09:18",
  },
  {
    id: "ORD-2026-0003",
    eventName: "UI/UX Design Workshop",
    tier: "Free Pass",
    quantity: 1,
    subtotal: 0,
    fees: 0,
    total: 0,
    paymentMethod: "RSVP",
    status: "paid",
    createdAt: "2026-04-01 19:42",
  },
  {
    id: "ORD-2026-0004",
    eventName: "Tech Startup Summit 2026",
    tier: "Pro Pass",
    quantity: 1,
    subtotal: 2500000,
    fees: 25000,
    total: 2525000,
    paymentMethod: "Bank Transfer",
    status: "pending",
    createdAt: "2026-05-02 11:05",
  },
  {
    id: "ORD-2026-0005",
    eventName: "Soundrenaline Festival",
    tier: "Festival Pass",
    quantity: 1,
    subtotal: 500000,
    fees: 25000,
    total: 525000,
    paymentMethod: "OVO",
    status: "failed",
    createdAt: "2026-05-05 21:11",
  },
];

let userMyEvents = [
  {
    ...javaJazz,
    status: "active",
    registered: 1250,
    attended: 0,
    revenue: 125000000,
    totalQuota: 1500,
  },
  {
    ...mlChampionship,
    status: "active",
    registered: 450,
    attended: 0,
    revenue: 67500000,
    totalQuota: 600,
  },
  {
    ...uiUxWorkshop,
    date: "2026-04-25",
    dateLabel: "25 Apr 2026",
    status: "ended",
    registered: 320,
    attended: 285,
    revenue: 0,
    totalQuota: 500,
  },
];

const delay = (value, ms = 120) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const toSummary = (e) => ({
  id: e.id,
  name: e.name,
  category: e.category,
  region: e.region,
  city: e.city,
  date: e.date,
  dateLabel: e.dateLabel,
  startingPrice: e.startingPrice,
  organizer: e.organizer,
  badges: e.badges,
  bannerHue: e.bannerHue,
  imageUrl: e.imageUrl,
  visibility: e.visibility,
  isOnline: e.isOnline,
});

const publicCatalog = () =>
  eventCatalog.filter((e) => e.visibility === "public");

// ──────────────────────────────────────────────────────────────────────────
// Admin master data (categories, cities, organizers)
// Mirrors the /master/* endpoints from the BE API doc.
// ──────────────────────────────────────────────────────────────────────────
let masterCategories = [
  { id: "cat-1", name: "Music", createdAt: "2026-04-01" },
  { id: "cat-2", name: "Sport", createdAt: "2026-04-02" },
  { id: "cat-3", name: "Workshop", createdAt: "2026-04-05" },
  { id: "cat-4", name: "Festival", createdAt: "2026-04-12" },
];

let masterCities = [
  { id: "city-1", name: "Jakarta", createdAt: "2026-04-01" },
  { id: "city-2", name: "Bandung", createdAt: "2026-04-01" },
  { id: "city-3", name: "Surabaya", createdAt: "2026-04-03" },
  { id: "city-4", name: "Yogyakarta", createdAt: "2026-04-05" },
];

let masterOrganizers = [
  {
    id: "org-1",
    name: "Promotor Ramein",
    description: "Organizer resmi konser",
    contactName: "Tim Promotor",
    contactEmail: "promotor@demo.com",
    contactPhone: "08123456789",
    createdAt: "2026-04-02",
  },
  {
    id: "org-2",
    name: "Indonesia Festival Co",
    description: "Penyelenggara festival nasional",
    contactName: "Adi Pratama",
    contactEmail: "festival@demo.com",
    contactPhone: "08129988111",
    createdAt: "2026-04-10",
  },
];

const nextId = (prefix) => `${prefix}-${Date.now()}`;

export const api = {
  getCarousel: () => delay(carousel),
  getTrendingEvents: () => delay(publicCatalog().slice(0, 4).map(toSummary)),
  getRecommendedEvents: () => delay(publicCatalog().slice(3).map(toSummary)),
  getCategories: () => delay(apiCategories),
  getRegions: () => delay(apiRegions),
  searchEvents: ({ category, region, city, query }) => {
    const q = (query ?? "").toLowerCase().trim();
    const results = publicCatalog()
      .filter((e) => !category || e.category === category)
      .filter((e) => !region || e.region === region)
      .filter((e) => !city || e.city.toLowerCase() === city.toLowerCase())
      .filter(
        (e) =>
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.organizer.name.toLowerCase().includes(q),
      )
      .map(toSummary);
    return delay(results);
  },
  getEvent: (id) => delay(eventCatalog.find((e) => e.id === id) ?? null),
  getForYou: () =>
    delay({
      interests: ["Music", "Esports", "Workshop", "Festival"],
      recentlyViewed: [publicCatalog()[0], publicCatalog()[1]].map(toSummary),
      wishlist: [publicCatalog()[2], publicCatalog()[3]].map(toSummary),
      trendingInCity: [publicCatalog()[0], publicCatalog()[1]].map(toSummary),
    }),
  getMyEvents: () => delay(userMyEvents),
  getMyEvent: (id) => delay(userMyEvents.find((e) => e.id === id) ?? null),
  getMyTickets: () => delay(userMyTickets),
  getMyTicket: (id) => delay(userMyTickets.find((t) => t.id === id) ?? null),
  getMyTransactions: () => delay(userMyTransactions),
  getMyTransaction: (id) =>
    delay(userMyTransactions.find((t) => t.id === id) ?? null),

  // Admin master-data CRUD
  getMasterCategories: () => delay(masterCategories),
  createMasterCategory: ({ name }) => {
    const row = {
      id: nextId("cat"),
      name,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    masterCategories = [row, ...masterCategories];
    return delay(row);
  },
  deleteMasterCategory: (id) => {
    masterCategories = masterCategories.filter((c) => c.id !== id);
    return delay({ id });
  },

  getMasterCities: () => delay(masterCities),
  createMasterCity: ({ name }) => {
    const row = {
      id: nextId("city"),
      name,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    masterCities = [row, ...masterCities];
    return delay(row);
  },
  deleteMasterCity: (id) => {
    masterCities = masterCities.filter((c) => c.id !== id);
    return delay({ id });
  },

  getMasterOrganizers: () => delay(masterOrganizers),
  createMasterOrganizer: (payload) => {
    const row = {
      id: nextId("org"),
      name: payload.name,
      description: payload.description ?? "",
      contactName: payload.contactName ?? "",
      contactEmail: payload.contactEmail ?? "",
      contactPhone: payload.contactPhone ?? "",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    masterOrganizers = [row, ...masterOrganizers];
    return delay(row);
  },
  deleteMasterOrganizer: (id) => {
    masterOrganizers = masterOrganizers.filter((o) => o.id !== id);
    return delay({ id });
  },
  createEvent: (payload) => {
    const partner = payload.organizerId
      ? masterOrganizers.find((o) => o.id === payload.organizerId)
      : null;
    const organizer = partner
      ? {
          id: partner.id,
          name: partner.name,
          initial: partner.name.charAt(0).toUpperCase(),
        }
      : { id: "me", name: "Kamu", initial: "K" };
    const newEvent = {
      id: `evt-${Date.now()}`,
      name: payload.name,
      category: payload.category,
      region: payload.region,
      city: payload.isOnline ? "Online" : payload.region,
      date: payload.date,
      dateLabel: payload.date,
      startingPrice: payload.tiers[0]?.price ?? 0,
      organizer,
      onBehalfOf: payload.onBehalfOf ?? null,
      badges: [
        payload.category,
        ...(payload.visibility === "private" ? ["Private"] : []),
        ...(payload.isOnline ? ["Online"] : []),
      ],
      bannerHue: "from-teal-400 to-emerald-500",
      visibility: payload.visibility,
      isOnline: payload.isOnline,
      status: "active",
      registered: 0,
      attended: 0,
      revenue: 0,
      totalQuota: payload.tiers.reduce((sum, t) => sum + t.quotaTotal, 0),
    };
    userMyEvents = [newEvent, ...userMyEvents];
    return delay(newEvent);
  },
  checkout: (payload) => {
    const event = eventCatalog.find((e) => e.id === payload.eventId);
    const tier = event?.tiers.find((t) => t.id === payload.tierId);
    const subtotal = (tier?.price ?? 0) * payload.quantity;
    const fees = subtotal > 0 ? 25000 : 0;
    return delay({
      orderId: `ORD-${Date.now()}`,
      total: subtotal + fees,
      message:
        subtotal > 0
          ? "Pembayaran berhasil! E-ticket dikirim ke email kamu."
          : "RSVP berhasil! Detail akses dikirim ke email kamu.",
      eventId: event?.id ?? payload.eventId,
      eventName: event?.name ?? "Event",
      attachmentUrl: event?.attachmentUrl,
      attachmentLabel: event?.attachmentLabel,
    });
  },
  login: (email) =>
    delay({
      user: {
        id: "user-1",
        name: email.split("@")[0] ?? "User",
        email,
        interests: ["Music", "Esports"],
      },
      token: "dummy-token",
    }),
  register: ({ name, email }) =>
    delay({
      user: { id: `user-${Date.now()}`, name, email, interests: [] },
      token: "dummy-token",
    }),
};
