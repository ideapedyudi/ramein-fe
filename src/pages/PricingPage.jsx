import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";

const perks = [
  {
    icon: "🆓",
    title: "Gratis Mulai",
    desc: "Buat event dan kelola peserta tanpa biaya pendaftaran atau biaya bulanan.",
  },
  {
    icon: "💸",
    title: "Bayar Saat Terjual",
    desc: "Fee 20% hanya berlaku saat tiket benar-benar terjual. Tidak ada penjualan, tidak ada fee.",
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
    label: "Fee Ramein (20%)",
    value: "Rp 20.000",
    sub: "Dipotong otomatis dari setiap tiket terjual",
  },
  {
    label: "Kamu terima",
    value: "Rp 80.000",
    sub: "Langsung masuk ke pendapatan kamu",
    highlight: true,
  },
];

function PricingPage() {
  const { hash } = useLocation();

  // Scroll to the targeted section (e.g. #faq from the top nav) once mounted.
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <SiteLayout>
      <PageHeader
        title="Harga & Biaya"
        subtitle="Transparan dengan dua komponen: fee per tiket terjual dan biaya publikasi untuk event publik."
      />

      <div className="mx-auto max-w-[1280px] space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-12 lg:px-8">
        {/* Hero — two pricing components */}
        <Reveal as="section">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-600">
            Model Harga Ramein
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {/* Component 1 — transaction fee */}
            <div className="flex flex-col rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-sm sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600/10 px-3 py-1 text-xs font-semibold text-brand-700">
                Fee Transaksi
              </span>
              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                <span className="text-brand-600">20%</span> per tiket
              </h2>
              <p className="mt-3 text-gray-600">
                Kami memotong{" "}
                <strong>20% dari setiap tiket yang terjual</strong>. Dipotong
                otomatis, jadi pendapatan yang kamu terima sudah bersih. Tanpa
                biaya bulanan atau biaya tersembunyi.
              </p>
            </div>

            {/* Component 2 — publication fee (custom quote) */}
            <div className="flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-400/20 px-3 py-1 text-xs font-semibold text-amber-700">
                Biaya Publikasi
              </span>
              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Harga khusus
              </h2>
              <p className="mt-3 text-gray-600">
                Ingin event kamu tampil <strong>publik</strong> dan ditemukan
                banyak orang di Ramein? Biaya publikasi{" "}
                <strong>ditentukan per event</strong> dan kita diskusikan dulu
                bersama, menyesuaikan skala dan kebutuhan acaramu.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Diskusikan event kamu →
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Example breakdown */}
        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Contoh Perhitungan
          </h2>
          <p className="mt-1 text-gray-600">
            Begini cara fee 20% bekerja untuk setiap tiket yang terjual.
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
        <Reveal as="section" id="faq" className="scroll-mt-28">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Pertanyaan Umum
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Berapa biaya yang dikenakan?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Ada dua komponen: <strong>fee transaksi 20%</strong> dari setiap
                tiket yang terjual, dan <strong>biaya publikasi</strong> jika
                kamu ingin event tampil publik di Ramein. Membuat event sendiri
                tetap gratis.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Berapa biaya publikasinya?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Biaya publikasi bersifat <strong>khusus per event</strong> —
                kami diskusikan dulu bersama kamu menyesuaikan skala dan
                kebutuhan acara. Hubungi tim kami untuk penawaran.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Bagaimana dengan event gratis?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Untuk tiket gratis (Rp 0), tidak ada fee transaksi karena 20%
                dari nol tetap nol. Biaya publikasi hanya berlaku bila kamu
                ingin event ditampilkan publik.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Kapan fee 20% dipotong?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Fee dipotong otomatis pada setiap transaksi pembelian tiket oleh
                pengguna, sehingga pendapatan yang kamu terima sudah bersih.
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
            Buat event kamu sekarang dan mulai jual tiket. Fee 20% per tiket
            terjual, plus biaya publikasi khusus bila ingin event tampil publik.
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
