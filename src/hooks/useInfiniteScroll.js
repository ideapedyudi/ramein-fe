import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Progressive (infinite-scroll) windowing over an already-fetched list.
 * Reveals `pageSize` items at a time as a sentinel element scrolls into view,
 * so large result sets render cheaply and load more on demand.
 *
 * @param {Array} items     full list to window over
 * @param {object} options
 * @param {number} options.pageSize  items revealed per batch (default 12)
 * @param {*}      options.resetKey  when this changes (e.g. filters), reset to the first page
 * @returns {{ visible: Array, hasMore: boolean, sentinelRef: object }}
 */
export function useInfiniteScroll(items, { pageSize = 12, resetKey } = {}) {
  const [count, setCount] = useState(pageSize);
  const sentinelRef = useRef(null);

  // Reset to the first page when the source list changes (filters, interests).
  // Adjusting state during render (React's documented previous-state pattern)
  // keeps the windowed slice in sync without an extra effect/render pass.
  const [prevKey, setPrevKey] = useState(resetKey);
  if (prevKey !== resetKey) {
    setPrevKey(resetKey);
    setCount(pageSize);
  }

  const hasMore = count < items.length;
  const visible = useMemo(() => items.slice(0, count), [items, count]);

  useEffect(() => {
    if (!hasMore) return undefined;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => Math.min(c + pageSize, items.length));
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, items.length, pageSize]);

  return { visible, hasMore, sentinelRef };
}
