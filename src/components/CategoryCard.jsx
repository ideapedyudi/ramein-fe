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
    <article
      className="rounded-3xl px-6 py-7 text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
      style={{
        background: `linear-gradient(140deg, ${category.from} 0%, ${category.to} 100%)`,
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
        <Icon />
      </div>
      <p className="mt-8 text-3xl font-semibold">{category.name}</p>
    </article>
  )
}

export default CategoryCard
