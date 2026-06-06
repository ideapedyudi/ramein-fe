import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { navMenus } from '../data/homeData'
import { getSiteUrl, usePageSeo } from '../lib/seo'

const routeSeo = {
  '/': {
    title: 'Ramein - Beli Tiket Event, Konser, Festival & Workshop',
    description:
      'Temukan dan beli tiket event konser, festival, seminar, workshop, esports, dan acara komunitas di seluruh Indonesia dengan cepat dan aman.',
  },
  '/home': {
    title: 'Ramein - Beli Tiket Event, Konser, Festival & Workshop',
    description:
      'Temukan dan beli tiket event konser, festival, seminar, workshop, esports, dan acara komunitas di seluruh Indonesia dengan cepat dan aman.',
  },
  '/jelajahi': {
    title: 'Jelajahi Event Terbaru di Indonesia',
    description:
      'Cari event terbaru berdasarkan kategori, kota, wilayah, dan tanggal, lalu beli tiket event yang paling cocok untuk kamu.',
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
  '/admin',
  '/login',
  '/register',
  '/checkout',
  '/order/success',
  '/dashboard',
  '/tiket-saya',
  '/transaksi',
  '/withdraw',
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
        title: 'Ramein - Beli Tiket Event, Konser, Festival & Workshop',
        description:
          'Platform tiket event Indonesia untuk menemukan, menjelajahi, dan membeli tiket event online dengan cepat dan aman.',
      }
    )
  }, [pathname])

  const noIndex = noIndexPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  const siteUrl = getSiteUrl()
  const canonicalPath = pathname === '/home' ? '/' : pathname

  const homeJsonLd =
    canonicalPath === '/'
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'Ramein',
              url: siteUrl,
              logo: `${siteUrl}/favicon.svg`,
              email: 'halo@ramein.fun',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'halo@ramein.fun',
                availableLanguage: ['Indonesian'],
              },
            },
            {
              '@type': 'WebSite',
              name: 'Ramein',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/jelajahi?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@type': 'ItemList',
              name: 'Menu utama Ramein',
              itemListElement: navMenus.map((menu, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'SiteNavigationElement',
                  name: menu.label,
                  url: `${siteUrl}${menu.to}`,
                },
              })),
            },
          ],
        }
      : null

  usePageSeo({
    title: config.title,
    description: config.description,
    canonicalPath,
    noIndex,
    jsonLd: homeJsonLd,
    jsonLdId: 'ramein-home-jsonld',
  })

  return null
}

export default RouteSeo
