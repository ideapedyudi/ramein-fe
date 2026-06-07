import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { api } from "../lib/api";
import { formatIDR } from "../lib/format";

function QrIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
    </svg>
  );
}

function TicketIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
      <path d="M13 5v2M13 17v2M13 11v2" />
    </svg>
  );
}

const paymentMethods = [
  { value: "qris", title: "QRIS", desc: "Scan to pay", Icon: QrIcon },
];

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 tabular-nums">{value}</span>
    </div>
  );
}

function PaymentModal({ open, transaction, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !transaction?.redirectUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="my-auto flex w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="midtrans-payment-title"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 p-4 sm:p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Pembayaran Midtrans
            </p>
            <h2
              id="midtrans-payment-title"
              className="mt-1 text-lg font-semibold text-gray-900"
            >
              Selesaikan pembayaran
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Order ID:{" "}
              <span className="font-mono text-gray-900">
                {transaction.orderId}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_280px]">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <iframe
              src={transaction.redirectUrl}
              title="Midtrans payment"
              className="h-205 max-h-none w-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Kalau halaman tidak muncul
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Browser atau Midtrans bisa memblokir embed. Buka link pembayaran
                di tab baru.
              </p>
              <a
                href={transaction.redirectUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Buka di tab baru
              </a>
            </div>

            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
              <p className="font-semibold">Langkah berikutnya</p>
              <p className="mt-1">
                Selesaikan pembayaran di Midtrans. Setelah status transaksi
                berubah, kamu bisa lanjut ke halaman sukses / riwayat transaksi.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-100 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Kalau sudah bayar, tutup modal ini dan tunggu update status
              transaksi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const eventId = params.get("eventId");
  const tierId = params.get("tierId");
  const qty = Number(params.get("qty") ?? "1");
  const initialError = !eventId || !tierId ? "Missing params" : "";

  const [event, setEvent] = useState(null);
  const [tier, setTier] = useState(null);
  const [error, setError] = useState(initialError);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const [payment, setPayment] = useState("qris");
  const [contact, setContact] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const updateContact = (key) => (e) =>
    setContact((c) => ({ ...c, [key]: e.target.value }));
  const subtotal = (Number(tier?.price) || 0) * qty;
  const total = subtotal;

  useEffect(() => {
    let cancelled = false;
    if (initialError) {
      return;
    }
    api.getEvent(eventId).then((res) => {
      if (cancelled) return;
      if (!res) {
        setError("Event not found");
        return;
      }
      const t = res.tiers.find((x) => x.id === tierId);
      if (!t) {
        setError("Tier not found");
        return;
      }
      setEvent(res);
      setTier(t);
    });
    return () => {
      cancelled = true;
    };
  }, [eventId, tierId, initialError]);

  if (error) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
        <Link
          to="/jelajahi"
          className="mt-4 inline-block text-brand-600 hover:underline"
        >
          ← Kembali ke Jelajahi
        </Link>
      </div>
    );
  }

  if (!event || !tier) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-20 text-center text-gray-500">
        Memuat...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await api.createTransaction({
        eventId: event.id,
        items: [
          {
            ticketTypeId: tier.id,
            quantity: qty,
          },
        ],
      });

      if (total <= 0) {
        const successParams = new URLSearchParams({
          eventId: event.id,
          orderId: result?.orderId ?? result?.id ?? `FREE-${Date.now()}`,
          total: String(total),
        });
        navigate(`/order/success?${successParams.toString()}`, {
          replace: true,
        });
        return;
      }

      const orderReference = String(
        result?.orderId ?? result?.order_id ?? result?.id ?? "",
      ).trim();
      if (orderReference && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            `checkout_meta_${orderReference}`,
            JSON.stringify({
              eventId: event.id,
              total,
              savedAt: Date.now(),
            }),
          );
        } catch {
          // Ignore storage errors; payment flow should continue.
        }
      }

      if (!result?.redirectUrl) {
        throw new Error("Redirect URL pembayaran tidak tersedia.");
      }

      setTransaction(result);
      setPaymentModalOpen(true);
    } catch (submitErr) {
      setSubmitError(submitErr.message || "Gagal membuat transaksi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-[1024px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to={`/event/${event.id}`}
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-gray-600 transition hover:text-brand-600"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1024px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]"
        >
          <div className="space-y-6">
            <Card>
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Contact Information
              </h2>
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={contact.email}
                onChange={updateContact("email")}
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={contact.firstName}
                  onChange={updateContact("firstName")}
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  value={contact.lastName}
                  onChange={updateContact("lastName")}
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={contact.phone}
                  onChange={updateContact("phone")}
                />
              </div>
            </Card>

            <Card>
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((p) => {
                  const selected = payment === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPayment(p.value)}
                      aria-pressed={selected}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition duration-200 ${
                        selected
                          ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-200"
                          : "border-gray-200 hover:border-brand-300 hover:bg-gray-50/40"
                      }`}
                    >
                      <div
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg transition ${
                          selected
                            ? "bg-brand-100 text-brand-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <p.Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{p.title}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{p.desc}</p>
                      </div>
                      <div
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${
                          selected
                            ? "border-brand-600 bg-brand-600"
                            : "border-gray-300"
                        }`}
                      >
                        {selected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="md:sticky md:top-6 md:self-start">
            <Card>
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
              <div
                className={`mb-4 w-full overflow-hidden rounded-lg bg-gradient-to-br ${
                  event.bannerHue ?? "from-brand-400 to-brand-600"
                } ${event.imageUrl ? "" : "aspect-video"}`}
              >
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    loading="eager"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                ) : (
                  <div className="flex h-full items-end p-4">
                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {event.name}
                    </p>
                  </div>
                )}
              </div>
              <p className="font-semibold text-gray-900">{event.name}</p>
              <p className="mt-0.5 text-sm text-gray-600">
                {tier.name} Ticket × {qty}
              </p>

              <div className="my-5 space-y-1.5 border-t border-gray-100 pt-5 text-sm">
                <Row label="Subtotal" value={formatIDR(subtotal)} />
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-brand-600">
                  {formatIDR(total)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full cursor-pointer rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-60"
              >
                {submitting
                  ? "Memproses..."
                  : total <= 0
                    ? "Daftar Gratis"
                    : "Complete Payment"}
              </button>
              {submitError && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </p>
              )}
              <p className="mt-3 text-center text-xs text-gray-500">
                By completing this purchase you agree to our{" "}
                <Link to="/terms" className="text-brand-600 hover:underline">
                  Terms of Service
                </Link>
              </p>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand-50 p-3 text-xs text-brand-700">
                <TicketIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Your ticket will be sent to your email after payment
                  confirmation
                </span>
              </div>
            </Card>
          </div>
        </form>
      </div>
      <PaymentModal
        open={paymentModalOpen}
        transaction={transaction}
        onClose={() => setPaymentModalOpen(false)}
      />
    </div>
  );
}

export default CheckoutPage;
