import { useEffect } from 'react'

const SITE_NAME = 'Ramein'
const DEFAULT_TITLE = 'Ramein - Platform Tiket Event Indonesia'
const DEFAULT_DESCRIPTION =
  'Ramein adalah platform tiket event Indonesia untuk menemukan, menjelajahi, dan membeli tiket event dengan cepat dan aman.'
const DEFAULT_IMAGE_PATH = '/favicon.svg'

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL
  if (configured) return trimTrailingSlash(configured)
  if (typeof window !== 'undefined' && window.location?.origin) {
    return trimTrailingSlash(window.location.origin)
  }
  return 'https://www.ramein.fun'
}

export function toAbsoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

function upsertMeta(attribute, key, content) {
  if (!content) return
  let meta = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  if (!data) return
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function removeJsonLd(id) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
}

export function usePageSeo({
  title,
  description,
  canonicalPath = '/',
  image = DEFAULT_IMAGE_PATH,
  type = 'website',
  noIndex = false,
  jsonLd,
  jsonLdId = 'ramein-seo-jsonld',
}) {
  useEffect(() => {
    const finalTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
    const finalDescription = description ?? DEFAULT_DESCRIPTION
    const canonicalUrl = toAbsoluteUrl(canonicalPath)
    const ogImage = toAbsoluteUrl(image)
    const robotsValue = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

    document.documentElement.setAttribute('lang', 'id')
    document.title = finalTitle

    upsertMeta('name', 'description', finalDescription)
    upsertMeta('name', 'robots', robotsValue)
    upsertMeta('name', 'author', SITE_NAME)
    upsertMeta('name', 'theme-color', '#2ea387')

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', finalTitle)
    upsertMeta('property', 'og:description', finalDescription)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', 'id_ID')
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', finalTitle)
    upsertMeta('name', 'twitter:description', finalDescription)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertLink('canonical', canonicalUrl)

    if (jsonLd) {
      upsertJsonLd(jsonLdId, jsonLd)
    } else {
      removeJsonLd(jsonLdId)
    }
  }, [
    canonicalPath,
    description,
    image,
    jsonLd,
    jsonLdId,
    noIndex,
    title,
    type,
  ])
}

