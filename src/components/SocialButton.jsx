function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#dfdfdf] bg-white text-sm font-semibold text-[#2b2b2b] transition hover:bg-[#f7f7f7] md:h-11 md:text-base"
    >
      <span className="text-base leading-none md:text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default SocialButton
