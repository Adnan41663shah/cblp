import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 639px)'
const HERO_FORM_ID = 'hero-form'

function scrollToHeroForm() {
  document.getElementById(HERO_FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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

  return (
    <div
      className={`mobile-sticky-cta sm:hidden ${visible ? 'mobile-sticky-cta--visible' : ''}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollToHeroForm}
        tabIndex={visible ? 0 : -1}
        className="w-full bg-[#ff6b35] hover:bg-[#e85a28] text-white font-bold text-sm py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
      >
        Book a webinar for FREE
      </button>
    </div>
  )
}
