import { useState } from "react";

/**
 * Event poster image that is never cropped: the full image is shown with
 * `object-contain`, layered over a blurred, zoomed copy of itself that fills
 * the container so there are no empty letterbox bars. Posters come in many
 * aspect ratios, so this keeps every one of them fully visible.
 *
 * The parent element must be positioned (`relative`) and sized (e.g. an
 * `aspect-*` or fixed height) with `overflow-hidden` — this only renders the
 * absolutely-positioned image layers.
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
    <>
      {/* Blurred fill behind the poster to cover the empty space. */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl transition-opacity duration-500"
        style={{ opacity: loaded ? 0.55 : 0 }}
      />
      {/* The full, uncropped poster. */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        className={`absolute inset-0 h-full w-full object-contain transition duration-500 ${
          hoverZoom ? "group-hover:scale-[1.02]" : ""
        } ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </>
  );
}

export default EventImage;
