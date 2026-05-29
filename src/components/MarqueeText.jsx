import { useEffect, useRef, useState } from "react";

/**
 * Single-line text that scrolls (marquee) on hover — but only when the text is
 * actually wider than its container. Sits inside a `.group` (the card link), so
 * it animates when the card is hovered. Overflow is re-measured on resize and
 * on font load via a ResizeObserver on both the container and the text.
 */
function MarqueeText({ text, className = "" }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    const measure = () => {
      const diff = inner.scrollWidth - wrap.clientWidth;
      setOverflow(diff > 1 ? diff : 0);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [text]);

  const isOverflowing = overflow > 0;

  return (
    <span
      ref={wrapRef}
      className={`marquee-wrap block ${className}`}
      data-overflow={isOverflowing ? "true" : undefined}
      title={text}
      style={
        isOverflowing
          ? {
              "--marquee-distance": `-${overflow + 8}px`,
              "--marquee-duration": `${Math.max(overflow / 45, 2.5)}s`,
            }
          : undefined
      }
    >
      <span ref={innerRef} className="marquee-inner">
        {text}
      </span>
    </span>
  );
}

export default MarqueeText;
