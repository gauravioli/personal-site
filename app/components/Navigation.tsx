'use client'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8">
      <div className="flex justify-center md:justify-start items-center">
        <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
          <a href="#home" className="nav-item-glassy text-xs md:text-sm uppercase tracking-wider px-3 py-2 md:px-4 md:py-2">
            HOME
          </a>
          <a href="#contact" className="nav-item-glassy text-xs md:text-sm uppercase tracking-wider px-3 py-2 md:px-4 md:py-2">
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  )
} 