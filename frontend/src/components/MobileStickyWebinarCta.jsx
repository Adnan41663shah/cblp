import { useEffect, useState } from 'react'
import whatsappIcon from '../assets/whatsapp-color-svgrepo-com.svg'
import CallbackLeadModal from './CallbackLeadModal'

const MOBILE_QUERY = '(max-width: 639px)'
const HERO_ID = 'hero'

export default function MobileStickyWebinarCta({ courseKey = 'data-science' }) {
  const [visible, setVisible] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  useEffect(() => {
    const heroEl = document.getElementById(HERO_ID)
    if (!heroEl) return undefined

    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    let observer

    const disconnectObserver = () => {
      observer?.disconnect()
      observer = undefined
    }

    const handleIntersection = ([entry]) => {
      setVisible(entry.intersectionRatio < 0.5)
    }

    const setupObserver = () => {
      disconnectObserver()

      if (!mediaQuery.matches) {
        setVisible(false)
        return
      }

      observer = new IntersectionObserver(handleIntersection, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      })
      observer.observe(heroEl)
    }

    setupObserver()
    mediaQuery.addEventListener('change', setupObserver)

    return () => {
      mediaQuery.removeEventListener('change', setupObserver)
      disconnectObserver()
    }
  }, [])

  const message = "Hi! I'm interested in learning more about CloudBlitz courses. Can you help me?"
  const whatsappUrl = `https://wa.me/919834887259?text=${encodeURIComponent(message)}`

  return (
    <>
      <div
        className={`mobile-sticky-cta sm:hidden ${visible ? 'mobile-sticky-cta--visible' : ''}`}
        aria-hidden={!visible}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsCallbackOpen(true)}
            tabIndex={visible ? 0 : -1}
            className="flex-1 cta-base cta-primary text-sm py-3.5"
          >
            Book Free Consultation
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            aria-label="Chat with us on WhatsApp"
            className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] transition-colors duration-200 hover:bg-white/10 no-underline"
          >
            <img src={whatsappIcon} alt="" className="w-6 h-6" />
          </a>
        </div>
      </div>

      {isCallbackOpen && (
        <CallbackLeadModal
          courseKey={courseKey}
          source="mobile-sticky-consultation"
          onClose={() => setIsCallbackOpen(false)}
        />
      )}
    </>
  )
}
