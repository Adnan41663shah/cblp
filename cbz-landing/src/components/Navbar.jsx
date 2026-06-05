import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-black w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              {/* Ninja icon */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                <img src="/cloudblitz-logo.webp" alt="Cloudblitz Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
                cloudblitz
              </span>
            </div>
            
          </div>

          {/* CTA button - desktop */}
          <button className="hidden sm:inline-flex items-center px-4 py-2 bg-[#f16a3a] hover:bg-[#d95a2b] text-white font-semibold text-sm rounded-md transition-colors duration-200 cursor-pointer">
            Request callback
          </button>

          {/* Hamburger - mobile */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4">
            <button className="w-full bg-[#f16a3a] hover:bg-[#d95a2b] text-white font-semibold text-sm py-2.5 rounded-md transition-colors duration-200 cursor-pointer">
              Request callback
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
