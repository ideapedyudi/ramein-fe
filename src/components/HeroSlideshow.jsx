import Carousel from './Carousel'

const peekFn = (viewportWidth) =>
  viewportWidth >= 1024 ? viewportWidth * 0.085 : viewportWidth * 0.045

function HeroSlideshow({ slides }) {
  return (
    <Carousel
      items={slides}
      itemsPerView={1}
      gap={16}
      peek={peekFn}
      loop
      autoPlay
      autoPlayInterval={4000}
      dimInactive
      className="mt-6"
      renderItem={(slide, index) => (
        <div className="aspect-4838/1459 overflow-hidden rounded-xl">
          <img
            src={slide.image}
            alt={slide.title ?? `Banner ${index + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      )}
    />
  )
}

export default HeroSlideshow
