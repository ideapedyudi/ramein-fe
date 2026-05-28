import { getAccessToken } from './authStorage'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1'

export async function apiRequest(path, options = {}) {
  const token = getAccessToken()
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || 'Request gagal. Coba lagi.')
  }

  return payload
}
