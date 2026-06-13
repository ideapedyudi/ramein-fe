// Event images — swap any individual source by changing one import below.
import jazzImg from "../assets/eventtest.webp";
import concertImg from "../assets/eventtest.webp";
import esportsImg from "../assets/eventtest.webp";
import workshopImg from "../assets/eventtest.webp";
import festivalImg from "../assets/eventtest.webp";
import techImg from "../assets/eventtest.webp";
import foodImg from "../assets/eventtest.webp";
import ticketImg from "../assets/eventtest.webp";

// Region images — swap any individual source by changing one import below.
import sumatraImg from "../assets/sumatra.webp";
import jakartaImg from "../assets/jakarta.webp";
import jabarImg from "../assets/jabar.webp";
import diyjatengImg from "../assets/jateng.webp";
import jatimImg from "../assets/jatim.webp";
import kalimantanImg from "../assets/kalimantan.webp";
import sulawesiImg from "../assets/sulawesi.webp";
import indtimurImg from "../assets/bali.webp";
import { apiRequest } from "./http";

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
  { region: "SUMATRA", eventCount: 250, imageUrl: regionImages.sumatra },
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

const formatEventDateLabel = (value) => {
  if (!value) return "-";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getEventStartingPrice = (ticketTypes = []) => {
  const prices = ticketTypes
    .map((ticket) => Number(ticket.price))
    .filter((price) => !Number.isNaN(price) && price >= 0);

  return prices.length ? Math.min(...prices) : 0;
};

const getEventTicketTypes = (event) =>
  Array.isArray(event.ticketTypes)
    ? event.ticketTypes
    : Array.isArray(event.ticket_types)
      ? event.ticket_types
      : [];

const formatEventTimeRange = (start, end) => {
  if (!start) return "-";

  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime())) return "-";

  const sameDay =
    end &&
    !Number.isNaN(new Date(end).getTime()) &&
    startDate.toDateString() === new Date(end).toDateString();

  const startText = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(startDate);

  if (!end) return startText;

  const endDate = new Date(end);
  if (Number.isNaN(endDate.getTime())) return startText;

  const endText = sameDay
    ? new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(endDate)
    : new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(endDate);

  return `${startText} - ${endText}`;
};

const toPublicEventSummaryFromApi = (event) => ({
  id: event.id,
  name: event.title,
  category: event.category?.name ?? "-",
  region: event.city?.provinsi ?? event.city?.name ?? "-",
  city: event.city?.name ?? "-",
  date: event.startDateTime ?? event.start_datetime ?? null,
  dateLabel: formatEventDateLabel(event.startDateTime ?? event.start_datetime),
  startingPrice: getEventStartingPrice(getEventTicketTypes(event)),
  organizer: {
    id:
      event.organizer?.id ??
      event.organizerId ??
      event.organizer_id ??
      "organizer",
    name: event.organizer?.name ?? "Ramein",
    initial: (event.organizer?.name ?? "Ramein").charAt(0).toUpperCase(),
  },
  badges: [event.category?.name, event.eventType ?? event.event_type]
    .filter(Boolean)
    .map((badge) => String(badge)),
  bannerHue: "from-brand-400 to-brand-600",
  imageUrl: event.banner,
  visibility: event.visibility ?? "public",
  isOnline: (event.eventType ?? event.event_type) === "online",
});

const toPublicEventDetailFromApi = (event) => {
  const summary = toPublicEventSummaryFromApi(event);
  const ticketTypes = getEventTicketTypes(event);

  return {
    ...summary,
    publishedBy: event.publishedBy ?? event.published_by ?? null,
    creator: event.creator
      ? {
          id: event.creator.id ?? null,
          name: event.creator.name ?? "-",
          initial: (event.creator.name ?? "-").charAt(0).toUpperCase(),
        }
      : null,
    description: event.description ?? "-",
    timeLabel: formatEventTimeRange(
      event.startDateTime ?? event.start_datetime,
      event.endDateTime ?? event.end_datetime,
    ),
    location: summary.isOnline
      ? (event.labelOnline ?? event.label_online ?? "Online Event")
      : [event.addressDetail ?? event.address_detail, event.city?.name]
          .filter(Boolean)
          .join(", ") || "-",
    attendees: ticketTypes.reduce(
      (sum, ticket) => sum + (Number(ticket.sold) || 0),
      0,
    ),
    attachmentLabel: summary.isOnline
      ? (event.labelOnline ?? event.label_online ?? "Link event online")
      : null,
    attachmentUrl: summary.isOnline
      ? (event.urlOnline ?? event.url_online ?? null)
      : null,
    tiers: ticketTypes.map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      price: Number(ticket.price) || 0,
      quotaAvailable: Math.max(
        (Number(ticket.quota) || 0) - (Number(ticket.sold) || 0),
        0,
      ),
      perks: [],
    })),
  };
};

const getApiCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const normalizeTransactionStatus = (value) => {
  const status = String(value ?? "").toLowerCase();

  if (["capture", "settlement", "success", "paid"].includes(status))
    return "paid";
  if (["pending", "authorize"].includes(status)) return "pending";
  if (["deny", "cancel", "expire", "failure", "failed"].includes(status))
    return "failed";
  if (status === "refund" || status === "refunded") return "refunded";

  return status || "pending";
};

const toMyTransactionSummaryFromApi = (transaction) => {
  const items = Array.isArray(transaction?.items) ? transaction.items : [];
  const firstItem = items[0];
  const quantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  return {
    id: transaction.id,
    orderId: transaction.orderId ?? transaction.id,
    eventName: transaction.event?.title ?? "-",
    eventStartDate: transaction.event?.startDateTime ?? null,
    tier: firstItem?.ticketName ?? "-",
    quantity,
    total: Number(transaction.grossAmount) || 0,
    paymentMethod: transaction.paymentProvider
      ? String(transaction.paymentProvider).toUpperCase()
      : "-",
    status: normalizeTransactionStatus(
      transaction.midtransTransactionStatus ?? transaction.status,
    ),
    createdAt: transaction.createdAt ?? null,
    paidAt: transaction.paidAt ?? null,
    redirectUrl: transaction.redirectUrl ?? null,
    items,
  };
};

const getTransactionCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && typeof payload.data === "object") return [payload.data];
  if (payload && typeof payload === "object") return [payload];
  return [];
};

const normalizeAttendanceStatus = (value) => {
  const status = String(value ?? "").toLowerCase();

  if (status === "attended") return "used";
  if (["not_attended", "paid", "active"].includes(status)) return "active";
  if (status === "refunded") return "refunded";

  return status || "active";
};

const toMyPaidTicketFromApi = (entry) => {
  const items = Array.isArray(entry?.transaction?.items)
    ? entry.transaction.items
    : [];
  const firstItem = items[0];
  const eventType = String(
    entry?.event?.eventType ?? entry?.event?.event_type ?? "",
  ).toLowerCase();
  const isOnlineEvent = eventType === "online";
  const rawTickets = Array.isArray(entry?.tickets)
    ? entry.tickets
    : Array.isArray(entry?.transaction?.tickets)
      ? entry.transaction.tickets
      : [];
  const quantity =
    rawTickets.length > 0
      ? rawTickets.length
      : items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const total = Number(entry?.transaction?.grossAmount) || 0;
  const tickets =
    rawTickets.length > 0
      ? rawTickets.map((ticket, index) => ({
          id: ticket.id,
          qrCode: ticket.qrCode ?? null,
          status: normalizeAttendanceStatus(ticket.attendanceStatus),
          attendanceStatus: ticket.attendanceStatus ?? "not_attended",
          attendedAt: ticket.attendedAt ?? null,
          createdAt: ticket.createdAt ?? null,
          number: index + 1,
        }))
      : [
          {
            id: entry.id,
            qrCode: entry.qrCode ?? null,
            status: normalizeAttendanceStatus(entry.attendanceStatus),
            attendanceStatus: entry.attendanceStatus ?? "not_attended",
            attendedAt: entry.attendedAt ?? null,
            createdAt: entry.createdAt ?? null,
            number: 1,
          },
        ];
  const cardStatus = tickets.some((ticket) => ticket.status === "active")
    ? "active"
    : (tickets[0]?.status ?? normalizeAttendanceStatus(entry.attendanceStatus));

  return {
    id: entry.id,
    eventId: entry.event?.id ?? entry.eventId,
    transactionId: entry.transactionId ?? entry.transaction?.id ?? null,
    orderId: entry.transaction?.orderId ?? entry.transactionId ?? entry.id,
    qrCode: tickets[0]?.qrCode ?? entry.qrCode ?? null,
    eventName: entry.event?.title ?? "-",
    dateLabel: formatEventDateLabel(entry.event?.startDateTime),
    eventType,
    eventOnlineLabel: isOnlineEvent
      ? (entry.event?.labelOnline ??
        entry.event?.label_online ??
        "Online Event")
      : null,
    eventOnlineUrl: entry.event?.urlOnline ?? entry.event?.url_online ?? null,
    location: isOnlineEvent
      ? (entry.event?.labelOnline ??
        entry.event?.label_online ??
        "Online Event")
      : [entry.event?.city?.name, entry.event?.organizer?.name]
          .filter(Boolean)
          .join(" • ") || "-",
    tier: firstItem?.ticketName ?? "-",
    quantity,
    price: quantity > 0 ? total / quantity : total,
    total,
    status: cardStatus,
    attendanceStatus:
      tickets[0]?.attendanceStatus ?? entry.attendanceStatus ?? "not_attended",
    attendedAt: tickets[0]?.attendedAt ?? entry.attendedAt ?? null,
    purchasedAt: entry.transaction?.createdAt ?? entry.createdAt ?? null,
    imageUrl: entry.event?.banner ?? null,
    tickets,
  };
};

