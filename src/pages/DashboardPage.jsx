import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaBuilding,
  FaCity,
  FaListUl,
} from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { useAuth } from '../context/authContext'
import { api } from '../lib/api'

function StatCard({ icon: Icon, label, value, accent, hint }) {
  return (
    <div className="rounded-2xl border border-[#eee] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9a9a]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#1f1f1f]">{value}</p>
          {hint && <p className="mt-1 text-xs text-[#6d6d6d]">{hint}</p>}
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>
          <Icon className="text-base" />
        </span>
      </div>
    </div>
  )
}

function DashboardPage() {
  const { user } = useAuth()
  const [counts, setCounts] = useState({ categories: 0, cities: 0, organizers: 0 })
  const [recent, setRecent] = useState({ categories: [], organizers: [] })

  useEffect(() => {
    let cancelled = false
    Promise.all([
      api.getMasterCategories(),
      api.getMasterCities(),
      api.getMasterOrganizers(),
    ]).then(([cats, cities, orgs]) => {
      if (cancelled) return
      setCounts({
        categories: cats.length,
        cities: cities.length,
        organizers: orgs.length,
      })
      setRecent({ categories: cats.slice(0, 5), organizers: orgs.slice(0, 4) })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AdminLayout
      title={`Halo, ${user.name}`}
      subtitle="Ringkasan master data internal"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={FaListUl}
          label="Kategori"
          value={counts.categories}
          accent="bg-brand-50 text-brand-700"
          hint="Master kategori event"
        />
        <StatCard
          icon={FaCity}
          label="Kota"
          value={counts.cities}
          accent="bg-violet-50 text-violet-700"
          hint="Master kota event"
        />
        <StatCard
          icon={FaBuilding}
          label="Penyelenggara"
          value={counts.organizers}
          accent="bg-amber-50 text-amber-700"
          hint="Partner resmi"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-[#eee] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1f1f1f]">Kategori Terbaru</h2>
            <Link
              to="/admin/kategori"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              Kelola <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[#f0f0f0]">
            {recent.categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm font-medium text-[#1f1f1f]">{c.name}</span>
                <span className="text-xs text-[#6d6d6d]">{c.createdAt}</span>
              </li>
            ))}
            {recent.categories.length === 0 && (
              <li className="py-6 text-center text-xs text-[#6d6d6d]">Belum ada kategori.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#eee] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1f1f1f]">Penyelenggara Terbaru</h2>
            <Link
              to="/admin/organizer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              Kelola <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[#f0f0f0]">
            {recent.organizers.map((o) => (
              <li key={o.id} className="py-2.5">
                <p className="text-sm font-semibold text-[#1f1f1f]">{o.name}</p>
                <p className="text-xs text-[#6d6d6d]">{o.contactEmail || o.description}</p>
              </li>
            ))}
            {recent.organizers.length === 0 && (
              <li className="py-6 text-center text-xs text-[#6d6d6d]">Belum ada penyelenggara.</li>
            )}
          </ul>
        </section>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage
