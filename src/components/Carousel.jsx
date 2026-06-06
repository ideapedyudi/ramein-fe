import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function resolveResponsive(value, viewportWidth) {
  if (typeof value === 'number') return value
  if (!value || typeof value !== 'object') return 1
  const w = viewportWidth || 1200
  if (w >= 1280 && value.xl != null) return value.xl
  if (w >= 1024 && value.lg != null) return value.lg
  if (w >= 768 && value.md != null) return value.md
  if (w >= 640 && value.sm != null) return value.sm
  return value.base ?? 1
}

function Carousel({
  items,
  renderItem,
  itemsPerView = 1,
  gap = 16,
  peek = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  dragEnabled = true,
  dimInactive = false,
  className = '',
  slideClassName = '',
}) {
  const itemCount = items?.length ?? 0
  const viewportRef = useRef(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef(null)
  const dragMovedRef = useRef(false)

  const resolvedViewport = viewportWidth || 1200
  const currentItemsPerView = resolveResponsive(itemsPerView, resolvedViewport)
  const peekPx = typeof peek === 'function' ? peek(resolvedViewport) : peek
  const canLoop = loop && currentItemsPerView === 1 && itemCount > 1
  // Clone 2 slides on each side (not just 1) so the peek area beside the
  // boundary clone is always filled — otherwise the loop shows a blank gap.
  const cloneCount = canLoop ? Math.min(2, itemCount) : 0

  const extendedItems = useMemo(() => {
    if (!canLoop || itemCount === 0) return items ?? []
    const lead = items.slice(itemCount - cloneCount)
    const trail = items.slice(0, cloneCount)
    return [...lead, ...items, ...trail]
  }, [canLoop, items, itemCount, cloneCount])

  const [currentIndex, setCurrentIndex] = useState(canLoop ? cloneCount : 0)

  const maxIndex = Math.max(0, itemCount - currentItemsPerView)

  // Clamp during render rather than in an effect: when the viewport grows the
  // breakpoint can raise itemsPerView (shrinking maxIndex), so a stored index
  // may briefly point past the end. Deriving it here avoids an extra render.
  const displayIndex = canLoop ? currentIndex : Math.min(currentIndex, maxIndex)

  const slideWidth =
    (resolvedViewport - 2 * peekPx - (currentItemsPerView - 1) * gap) /
    Math.max(currentItemsPerView, 1)
  const slideStep = slideWidth + gap
  const trackLen = extendedItems.length
  const trackWidth =
    trackLen * slideWidth + Math.max(trackLen - 1, 0) * gap
  const baseTranslate = peekPx - displayIndex * slideStep
  const translateX = baseTranslate + dragOffset

  const activeIndex = canLoop
    ? (((currentIndex - cloneCount) % itemCount) + itemCount) % itemCount
    : displayIndex

  const goNext = useCallback(() => {
    setIsTransitionEnabled(true)
    if (canLoop) {
      setCurrentIndex((i) => i + 1)
    } else {
      setCurrentIndex((i) => Math.min(maxIndex, i + 1))
    }
  }, [canLoop, maxIndex])

  const goPrev = useCallback(() => {
    setIsTransitionEnabled(true)
    if (canLoop) {
      setCurrentIndex((i) => i - 1)
    } else {
      setCurrentIndex((i) => Math.max(0, i - 1))
    }
  }, [canLoop])

  const goToDot = (dotIndex) => {
    setIsTransitionEnabled(true)
    if (canLoop) setCurrentIndex(dotIndex + cloneCount)
    else setCurrentIndex(Math.min(Math.max(dotIndex, 0), maxIndex))
  }

  useEffect(() => {
    if (!autoPlay || itemCount < 2 || isHovered || isDragging) return undefined
    const timer = window.setInterval(() => {
      setIsTransitionEnabled(true)
      setCurrentIndex((i) => {
        if (canLoop) return i + 1
        if (i >= maxIndex) return 0
        return i + 1
      })
    }, autoPlayInterval)
    return () => window.clearInterval(timer)
  }, [autoPlay, autoPlayInterval, canLoop, isHovered, isDragging, itemCount, maxIndex])

  useEffect(() => {
    if (isTransitionEnabled) return undefined
    const frameId = window.requestAnimationFrame(() => setIsTransitionEnabled(true))
    return () => window.cancelAnimationFrame(frameId)
  }, [isTransitionEnabled])

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return undefined
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (!w) return
      setViewportWidth(w)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleTransitionEnd = (e) => {
    if (!canLoop) return
    // Only react to the track's OWN transform transition finishing. Child
    // transitions (e.g. the dimInactive overlay's opacity, ~150ms) bubble up to
    // this handler and would otherwise fire the loop reset mid-animation —
    // disabling the transition and jumping the track to a blank frame
    // (the white-screen bug at the loop boundary).
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (currentIndex >= cloneCount && currentIndex < cloneCount + itemCount) return
    // Landed on a clone → snap (without transition) to its real counterpart.
    const real = (((currentIndex - cloneCount) % itemCount) + itemCount) % itemCount
    setIsTransitionEnabled(false)
    setCurrentIndex(cloneCount + real)
  }

  const onPointerDown = (e) => {
    if (!dragEnabled || itemCount < 2) return
    if (e.button != null && e.button !== 0) return
    dragStartRef.current = {
      x: e.clientX,
      pointerId: e.pointerId,
      target: e.currentTarget,
    }
    dragMovedRef.current = false
  }

  const onPointerMove = (e) => {
    const start = dragStartRef.current
    if (!start) return
    const dx = e.clientX - start.x
    if (!dragMovedRef.current) {
      if (Math.abs(dx) <= 5) return
      dragMovedRef.current = true
      setIsDragging(true)
      setIsTransitionEnabled(false)
      try {
        start.target.setPointerCapture?.(start.pointerId)
      } catch {
        // ignore
      }
    }
    setDragOffset(dx)
  }

  const finishDrag = (clientX) => {
    const start = dragStartRef.current
    if (!start) return
    const dx = clientX - start.x
    const threshold = Math.min(slideWidth * 0.2, 60)
    setIsDragging(false)
    setDragOffset(0)
    setIsTransitionEnabled(true)
    dragStartRef.current = null
    if (Math.abs(dx) > threshold) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const onPointerUp = (e) => {
    if (!dragStartRef.current) return
    if (dragMovedRef.current) {
      finishDrag(e.clientX)
    } else {
      dragStartRef.current = null
    }
  }

  const onPointerCancel = () => {
    if (!dragStartRef.current) return
    setIsDragging(false)
    setDragOffset(0)
    setIsTransitionEnabled(true)
    dragStartRef.current = null
    dragMovedRef.current = false
  }

  const onClickCapture = (e) => {
    if (dragMovedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      dragMovedRef.current = false
    }
  }

  if (itemCount === 0) return null

  const dotCount = canLoop ? itemCount : maxIndex + 1
  const dotActive = canLoop ? activeIndex : displayIndex

  const canShowArrows =
    showArrows && itemCount > currentItemsPerView && !(canLoop && itemCount < 2)

  return (
    <section
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={viewportRef}
        className={`overflow-hidden ${dragEnabled ? 'touch-pan-y select-none' : ''}`}
        style={{
          cursor: dragEnabled && itemCount > 1 ? (isDragging ? 'grabbing' : 'grab') : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={onClickCapture}
      >
        <div
          className={`flex items-start ${
            isTransitionEnabled
              ? 'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]'
              : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${trackWidth}px`,
            gap: `${gap}px`,
            transform: `translate3d(${translateX}px, 0, 0)`,
          }}
        >
          {extendedItems.map((item, idx) => {
            const realIndex = canLoop
              ? (((idx - cloneCount) % itemCount) + itemCount) % itemCount
              : idx
            const isActive = canLoop
              ? idx === currentIndex
              : idx >= displayIndex && idx < displayIndex + currentItemsPerView
            return (
              <div
                key={`${item.id ?? realIndex}-${idx}`}
                className={`relative shrink-0 ${slideClassName}`}
                style={{ width: `${slideWidth}px` }}
              >
                {renderItem(item, realIndex, isActive)}
                {dimInactive && !isActive && (
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/22 transition" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {canShowArrows && (
        <>
          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={goPrev}
            className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
            style={{ left: `${peekPx + 6}px` }}
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            onClick={goNext}
            className="absolute top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
            style={{ right: `${peekPx + 6}px` }}
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && dotCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Pilih slide ${i + 1}`}
              onClick={() => goToDot(i)}
              className={`h-2.5 rounded-full transition ${
                i === dotActive
                  ? 'w-4 bg-[#4d6fff]'
                  : 'w-2.5 bg-[#b7b7b7] hover:bg-[#9f9f9f]'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Carousel
