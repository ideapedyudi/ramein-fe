/** Placeholder that mirrors the EventListCard layout while data loads. */
function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ececec] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="skeleton aspect-video w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="mt-1 flex items-center gap-2 border-t border-[#f0f0f0] pt-2">
          <div className="skeleton h-5 w-5 shrink-0 rounded-full" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
}

export default EventCardSkeleton;
