import { Fragment, useId } from 'react'
import AnimatedStatValue from './AnimatedStatValue'
import CurriculumDownloadButtons from './CurriculumDownloadButtons'
import GlowBullet from './GlowBullet'
import { prefersReducedMotion, useInView } from '../hooks/useInView'

function StatsBar({ stats }) {
  const [ref, inView] = useInView({ threshold: 0.4 })

  return (
    <div className="hidden sm:block bg-black w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center py-3 sm:py-12"
        >
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <div
                  className="hidden sm:block w-px bg-white/20 flex-shrink-0 self-center"
                  style={{ height: '2.25rem' }}
                  aria-hidden="true"
                />
              )}
              <div
                className={`reveal ${inView ? 'reveal--in' : ''} w-1/2 sm:flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-3 py-2.5 sm:py-0`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <AnimatedStatValue
                  value={stat.value}
                  active={inView}
                  className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight tracking-tight"
                />
                <span className="text-white/90 text-[9px] sm:text-[16px] mt-0.5 leading-snug">
                  {stat.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function DemandChart({ chart }) {
  const uid = useId().replace(/:/g, '')
  const [ref, inView] = useInView({ threshold: 0.35 })
  const noMotion = prefersReducedMotion()
  const maxHeight = Math.max(...chart.bars.map((bar) => bar.height))

  const width = 400
  const height = 230
  const padX = 28
  const padTop = 8
  const padBottom = 38
  const chartHeight = height - padTop - padBottom
  const baseline = padTop + chartHeight
  const barWidth = 46
  const slotWidth = (width - padX * 2) / chart.bars.length

  const barMetrics = chart.bars.map((bar, index) => {
    const x = padX + slotWidth * index + (slotWidth - barWidth) / 2
    const h = (bar.height / maxHeight) * chartHeight
    const y = baseline - h

    return { ...bar, x, y, h, cx: x + barWidth / 2 }
  })

  const curvePath = (from, to, lift = 14) => {
    const midX = (from.cx + to.cx) / 2
    const controlY = Math.min(from.y, to.y) - lift

    return [
      `M ${from.x + barWidth} ${baseline}`,
      `L ${from.x + barWidth} ${from.y}`,
      `C ${midX} ${controlY} ${midX} ${controlY} ${to.x} ${to.y}`,
      `L ${to.x} ${baseline}`,
      'Z',
    ].join(' ')
  }

  return (
    <div ref={ref} className="bg-[#121212] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 lg:p-7 h-full flex flex-col">
      <p className="text-[#888888] text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase">
        {chart.label}
      </p>
      <AnimatedStatValue
        value={chart.headline}
        active={inView}
        className="block text-white font-bold text-base sm:text-lg lg:text-xl mt-1.5 mb-5 sm:mb-6"
      />

      <div className="flex-1 min-h-[190px] sm:min-h-[210px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          role="img"
          aria-label={`${chart.headline} bar chart`}
        >
          <defs>
            <linearGradient id={`${uid}-bar-gray`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a8a8a" />
              <stop offset="45%" stopColor="#5a5a5a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-bar-orange`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b2c" />
              <stop offset="40%" stopColor="#e54d1a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-area-gray`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b6b6b" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#4a4a4a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-area-orange`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#e54d1a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </linearGradient>
          </defs>

          {barMetrics.length > 1 && (
            <path
              d={curvePath(barMetrics[0], barMetrics[1], 12)}
              fill={`url(#${uid}-area-gray)`}
              style={{
                opacity: inView ? 1 : 0,
                transition: noMotion ? 'none' : 'opacity 0.8s ease 0.5s',
              }}
            />
          )}
          {barMetrics.length > 2 && (
            <path
              d={curvePath(barMetrics[1], barMetrics[2], 18)}
              fill={`url(#${uid}-area-orange)`}
              style={{
                opacity: inView ? 1 : 0,
                transition: noMotion ? 'none' : 'opacity 0.8s ease 0.65s',
              }}
            />
          )}

          <line
            x1={padX - 4}
            y1={baseline}
            x2={width - padX + 4}
            y2={baseline}
            stroke="#2a2a2a"
            strokeWidth="1"
          />

          {barMetrics.map((bar, index) => (
            <g key={bar.year}>
              <rect
                x={bar.x}
                y={bar.y}
                width={barWidth}
                height={bar.h}
                rx="3"
                ry="3"
                fill={bar.highlight ? `url(#${uid}-bar-orange)` : `url(#${uid}-bar-gray)`}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'bottom',
                  transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                  transition: noMotion
                    ? 'none'
                    : `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 140}ms`,
                }}
              />
              <text
                x={bar.cx}
                y={height - 12}
                textAnchor="middle"
                fill="#888888"
                fontSize="12"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {bar.year}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

export default function CompanyValues({ content }) {
  return (
    <section className="bg-black w-full">
      <StatsBar stats={content.stats} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-14">
        <h2 className="text-white font-semibold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.2] tracking-tight mb-6 sm:mb-8 lg:mb-10">
          {content.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          <div className="flex flex-col">
            {content.points.map((point, index) => (
              <div key={point.title}>
                <div className="flex items-start gap-3 sm:gap-4 py-6 sm:py-7">
                  <GlowBullet />
                  <div className="flex flex-col gap-1.5 pt-1.5">
                    <h3 className="text-white font-bold text-[13.5px] sm:text-lg leading-snug">
                      {point.title}
                    </h3>
                    <p className="text-[#8b95a5] text-[13px] sm:text-[16px] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
                {index < content.points.length - 1 && (
                  <div className="h-px bg-white/[0.08]" />
                )}
              </div>
            ))}
          </div>

          <DemandChart chart={content.chart} />
        </div>

        <CurriculumDownloadButtons className="mt-10 sm:mt-12 lg:mt-14" />
      </div>
    </section>
  )
}
