import dayjs from 'dayjs'

const idr = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatIDR(value) {
  if (value === null || value === undefined) return '—'
  if (value === 0) return 'Gratis'
  return idr.format(value).replace(/\s/g, '')
}

export function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatDate(value) {
  if (!value) return '-'
  const date = dayjs(value)
  return date.isValid() ? date.format('DD-MM-YYYY') : '-'
}

export function formatDateTime(value) {
  if (!value) return '-'
  const date = dayjs(value)
  return date.isValid() ? date.format('DD-MM-YYYY HH:mm') : '-'
}
