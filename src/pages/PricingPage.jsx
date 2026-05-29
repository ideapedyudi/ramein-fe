import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";

const perks = [
  {
    icon: "🆓",
    title: "Gratis Bikin Event",
    desc: "Buat dan publikasikan event kamu tanpa biaya pendaftaran atau biaya bulanan.",
  },
  {
    icon: "💸",
    title: "Bayar Saat Terjual",
    desc: "Kamu hanya dikenakan biaya saat tiket benar-benar terjual. Tidak ada tiket terjual, tidak ada biaya.",
  },
  {
    icon: "📲",
    title: "Semua Fitur Termasuk",
    desc: "QR Code, validasi tiket, halaman event, dan laporan penjualan — semua sudah termasuk.",
  },
];

const steps = [
  {
    label: "Harga tiket kamu",
    value: "Rp 100.000",
    sub: "Contoh harga 1 tiket yang kamu tentukan",
  },
  {
    label: "Biaya Ramein (1%)",
    value: "Rp 1.000",
    sub: "Dipotong otomatis dari setiap tiket terjual",
  },
  {
    label: "Kamu terima",
    value: "Rp 99.000",
    sub: "Langsung masuk ke pendapatan kamu",
    highlight: true,
  },
];

function PricingPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Harga & Biaya"
        subtitle="Sederhana dan transparan — kamu hanya bayar saat tiket terjual."
      />

      <div className="mx-auto max-w-[1280px] space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-12 lg:px-8">
        {/* Hero pricing statement */}
        <Reveal
          as="section"
          className="rounded-3xl border border-black/5 bg-white p-6 text-center shadow-sm sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Model Harga Ramein
          </p>
          <h2 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-6xl">
            Hanya <span className="text-brand-600">1%</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Kami memotong <strong>1% dari setiap pembelian tiket</strong> oleh
            pengguna. Tanpa biaya pendaftaran, tanpa biaya bulanan, tanpa biaya
            tersembunyi.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/buat-event"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Mulai Buat Event
            </Link>
            <Link
              to="/jelajahi"
              className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Jelajahi Event
            </Link>
          </div>
        </Reveal>

        {/* Example breakdown */}
        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Contoh Perhitungan
          </h2>
          <p className="mt-1 text-gray-600">
            Begini cara biaya 1% bekerja untuk setiap tiket yang terjual.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-5 shadow-sm ${
                  s.highlight
                    ? "border-brand-200 bg-brand-50"
                    : "border-black/5 bg-white"
                }`}
              >
                <p className="text-sm font-medium text-gray-500">{s.label}</p>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    s.highlight ? "text-brand-700" : "text-gray-900"
                  }`}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{s.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Perks */}
        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Apa yang Kamu Dapatkan
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">
                  {p.icon}
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Pertanyaan Umum
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Apakah ada biaya untuk membuat event?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Tidak. Membuat dan mempublikasikan event sepenuhnya gratis. Kamu
                hanya dikenakan biaya 1% dari tiket yang terjual.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Bagaimana dengan event gratis?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Untuk tiket gratis (Rp 0), tidak ada biaya yang dipotong karena
                1% dari nol tetap nol.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Kapan biaya 1% dipotong?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Biaya dipotong otomatis pada setiap transaksi pembelian tiket
                oleh pengguna, sehingga pendapatan yang kamu terima sudah bersih.
              </p>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal
          as="section"
          className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white sm:p-10"
        >
          <h2 className="text-xl font-bold sm:text-2xl">
            Siap jual tiket tanpa ribet?
          </h2>
          <p className="mt-2 max-w-2xl text-white/90">
            Buat event kamu sekarang dan mulai jual tiket. Cukup 1% per tiket
            terjual, sisanya sepenuhnya milikmu.
          </p>
          <div className="mt-5">
            <Link
              to="/buat-event"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Buat Event Sekarang
            </Link>
          </div>
        </Reveal>
      </div>
      <SiteFooter />
    </SiteLayout>
  );
}

export default PricingPage;
