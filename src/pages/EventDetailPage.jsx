import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import EventImage from "../components/EventImage";
import LoginPromptModal from "../components/LoginPromptModal";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";
import { useAuth } from "../context/authContext";
import { api } from "../lib/api";
import { formatIDR, formatNumber } from "../lib/format";
import { toAbsoluteUrl, usePageSeo } from "../lib/seo";

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

function CardHeader({ title }) {
  return <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>;
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-base">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-0.5 text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function getPublicEventUrl(eventId) {
  return `${window.location.origin}/event/${eventId}`;
}

function getDiscountDisplayPrice(price) {
  return Math.round((price ?? 0) * 1.2);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const canonicalPath = `/event/${eventId}`;

  function buildCheckoutPath() {
    const search = new URLSearchParams({
      eventId: event.id,
      tierId: selectedTier,
      qty: String(quantity),
    });
    return `/checkout?${search.toString()}`;
  }

  function handleCheckout() {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }
    navigate(buildCheckoutPath());
  }

  async function handleShareLink() {
    const publicUrl = getPublicEventUrl(eventId);

    try {
      await copyText(publicUrl);
      setShareMessage("Link event disalin.");
    } catch {
      setShareMessage(publicUrl);
    }

    window.setTimeout(() => setShareMessage(""), 2500);
  }

  const eventJsonLd =
    event && event.visibility !== "private"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.name,
          description: event.description,
          startDate: event.date,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: event.isOnline
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
          image: event.imageUrl ? [toAbsoluteUrl(event.imageUrl)] : undefined,
          location: event.isOnline
            ? {
                "@type": "VirtualLocation",
                url: event.attachmentUrl ?? toAbsoluteUrl(canonicalPath),
              }
            : {
                "@type": "Place",
                name: event.location,
                address: event.city,
              },
          organizer: {
            "@type": "Organization",
            name: event.organizer?.name ?? "Ramein",
          },
          offers: event.tiers.map((tier) => ({
            "@type": "Offer",
            url: toAbsoluteUrl(canonicalPath),
            price: tier.price,
            priceCurrency: "IDR",
            availability:
              tier.quotaAvailable > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            category: tier.name,
          })),
        }
      : null;

  usePageSeo({
    title: notFound ? "Event Tidak Ditemukan" : (event?.name ?? "Detail Event"),
    description: notFound
      ? "Event yang kamu cari tidak tersedia atau sudah dihapus."
      : (event?.description ??
        "Informasi detail event, jadwal, lokasi, dan tiket."),
    canonicalPath,
    image: event?.imageUrl,
    type: "event",
    noIndex: notFound || event?.visibility === "private",
    jsonLd: eventJsonLd,
    jsonLdId: "ramein-event-jsonld",
  });

  useEffect(() => {
    let cancelled = false;
    api.getEvent(eventId).then((res) => {
      if (cancelled) return;
      if (!res) {
        setNotFound(true);
        return;
      }
      setEvent(res);
      setSelectedTier(res.tiers[0]?.id ?? "");
      api.getEventPublisher(eventId, res.organizer?.id).then((p) => {
        if (!cancelled) setPublisher(p);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  if (notFound) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1280px] px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Event tidak ditemukan
          </h1>
          <Link
            to="/jelajahi"
            className="mt-4 inline-block text-brand-600 hover:underline"
          >
            ← Kembali ke Jelajahi
          </Link>
        </div>
        <SiteFooter />
      </SiteLayout>
    );
  }

  if (!event) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1280px] px-4 py-20 text-center text-gray-500">
          Memuat event...
        </div>
      </SiteLayout>
    );
  }

  const tier = event.tiers.find((t) => t.id === selectedTier);
  const total = (tier?.price ?? 0) * quantity;

  return (
    <SiteLayout>
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/jelajahi"
            className="text-sm text-gray-600 hover:text-brand-600"
          >
            ← Kembali ke Daftar Event
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-5 sm:space-y-6">
            <div
              className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ${event.bannerHue ?? "from-brand-400 to-brand-600"} ${event.imageUrl ? "" : "h-56 sm:h-72 md:h-80"}`}
            >
              <EventImage
                src={event.imageUrl}
                alt={event.name}
                loading="eager"
              />
            </div>

            <Card>
              <CardHeader title="Informasi Event" />
              <div className="space-y-4">
                <Link
                  to={`/${event.organizer?.type === "user" ? "u" : "organizer"}/${event.organizer?.id}`}
                  className="text-brand-600 hover:underline"
                >
                  <Info
                    icon="📢"
                    label="Penyelenggara"
                    value={event.organizer?.name ?? "Ramein"}
                  />
                </Link>
                <Info
                  icon="📅"
                  label="Tanggal & Waktu"
                  value={event.timeLabel}
                />
                <Info icon="📍" label="Lokasi" value={event.location} />
                <Info
                  icon="👥"
                  label="Peserta"
                  value={`${formatNumber(event.attendees)}+ tertarik`}
                />
              </div>
            </Card>

            <Card>
              <CardHeader title="Tentang Event Ini" />
              <p className="text-sm leading-relaxed text-gray-700">
                {event.description}
              </p>
            </Card>

            {publisher && (
              <Card>
                <CardHeader title="Penyelenggara" />
                <Link
                  to={`/${publisher.type === "user" ? "u" : "organizer"}/${publisher.id}`}
                  className="group flex items-center gap-3"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                    {publisher.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 font-semibold text-gray-900 group-hover:text-brand-600">
                      {publisher.name}
                      {publisher.verified && (
                        <FaCheckCircle
                          className="text-brand-500"
                          title="Terverifikasi"
                        />
                      )}
                    </p>
                    <p className="text-xs text-brand-600 group-hover:underline">
                      Lihat profil &amp; ulasan →
                    </p>
                  </div>
                </Link>
              </Card>
            )}
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {event.visibility === "private" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-semibold uppercase text-white">
                    🔒 Event Privat
                  </span>
                )}
                {event.isOnline && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-brand-700">
                    Online
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {event.name}
                </h1>
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
                  >
                    Bagikan Tautan
                  </button>
                  {shareMessage && (
                    <p className="mt-2 max-w-[240px] break-words text-xs text-emerald-600">
                      {shareMessage}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.badges?.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                  >
                    {b}
                  </span>
                ))}
              </div>
              {event.attachmentLabel && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-3 text-sm">
                  <span className="text-base">🎁</span>
                  <div>
                    <p className="font-medium text-brand-700">
                      {event.attachmentLabel}
                    </p>
                    <p className="text-xs text-brand-700/70">
                      Dikirim ke email kamu setelah tiket berhasil dibeli.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Card>
              <CardHeader title="Pilih Kategori Tiket" />
              <div className="space-y-3">
                {event.tiers.map((t) => {
                  const discountDisplayPrice = getDiscountDisplayPrice(t.price);

                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTier(t.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        selectedTier === t.id
                          ? "border-brand-500 bg-brand-50/40 ring-2 ring-brand-200"
                          : "border-gray-200 hover:border-brand-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {t.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {t.quotaAvailable} tiket tersedia
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                              Diskon 20%
                            </span>
                            <span className="text-xs font-medium text-gray-400 line-through">
                              {formatIDR(discountDisplayPrice)}
                            </span>
                          </div>
                          <p className="mt-1 font-bold text-brand-600">
                            {formatIDR(t.price)}
                          </p>
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-gray-600">
                        {t.perks.map((p) => (
                          <li key={p} className="flex items-center gap-1">
                            <span className="text-brand-500">●</span> {p}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <CardHeader title="Jumlah Tiket" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 rounded-lg border border-gray-200 text-lg font-semibold hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-base font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 rounded-lg border border-gray-200 text-lg font-semibold hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-brand-600">
                    {formatIDR(total)}
                  </p>
                </div>
              </div>
            </Card>

            <div className="sticky bottom-4 rounded-2xl border border-black/5 bg-white p-5 shadow-lg">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-brand-600">
                    {formatIDR(total)}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPromptModal
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="Kamu perlu masuk ke akun terlebih dahulu sebelum melanjutkan pembelian tiket."
        redirectTo={buildCheckoutPath()}
      />

      <SiteFooter />
    </SiteLayout>
  );
}

export default EventDetailPage;
