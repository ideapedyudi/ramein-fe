function Container({ children, className = '', as: As = 'div' }) {
  return (
    <As className={`mx-auto w-full max-w-370 px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </As>
  )
}

export default Container
