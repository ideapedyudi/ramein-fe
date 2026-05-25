import { Link } from "react-router-dom";
import brandLogo from "../assets/logobrand.png";

function FooterColumn({ title, items }) {
  return (
    <div>
      <h5 className="text-2xl font-semibold text-[#202020]">{title}</h5>
      <ul className="mt-4 space-y-2 text-md text-[#6f6f6f]">
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
              <span className="cursor-default text-[#9a9a9a]">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const productItems = [
  { label: "Explore Events", to: "/jelajahi" },
  { label: "Create Event", to: "/buat-event" },
  { label: "Pricing" },
];

const companyItems = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const supportItems = [
  { label: "Help Center" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#e8e8e8] bg-white">
      <div className="mx-auto grid w-full max-w-370 gap-10 px-2 py-12 md:grid-cols-4 md:px-3">
        <div>
          <Link to="/home" className="flex items-center gap-2">
            <img src={brandLogo} alt="Ramein Logo" className="w-10" />
            <span className="text-4xl font-bold text-[#2ea387]">Ramein</span>
          </Link>
          <p className="mt-4 max-w-xs text-lg leading-relaxed text-[#6b6b6b]">
            Platform tiket event terpercaya untuk semua momen seru kamu.
          </p>
        </div>
        <FooterColumn title="Product" items={productItems} />
        <FooterColumn title="Company" items={companyItems} />
        <FooterColumn title="Support" items={supportItems} />
      </div>
      <div className="border-t border-[#efefef] py-6 text-center text-lg text-[#888]">
        (c) 2026 Ramein. All rights reserved.
      </div>
    </footer>
  );
}

export default SiteFooter;
