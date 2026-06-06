import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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
  const measureRef = useRef(null)
  const [viewportWidth, setViewportWidth] = useState(0)

  const resolvedViewport = viewportWidth || 1200
  const currentItemsPerView = resolveResponsive(itemsPerView, resolvedViewport)
  const peekPx = typeof peek === 'function' ? peek(resolvedViewport) : peek
  const canLoop = loop && itemCount > currentItemsPerView

  const slideWidth =
    (resolvedViewport - 2 * peekPx - (currentItemsPerView - 1) * gap) /
    Math.max(currentItemsPerView, 1)

  // Reactive options — the React wrapper re-inits Embla when this object changes.
  const emblaOptions = useMemo(
    () => ({
      loop: canLoop,
      align: peekPx > 0 ? 'center' : 'start',
      watchDrag: dragEnabled && itemCount > 1,
      containScroll: peekPx > 0 ? false : 'trimSnaps',
    }),
    [canLoop, peekPx, dragEnabled, itemCount],
  )

  const plugins = useMemo(
    () =>
      autoPlay
        ? [
            Autoplay({
              delay: autoPlayInterval,
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]
        : [],
    [autoPlay, autoPlayInterval],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // Combine Embla's viewport ref with our own node for width measurement.
  const setRefs = useCallback(
    (node) => {
      measureRef.current = node
      emblaRef(node)
    },
    [emblaRef],
  )

  useEffect(() => {
    const node = measureRef.current
    if (!node) return undefined
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setViewportWidth(w)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return undefined
    const sync = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect(emblaApi)
    }
    sync()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', sync)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', sync)
    }
  }, [emblaApi, onSelect])

  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const goToDot = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  if (itemCount === 0) return null

  const canShowArrows = showArrows && itemCount > currentItemsPerView
  const dotCount = scrollSnaps.length

  return (
    <section className={`group relative ${className}`}>
      <div className="overflow-hidden" ref={setRefs}>
        <div className="flex items-start" style={{ gap: `${gap}px` }}>
          {items.map((item, idx) => {
            const isActive =
              peekPx > 0 || currentItemsPerView === 1
                ? idx === selectedIndex
                : idx >= selectedIndex && idx < selectedIndex + currentItemsPerView
            return (
              <div
                key={item.id ?? idx}
                className={`relative shrink-0 ${dragEnabled ? 'select-none' : ''} ${slideClassName}`}
                style={{ flex: `0 0 ${slideWidth}px` }}
              >
                {renderItem(item, idx, isActive)}
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
            disabled={!canLoop && !canPrev}
            className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none disabled:cursor-default disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-40"
            style={{ left: `${peekPx + 6}px` }}
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            onClick={goNext}
            disabled={!canLoop && !canNext}
            className="absolute top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none disabled:cursor-default disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-40"
            style={{ right: `${peekPx + 6}px` }}
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && dotCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Pilih slide ${i + 1}`}
              onClick={() => goToDot(i)}
              className={`h-2.5 rounded-full transition ${
                i === selectedIndex
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
