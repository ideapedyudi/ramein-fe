import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaCheckCircle,
  FaGlobe,
  FaInstagram,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
} from 'react-icons/fa'
import Container from '../components/Container'
import EventListCard from '../components/EventListCard'
import LoginPromptModal from '../components/LoginPromptModal'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'
import StarRating from '../components/StarRating'
import { useAuth } from '../context/authContext'
import { api } from '../lib/api'
import { formatDate, formatDateTime, formatNumber } from '../lib/format'
import { usePageSeo } from '../lib/seo'

const TYPE_LABEL = { organizer: 'Penyelenggara', user: 'Pengguna' }

function StatPill({ label, value }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

function PublicProfilePage({ kind }) {
  const { profileId } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [profile, setProfile] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [loginPromptOpen, setLoginPromptOpen] = useState(false)

  const basePath = kind === 'user' ? 'u' : 'organizer'
  const canonicalPath = `/${basePath}/${profileId}`
  const isOwnProfile = isAuthenticated && user?.id === profileId

  useEffect(() => {
    let cancelled = false

    Promise.resolve()
      .then(() => {
        if (cancelled) return null
        setLoading(true)
        setNotFound(false)
        return api.getPublicProfile(kind, profileId)
      })
      .then((res) => {
        if (cancelled || res === null) {
          if (!cancelled) {
            setNotFound(true)
            setProfile(null)
          }
          return
        }
        setProfile(res)
        setReviews(res.reviews ?? [])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [kind, profileId])

  const ratingStats = useMemo(() => {
    const count = reviews.length
    const average = count
      ? reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) / count
      : 0
    const distribution = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((review) => Math.round(Number(review.rating) || 0) === star).length,
    }))
    return { count, average, distribution }
  }, [reviews])

  const profileJsonLd =
    profile && !notFound
      ? {
          '@context': 'https://schema.org',
          '@type': kind === 'user' ? 'Person' : 'Organization',
          name: profile.name,
          description: profile.tagline ?? profile.bio,
          ...(ratingStats.count > 0
            ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: ratingStats.average.toFixed(1),
                  reviewCount: ratingStats.count,
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
        }
      : null

  usePageSeo({
    title: notFound ? 'Profil Tidak Ditemukan' : profile?.name ?? 'Profil Publik',
    description: notFound
      ? 'Profil yang kamu cari tidak tersedia.'
      : profile?.tagline ?? profile?.bio ?? 'Profil publik penyelenggara dan pengguna di Ramein.',
    canonicalPath,
    type: 'profile',
    noIndex: notFound,
    jsonLd: profileJsonLd,
    jsonLdId: 'ramein-profile-jsonld',
  })

  async function handleSubmit(event) {
    event.preventDefault()
    setFormSuccess('')

    if (!isAuthenticated) {
      setLoginPromptOpen(true)
      return
    }
    if (!rating) {
      setFormError('Pilih rating bintang terlebih dahulu.')
      return
    }
    if (comment.trim().length < 3) {
      setFormError('Tulis ulasan minimal 3 karakter.')
      return
    }

    setSubmitting(true)
    setFormError('')
    try {
      const review = await api.createProfileReview({
        profileId,
        rating,
        comment,
        author: user,
      })
      setReviews((prev) => [review, ...prev])
      setRating(0)
      setComment('')
      setFormSuccess('Terima kasih! Ulasan kamu sudah ditambahkan.')
    } catch (err) {
      setFormError(err.message || 'Gagal mengirim ulasan. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  if (notFound) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profil tidak ditemukan</h1>
          <p className="mt-2 text-sm text-gray-500">
            Profil publik hanya tersedia untuk penyelenggara dan pengguna yang pernah
            mempublikasikan event.
          </p>
          <Link to="/jelajahi" className="mt-4 inline-block text-brand-600 hover:underline">
            ← Jelajahi event
          </Link>
        </div>
        <SiteFooter />
      </SiteLayout>
    )
  }

  if (loading || !profile) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-gray-500">
          Memuat profil...
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      {/* Hero header */}
      <div className={`bg-linear-to-br ${profile.bannerHue ?? 'from-brand-500 to-brand-600'}`}>
        <Container className="pb-16 pt-10 sm:pt-12">
          <Link to="/jelajahi" className="text-sm text-white/80 hover:text-white">
            ← Kembali ke Jelajahi
          </Link>
        </Container>
      </div>

      <Container className="-mt-12 pb-12">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span
              className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${profile.bannerHue ?? 'from-brand-500 to-brand-600'} text-3xl font-bold text-white shadow-md`}
            >
              {profile.initial}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                {profile.verified && (
                  <FaCheckCircle className="text-brand-500" title="Terverifikasi" />
                )}
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {TYPE_LABEL[kind] ?? 'Profil'}
                </span>
              </div>
              {profile.tagline && (
                <p className="mt-1 text-sm text-gray-600">{profile.tagline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                {profile.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-brand-500" /> {profile.location}
                  </span>
                )}
                {profile.joinedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaRegCalendarAlt className="text-brand-500" /> Bergabung{' '}
                    {formatDate(profile.joinedAt)}
                  </span>
                )}
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-brand-600"
                  >
                    <FaInstagram className="text-brand-500" /> {profile.instagram}
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-brand-600"
                  >
                    <FaGlobe className="text-brand-500" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatPill label="Event" value={formatNumber(profile.totalEvents)} />
            <StatPill label="Total peserta" value={`${formatNumber(profile.totalAttendees)}+`} />
            <StatPill
              label={`${ratingStats.count} ulasan`}
              value={ratingStats.count ? ratingStats.average.toFixed(1) : '—'}
            />
          </div>

          {profile.bio && (
            <p className="mt-5 text-sm leading-relaxed text-gray-700">{profile.bio}</p>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Events */}
          <section className="lg:col-span-2">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Event yang Dipublikasikan
            </h2>
            {profile.events.length === 0 ? (
              <Card>
                <p className="text-sm text-gray-500">Belum ada event publik.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3">
                {profile.events.map((event) => (
                  <EventListCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* Reviews */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Ulasan & Penilaian</h2>

            <Card>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    {ratingStats.count ? ratingStats.average.toFixed(1) : '—'}
                  </p>
                  <StarRating value={ratingStats.average} size="sm" />
                  <p className="mt-1 text-xs text-gray-500">{ratingStats.count} ulasan</p>
                </div>
                <div className="flex-1 space-y-1">
                  {ratingStats.distribution.map(({ star, count }) => {
                    const pct = ratingStats.count ? (count / ratingStats.count) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-3 text-right">{star}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-5 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Write a review */}
            {isOwnProfile ? (
              <Card>
                <p className="text-sm text-gray-500">
                  Ini profil publik kamu. Kamu tidak bisa menilai diri sendiri.
                </p>
              </Card>
            ) : (
              <Card>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Tulis ulasan</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <StarRating
                      value={rating}
                      onChange={setRating}
                      readOnly={false}
                      size="lg"
                    />
                    {rating > 0 && <span className="text-sm text-gray-500">{rating}/5</span>}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder={`Bagikan pengalaman kamu dengan ${profile.name}...`}
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                  {formError && <p className="text-xs text-red-600">{formError}</p>}
                  {formSuccess && <p className="text-xs text-emerald-600">{formSuccess}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
                  >
                    {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                  </button>
                  {!isAuthenticated && (
                    <p className="text-center text-xs text-gray-400">
                      Kamu perlu masuk untuk mengirim ulasan.
                    </p>
                  )}
                </form>
              </Card>
            )}

            {/* Review list */}
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <Card>
                  <p className="text-sm text-gray-500">
                    Belum ada ulasan. Jadilah yang pertama memberi penilaian!
                  </p>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} className="p-4!">
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                        {review.authorInitial ?? (review.authorName ?? '?').charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {review.authorName}
                          </p>
                          <StarRating value={review.rating} size="sm" />
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          {formatDateTime(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </Container>

      <LoginPromptModal
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="Kamu perlu masuk ke akun terlebih dahulu untuk memberi ulasan."
        redirectTo={canonicalPath}
      />

      <SiteFooter />
    </SiteLayout>
  )
}

export default PublicProfilePage
