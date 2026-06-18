import { TbQuote, TbTrendingUp } from 'react-icons/tb'
import { courses } from '../data/courses'
import { REVIEWS } from '../data/testimonials'
import { useInView } from '../hooks/useInView'
import AnimatedStatValue from './AnimatedStatValue'
import BookConsultationCta from './BookConsultationCta'

function toNumber(str) {
  const match = String(str).match(/-?\d+(?:\.\d+)?/)
  return match ? parseFloat(match[0]) : 0
}

const BAR_CLASS = {
  coral: 'salary-row__bar--coral',
  purple: 'salary-row__bar--purple',
  emerald: 'salary-row__bar--emerald',
}

const sortedAlumni = [...REVIEWS].sort((a, b) => toNumber(b.package) - toNumber(a.package))
const featured = sortedAlumni[0]
const maxPackage = toNumber(featured.package)
const domainMax = Math.ceil((maxPackage + 3) / 5) * 5 // headroom so top bar isn't 100%

// Aggregates derived from real data only — never fabricated.
function buildSummary(courseKey) {
  const stats = (courses[courseKey] ?? courses['data-science']).companyValues.stats
  const find = (re) => stats.find((s) => re.test(s.label) || re.test(s.value))

  return {
    highest: `₹${maxPackage}L`,
    avgCtc: `₹${toNumber(find(/CTC|LPA/i)?.value)}L`,
    hike: (find(/hike/i)?.value ?? '').split(' ')[0],
    students: find(/student|enrolled/i)?.value ?? '',
  }
}

