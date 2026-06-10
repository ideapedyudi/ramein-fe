import { Link } from "react-router-dom";
import brandLogo from "../assets/logobrand.webp";

function FooterColumn({ title, items }) {
  return (
    <div className="text-center md:text-left">
      <h5 className="text-lg font-semibold text-[#202020] md:text-2xl">{title}</h5>
      <ul className="mt-2 space-y-1.5 text-sm text-[#6f6f6f] md:mt-4 md:space-y-2 md:text-md">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="transition hover:text-[#2ea387] hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="cursor-default text-[#9a9a9a]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const productItems = [
  { label: "Jelajahi Event", to: "/jelajahi" },
  { label: "Buat Event", to: "/buat-event" },
  { label: "Harga", to: "/pricing" },
];

const companyItems = [
  { label: "Tentang Kami", to: "/about" },
  { label: "Kontak", to: "/contact" },
];

const supportItems = [
  { label: "Syarat Layanan", to: "/terms" },
  { label: "Kebijakan Privasi", to: "/privacy" },
];

function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[#e8e8e8] bg-white md:mt-16">
      <div className="mx-auto grid w-full max-w-370 gap-6 px-4 py-8 md:grid-cols-4 md:gap-10 md:px-3 md:py-12">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Link to="/" className="flex items-center gap-2">
            <img src={brandLogo} alt="Ramein Logo" className="w-8 md:w-10" />
            <span className="text-3xl font-bold text-[#2ea387] md:text-4xl">Ramein</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6b6b6b] md:mt-4 md:text-lg">
            Platform tiket event terpercaya untuk semua momen seru kamu.
          </p>
        </div>
        <FooterColumn title="Produk" items={productItems} />
        <FooterColumn title="Perusahaan" items={companyItems} />
        <FooterColumn title="Bantuan" items={supportItems} />
      </div>
      <div className="border-t border-[#efefef] py-4 text-center text-xs text-[#888] md:py-6 md:text-lg">
        © 2026 Ramein. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

export default SiteFooter;