const toEventAttendeeFromApi = (entry) => {
  const items = Array.isArray(entry?.transaction?.items)
    ? entry.transaction.items
    : [];
  const firstItem = items[0];
  const quantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  const rawStatus = String(
    entry.attendanceStatus ?? "not_attended",
  ).toLowerCase();

  return {
    id: entry.id,
    userId: entry.user?.id ?? entry.userId ?? null,
    name: entry.user?.name ?? "-",
    email: entry.user?.email ?? "-",
    orderId: entry.transaction?.orderId ?? entry.transactionId ?? "-",
    ticketName: firstItem?.ticketName ?? "-",
    paymentProvider: entry.transaction?.paymentProvider ?? "-",
    total: Number(entry.transaction?.grossAmount) || 0,
    quantity,
    attendanceStatus: rawStatus,
    attendedAt: entry.attendedAt ?? null,
    registeredAt: entry.createdAt ?? null,
  };
};

const normalizeWithdrawStatus = (value) => {
  const status = String(value ?? "").toLowerCase();

  if (["approved", "success", "paid", "completed"].includes(status))
    return "approved";
  if (["reject", "rejected", "failed", "cancelled"].includes(status))
    return "rejected";

  return status || "pending";
};

const toWithdrawFromApi = (entry) => ({
  id: entry.id,
  eventId: entry.eventId ?? entry.event?.id ?? null,
  userId: entry.userId ?? entry.user?.id ?? null,
  totalAmount: Number(entry.totalAmount) || 0,
  bankName: entry.bank_name ?? entry.bankName ?? "-",
  bankAccount: entry.bank_account ?? entry.bankAccount ?? "-",
  accountNumber: entry.account_number ?? entry.accountNumber ?? "-",
  status: normalizeWithdrawStatus(entry.status),
  isApproval: Boolean(entry.is_approval ?? entry.isApproval),
  createdAt: entry.createdAt ?? null,
  updatedAt: entry.updatedAt ?? null,
  event: {
    id: entry.event?.id ?? entry.eventId ?? null,
    title: entry.event?.title ?? "-",
    isWithdraw: Boolean(entry.event?.isWithdraw ?? entry.event?.is_withdraw),
  },
  user: {
    id: entry.user?.id ?? entry.userId ?? null,
    name: entry.user?.name ?? "-",
    email: entry.user?.email ?? "-",
  },
});

const getWithdrawCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.withdraws)) return payload.data.withdraws;
  if (Array.isArray(payload?.withdraws)) return payload.withdraws;
  return [];
};

const toFinanceFromApi = (entry) => ({
  id: entry.id,
  userId: entry.user_id ?? entry.userId ?? entry.user?.id ?? null,
  eventId: entry.event_id ?? entry.eventId ?? entry.event?.id ?? null,
  transactionId: entry.transaksi_id ?? entry.transactionId ?? null,
  organizerId:
    entry.organizer_id ?? entry.organizerId ?? entry.organizer?.id ?? null,
  grossAmount: Number(entry.gross_amount ?? entry.grossAmount) || 0,
  adminIncome: Number(entry.admin_income ?? entry.adminIncome) || 0,
  transactionTime: entry.time_transaksi ?? entry.transactionTime ?? null,
  publishedBy: entry.published_by ?? entry.publishedBy ?? "-",
  createdAt: entry.created_at ?? entry.createdAt ?? null,
  updatedAt: entry.updated_at ?? entry.updatedAt ?? null,
  user: {
    id: entry.user?.id ?? entry.user_id ?? entry.userId ?? null,
    name: entry.user?.name ?? "-",
    email: entry.user?.email ?? "-",
  },
  event: {
    id: entry.event?.id ?? entry.event_id ?? entry.eventId ?? null,
    title: entry.event?.title ?? "-",
  },
  organizer: {
    id: entry.organizer?.id ?? entry.organizer_id ?? entry.organizerId ?? null,
    name: entry.organizer?.name ?? "-",
  },
});

const getFinanceCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.finance)) return payload.data.finance;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.finance)) return payload.finance;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const toFeedbackFromApi = (entry) => ({
  id: entry.id,
  rating: entry.rating ?? "-",
  review: entry.review ?? "-",
  createdAt: entry.createdAt ?? entry.created_at ?? null,
  updatedAt: entry.updatedAt ?? entry.updated_at ?? null,
});

const getFeedbackCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.feedback)) return payload.data.feedback;
  if (Array.isArray(payload?.data?.feedbacks)) return payload.data.feedbacks;
  if (Array.isArray(payload?.feedback)) return payload.feedback;
  if (Array.isArray(payload?.feedbacks)) return payload.feedbacks;
  return [];
};

const toAdminUserFromApi = (entry) => ({
  id: entry.id,
  name: entry.name ?? "-",
  email: entry.email ?? "-",
  phone: entry.phone ?? "-",
  role: entry.role ?? "-",
  isActive: Boolean(entry.isActive ?? entry.is_active),
  createdAt: entry.createdAt ?? entry.created_at ?? null,
  updatedAt: entry.updatedAt ?? entry.updated_at ?? null,
});

