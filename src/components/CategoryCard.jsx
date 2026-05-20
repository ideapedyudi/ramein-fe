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

function CategoryCard({ category }) {
  const Icon = categoryIconMap[category.icon] ?? FaRegStar

  return (
    <Link
      to={`/jelajahi?category=${encodeURIComponent(category.name)}`}
      className="block rounded-3xl px-6 py-7 text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
      style={{
        background: `linear-gradient(140deg, ${category.from} 0%, ${category.to} 100%)`,
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
        <Icon />
      </div>
      <p className="mt-8 text-3xl font-semibold">{category.name}</p>
    </Link>
  )
}

export default CategoryCard
