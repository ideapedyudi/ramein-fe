import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";

const values = [
  {
    icon: "🎫",
    title: "Mudah & Cepat",
    desc: "Pembelian tiket cuma butuh beberapa klik. E-ticket langsung dikirim ke email kamu.",
  },
  {
    icon: "🤝",
    title: "Untuk Semua",
    desc: "Komunitas kecil sampai organizer profesional bisa membuat dan mengelola event di Ramein.",
  },
  {
    icon: "🔒",
    title: "Aman & Terpercaya",
    desc: "Validasi tiket digital via QR Code dan pembayaran terintegrasi dengan payment gateway terpercaya.",
  },
  {
    icon: "🇮🇩",
    title: "Lokal Indonesia",
    desc: "Dibangun oleh tim Indonesia, mendukung wilayah Sumatera, Jawa, Kalimantan, Sulawesi, sampai Indonesia Timur.",
  },
];

const team = [
  { initial: "Y", name: "Yudi", role: "Ketua Tim & Pengembang" },
  { initial: "N", name: "Naufal", role: "Pengembang" },
  { initial: "A", name: "Astry", role: "Konten & Desain" },
  { initial: "G", name: "Givary", role: "Konten & Desain" },
  { initial: "R", name: "Rafly", role: "Dokumentasi & Tester" },
  { initial: "H", name: "Haqi", role: "Dokumentasi & Presenter" },
];

const secondaryLinks = [
  { title: "Hubungi Kami", to: "/contact" },
  { title: "Syarat & Ketentuan", to: "/terms" },
  { title: "Kebijakan Privasi", to: "/privacy" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Tentang Ramein"
        subtitle="Hari mu ngebosenin? Ramein aja"
      />

      <div className="mx-auto max-w-[1280px] space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-12 lg:px-8">
        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Latar Belakang
          </h2>
          <div className="mt-3 grid gap-x-10 gap-y-3 text-gray-700 leading-relaxed md:grid-cols-2">
            <p>
              Banyak acara konser, seminar, esports, workshop, festival,
              sampai acara komunitas masih mengalami kesulitan dalam penjualan
              tiket dan pengelolaan peserta. Sebagian besar penyelenggara masih
              menggunakan sistem manual yang kurang efisien dan sulit dipantau
              secara real-time.
            </p>
            <p>
              Ramein hadir sebagai platform digital ticketing yang memungkinkan
              siapa pun membeli tiket online maupun offline, sekaligus memberi
              organizer alat untuk membuat, menjual, dan memvalidasi tiket
              dengan cepat menggunakan QR Code.
            </p>
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Misi Kami
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Kami percaya menjual dan membeli tiket seharusnya semudah memesan
            makanan online. Itu yang kami perjuangkan setiap hari:
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Akses untuk semua",
                desc: "Komunitas kecil sampai organizer besar bisa jual tiket tanpa modal teknis.",
              },
              {
                title: "Tanpa ribet",
                desc: "Buat event, jual, dan validasi tiket lewat satu platform.",
              },
              {
                title: "Biaya yang adil",
                desc: "Transparan dan terjangkau kamu hanya bayar saat tiket terjual.",
              },
            ].map((m) => (
              <li
                key={m.title}
                className="rounded-xl border border-black/5 bg-white p-4"
              >
                <p className="font-semibold text-gray-900">{m.title}</p>
                <p className="mt-1 text-sm text-gray-600">{m.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Keunggulan Platform
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">
                  {v.icon}
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Harga Transparan
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {/* Featured pricing card */}
            <Link
              to="/pricing"
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 p-6 transition hover:border-brand-300 hover:shadow-md sm:p-8 lg:col-span-2"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                  Biaya layanan
                </p>
                <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                  <span className="text-brand-600">20%</span> per tiket
                </p>
                <p className="mt-3 max-w-md text-gray-600">
                  Gratis bikin event, tanpa biaya bulanan. Fee 20% per tiket
                  terjual, plus biaya publikasi khusus bila ingin event tampil
                  publik.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-700">
                Lihat rincian harga
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Secondary links */}
            <div className="flex flex-col divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white">
              {secondaryLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex flex-1 items-center justify-between px-5 py-4 transition hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-800 group-hover:text-brand-700">
                    {item.title}
                  </span>
                  <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-brand-600">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Tim Kami
          </h2>
          <p className="mt-1 text-gray-600">
            Dibangun oleh tim kecil yang peduli pada pengalaman event di
            Indonesia.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                  {m.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-600">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="section"
          className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white sm:p-10"
        >
          <h2 className="text-xl font-bold sm:text-2xl">
            Siap Ramein harimu?
          </h2>
          <p className="mt-2 max-w-2xl text-white/90">
            Jelajahi ribuan event di seluruh Indonesia, atau buat event sendiri
            dan mulai jual tiket dalam hitungan menit.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/jelajahi"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Jelajahi Event
            </Link>
            <Link
              to="/buat-event"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Buat Event
            </Link>
          </div>
        </Reveal>
      </div>
      <SiteFooter />
    </SiteLayout>
  );
}

export default AboutPage;
