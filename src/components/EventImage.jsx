import { useState } from "react";

/**
 * Event poster shown at its natural aspect ratio — full width, height follows
 * the image — so it is never cropped and there are no letterbox/fill bars. The
 * parent only needs `overflow-hidden` (and `relative` if it layers overlays on
 * top). Fades in on load.
 */
function EventImage({
  src,
  alt = "",
  imgClassName = "",
  loading = "lazy",
  hoverZoom = false,
  onLoad,
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      className={`block h-auto w-full transition duration-500 ${
        hoverZoom ? "group-hover:scale-[1.02]" : ""
      } ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
    />
  );
}

export default EventImage;
