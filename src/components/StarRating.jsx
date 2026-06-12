import { useState } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const SIZE = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
}

/**
 * Star rating display + input.
 * - readOnly (default): renders `value` with half-star support.
 * - interactive: pass onChange; click/hover to pick a whole-star rating.
 */
function StarRating({ value = 0, onChange, readOnly = true, size = 'md', className = '' }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  const stars = [1, 2, 3, 4, 5]

  return (
    <div
      className={`inline-flex items-center gap-0.5 text-amber-400 ${SIZE[size] ?? SIZE.md} ${className}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `Rating ${value} dari 5` : 'Pilih rating'}
    >
      {stars.map((star) => {
        const Icon = readOnly
          ? active >= star
            ? FaStar
            : active >= star - 0.5
              ? FaStarHalfAlt
              : FaRegStar
          : active >= star
            ? FaStar
            : FaRegStar

        if (readOnly) {
          return <Icon key={star} aria-hidden="true" />
        }

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Beri ${star} bintang`}
            className="cursor-pointer transition hover:scale-110"
          >
            <Icon />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
