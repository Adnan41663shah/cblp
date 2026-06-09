import { useEffect, useState, useSyncExternalStore } from 'react'
import { iitAdvantagesContent } from '../data/iitAdvantages'
import CurriculumDownloadButtons from './CurriculumDownloadButtons'
import GlowBullet from './GlowBullet'

const SLIDE_INTERVAL_MS = 5000
const SLIDE_DURATION_MS = 900

function subscribeToReducedMotion(onStoreChange) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  )
}

function getSlideOffset(imageIndex, activeIndex, direction) {
  if (imageIndex === activeIndex) return '0%'
  if (direction === 1) {
    return imageIndex > activeIndex ? '100%' : '-100%'
  }
  return imageIndex < activeIndex ? '-100%' : '100%'
}

function CertificateCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion || images.length < 2) return undefined

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev === 0 ? 1 : 0
        setDirection(next > prev ? 1 : -1)
        return next
      })
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [images.length, reduceMotion])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[12px] sm:rounded-[14px] min-h-[206px] sm:min-h-[244px] lg:min-h-[268px]">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          style={{
            transform: `translateX(${getSlideOffset(index, activeIndex, direction)})`,
            transition: reduceMotion
              ? 'none'
              : `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
          loading="lazy"
        />
      ))}

      <div
        className="absolute inset-x-0 bottom-0 h-[64px] sm:h-[72px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.5) 48%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

function HighlightList({ items }) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div key={item}>
          <div className="flex items-center gap-2.5 sm:gap-3 py-3 sm:py-3.5">
            <div className="scale-[0.82] sm:scale-[0.88] origin-left flex-shrink-0">
              <GlowBullet />
            </div>
            <p className="text-white/90 font-medium text-sm sm:text-[14px] leading-snug">
              {item}
            </p>
          </div>
          {index < items.length - 1 && <div className="h-px bg-white/[0.08]" />}
        </div>
      ))}
    </div>
  )
}

export default function IitAdvantages({ courseKey = 'data-science' }) {
  const content = iitAdvantagesContent[courseKey] ?? iitAdvantagesContent['data-science']

  return (
    <section className="relative bg-black pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20">
      <h2 className="text-white font-semibold text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.2] tracking-normal mb-6 sm:mb-8 lg:mb-10">
        {content.title}
      </h2>

      <div className="iit-layered-frame-outer rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] p-1 sm:p-1.5">
        <div className="iit-layered-frame-gap rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] p-0.5 sm:p-1">
          <div className="iit-advantage-glass-card iit-advantage-glass-card--inset relative overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] p-4 sm:p-5 lg:p-6">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 lg:items-center">
              <div className="flex w-full items-center justify-center lg:justify-stretch">
                <CertificateCarousel images={content.carouselImages} />
              </div>

              <div className="flex w-full flex-col justify-center">
                <h3 className="text-white font-bold text-base sm:text-[17px] lg:text-[19px] leading-snug mb-3 sm:mb-4">
                  {content.cardHeading}
                </h3>
                <HighlightList items={content.highlights} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CurriculumDownloadButtons className="mt-10 sm:mt-12 lg:mt-14" />
    </section>
  )
}
