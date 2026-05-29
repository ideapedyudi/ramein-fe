import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getSiteUrl, usePageSeo } from '../lib/seo'

const routeSeo = {
  '/home': {
    title: 'Ramein - Platform Tiket Event Indonesia',
    description:
      'Temukan dan beli tiket event konser, seminar, workshop, dan festival di seluruh Indonesia dengan cepat dan aman.',
  },
  '/jelajahi': {
    title: 'Jelajahi Event Terbaru',
    description:
      'Cari event berdasarkan kategori dan wilayah, lalu temukan acara yang paling cocok untuk kamu.',
  },
  '/untuk-kamu': {
    title: 'Rekomendasi Event Untuk Kamu',
    description:
      'Dapatkan rekomendasi event personal berdasarkan minat dan aktivitasmu di Ramein.',
  },
  '/about': {
    title: 'Tentang Ramein',
    description:
      'Kenali Ramein, platform tiket event yang membantu orang menemukan pengalaman seru setiap hari.',
  },
  '/pricing': {
    title: 'Harga & Biaya Ramein',
    description:
      'Model harga transparan: fee 20% per tiket terjual, plus biaya publikasi khusus per event bila ingin event tampil publik. Gratis membuat event.',
  },
  '/contact': {
    title: 'Kontak Ramein',
    description:
      'Hubungi tim Ramein lewat WhatsApp untuk pertanyaan, kerja sama, atau bantuan terkait event dan pembelian tiket.',
  },
  '/terms': {
    title: 'Syarat dan Ketentuan',
    description:
      'Baca syarat dan ketentuan penggunaan layanan Ramein untuk pengguna dan organizer event.',
  },
  '/privacy': {
    title: 'Kebijakan Privasi',
    description:
      'Pelajari bagaimana Ramein mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.',
  },
}

const noIndexPrefixes = [
  '/login',
  '/register',
  '/checkout',
  '/order/success',
  '/dashboard',
  '/tiket-saya',
  '/transaksi',
  '/pengaturan',
  '/buat-event',
  '/event-kamu',
]

function RouteSeo() {
  const { pathname } = useLocation()

  const config = useMemo(() => {
    if (pathname.startsWith('/event/')) {
      return {
        title: 'Detail Event',
        description: 'Informasi detail event, jadwal, lokasi, dan pilihan tiket di Ramein.',
      }
    }

    return (
      routeSeo[pathname] ?? {
        title: 'Ramein - Platform Tiket Event Indonesia',
        description:
          'Platform tiket event Indonesia untuk menemukan, menjelajahi, dan membeli tiket event online.',
      }
    )
  }, [pathname])

  const noIndex = noIndexPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  const homeJsonLd =
    pathname === '/home' || pathname === '/'
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'Ramein',
              url: getSiteUrl(),
              logo: `${getSiteUrl()}/favicon.svg`,
            },
            {
              '@type': 'WebSite',
              name: 'Ramein',
              url: getSiteUrl(),
              potentialAction: {
                '@type': 'SearchAction',
                target: `${getSiteUrl()}/jelajahi?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
          ],
        }
      : null

  usePageSeo({
    title: config.title,
    description: config.description,
    canonicalPath: pathname,
    noIndex,
    jsonLd: homeJsonLd,
    jsonLdId: 'ramein-home-jsonld',
  })

  return null
}

export default RouteSeo