const getAdminUserCollection = (payload, key) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  if (Array.isArray(payload?.[key])) return payload[key];
  return [];
};

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

// ──────────────────────────────────────────────────────────────────────────
// Public profiles & reviews (MOCK ONLY)
// Profil publik hanya tersedia untuk publisher: penyelenggara (organizer)
// maupun pengguna yang pernah mempublikasikan event. Ulasan ditujukan ke
// profil tersebut. Endpoint BE belum tersedia — sesuaikan setelah API rilis.
// ──────────────────────────────────────────────────────────────────────────
export let publicProfiles = [
  {
    id: "org-1",
    type: "organizer",
    name: "Java Festival Production",
    initial: "J",
    tagline: "Promotor festival musik jazz terbesar di Indonesia",
    bio: "Sejak 2005 menghadirkan panggung jazz kelas dunia dengan line-up artis lokal dan internasional. Fokus pada pengalaman penonton, kualitas tata suara, dan kenyamanan venue.",
    location: "Jakarta, Indonesia",
    joinedAt: "2018-02-10",
    verified: true,
    instagram: "@javajazzfestival",
    website: "https://javajazzfestival.com",
    bannerHue: "from-amber-400 to-rose-400",
    eventIds: ["java-jazz-2026"],
  },
  {
    id: "org-2",
    type: "organizer",
    name: "Moonton Indonesia",
    initial: "M",
    tagline: "Penyelenggara turnamen esports Mobile Legends",
    bio: "Membawa kompetisi Mobile Legends ke panggung nasional dengan produksi profesional dan total hadiah miliaran rupiah.",
    location: "Tangerang, Indonesia",
    joinedAt: "2019-07-22",
    verified: true,
    instagram: "@mobilelegendsid",
    website: "https://mobilelegends.com",
    bannerHue: "from-indigo-500 to-purple-600",
    eventIds: ["ml-championship-2026"],
  },
  {
    id: "org-4",
    type: "organizer",
    name: "Soundrenaline Indonesia",
    initial: "S",
    tagline: "Festival musik tahunan lintas genre",
    bio: "Festival dua hari yang merayakan musik lintas genre, menghadirkan band lokal dan internasional di panggung megah.",
    location: "Bandung, Indonesia",
    joinedAt: "2017-05-30",
    verified: true,
    instagram: "@soundrenaline",
    website: null,
    bannerHue: "from-rose-500 to-orange-500",
    eventIds: ["soundrenaline-2026"],
  },
  {
    id: "org-5",
    type: "organizer",
    name: "Startup Indonesia",
    initial: "S",
    tagline: "Konferensi & summit ekosistem startup",
    bio: "Mempertemukan founder, investor, dan talenta tech terbaik Indonesia lewat konferensi, panel, dan sesi networking.",
    location: "Jakarta, Indonesia",
    joinedAt: "2020-01-12",
    verified: true,
    instagram: "@startupindonesia",
    website: "https://startupindonesia.co",
    bannerHue: "from-sky-400 to-blue-600",
    eventIds: ["tech-summit-2026"],
  },
  {
    id: "org-7",
    type: "organizer",
    name: "Riot Games Indonesia",
    initial: "R",
    tagline: "Publisher VALORANT & penyelenggara VCT",
    bio: "Menghadirkan rangkaian VALORANT Champions Tour ke Indonesia dengan standar penyelenggaraan internasional.",
    location: "Jakarta, Indonesia",
    joinedAt: "2020-06-01",
    verified: true,
    instagram: "@valorant_id",
    website: "https://playvalorant.com",
    bannerHue: "from-red-500 to-rose-700",
    eventIds: ["valorant-2026"],
  },
  // Pengguna individu yang mempublikasikan event
  {
    id: "user-1",
    type: "user",
    name: "Andi Pratama",
    initial: "A",
    tagline: "Community builder & fasilitator workshop UI/UX",
    bio: "Rutin mengadakan workshop dan meetup desain untuk pemula. Percaya bahwa belajar paling cepat lewat praktik langsung dan komunitas yang suportif.",
    location: "Bandung, Indonesia",
    joinedAt: "2023-06-01",
    verified: false,
    instagram: "@andi.designs",
    website: null,
    bannerHue: "from-emerald-400 to-teal-500",
    eventIds: ["uiux-workshop-2026"],
  },
  {
    id: "user-sari",
    type: "user",
    name: "Sari Wulandari",
    initial: "S",
    tagline: "Penggiat kuliner & kurator street food festival",
    bio: "Menghubungkan tenant makanan jalanan terbaik dengan ribuan pengunjung lewat festival kuliner yang ramai dan ramah keluarga.",
    location: "Jakarta, Indonesia",
    joinedAt: "2024-01-15",
    verified: false,
    instagram: "@sari.eats",
    website: null,
    bannerHue: "from-orange-400 to-red-500",
    eventIds: ["street-food-2026"],
  },
];

