import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../components/Container'
import EventListCard from '../components/EventListCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import { api, apiRegions } from '../lib/api'

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
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [masterLoading, setMasterLoading] = useState(true)
  const [error, setError] = useState('')

  const filters = {
    category: params.get('category') ?? params.get('kategori') ?? undefined,
    wilayah: params.get('wilayah') ?? params.get('region') ?? undefined,
    kota: params.get('kota') ?? params.get('city') ?? undefined,
    date: params.get('date') ?? params.get('tanggal') ?? undefined,
  }

  useEffect(() => {
    const aliases = [
      ['kategori', 'category'],
      ['region', 'wilayah'],
      ['city', 'kota'],
      ['tanggal', 'date'],
    ]
    const next = new URLSearchParams(params)
    let changed = false

    aliases.forEach(([legacyKey, canonicalKey]) => {
      const legacyValue = params.get(legacyKey)
      if (!legacyValue) return

      if (!next.has(canonicalKey)) {
        next.set(canonicalKey, legacyValue)
      }
      next.delete(legacyKey)
      changed = true
    })

    if (changed) {
      setParams(next, { replace: true })
    }
  }, [params, setParams])

  useEffect(() => {
    let cancelled = false

    setMasterLoading(true)
    Promise.all([api.getMasterCategories(), api.getMasterCities()])
      .then(([categoryRes, cityRes]) => {
        if (cancelled) return
        setCategories(categoryRes)
        setCities(cityRes)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat filter event.')
      })
      .finally(() => {
        if (!cancelled) setMasterLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    api
      .searchEvents({
        category: filters.category,
        wilayah: filters.wilayah,
        kota: filters.kota,
        date: filters.date,
      })
      .then((res) => {
        if (!cancelled) setEvents(res)
      })
      .catch((err) => {
        if (!cancelled) {
          setEvents([])
          setError(err.message || 'Gagal memuat event.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [filters.category, filters.wilayah, filters.kota, filters.date])

  const cityOptions = useMemo(() => {
    return cities
      .map((city) => city.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }, [cities])

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
                ...categories.map((category) => ({
                  value: category.name,
                  label: category.name,
                })),
              ]}
            />
            <Select
              label="Wilayah"
              value={filters.wilayah ?? ''}
              onChange={(v) => update('wilayah', v)}
              options={[
                { value: '', label: 'Semua Wilayah' },
                ...apiRegions.map((region) => ({ value: region.region, label: region.region })),
              ]}
            />
            <Select
              label="Kota"
              value={filters.kota ?? ''}
              onChange={(v) => update('kota', v)}
              options={[
                { value: '', label: 'Semua Kota' },
                ...cityOptions.map((city) => ({ value: city, label: city })),
              ]}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="date"
                value={filters.date ?? ''}
                onChange={(event) => update('date', event.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
          {masterLoading && (
            <p className="mt-3 text-xs text-gray-500">Memuat filter kategori dan kota...</p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {loading ? 'Memuat event...' : `Menampilkan ${events.length} event`}
          </p>
          {(filters.category || filters.wilayah || filters.kota || filters.date) && (
            <Link to="/jelajahi" className="text-sm font-medium text-brand-600 hover:underline">
              Hapus filter
            </Link>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {events.map((e) => (
            <EventListCard key={e.id} event={e} />
          ))}
        </div>

        {!loading && events.length === 0 && (
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
