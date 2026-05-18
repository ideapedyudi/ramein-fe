import Navbar from './Navbar'

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />
      {children}
    </div>
  )
}

export default SiteLayout
