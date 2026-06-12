import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * Layout for the public site. The Navbar is rendered once here and stays
 * mounted across route changes (only <Outlet/> swaps), so navbar animations
 * like the sliding active-page highlight can transition between pages.
 */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24 md:pb-0">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout
