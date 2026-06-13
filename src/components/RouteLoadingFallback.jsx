function RouteLoadingFallback({ message = "Memuat halaman..." }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f1] px-4 text-[#1f2937]">
      <div className="flex flex-col items-center rounded-3xl border border-white/70 bg-white/90 px-8 py-7 text-center shadow-[0_12px_40px_rgba(15,118,110,0.12)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[rgba(50,160,140,0.2)] border-t-[rgb(50,160,140)]" />
        <p className="mt-4 text-sm font-semibold text-[rgb(50,160,140)]">
          {message}
        </p>
      </div>
    </main>
  )
}

export default RouteLoadingFallback
