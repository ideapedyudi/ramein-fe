import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Nuxt-style horizontal page-load bar. Pinned to the very top, it trickles
 * toward ~90% on each route change and snaps to 100% before fading out.
 * Uses scaleX (compositor-only) so it never triggers layout/paint of the page.
 */
function TopProgressBar() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(true);
  const timers = useRef([]);
  const firstRender = useRef(true);

  useEffect(() => {
    // Don't run on the very first paint — only on actual navigations.
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    timers.current.forEach(clearTimeout);
    timers.current = [];

    // Reset to 0 instantly (no animation), then start the trickle next frame.
    setAnimated(false);
    setVisible(true);
    setProgress(0);

    const raf = requestAnimationFrame(() => {
      setAnimated(true);
      setProgress(0.35);
      timers.current.push(setTimeout(() => setProgress(0.7), 120));
      timers.current.push(setTimeout(() => setProgress(0.9), 280));
      timers.current.push(setTimeout(() => setProgress(1), 460));
      timers.current.push(setTimeout(() => setVisible(false), 640));
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 250ms ease 150ms",
      }}
    >
      <div
        className="h-full w-full origin-left bg-accent-400 shadow-[0_0_10px_2px_rgba(243,185,28,0.85)]"
        style={{
          transform: `scaleX(${progress})`,
          transition: animated ? "transform 200ms ease-out" : "none",
        }}
      />
    </div>
  );
}

export default TopProgressBar;
