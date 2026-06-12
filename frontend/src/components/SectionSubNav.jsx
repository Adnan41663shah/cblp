import { useCallback, useEffect, useRef, useState } from 'react'
import { getMainNavHeight, getScrollOffset } from '../utils/navHeights'

// Order matches section layout in SectionsWrapper (navigable sections only)
const navItems = [
  { id: 'curriculum', label: 'Curriculum', targetId: 'curriculum' },
  { id: 'placements', label: 'Placements', targetId: 'placements' },
  { id: 'expert-sessions', label: 'Expert Sessions', targetId: 'expert-sessions' },
  { id: 'testimonials', label: 'Testimonials', targetId: 'testimonials' },
  { id: 'faqs', label: 'FAQs', targetId: 'faqs' },
]

export default function SectionSubNav() {
  const sentinelRef = useRef(null)
  const [isStuck, setIsStuck] = useState(false)
  const [activeId, setActiveId] = useState(navItems[0].id)

  const scrollToSection = useCallback((targetId, sectionId) => {
    const el = document.getElementById(targetId)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset()
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    setActiveId(sectionId)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return undefined

    let observer

    const createObserver = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => setIsStuck(!entry.isIntersecting),
        {
          threshold: 0,
          rootMargin: `-${getMainNavHeight()}px 0px 0px 0px`,
        },
      )
      observer.observe(sentinel)
    }

    createObserver()
    window.addEventListener('resize', createObserver)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', createObserver)
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const activationLine = getScrollOffset() + 120
      let nextActive = navItems[0].id

      // Walk page order bottom-up so the deepest reached section wins
      for (let i = navItems.length - 1; i >= 0; i -= 1) {
        const item = navItems[i]
        const el = document.getElementById(item.targetId)
        if (!el) continue

        if (el.getBoundingClientRect().top <= activationLine) {
          nextActive = item.id
          break
        }
      }

      setActiveId(nextActive)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="subnav-sentinel h-px w-full" aria-hidden="true" />

      <div className="subnav-sticky sticky z-40 w-full">
        <div
          className={`subnav-sticky__surface transition-[background-color,box-shadow,border-color] duration-200 ${
            isStuck
              ? 'border-b border-white/[0.08] bg-black/95 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav
              className="w-full overflow-x-auto scrollbar-none"
              aria-label="Course sections"
            >
              <ul className="mx-auto flex min-w-max items-center justify-start gap-4 px-1 py-2 sm:min-w-0 sm:justify-center sm:gap-6 sm:px-0 sm:py-2.5 lg:gap-8 lg:py-3">
                {navItems.map((item) => {
                  const isActive = activeId === item.id

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.targetId, item.id)}
                        className={`relative cursor-pointer whitespace-nowrap pb-1 text-[11px] font-medium transition-colors duration-200 sm:pb-1.5 sm:text-[13px] lg:text-[16px] ${
                          isActive
                            ? 'font-semibold text-white'
                            : 'text-[#8a8a8a] hover:text-[#b0b0b0]'
                        }`}
                        style={
                          isActive
                            ? { textShadow: '0 0 14px rgba(255, 255, 255, 0.45)' }
                            : undefined
                        }
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute -bottom-0 left-0 right-0 h-[2px] rounded-full bg-white" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
