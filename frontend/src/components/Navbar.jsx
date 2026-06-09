import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.webp'
import CallbackLeadModal from './CallbackLeadModal'

export default function Navbar({ courseKey = 'data-science' }) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <>
      <nav className="site-navbar sticky top-0 z-50 w-full bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="site-navbar__inner flex items-center justify-between gap-2 sm:gap-3">
            <Link
              to="/"
              className="inline-flex min-w-0 shrink items-center transition-opacity duration-200 hover:opacity-90"
              aria-label="Cloudblitz home"
            >
              <img
                src={logoImg}
                alt="Cloudblitz"
                className="h-6 w-auto max-w-[120px] object-contain object-left sm:h-7 sm:max-w-[140px] lg:h-8"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#ff6b35] px-2.5 py-1.5 text-[10px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-[#e85a28] sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-xs lg:text-sm cursor-pointer whitespace-nowrap"
            >
              Request callback
            </button>
          </div>
        </div>
      </nav>

      {isCallbackOpen && (
        <CallbackLeadModal
          courseKey={courseKey}
          onClose={() => setIsCallbackOpen(false)}
        />
      )}
    </>
  )
}
