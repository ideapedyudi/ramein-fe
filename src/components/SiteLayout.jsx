/**
 * Passthrough wrapper kept for backwards-compatibility. The page chrome
 * (background + Navbar) now lives in PublicLayout, which stays mounted across
 * navigations so navbar animations can run. Pages can keep wrapping their
 * content in <SiteLayout> without rendering a second navbar.
 */
function SiteLayout({ children }) {
  return <>{children}</>
}

export default SiteLayout