let profileReviews = [
  {
    id: "rv-1",
    profileId: "org-1",
    authorName: "Budi Santoso",
    authorInitial: "B",
    rating: 5,
    comment:
      "Penyelenggaraan rapi, sound system jernih, antrian masuk cepat. Tahun depan pasti datang lagi!",
    createdAt: "2026-05-18T09:30:00Z",
  },
  {
    id: "rv-2",
    profileId: "org-1",
    authorName: "Maria Lestari",
    authorInitial: "M",
    rating: 4,
    comment: "Lineup mantap, hanya area makanan agak ramai. Overall puas.",
    createdAt: "2026-05-19T14:10:00Z",
  },
  {
    id: "rv-3",
    profileId: "org-2",
    authorName: "Rizky Hidayat",
    authorInitial: "R",
    rating: 5,
    comment: "Turnamen seru, venue nyaman, jadwal berjalan tepat waktu.",
    createdAt: "2026-05-21T11:00:00Z",
  },
  {
    id: "rv-4",
    profileId: "user-1",
    authorName: "Dewi Anggraini",
    authorInitial: "D",
    rating: 5,
    comment:
      "Materi workshop jelas dan mentornya sabar. Sangat membantu untuk pemula seperti saya.",
    createdAt: "2026-04-26T16:45:00Z",
  },
  {
    id: "rv-5",
    profileId: "user-1",
    authorName: "Fajar Nugroho",
    authorInitial: "F",
    rating: 4,
    comment: "Bagus, semoga next ada sesi lanjutan yang lebih advanced.",
    createdAt: "2026-04-27T08:20:00Z",
  },
  {
    id: "rv-6",
    profileId: "user-sari",
    authorName: "Putri Ayu",
    authorInitial: "P",
    rating: 5,
    comment:
      "Tenant makanannya variatif banget, festival paling worth it tahun ini!",
    createdAt: "2026-06-17T19:05:00Z",
  },
];

const initialOf = (name = "") =>
  String(name).trim().charAt(0).toUpperCase() || "?";

const resolveProfileEvents = (profile) =>
  (profile.eventIds ?? [])
    .map((eventId) => eventCatalog.find((event) => event.id === eventId))
    .filter((event) => event && event.visibility === "public");

const summarizeReviews = (profileId) => {
  const reviews = profileReviews
    .filter((review) => review.profileId === profileId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const ratingCount = reviews.length;
  const ratingAverage = ratingCount
    ? reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) /
      ratingCount
    : 0;

  return { reviews, ratingCount, ratingAverage };
};

const toPublicProfile = (profile) => {
  const events = resolveProfileEvents(profile);
  const { reviews, ratingCount, ratingAverage } = summarizeReviews(profile.id);
  const totalAttendees = events.reduce(
    (sum, event) => sum + (Number(event.attendees) || 0),
    0,
  );

  return {
    ...profile,
    events: events.map(toSummary),
    reviews,
    totalEvents: events.length,
    totalAttendees,
    totalParticipants: totalAttendees,
    ratingCount,
    ratingAverage,
  };
};

const toCreatorEventSummaryFromApi = (event, creatorProfile) => ({
  id: event.id,
  name: event.title ?? "-",
  category: event.category?.name ?? "-",
  region: event.city?.provinsi ?? event.city?.name ?? "-",
  city: event.city?.name ?? "-",
  date: event.startDateTime ?? event.start_datetime ?? null,
  dateLabel: formatEventDateLabel(event.startDateTime ?? event.start_datetime),
  startingPrice:
    Number(event.price ?? event.startingPrice ?? event.starting_price) || 0,
  organizer: {
    id: creatorProfile.id,
    name: creatorProfile.name,
    initial: creatorProfile.initial,
  },
  badges: [event.category?.name, event.eventType ?? event.event_type]
    .filter(Boolean)
    .map((badge) => String(badge)),
  bannerHue: creatorProfile.bannerHue ?? "from-brand-500 to-brand-600",
  imageUrl: event.banner ?? null,
  visibility: event.visibility ?? "public",
  isOnline: (event.eventType ?? event.event_type) === "online",
  totalParticipants: Number(event.totalParticipants) || 0,
});

const toPublicCreatorProfileFromApi = (payload) => {
  const entry = payload?.data ?? payload;

  if (!entry?.id) return null;

  const fallbackProfile = publicProfiles.find((item) => item.id === entry.id);
  const profile = {
    ...fallbackProfile,
    id: entry.id,
    type: entry.type ?? fallbackProfile?.type ?? "user",
    name: entry.name ?? fallbackProfile?.name ?? "-",
    bio: entry.bio ?? fallbackProfile?.bio ?? null,
    tagline: entry.tagline ?? fallbackProfile?.tagline ?? null,
    initial: initialOf(entry.name ?? fallbackProfile?.name ?? "Creator"),
    verified: Boolean(entry.verified ?? fallbackProfile?.verified),
    location: entry.location ?? fallbackProfile?.location ?? null,
    joinedAt: entry.joinedAt ?? entry.joined_at ?? fallbackProfile?.joinedAt ?? null,
    instagram: entry.instagram ?? fallbackProfile?.instagram ?? null,
    tiktok: entry.tiktok ?? fallbackProfile?.tiktok ?? null,
    website: entry.website ?? fallbackProfile?.website ?? null,
    bannerHue: fallbackProfile?.bannerHue ?? "from-brand-500 to-brand-600",
    eventIds: Array.isArray(entry.eventIds)
      ? entry.eventIds
      : Array.isArray(fallbackProfile?.eventIds)
        ? fallbackProfile.eventIds
        : [],
  };
  const mappedProfile = toPublicProfile(profile);
  const apiEvents = Array.isArray(entry.events)
    ? entry.events.map((event) => toCreatorEventSummaryFromApi(event, profile))
    : mappedProfile.events;
  const apiTotalParticipants = apiEvents.reduce(
    (sum, event) => sum + (Number(event.totalParticipants) || 0),
    0,
  );

  return {
    ...mappedProfile,
    events: apiEvents,
    totalEvents:
      Number(entry.totalEvents) || apiEvents.length || mappedProfile.totalEvents,
    totalParticipants:
      Number(entry.totalParticipants) || apiTotalParticipants || mappedProfile.totalParticipants,
    totalAttendees:
      Number(entry.totalParticipants) || apiTotalParticipants || mappedProfile.totalAttendees,
  };
};

const toManagedEvent = (event) => {
  const ticketTypes = getEventTicketTypes(event).map((ticket) => ({
    ...ticket,
    eventId: ticket.eventId ?? ticket.event_id ?? event.id,
    saleStartAt: ticket.saleStartAt ?? ticket.sale_start_at ?? null,
    saleEndAt: ticket.saleEndAt ?? ticket.sale_end_at ?? null,
    createdAt: ticket.createdAt ?? ticket.created_at ?? null,
    updatedAt: ticket.updatedAt ?? ticket.updated_at ?? null,
  }));
  const totalQuota = ticketTypes.reduce(
    (sum, ticket) => sum + (Number(ticket.quota) || 0),
    0,
  );
  const sold = ticketTypes.reduce(
    (sum, ticket) => sum + (Number(ticket.sold) || 0),
    0,
  );
  const revenue = ticketTypes.reduce(
    (sum, ticket) =>
      sum + (Number(ticket.price) || 0) * (Number(ticket.sold) || 0),
    0,
  );
  const prices = ticketTypes
    .map((ticket) => Number(ticket.price))
    .filter((price) => !Number.isNaN(price) && price > 0);

  return {
    ...event,
    name: event.title ?? event.name ?? "-",
    title: event.title ?? event.name ?? "-",
    categoryId: event.categoryId ?? event.category_id ?? null,
    organizerId: event.organizerId ?? event.organizer_id ?? null,
    createdBy: event.createdBy ?? event.created_by ?? null,
    cityId: event.cityId ?? event.city_id ?? null,
    category: event.category?.name ?? "-",
    city: event.city?.name ?? "-",
    addressDetail: event.addressDetail ?? event.address_detail ?? "-",
    dateLabel: event.startDateTime ?? event.start_datetime ?? null,
    startDateTime: event.startDateTime ?? event.start_datetime ?? null,
    endDateTime: event.endDateTime ?? event.end_datetime ?? null,
    imageUrl: event.banner ?? event.imageUrl ?? null,
    banner: event.banner ?? event.imageUrl ?? null,
    eventType: event.eventType ?? event.event_type ?? "-",
    labelOnline: event.labelOnline ?? event.label_online ?? null,
    urlOnline: event.urlOnline ?? event.url_online ?? null,
    paymentType: event.paymentType ?? event.payment_type ?? null,
    visibility: event.visibility ?? "public",
    isPublished: Boolean(event.isPublished ?? event.is_published),
    publishedBy: event.publishedBy ?? event.published_by ?? null,
    createdAt: event.createdAt ?? event.created_at ?? null,
    updatedAt: event.updatedAt ?? event.updated_at ?? null,
    ticketTypes,
    organizer: event.organizer
      ? {
          ...event.organizer,
          contactName:
            event.organizer.contactName ?? event.organizer.contact_name ?? null,
          contactEmail:
            event.organizer.contactEmail ??
            event.organizer.contact_email ??
            null,
          contactPhone:
            event.organizer.contactPhone ??
            event.organizer.contact_phone ??
            null,
        }
      : null,
    registered: sold,
    attended: 0,
    revenue,
    totalQuota,
    startingPrice: prices.length ? Math.min(...prices) : 0,
    status:
      event.status ??
      ((event.isPublished ?? event.is_published) ? "active" : "draft"),
    isWithdraw: Boolean(event.is_withdraw ?? event.isWithdraw),
  };
};

