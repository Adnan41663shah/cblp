import { useEffect, useState } from 'react'
import whatsappIcon from '../assets/whatsapp-color-svgrepo-com.svg'

const MOBILE_QUERY = '(max-width: 639px)'
const HERO_FORM_ID = 'hero-form'

export default function MobileStickyWebinarCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const formEl = document.getElementById(HERO_FORM_ID)
    if (!formEl) return undefined

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
      observer.observe(formEl)
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
    <div
      className={`mobile-sticky-cta sm:hidden ${visible ? 'mobile-sticky-cta--visible' : ''}`}
      aria-hidden={!visible}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c35e] active:bg-[#1fa851] text-white font-bold text-sm py-3.5 rounded-xl transition-colors duration-200 cursor-pointer shadow-lg no-underline"
      >
        <img src={whatsappIcon} alt="" className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  )
}
