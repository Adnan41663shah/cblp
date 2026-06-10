import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.webp'
import whatsappIcon from '../assets/whatsapp-color-svgrepo-com.svg'
import CallbackLeadModal from './CallbackLeadModal'

export default function Navbar({ courseKey = 'data-science' }) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  const message = "Hi! I'm interested in learning more about CloudBlitz courses. Can you help me?"
  const whatsappUrl = `https://wa.me/919834887259?text=${encodeURIComponent(message)}`

  return (
    <>
      <nav className="site-navbar sticky z-50 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-[1104px] rounded-[40px] border border-white/10 bg-black/60 backdrop-blur-lg shadow-2xl transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="site-navbar__inner flex items-center justify-between gap-2 sm:gap-3">
            <Link
              to="https://cloudblitz.in/"
              className="inline-flex min-w-0 shrink items-center transition-opacity duration-200 hover:opacity-90"
              aria-label="Cloudblitz home"
            >
              <img
                src={logoImg}
                alt="Cloudblitz"
                className="h-[30px] w-auto max-w-[150px] object-contain object-left sm:h-[38px] sm:max-w-[180px] lg:h-[42px]"
              />
            </Link>

            {/* Mobile: Request callback button */}
            <button
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="inline-flex sm:hidden shrink-0 items-center justify-center rounded-[40px] bg-[#ff6b35] px-2.5 py-1.5 text-[10px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-[#e85a28] cursor-pointer whitespace-nowrap"
            >
              Request callback
            </button>

            {/* Desktop: WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[40px] bg-[#25D366] px-3.5 py-2 text-xs font-semibold leading-none text-white transition-colors duration-200 hover:bg-[#22c35e] active:bg-[#1fa851] cursor-pointer whitespace-nowrap no-underline shadow-sm lg:text-sm"
            >
              <img src={whatsappIcon} alt="whatsapp" className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              Whatsapp
            </a>
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
