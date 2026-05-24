import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../components/Container'
import EventListCard from '../components/EventListCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import { api, apiCategories, apiRegions } from '../lib/api'

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function JelajahiPage() {
  const [params, setParams] = useSearchParams()
  const [events, setEvents] = useState([])

  const filters = {
    category: params.get('category') ?? undefined,
    region: params.get('region') ?? undefined,
    query: params.get('q') ?? undefined,
  }

  useEffect(() => {
    let cancelled = false
    api
      .searchEvents({
        category: filters.category,
        region: filters.region,
        query: filters.query,
      })
      .then((res) => {
        if (!cancelled) setEvents(res)
      })
    return () => {
      cancelled = true
    }
  }, [filters.category, filters.region, filters.query])

  function update(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  return (
    <SiteLayout>
      <section className="bg-linear-to-r from-brand-500 via-brand-400 to-accent-400 py-10 text-white sm:py-12">
        <Container>
          <h1 className="text-3xl font-bold sm:text-4xl">Jelajahi Event</h1>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Temukan ribuan event menarik di seluruh Indonesia
          </p>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Filter Event</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Select
              label="Kategori"
              value={filters.category ?? ''}
              onChange={(v) => update('category', v)}
              options={[
                { value: '', label: 'Semua Kategori' },
                ...apiCategories.map((c) => ({ value: c.category, label: c.category })),
              ]}
            />
            <Select
              label="Wilayah"
              value={filters.region ?? ''}
              onChange={(v) => update('region', v)}
              options={[
                { value: '', label: 'Semua Wilayah' },
                ...apiRegions.map((r) => ({ value: r.region, label: r.region })),
              ]}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Kota</label>
              <input
                placeholder="Cari kota..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Menampilkan {events.length} event</p>
          {(filters.category || filters.region) && (
            <Link to="/jelajahi" className="text-sm font-medium text-brand-600 hover:underline">
              Hapus filter
            </Link>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {events.map((e) => (
            <EventListCard key={e.id} event={e} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500">Tidak ada event yang cocok dengan filter kamu.</p>
          </div>
        )}
      </Container>
      <SiteFooter />
    </SiteLayout>
  )
}

export default JelajahiPage