function KpiPanel({ summary, topName }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const secondary = [
    { value: summary.avgCtc, label: 'Average CTC' },
    { value: summary.hike, label: 'Average salary hike' },
    { value: summary.students, label: 'Students enrolled' },
  ]

  return (
    <div ref={ref} className="kpi-panel">
      <div className="kpi-panel__grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_2fr]">
        {/* Hero metric — deliberately dominant */}
        <div
          className={`reveal ${inView ? 'reveal--in' : ''} flex flex-col justify-center gap-1 border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r`}
        >
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#ff8a5c]">
            <TbTrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            Highest CTC
          </span>
          <AnimatedStatValue
            value={summary.highest}
            active={inView}
            className="mt-2 text-[44px] font-extrabold leading-none tracking-tight text-white sm:text-[56px] lg:text-[64px]"
          />
          <span className="mt-2 text-[13px] text-[#8b95a5]">
            Achieved by {topName} &amp; other top alumni
          </span>
        </div>

        {/* Supporting metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {secondary.map((stat, index) => (
            <div
              key={stat.label}
              className={`reveal ${inView ? 'reveal--in' : ''} flex flex-col justify-center gap-1 p-6 sm:p-7 ${index < secondary.length - 1 ? 'border-b border-white/[0.08] sm:border-b-0 sm:border-r' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 90}ms` }}
            >
              <AnimatedStatValue
                value={stat.value}
                active={inView}
                className="text-2xl font-bold leading-none tracking-tight text-white sm:text-[30px]"
              />
              <span className="mt-2 text-[12px] leading-snug text-[#8b95a5] sm:text-[13px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturedSpotlight({ alum }) {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`spotlight-panel reveal ${inView ? 'reveal--in' : ''} grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-9 lg:p-10`}
    >
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
        <div className="relative shrink-0">
          <img
            src={alum.image}
            alt={alum.name}
            className="h-16 w-16 rounded-2xl border border-white/15 object-cover sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            loading="lazy"
          />
          <span className="absolute -right-2 -top-2 rounded-full border border-[#ff6b35]/40 bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#ff8a5c]">
            Top outcome
          </span>
        </div>
        <div className="lg:mt-1">
          <p className="text-lg font-bold leading-tight text-white">{alum.name}</p>
          <p className="mt-0.5 text-[13px] text-[#8b95a5]">{alum.role}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <AnimatedStatValue
              value={alum.package}
              active={inView}
              className="text-3xl font-extrabold leading-none tracking-tight text-[#ff8a5c] sm:text-4xl"
            />
            <span className="text-[12px] text-[#8b95a5]">{alum.batch}</span>
          </div>
        </div>
      </div>

      <blockquote className="relative flex items-center">
        <TbQuote className="absolute -left-1 -top-2 h-8 w-8 text-white/[0.08] lg:h-10 lg:w-10" aria-hidden="true" />
        <p className="relative text-[17px] font-medium leading-relaxed text-[#e2e8f0] sm:text-xl lg:text-[22px] lg:leading-relaxed">
          &ldquo;{alum.text}&rdquo;
        </p>
      </blockquote>
    </div>
  )
}

function SalarySpread({ alumni }) {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      {alumni.map((alum, index) => {
        const pkg = toNumber(alum.package)
        const widthPct = Math.max(8, (pkg / domainMax) * 100)

        return (
          <div
            key={alum.id}
            className={`salary-row reveal ${inView ? 'reveal--in' : ''} group flex items-center gap-3 px-2 py-2.5 sm:gap-4 sm:px-3`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <img
              src={alum.image}
              alt={alum.name}
              className="h-9 w-9 flex-shrink-0 rounded-full border border-white/15 object-cover sm:h-10 sm:w-10"
              loading="lazy"
            />

            <div className="flex min-w-0 flex-[1.1] flex-col sm:flex-row sm:items-center sm:gap-3">
              <div className="min-w-0 sm:w-40 sm:flex-shrink-0">
                <p className="truncate text-[13px] font-semibold leading-tight text-white sm:text-sm">
                  {alum.name}
                </p>
                <p className="truncate text-[11px] leading-tight text-[#8b95a5]">{alum.role}</p>
              </div>

              <div className="mt-2 flex-1 sm:mt-0">
                <div className="salary-row__track">
                  <div
                    className={`salary-row__bar ${BAR_CLASS[alum.glowColor]}`}
                    style={{
                      width: `${widthPct}%`,
                      transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                      transitionDelay: `${index * 70 + 120}ms`,
                    }}
                  />
                </div>
              </div>
            </div>

            <AnimatedStatValue
              value={alum.package}
              active={inView}
              className="w-14 flex-shrink-0 text-right text-[15px] font-extrabold tracking-tight text-white sm:w-16 sm:text-lg"
            />
          </div>
        )
      })}
    </div>
  )
}

export default function CareerOutcomes({ courseKey = 'data-science' }) {
  const summary = buildSummary(courseKey)

  return (
    <section
      id="outcomes"
      className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20"
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b95a5] sm:mb-4 sm:text-[14px]">
        Placement Success
      </p>
      <h2 className="mb-2 text-[22px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[28px] lg:text-[32px]">
        Careers, measurably transformed
      </h2>
      <p className="mb-8 max-w-xl text-[13px] leading-relaxed text-[#8b95a5] sm:mb-10 sm:text-[15px]">
        The full spread of where our alumni landed — real roles, real companies, real CTCs.
      </p>

      <KpiPanel summary={summary} topName={featured.name.split(' ')[0]} />

      <div className="mt-6 sm:mt-7">
        <FeaturedSpotlight alum={featured} />
      </div>

      <div className="mt-10 sm:mt-12">
        <div className="mb-4 flex items-baseline justify-between sm:mb-5">
          <h3 className="text-[15px] font-semibold text-white sm:text-[17px]">Where our alumni landed</h3>
          <span className="text-[11px] text-[#6b7280] sm:text-[12px]">CTC after program</span>
        </div>
        <SalarySpread alumni={sortedAlumni} />
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <BookConsultationCta
          courseKey={courseKey}
          source="outcomes-consultation"
          label="Start your transformation"
        />
      </div>
    </section>
  )
}
