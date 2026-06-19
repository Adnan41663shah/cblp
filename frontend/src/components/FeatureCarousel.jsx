import { useEffect, useRef, useState } from 'react'
import { FaAws } from 'react-icons/fa'
import {
  SiDocker,
  SiGithubactions,
  SiKubernetes,
  SiPython,
  SiTerraform,
} from 'react-icons/si'
import {
  TbActivityHeartbeat,
  TbBrain,
  TbChartBar,
  TbChartDots,
  TbSalad,
  TbUsers,
} from 'react-icons/tb'
import { carouselSectionContent } from '../data/carouselCards'

const iconMap = {
  'health-care-analytics': TbActivityHeartbeat,
  'python-sheets': SiPython,
  'meal-plan-ml': TbSalad,
  'fraud-detection': TbChartDots,
  'churn-prediction': TbUsers,
  'genai-workflows': TbBrain,
  'cicd-pipeline': SiGithubactions,
  'kubernetes-orchestration': SiKubernetes,
  'terraform-iac': SiTerraform,
  'docker-containers': SiDocker,
  'aws-cloud': FaAws,
  'monitoring-sre': TbChartBar,
}

const MS_PER_CARD = 8000

function getWrappedDistance(index, trackOffset, slotWidth, cardCount) {
  const centerSlot = trackOffset / slotWidth
  let distance = index - centerSlot
  const half = cardCount / 2

  while (distance > half) distance -= cardCount
  while (distance < -half) distance += cardCount

  return distance
}

function getCardMotion(distance) {
  const abs = Math.min(Math.abs(distance), 3.5)

  const scale = 0.86 + 0.18 * Math.exp(-abs * abs * 0.55)
  const translateY = 10 * abs + 4 * abs * abs

  const opacity =
    distance < 0
      ? Math.max(0.2, 1 - abs * 0.42)
      : Math.max(0.72, 1 - abs * 0.12)

  const brightness = 0.8 + 0.24 * Math.exp(-abs * 0.9)

  return { scale, opacity, translateY, brightness }
}

function CarouselCard({ card, distance, slotWidth }) {
  const Icon = iconMap[card.id] ?? TbBrain
  const { scale, opacity, translateY, brightness } = getCardMotion(distance)

  if (Math.abs(distance) > 3.5) return null

  return (
    <article
      className="carousel-card-item absolute top-14 sm:top-16 w-[200px] sm:w-[235px] lg:w-[270px]"
      style={{
        left: `calc(50% + ${distance * slotWidth}px)`,
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: Math.round(30 - Math.abs(distance) * 5),
        filter: `brightness(${brightness})`,
        willChange: 'transform, opacity, left',
      }}
      aria-hidden={Math.abs(distance) > 2}
    >
      <div
        className="carousel-glass-card relative overflow-hidden aspect-[4/5.4] rounded-[20px] sm:rounded-[22px] lg:rounded-[24px] origin-center"
        style={{
          transform: `scale(${scale})`,
          willChange: 'transform',
        }}
      >
        <div className="carousel-glass-dots absolute inset-0 pointer-events-none" />

        {card.badge && (
          <span className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-full border border-[#6366f1]/60 text-[8px] sm:text-[9px] text-white/95 bg-black/50 backdrop-blur-sm">
            {card.badge}
          </span>
        )}

        <div className="carousel-glass-glow absolute inset-0 pointer-events-none" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <Icon
            className="carousel-glass-icon w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-[#e4e4e7]"
          />
        </div>
      </div>

      <h3
        className="mt-3 sm:mt-4 text-white font-bold text-sm sm:text-base lg:text-lg text-center leading-snug px-1 w-full max-w-[200px] sm:max-w-[235px] lg:max-w-[270px] mx-auto"
        style={{ opacity: Math.max(0.55, opacity) }}
      >
        {card.title}
      </h3>
      <p
        className="mt-1.5 sm:mt-2 text-[#a1a1aa] text-[11px] sm:text-xs lg:text-sm text-center leading-relaxed px-1 w-full max-w-[200px] sm:max-w-[235px] lg:max-w-[270px] mx-auto"
        style={{ opacity: Math.max(0.45, opacity * 0.95) }}
      >
        {card.description}
      </p>
    </article>
  )
}

function useCarouselDimensions() {
  const [dimensions, setDimensions] = useState({ cardWidth: 200, gap: 72 })

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (width >= 1024) setDimensions({ cardWidth: 270, gap: 104 })
      else if (width >= 640) setDimensions({ cardWidth: 235, gap: 88 })
      else setDimensions({ cardWidth: 200, gap: 72 })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return dimensions
}

export default function FeatureCarousel({ courseKey = 'data-science' }) {
  const content = carouselSectionContent[courseKey] ?? carouselSectionContent['data-science']
  const { heading, cards } = content

  const [trackOffset, setTrackOffset] = useState(0)
  const offsetRef = useRef(0)
  const { cardWidth, gap } = useCarouselDimensions()

  const slotWidth = cardWidth + gap
  const loopWidth = cards.length * slotWidth

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let rafId = 0
    let lastTime = performance.now()

    const animate = (now) => {
      const delta = Math.min(now - lastTime, 32)
      lastTime = now

      const speed = slotWidth / MS_PER_CARD
      offsetRef.current += speed * delta

      if (offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth
      }

      setTrackOffset(offsetRef.current)
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [slotWidth, loopWidth])

  return (
    <div
      id="curriculum"
      className="relative -mx-4 sm:-mx-6 scroll-mt-[var(--nav-scroll-offset)] pt-6 sm:pt-10 pb-16 sm:pb-24"
    >
      <div className="absolute inset-0 pointer-events-none sections-backdrop" aria-hidden="true">
        <div className="sections-grid absolute inset-0" />
        <div className="sections-grid sections-grid--center absolute inset-0" />
        <div className="sections-bottom-corner-overlay absolute inset-0" />
        <div className="sections-top-overlay absolute inset-0" />
        <div className="sections-spotlight absolute inset-0" />
        <div className="sections-noise absolute inset-0" />
      </div>

      <h2 className="relative z-10 text-white font-semibold text-[16px] sm:text-[28px] lg:text-[32px] text-center leading-tight tracking-normal px-4 sm:px-6 pt-10 sm:pt-14 pb-4 lg:pb-8 mb-4 sm:mb-6">
        {heading}
      </h2>

      <div className="relative z-20 overflow-x-hidden overflow-y-visible px-4 sm:px-6">
        <div className="carousel-viewport relative pt-8 sm:pt-10 pb-10 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
          {cards.map((card, index) => {
            const distance = getWrappedDistance(index, trackOffset, slotWidth, cards.length)

            return (
              <CarouselCard
                key={card.id}
                card={card}
                distance={distance}
                slotWidth={slotWidth}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
