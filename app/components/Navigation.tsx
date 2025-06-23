'use client'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-12">
          <a href="#home" className="nav-item text-sm uppercase tracking-wider">
            HOME
          </a>
          <a href="#works" className="nav-item text-sm uppercase tracking-wider">
            WORKS
          </a>
          <a href="#about" className="nav-item text-sm uppercase tracking-wider">
            ABOUT
          </a>
          <a href="#contact" className="nav-item text-sm uppercase tracking-wider">
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  )
} 