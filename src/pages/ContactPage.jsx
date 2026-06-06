import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteLayout from "../components/SiteLayout";

const WHATSAPP_NUMBER = "6281200000000";
const WHATSAPP_DISPLAY = "+62 812 0000 0000";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Ramein, saya punya saran/pertanyaan tentang ",
)}`;

const channels = [
  {
    icon: "📧",
    label: "Email",
    value: "halo@ramein.fun",
    href: "mailto:halo@ramein.fun",
  },
  { icon: "📍", label: "Alamat", value: "Bandung, Indonesia", href: null },
];

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Hubungi Kami"
        subtitle="Ada pertanyaan atau butuh bantuan? Tim Ramein siap membantu lewat WhatsApp."
      />

      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* WhatsApp — highlighted primary contact */}
        <Reveal className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 text-white shadow-lg sm:p-8">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl">
              💬
            </div>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Chat via WhatsApp
            </h2>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              💡 Punya saran atau pertanyaan?
            </span>
            <p className="mt-3 max-w-md text-white/90">
              Punya <strong>saran</strong> untuk Ramein atau ada{" "}
              <strong>pertanyaan</strong> seputar event, tiket, atau kerja sama?
              Langsung chat tim kami lewat WhatsApp kami balas secepatnya di
              jam operasional.
            </p>
            <p className="mt-4 text-lg font-semibold">{WHATSAPP_DISPLAY}</p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#128C7E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-xl">💬</span> Chat Sekarang
          </a>
        </Reveal>

        {/* Other channels + hours */}
        <Reveal delay={120} className="space-y-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href ?? "#"}
              onClick={(e) => !c.href && e.preventDefault()}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{c.label}</p>
                <p className="text-base font-semibold text-gray-900">
                  {c.value}
                </p>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
            <p className="mt-2 text-sm text-gray-600">
              Senin – Jumat: 09.00 – 18.00 WIB
            </p>
            <p className="text-sm text-gray-600">Sabtu: 09.00 – 14.00 WIB</p>
            <p className="text-sm text-gray-600">
              Minggu & Libur Nasional: tutup
            </p>
          </div>
        </Reveal>
      </div>
      <SiteFooter />
    </SiteLayout>
  );
}

export default ContactPage;
