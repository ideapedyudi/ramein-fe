import { useEffect, useRef, useState } from 'react'

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

function loadGoogleScript() {
  const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`)
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve()
        return
      }
      existing.addEventListener('load', resolve, { once: true })
      existing.addEventListener('error', reject, { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GOOGLE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function GoogleAuthButton({ onCredential, disabled, enableOneTap = false, context = 'signin' }) {
  const buttonRef = useRef(null)
  const [error, setError] = useState('')
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (!clientId) {
      return undefined
    }

    let cancelled = false

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current) return

        window.google.accounts.id.initialize({
          client_id: clientId,
          context,
          callback: (response) => {
            if (response?.credential) onCredential(response.credential)
          },
        })
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: buttonRef.current.offsetWidth || 360,
          text: 'continue_with',
          shape: 'rectangular',
        })

        if (enableOneTap) {
          window.google.accounts.id.prompt()
        }
      })
      .catch(() => {
        if (!cancelled) setError('Gagal memuat Google Login.')
      })

    return () => {
      cancelled = true
      if (enableOneTap && window.google?.accounts?.id) {
        window.google.accounts.id.cancel()
      }
    }
  }, [clientId, context, enableOneTap, onCredential])

  const message = clientId ? error : 'Google Client ID belum dikonfigurasi.'

  if (message) {
    return (
      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
        {message}
      </p>
    )
  }

  return (
    <div
      className={disabled ? 'pointer-events-none opacity-60' : ''}
      aria-disabled={disabled}
    >
      <div ref={buttonRef} className="min-h-11 w-full" />
    </div>
  )
}

export default GoogleAuthButton
