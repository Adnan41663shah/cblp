import { TbTrendingUp, TbUser, TbBolt, TbStar } from 'react-icons/tb'
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

  const highlightText = (text) => {
    if (text.includes('made the difference.')) {
      const parts = text.split('made the difference.')
      return (
        <>
          {parts[0]}
          <span className="text-[#ff6b35]">made the difference.</span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <div
      ref={ref}
      className={`relative rounded-[20px] border border-[#2a2a2a] bg-[#141414] overflow-hidden p-5 sm:p-6 lg:p-8 reveal ${
        inView ? 'reveal--in' : ''
      }`}
    >
      {/* Right Edge Glow */}
      <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#ff8a5c]/0 via-[#ff6b35] to-[#ff8a5c]/0 shadow-[-10px_0_40px_10px_rgba(255,107,53,0.3)]"></div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* Left Column */}
        <div className="relative flex flex-col flex-shrink-0 w-full lg:w-auto z-10">
          
          {/* Dotted Background */}
          <div 
            className="absolute -inset-x-8 -top-8 bottom-12 z-[-1] opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ff6b35 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
            }}
          />

          <div className="flex flex-row items-center gap-4 sm:gap-5 mb-5">
            {/* Profile Image with Gradient Background */}
            <div className="flex-shrink-0 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-[20px] bg-gradient-to-tr from-[#ff6b35] to-[#ffba7a] p-[2px]">
              <img
                src={alum.image}
                alt={alum.name}
                className="w-full h-full object-cover rounded-[18px] bg-[#1a1a1a]"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-white font-bold text-[16px] sm:text-lg leading-tight mb-1.5">{alum.name}</h3>
              <p className="text-[#8b95a5] text-[12px] sm:text-[13px] leading-snug">
                {alum.role.split(' at ').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <>
                        {' at '}
                        <br />
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="w-8 h-[2px] bg-[#ff6b35] mb-5"></div>

          {/* Salary Box */}
          <div className="rounded-xl p-3 flex items-center gap-3 max-w-xs">
            <span className="text-3xl font-extrabold text-[#ff6b35]">
              {alum.package}
            </span>
            <div className="flex flex-col">
              <span className="text-[#e2e8f0] text-[13px] font-medium leading-tight">2023 batch</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center flex-1">
          {/* Quote Text */}
          <div className="mb-6 lg:mb-8">
            <p className="text-[#e2e8f0] text-lg sm:text-xl lg:text-[20px] font-normal leading-relaxed lg:leading-[1.6]">
              &ldquo;{highlightText(alum.text)}&rdquo;
            </p>
          </div>

          <div className="hidden sm:block h-[1px] bg-white/[0.08] mb-5 lg:mb-6"></div>

          {/* Features */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#ff6b35]/30 flex items-center justify-center flex-shrink-0">
                <TbUser className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <p className="text-[#e2e8f0] font-semibold text-[12px]">Career Transition</p>
                <p className="text-[#8b95a5] text-[11px] mt-0.5">Achieved</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#ff6b35]/30 flex items-center justify-center flex-shrink-0">
                <TbBolt className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <p className="text-[#e2e8f0] font-semibold text-[12px]">Hands-on Learning</p>
                <p className="text-[#8b95a5] text-[11px] mt-0.5">Live Labs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#ff6b35]/30 flex items-center justify-center flex-shrink-0">
                <TbStar className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <p className="text-[#e2e8f0] font-semibold text-[12px]">Expert Mentorship</p>
                <p className="text-[#8b95a5] text-[11px] mt-0.5">Personalized Support</p>
              </div>
            </div>
          </div>
        </div>

      </div>
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
        The full spread of where our alumni landed real roles, real companies, real CTCs.
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
