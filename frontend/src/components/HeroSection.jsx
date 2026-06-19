import { Fragment, useState } from 'react'
import { TbArrowRight } from 'react-icons/tb'
import iitLogo from '../assets/iit.webp'
import { useInView } from '../hooks/useInView'
import AnimatedStatValue from './AnimatedStatValue'
import BookConsultationCta from './BookConsultationCta'
import CtaButton from './CtaButton'
import CurriculumDownloadModal from './CurriculumDownloadModal'
import HeroJourney from './HeroJourney'
import MobileStickyWebinarCta from './MobileStickyWebinarCta'
import RotatingWord from './RotatingWord'

function toAmount(value) {
  const match = String(value).match(/-?\d+(?:\.\d+)?/)
  return match ? `₹${match[0]}L` : value
}

function buildTrust(course) {
  const stats = course.companyValues.stats
  const find = (re) => stats.find((s) => re.test(s.label) || re.test(s.value))
  const avg = find(/CTC|LPA/i)
  const hike = find(/hike/i)
  const students = find(/student|enrolled/i)

  return {
    avgCtc: avg ? toAmount(avg.value) : '',
    hike: hike ? hike.value.split(' ')[0] : '',
    students: students ? students.value : '',
  }
}

function TrustRow({ trust }) {
  const [ref, inView] = useInView({ threshold: 0.4 })

  const items = [
    { value: trust.students, label: 'Learners trained' },
    { value: trust.avgCtc, label: 'Avg CTC' },
    { value: trust.hike, label: 'Avg salary hike' },
  ].filter((item) => item.value)

  return (
    <div ref={ref} className="flex items-center justify-center gap-5 sm:gap-8 lg:gap-10">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <span className="h-9 w-px bg-white/12" aria-hidden="true" />}
          <div className="flex flex-col items-center text-center">
            <AnimatedStatValue
              value={item.value}
              active={inView}
              className="text-xl font-extrabold leading-none tracking-tight text-white sm:text-2xl"
            />
            <span className="mt-1.5 text-[11px] leading-tight text-[#8b95a5] sm:text-[12px]">
              {item.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default function HeroSection({ course, courseKey = 'data-science' }) {
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)
  const hero = course.hero
  const trust = buildTrust(course)
  const outcomeValue = trust.avgCtc

  return (
    <section id="hero" className="hero2 relative w-full overflow-hidden">
      <div className="hero2__glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero2__grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="hero-card-enter inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-4 backdrop-blur-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <img src={iitLogo} alt="IIT(BHU) Varanasi" className="h-4 w-4 object-contain" />
          </span>
          <span className="text-[12px] font-medium text-[#cbd5e1] sm:text-[13px]">{hero.eyebrow}</span>
        </div>

        <h1 className="hero-card-enter mx-auto mt-6 max-w-4xl text-balance text-[32px] font-bold leading-[1.1] tracking-tight text-white sm:mt-7 sm:text-[48px] lg:text-[62px]">
          {hero.headlineLead}{' '}
          <RotatingWord words={hero.headlineRotators} className="hero2-gradient-text" />
          <br className="hidden sm:block" />{' '}
          {hero.headlineTrail}
        </h1>

        <p className="hero-card-enter mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-[#aab4c2] sm:mt-6 sm:text-[17px]">
          {hero.subhead}
        </p>

        <div className="hero-card-enter hero-card-enter-delay mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
          <BookConsultationCta
            courseKey={courseKey}
            source="hero-consultation"
            label="Book Free Consultation"
            className="w-full sm:w-auto"
          />
          <CtaButton
            type="button"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setIsCurriculumOpen(true)}
          >
            Download Curriculum
            <TbArrowRight className="h-4 w-4" aria-hidden="true" />
          </CtaButton>
        </div>

        <div className="hero-card-enter hero-card-enter-delay mt-9 sm:mt-11">
          <TrustRow trust={trust} />
        </div>

        <HeroJourney outcomeValue={outcomeValue} />
      </div>

      <MobileStickyWebinarCta courseKey={courseKey} />

      {isCurriculumOpen && (
        <CurriculumDownloadModal
          courseKey={courseKey}
          onClose={() => setIsCurriculumOpen(false)}
        />
      )}
    </section>
  )
}
