import { Link } from "react-router-dom";

import bisnis from "../assets/category-icon/bisnis.webp";
import edukasi from "../assets/category-icon/edukasi.webp";
import esport from "../assets/category-icon/esport.webp";
import investasi from "../assets/category-icon/investasi.webp";
import kesehatan from "../assets/category-icon/kesehatan.webp";
import konser from "../assets/category-icon/konser.webp";
import kreatif from "../assets/category-icon/kreatif.webp";
import lifestyle from "../assets/category-icon/lifestyle.webp";
import olahraga from "../assets/category-icon/olahraga.webp";
import seminar from "../assets/category-icon/seminar.webp";
import spiritual from "../assets/category-icon/spiritual.webp";
import teknologi from "../assets/category-icon/teknologi.webp";

const categoryIconMap = {
  music: konser,
  seminar: seminar,
  esports: esport,
  technology: teknologi,
  education: edukasi,
  business: bisnis,
  creative: kreatif,
  sport: olahraga,
  health: kesehatan,
  lifestyle: lifestyle,
  investment: investasi,
  spiritual: spiritual,
};

function CategoryCard({ category, active = false }) {
  const iconSrc = categoryIconMap[category.icon] ?? kreatif;

  return (
    <Link
      to={`/jelajahi?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-2"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_14px_rgba(0,0,0,0.10)] overflow-hidden">
        <img
          src={iconSrc}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <p
        className={`text-sm font-medium transition ${
          active ? "text-brand-600" : "text-[#444] group-hover:text-brand-600"
        }`}
      >
        {category.name}
      </p>
    </Link>
  );
}

export default CategoryCard;
