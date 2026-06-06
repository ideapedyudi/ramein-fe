import { useEffect, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Container from '../components/Container'
import EventCardSkeleton from '../components/EventCardSkeleton'
import EventListCard from '../components/EventListCard'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { api } from '../lib/api'

const INTEREST_STORAGE_KEY = 'ramein:selected-interests'

function getStoredInterests() {
  try {
    const value = window.localStorage.getItem(INTEREST_STORAGE_KEY)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

function UntukKamuPage() {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [events, setEvents] = useState([])
  const [addInterestOpen, setAddInterestOpen] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    api
      .getMasterCategories()
      .then((res) => {
        if (cancelled) return
        const available = res.map((category) => category.name).filter(Boolean)
        const stored = getStoredInterests().filter((item) => available.includes(item))
        setCategories(res)
        setSelectedCategories(stored.length > 0 ? stored : "Music" ? "Music" : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat kategori minat.')
      })
      .finally(() => {
        if (!cancelled) setLoadingCategories(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (loadingCategories) return

    window.localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(selectedCategories))
  }, [loadingCategories, selectedCategories])

  useEffect(() => {
    if (loadingCategories) return

    let cancelled = false
    setLoadingEvents(true)
    setError('')

    api
      .getEventsByInterest(selectedCategories)
      .then((res) => {
        if (!cancelled) setEvents(res)
      })
      .catch((err) => {
        if (!cancelled) {
          setEvents([])
          setError(err.message || 'Gagal memuat event berdasarkan minat.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingEvents(false)
      })

    return () => {
      cancelled = true
    }
  }, [loadingCategories, selectedCategories])

  const selectedLabel = useMemo(
    () => (selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Semua Minat'),
    [selectedCategories],
  )
  const availableCategories = useMemo(
    () => categories.filter((category) => !selectedCategories.includes(category.name)),
    [categories, selectedCategories],
  )

  const { visible, hasMore, sentinelRef } = useInfiniteScroll(events, {
    pageSize: 12,
    resetKey: selectedCategories.join(','),
  })

  function addCategory(categoryName) {
    setSelectedCategories((current) =>
      current.includes(categoryName) ? current : [...current, categoryName],
    )
  }

  function removeCategory(categoryName) {
    setSelectedCategories((current) => current.filter((item) => item !== categoryName))
  }

  return (
    <SiteLayout>
      <section className="bg-linear-to-r from-brand-500 via-brand-400 to-accent-400 py-10 text-white sm:py-12">
        <Container>
          <h1 className="text-3xl font-bold sm:text-4xl">Untuk Kamu</h1>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Rekomendasi event berdasarkan minat pilihanmu
          </p>
        </Container>
      </section>

      <Container className="space-y-8 py-8 sm:space-y-10 sm:py-10">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Minat Kamu</h2>
              <p className="mt-1 text-sm text-gray-500">Minat disimpan di browser kamu.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAddInterestOpen((open) => !open)}
                disabled={loadingCategories}
                aria-expanded={addInterestOpen}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <FaPlus
                  className={`text-xs transition-transform duration-300 ${addInterestOpen ? 'rotate-45' : ''
                    }`}
                />
                Tambah Minat
              </button>
              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="rounded-full border border-brand-100 px-3 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
                >
                  Reset minat
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {selectedCategories.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada minat dipilih.</p>
            ) : (
              selectedCategories.map((categoryName) => (
                <button
                  key={categoryName}
                  type="button"
                  onClick={() => removeCategory(categoryName)}
                  className="rounded-full bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-brand-700"
                >
                  {categoryName} <span className="ml-1 text-white/80">x</span>
                </button>
              ))
            )}
          </div>

          <div
            className={`grid transition-all duration-300 ease-out ${addInterestOpen
              ? 'mt-4 grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
              }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  Tambah dari kategori
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={category.id ?? category.name}
                      type="button"
                      onClick={() => addCategory(category.name)}
                      className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
                    >
                      {category.name}
                    </button>
                  ))}
                  {!loadingCategories && availableCategories.length === 0 && (
                    <p className="text-sm text-gray-500">Semua kategori sudah ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {loadingCategories && (
            <p className="mt-3 text-xs text-gray-500">Memuat kategori minat...</p>
          )}
        </div>

        <section>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Event Berdasarkan Minat</h2>
              <p className="mt-1 text-sm text-gray-500">{selectedLabel}</p>
            </div>
            <p className="text-sm text-gray-600">
              {loadingEvents ? 'Memuat event...' : `${events.length} event`}
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 items-start gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {loadingEvents
              ? Array.from({ length: 8 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
              : visible.map((event) => (
                <EventListCard key={event.id} event={event} />
              ))}
          </div>

          {/* Infinite-scroll sentinel: reveals the next batch on scroll. */}
          {!loadingEvents && hasMore && (
            <div
              ref={sentinelRef}
              className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loadingEvents && events.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-500">Belum ada event untuk minat ini.</p>
            </div>
          )}
        </section>
      </Container>
      <SiteFooter />
    </SiteLayout>
  )
}

export default UntukKamuPage
