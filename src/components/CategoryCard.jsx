import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaBriefcase,
  FaChalkboardTeacher,
  FaChartLine,
  FaCoffee,
  FaDumbbell,
  FaGamepad,
  FaHeartbeat,
  FaMicrochip,
  FaMusic,
  FaPalette,
  FaRegStar,
} from 'react-icons/fa'

const categoryIconMap = {
  music: FaMusic,
  seminar: FaChalkboardTeacher,
  esports: FaGamepad,
  technology: FaMicrochip,
  education: FaBookOpen,
  business: FaBriefcase,
  creative: FaPalette,
  sport: FaDumbbell,
  health: FaHeartbeat,
  lifestyle: FaCoffee,
  investment: FaChartLine,
  spiritual: FaRegStar,
}

function CategoryCard({ category, active = false }) {
  const Icon = categoryIconMap[category.icon] ?? FaRegStar

  return (
    <Link
      to={`/jelajahi?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-2"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-brand-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_14px_rgba(0,0,0,0.10)]">
        <Icon />
      </div>
      <p
        className={`text-sm font-medium transition ${
          active ? 'text-brand-600' : 'text-[#444] group-hover:text-brand-600'
        }`}
      >
        {category.name}
      </p>
    </Link>
  )
}

export default CategoryCard
