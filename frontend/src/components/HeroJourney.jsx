import { useEffect, useState } from 'react'
import {
  TbBuildingSkyscraper,
  TbCode,
  TbMicrophone,
  TbSchool,
  TbTrendingUp,
  TbUsers,
} from 'react-icons/tb'
import { prefersReducedMotion, useInView } from '../hooks/useInView'

const STAGES = [
  { id: 'learn', label: 'Learn', icon: TbSchool },
  { id: 'build', label: 'Build Projects', icon: TbCode },
  { id: 'mentor', label: 'Mentorship', icon: TbUsers },
  { id: 'interview', label: 'Mock Interviews', icon: TbMicrophone },
  { id: 'placed', label: 'Get Placed', icon: TbBuildingSkyscraper },
  { id: 'grow', label: 'Career Growth', icon: TbTrendingUp },
]

const LAST = STAGES.length - 1
const STEP_MS = 850

/**
 * The CloudBlitz transformation journey — Learn → … → Career Growth.
 * Stages light up in sequence and a progress line fills toward the salary
 * outcome. Motion runs once on scroll-in; static-complete under reduced motion.
 */
export default function HeroJourney({ outcomeValue, outcomeLabel = 'avg CTC after program' }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [active, setActive] = useState(() => (prefersReducedMotion() ? LAST : -1))

  useEffect(() => {
    // Reduced motion is handled by the lazy initial state (starts complete).
    if (!inView || prefersReducedMotion()) return undefined

    let current = -1
    const timer = setInterval(() => {
      current += 1
      setActive(current)
      if (current >= LAST) clearInterval(timer)
    }, STEP_MS)

    return () => clearInterval(timer)
  }, [inView])

  const progress = active < 0 ? 0 : (active / LAST) * 100
  const complete = active >= LAST

  return (
    <div ref={ref} className="hero-journey relative mx-auto mt-12 w-full max-w-5xl sm:mt-16">
      {/* Desktop horizontal */}
      <div className="hidden sm:block">
        <div className="relative px-2">
          <div className="hero-journey__track absolute left-0 right-0 top-[22px] h-[2px]" aria-hidden="true" />
          <div
            className="hero-journey__fill absolute left-0 top-[22px] h-[2px]"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />

          <ol className="relative flex items-start justify-between">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon
              const reached = index <= active
              const isOutcome = index === LAST
              return (
                <li key={stage.id} className="flex flex-1 flex-col items-center text-center">
                  <span
                    className={`hero-journey__node ${reached ? 'hero-journey__node--on' : ''} ${isOutcome && complete ? 'hero-journey__node--outcome' : ''}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`mt-3 text-[12px] font-medium leading-tight transition-colors duration-500 lg:text-[13px] ${reached ? 'text-white' : 'text-white/35'}`}
                  >
                    {stage.label}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>

        <div
          className={`hero-journey__outcome mx-auto mt-7 flex w-fit items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-700 ${complete ? 'opacity-100 translate-y-0' : 'translate-y-2 opacity-0'}`}
        >
          <TbTrendingUp className="h-5 w-5 text-[#ff8a5c]" aria-hidden="true" />
          <span className="text-2xl font-extrabold tracking-tight text-white">{outcomeValue}</span>
          <span className="text-[13px] text-[#9aa6b6]">{outcomeLabel}</span>
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="sm:hidden">
        <ol className="relative flex flex-col gap-0 pl-1">
          <div className="hero-journey__track absolute bottom-6 left-[22px] top-3 w-[2px]" aria-hidden="true" />
          <div
            className="hero-journey__fill absolute left-[22px] top-3 w-[2px]"
            style={{ height: `calc(${progress}% - 1.5rem)` }}
            aria-hidden="true"
          />
          {STAGES.map((stage, index) => {
            const Icon = stage.icon
            const reached = index <= active
            const isOutcome = index === LAST
            return (
              <li key={stage.id} className="relative flex items-center gap-4 py-2.5">
                <span
                  className={`hero-journey__node ${reached ? 'hero-journey__node--on' : ''} ${isOutcome && complete ? 'hero-journey__node--outcome' : ''}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className={`text-[15px] font-medium transition-colors duration-500 ${reached ? 'text-white' : 'text-white/35'}`}
                >
                  {stage.label}
                </span>
              </li>
            )
          })}
        </ol>

        <div
          className={`hero-journey__outcome mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-700 ${complete ? 'opacity-100 translate-y-0' : 'translate-y-2 opacity-0'}`}
        >
          <TbTrendingUp className="h-5 w-5 flex-shrink-0 text-[#ff8a5c]" aria-hidden="true" />
          <span className="text-xl font-extrabold tracking-tight text-white">{outcomeValue}</span>
          <span className="text-[12px] text-[#9aa6b6]">{outcomeLabel}</span>
        </div>
      </div>
    </div>
  )
}
