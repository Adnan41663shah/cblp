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
                className="h-[24px] w-auto max-w-[112px] object-contain object-left sm:h-[38px] sm:max-w-[180px] lg:h-[42px]"
              />
            </Link>

            {/* Mobile: primary consultation CTA — priority 1, proper touch target */}
            <button
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="inline-flex sm:hidden shrink-0 items-center justify-center rounded-[40px] bg-[#ff6b35] px-4 py-3 text-[11px] font-semibold leading-none text-white shadow-[0_6px_18px_rgba(255,107,53,0.32)] transition-colors duration-200 hover:bg-[#e85a28] active:bg-[#d24e20] cursor-pointer whitespace-nowrap"
            >
              Book Free Consult
            </button>

            {/* Desktop: WhatsApp demoted to a quiet secondary, consultation is primary */}
            <div className="hidden sm:flex shrink-0 items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[40px] border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium leading-none text-white/90 transition-colors duration-200 hover:bg-white/[0.08] cursor-pointer whitespace-nowrap no-underline lg:text-sm"
              >
                <img src={whatsappIcon} alt="" className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className="inline-flex shrink-0 items-center justify-center rounded-[40px] bg-[#ff6b35] px-4 py-2 text-xs font-semibold leading-none text-white transition-colors duration-200 hover:bg-[#e85a28] active:bg-[#d24e20] cursor-pointer whitespace-nowrap shadow-[0_8px_24px_rgba(255,107,53,0.28)] lg:text-sm"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isCallbackOpen && (
        <CallbackLeadModal
          courseKey={courseKey}
          source="navbar-consultation"
          onClose={() => setIsCallbackOpen(false)}
        />
      )}
    </>
  )
}
