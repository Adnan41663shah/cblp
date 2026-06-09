import { TbSparkles } from 'react-icons/tb'
import { curriculumSectionContent } from '../data/curriculumSection'
import CurriculumDownloadButtons from './CurriculumDownloadButtons'

function SyllabusCard({ label, weeks }) {
  const rows = weeks.flatMap((item) => [
    { type: 'week', text: item.week },
    ...item.topics.map((topic) => ({ type: 'topic', text: topic })),
  ])

  return (
    <div className="syllabus-card relative h-full min-h-[310px] sm:min-h-[330px] lg:min-h-[348px] rounded-[28px] sm:rounded-[30px] flex flex-col overflow-hidden">
      <p className="px-5 sm:px-6 lg:px-7 pt-5 sm:pt-6 pb-4 sm:pb-[18px] text-[#8a8a8a] text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase border-b border-white/[0.08]">
        {label}
      </p>

      <div className="syllabus-card__content relative flex-1 overflow-hidden">
        <div className="max-h-[268px] sm:max-h-[282px] lg:max-h-[290px] overflow-hidden">
          {rows.map((row) => (
            <div
              key={`${row.type}-${row.text}`}
              className={`px-5 sm:px-6 lg:px-7 py-3.5 sm:py-[10px] border-b border-white/[0.08] ${
                row.type === 'week'
                  ? 'text-white font-bold text-sm sm:text-[15px] leading-snug'
                  : 'text-white/70 font-normal text-[12px] sm:text-[13px] leading-relaxed'
              }`}
            >
              {row.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureImageCard({ featureCard }) {
  return (
    <div className="relative h-full min-h-[310px] sm:min-h-[330px] lg:min-h-[348px] rounded-[20px] sm:rounded-[24px] border border-white/[0.08] overflow-hidden">
      <img
        src={featureCard.image}
        alt={featureCard.imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.45) 38%, rgba(0, 0, 0, 0.12) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 sm:px-5 sm:pb-5 sm:pt-12">
        <div className="flex items-start gap-2 sm:gap-2.5">
          <TbSparkles className="w-3 h-3 sm:w-6.5 sm:h-6.5 text-white flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm sm:text-base leading-snug max-w-[220px]">
              {featureCard.title}
            </h3>
            <p className="text-[#a1a1aa] text-[10px] sm:text-[11px] mt-1 leading-relaxed max-w-[210px]">
              {featureCard.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PartnerLogos({ partners }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-12 lg:gap-14">
      {partners.map((partner) => {
        const Icon = partner.icon

        return (
          <div
            key={partner.id}
            className="flex items-center gap-3 sm:gap-3.5 text-white/90"
          >
            <Icon
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0"
              style={{ color: partner.color }}
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base lg:text-[17px] font-medium text-[#d4d4d8]">
              {partner.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function CurriculumSection({ courseKey = 'data-science' }) {
  const content = curriculumSectionContent[courseKey] ?? curriculumSectionContent['data-science']

  return (
    <section id="syllabus" className="relative z-10 -mt-6 sm:-mt-10 lg:-mt-14 pb-12 sm:pb-16 lg:pb-20 bg-black scroll-mt-24">
      <div className="relative">
        <h2 className="text-white font-semibold leading-[1.2] tracking-normal mb-6 sm:mb-8 lg:mb-10 lg:mt-8">
          {content.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          <FeatureImageCard featureCard={content.featureCard} />
          <SyllabusCard label={content.syllabusLabel} weeks={content.weeks} />
        </div>

        <p className="text-white/90 text-[12px] sm:text-[13px] text-center mt-10 sm:mt-12 lg:mt-14 leading-relaxed">
          {content.trustLine}
        </p>

        <div className="mt-5 sm:mt-6 lg:mt-7">
          <PartnerLogos partners={content.partners} />
        </div>

        <CurriculumDownloadButtons className="mt-8 sm:mt-10 lg:mt-12" />
      </div>
    </section>
  )
}
