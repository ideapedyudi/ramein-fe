import { useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function HeroSlideshow({ slides }) {
  const slideCount = slides.length
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(0)
  const viewportRef = useRef(null)

  const extendedSlides = useMemo(() => {
    if (slideCount === 0) return []

    return [slides[slideCount - 1], ...slides, slides[0]]
  }, [slideCount, slides])

  const activeIndex = slideCount === 0 ? 0 : (currentIndex - 1 + slideCount) % slideCount
  const resolvedViewportWidth = viewportWidth || 1200
  const sidePeekRatio = resolvedViewportWidth >= 1024 ? 0.085 : 0.045
  const sidePeekWidth = resolvedViewportWidth * sidePeekRatio
  const slideGap = resolvedViewportWidth >= 1024 ? 16 : 8
  const slideWidth = resolvedViewportWidth - sidePeekWidth * 2
  const slideStep = slideWidth + slideGap
  const trackWidth =
    extendedSlides.length * slideWidth + Math.max(extendedSlides.length - 1, 0) * slideGap
  const translateX = sidePeekWidth - currentIndex * slideStep

  const goToNext = () => {
    if (slideCount < 2) return
    setIsTransitionEnabled(true)
    setCurrentIndex((previousIndex) => previousIndex + 1)
  }

  const goToPrevious = () => {
    if (slideCount < 2) return
    setIsTransitionEnabled(true)
    setCurrentIndex((previousIndex) => previousIndex - 1)
  }

  const goToSlide = (index) => {
    setIsTransitionEnabled(true)
    setCurrentIndex(index + 1)
  }

  useEffect(() => {
    if (slideCount < 2 || isHovered) return undefined

    const timerId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => previousIndex + 1)
    }, 4000)

    return () => window.clearInterval(timerId)
  }, [isHovered, slideCount])

  useEffect(() => {
    if (isTransitionEnabled) return undefined

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isTransitionEnabled])

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return undefined

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (!width) return
      setViewportWidth(width)
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleTransitionEnd = () => {
    if (slideCount < 2) return

    if (currentIndex === 0) {
      setIsTransitionEnabled(false)
      setCurrentIndex(slideCount)
    } else if (currentIndex === slideCount + 1) {
      setIsTransitionEnabled(false)
      setCurrentIndex(1)
    }
  }

  if (slideCount === 0) return null

  return (
    <section
      className="group relative mt-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div
          className={`flex ${
            isTransitionEnabled
              ? 'motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]'
              : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${trackWidth}px`,
            gap: `${slideGap}px`,
            transform: `translate3d(${translateX}px, 0, 0)`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <article
              key={`${slide.id}-${index}`}
              className="h-65 shrink-0 md:h-115"
              style={{ width: `${slideWidth}px` }}
            >
              <div className="relative h-full overflow-hidden rounded-xl">
                <img
                  src={slide.image}
                  alt={slide.title ?? `Banner ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 transition duration-500 ${
                    index === currentIndex ? 'bg-transparent' : 'bg-black/22'
                  }`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Slide sebelumnya"
        onClick={goToPrevious}
        className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
        style={{ left: `${sidePeekWidth + 6}px` }}
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Slide berikutnya"
        onClick={goToNext}
        className="absolute top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-[#3a3a3a] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#f5f5f5] focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
        style={{ right: `${sidePeekWidth + 6}px` }}
      >
        <FiChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Pilih slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition ${
              index === activeIndex ? 'w-4 bg-[#4d6fff]' : 'w-2.5 bg-[#b7b7b7] hover:bg-[#9f9f9f]'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlideshow
