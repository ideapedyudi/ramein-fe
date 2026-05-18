function FooterColumn({ title, items }) {
  return (
    <div>
      <h5 className="text-2xl font-semibold text-[#202020]">{title}</h5>
      <ul className="mt-4 space-y-2 text-lg text-[#6f6f6f]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#e8e8e8] bg-white">
      <div className="mx-auto grid w-full max-w-[1480px] gap-10 px-2 py-12 md:grid-cols-4 md:px-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ea387] text-xl font-bold text-white">
              R
            </div>
            <span className="text-4xl font-bold text-[#2ea387]">Ramein</span>
          </div>
          <p className="mt-4 max-w-xs text-lg leading-relaxed text-[#6b6b6b]">
            Platform tiket event terpercaya untuk semua momen seru kamu.
          </p>
        </div>
        <FooterColumn title="Product" items={['Explore Events', 'Create Event', 'Pricing']} />
        <FooterColumn title="Company" items={['About Us', 'Careers', 'Contact']} />
        <FooterColumn
          title="Support"
          items={['Help Center', 'Terms of Service', 'Privacy Policy']}
        />
      </div>
      <div className="border-t border-[#efefef] py-6 text-center text-lg text-[#888]">
        (c) 2026 Ramein. All rights reserved.
      </div>
    </footer>
  )
}

export default SiteFooter