export const api = {
  getCarousel: () => delay(carousel),
  getTrendingEvents: () =>
    apiRequest("/events/trending").then((res) =>
      getApiCollection(res).map(toPublicEventSummaryFromApi),
    ),
  getRecommendedEvents: () =>
    apiRequest("/events/recommended").then((res) =>
      getApiCollection(res).map(toPublicEventSummaryFromApi),
    ),
  createTransaction: ({ eventId, items }) =>
    apiRequest("/transactions", {
      method: "POST",
      body: JSON.stringify({ eventId, items }),
    }).then((res) => res.data ?? res),
  createFeedback: ({ rating, review }) =>
    apiRequest("/feedback", {
      method: "POST",
      body: JSON.stringify({
        rating,
        review,
      }),
    }).then((res) => res.data ?? res),
  getFeedbacks: () =>
    apiRequest("/feedback").then((res) =>
      getFeedbackCollection(res).map(toFeedbackFromApi),
    ),

  // Public creator profile
  getPublicProfile: (type, id) => {
    return apiRequest(`/creators/${id}`)
      .then((res) => {
        const profile = toPublicCreatorProfileFromApi(res);
        if (!profile) return null;
        if (type && profile.type !== type) return null;
        return profile;
      })
      .catch(() => null);
  },
  getProfileReviews: (id) => delay(summarizeReviews(id).reviews),
  createProfileReview: ({ profileId, rating, comment, author }) => {
    const review = {
      id: `rv-${Date.now()}`,
      profileId,
      authorId: author?.id ?? null,
      authorName: author?.name ?? "Pengguna",
      authorInitial: initialOf(author?.name ?? "Pengguna"),
      rating: Number(rating) || 0,
      comment: String(comment ?? "").trim(),
      createdAt: new Date().toISOString(),
    };
    profileReviews = [review, ...profileReviews];
    return delay(review);
  },
  getEventPublisher: (type, id) => {
    const organizer = publicProfiles.find(
      (item) => item.type === type && item.id === id,
    );
    if (organizer) {
      return delay({
        type: type,
        id: organizer.id,
        name: organizer.name,
        initial: organizer.initial,
        verified: organizer.verified,
      });
    }
    return delay(null);
  },
  getAdminUsers: () =>
    apiRequest("/users/admin/users").then((res) =>
      getAdminUserCollection(res, "users").map(toAdminUserFromApi),
    ),
  getAdminAdmins: () =>
    apiRequest("/users/admin/admins").then((res) =>
      getAdminUserCollection(res, "admins").map(toAdminUserFromApi),
    ),
  createAdminUser: ({ name, email, password, phone }) =>
    apiRequest("/users/admin/admins", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    }).then((res) =>
      res.data ? toAdminUserFromApi(res.data) : toAdminUserFromApi(res),
    ),
  getCategories: () => delay(apiCategories),
  getRegions: () => delay(apiRegions),
  searchEvents: ({ search, category, wilayah, kota, date }) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (wilayah) params.set("wilayah", wilayah);
    if (kota) params.set("kota", kota);
    if (date) params.set("date", date);

    const query = params.toString();
    return apiRequest(`/events/explore${query ? `?${query}` : ""}`).then(
      (res) => getApiCollection(res).map(toPublicEventSummaryFromApi),
    );
  },
  getEvent: (id) =>
    apiRequest(`/events/${id}`)
      .then((res) => (res.data ? toPublicEventDetailFromApi(res.data) : null))
      .catch(() => delay(eventCatalog.find((e) => e.id === id) ?? null)),
  getForYou: () =>
    delay({
      interests: ["Music", "Esports", "Workshop", "Festival"],
      recentlyViewed: [publicCatalog()[0], publicCatalog()[1]].map(toSummary),
      wishlist: [publicCatalog()[2], publicCatalog()[3]].map(toSummary),
      trendingInCity: [publicCatalog()[0], publicCatalog()[1]].map(toSummary),
    }),
  getEventsByInterest: (categories = []) => {
    const selected = Array.isArray(categories)
      ? categories.filter(Boolean)
      : [categories].filter(Boolean);
    const params = new URLSearchParams();

    if (selected.length > 0) params.set("categories", selected.join(","));

    const query = params.toString();
    return apiRequest(`/events/interest${query ? `?${query}` : ""}`).then(
      (res) => getApiCollection(res).map(toPublicEventSummaryFromApi),
    );
  },
  getMyEvents: () =>
    apiRequest("/events?createdBy=me").then((res) =>
      (res.data ?? []).map(toManagedEvent),
    ),
  getMyEvent: (id) =>
    apiRequest(`/events/${id}`).then((res) =>
      res.data ? toManagedEvent(res.data) : null,
    ),
  updateEvent: (id, payload) =>
    apiRequest(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        category_id: payload.categoryId,
        organizer_id: payload.organizerId,
        city_id: payload.cityId,
        address_detail: payload.addressDetail,
        banner: payload.banner,
        event_type: payload.eventType,
        label_online: payload.labelOnline,
        url_online: payload.urlOnline,
        payment_type: payload.paymentType,
        start_datetime: payload.startDateTime,
        end_datetime: payload.endDateTime,
        status: payload.status,
        is_published: payload.isPublished,
        ticket_types: payload.ticketTypes.map((ticket) => ({
          name: ticket.name,
          price: ticket.price,
          quota: ticket.quota,
          sold: ticket.sold,
          sale_start_at: ticket.saleStartAt,
          sale_end_at: ticket.saleEndAt,
        })),
      }),
    }).then((res) => (res.data ? toManagedEvent(res.data) : { id })),
  deleteEvent: (id) =>
    apiRequest(`/events/${id}`, {
      method: "DELETE",
    }).then((res) => res.data ?? res),
  getMyTickets: () =>
    apiRequest("/ticket").then((res) =>
      (res.data ?? []).map(toMyPaidTicketFromApi),
    ),
  getMyTicket: (id) =>
    apiRequest("/ticket").then((res) => {
      const tickets = (res.data ?? []).map(toMyPaidTicketFromApi);
      return tickets.find((ticket) => ticket.id === id) ?? null;
    }),
  getEventAttendees: (eventId, attendanceFilter = "all") =>
    apiRequest(`/ticket/event-ticket/${eventId}/${attendanceFilter}`).then(
      (res) => (res.data ?? []).map(toEventAttendeeFromApi),
    ),
  getEventStatistic: (eventId) =>
    apiRequest(`/transactions/statistic/event/${eventId}`).then((res) => {
      const data = res.data ?? res;
      return {
        terjual: Number(data.terjual) || 0,
        hadir: Number(data.hadir) || 0,
        kuota: Number(data.kuota) || 0,
        revenue: Number(data.revenue) || 0,
      };
    }),
  createWithdraw: (payload) =>
    apiRequest("/withdraw", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.data ?? res),
  getMyWithdraws: () =>
    apiRequest("/withdraw/me").then((res) =>
      getWithdrawCollection(res).map(toWithdrawFromApi),
    ),
  getAllWithdraws: () =>
    apiRequest("/withdraw/all").then((res) =>
      getWithdrawCollection(res).map(toWithdrawFromApi),
    ),
  updateWithdrawStatus: (id, status) =>
    apiRequest("/withdraw/status", {
      method: "POST",
      body: JSON.stringify({
        id,
        status,
      }),
    }).then((res) => (res.data ? toWithdrawFromApi(res.data) : res)),
  getAdminFinance: (organizerId) =>
    apiRequest(`/finance/admin/${organizerId}`).then((res) =>
      getFinanceCollection(res).map(toFinanceFromApi),
    ),
  scanTicketQrCode: (qrCode) =>
    apiRequest("/ticket/qr-code/scan", {
      method: "POST",
      body: JSON.stringify({ qrCode }),
    }).then((res) => res.data ?? res),
  getMyTransactions: () =>
    apiRequest("/transactions/me").then((res) =>
      getTransactionCollection(res).map(toMyTransactionSummaryFromApi),
    ),
  getMyTransaction: (id) =>
    apiRequest(`/transactions/${id}`).then((res) =>
      res?.data ? toMyTransactionSummaryFromApi(res.data) : null,
    ),

  // Admin master-data CRUD
  getMasterCategories: () =>
    apiRequest("/master/categories").then((res) => res.data ?? []),
  createMasterCategory: ({ name }) =>
    apiRequest("/master/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    }).then((res) => res.data),
  updateMasterCategory: (id, { name }) =>
    apiRequest(`/master/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    }).then((res) => res.data),
  deleteMasterCategory: (id) => {
    masterCategories = masterCategories.filter((c) => c.id !== id);
    return delay({ id });
  },

  getMasterCities: () =>
    apiRequest("/master/cities").then((res) => res.data ?? []),
  createMasterCity: ({ name, provinsi }) =>
    apiRequest("/master/cities", {
      method: "POST",
      body: JSON.stringify({ name, provinsi }),
    }).then((res) => res.data),
  updateMasterCity: (id, { name, provinsi }) =>
    apiRequest(`/master/cities/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, provinsi }),
    }).then((res) => res.data),
  deleteMasterCity: (id) => {
    masterCities = masterCities.filter((c) => c.id !== id);
    return delay({ id });
  },

  getMasterOrganizers: () =>
    apiRequest("/master/organizers").then((res) => res.data ?? []),
  createMasterOrganizer: (payload) =>
    apiRequest("/master/organizers", {
      method: "POST",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        contactName: payload.contactName,
        contactEmail: payload.contactEmail,
        contactPhone: payload.contactPhone,
      }),
    }).then((res) => res.data),
  updateMasterOrganizer: (id, payload) =>
    apiRequest(`/master/organizers/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        contactName: payload.contactName,
        contactEmail: payload.contactEmail,
        contactPhone: payload.contactPhone,
      }),
    }).then((res) => res.data),
  createTicketedEvent: (payload) =>
    apiRequest("/events", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.data),
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
