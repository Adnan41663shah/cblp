import { expertSessionsContent } from '../data/expertSessions'
import GlowBullet from './GlowBullet'

const MARQUEE_DURATION_S = 36

function ExpertSessionCard({ expert }) {
  return (
    <article className="expert-session-card flex-shrink-0 w-[220px] sm:w-[248px] lg:w-[264px] rounded-[18px] sm:rounded-[20px] border border-white/[0.08] bg-[#141414] p-3.5 sm:p-4">
      <div className="overflow-hidden rounded-[12px] sm:rounded-[14px] border border-white/[0.14] bg-[#1a1a1a]">
        <img
          src={expert.image}
          alt={`${expert.name} portrait`}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="mt-3.5 sm:mt-4 text-white font-bold text-[15px] sm:text-[16px] leading-snug">
        {expert.name}
      </h3>

      <div className="mt-3 sm:mt-3.5 h-px bg-white/[0.1]" />

      <p className="mt-3 sm:mt-3.5 text-[#8b95a5] text-[11px] sm:text-[12px] leading-relaxed">
        {expert.expertise}
      </p>
    </article>
  )
}

function ExpertHighlightList({ items }) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div key={item}>
          <div className="flex items-center gap-2.5 sm:gap-3 py-3 sm:py-3.5">
            <div className="scale-[0.82] sm:scale-[0.88] origin-left flex-shrink-0">
              <GlowBullet />
            </div>
            <p className="text-white/90 font-medium text-sm sm:text-[14px] leading-snug">{item}</p>
          </div>
          {index < items.length - 1 && <div className="h-px bg-white/[0.08]" />}
        </div>
      ))}
    </div>
  )
}

function BootcampExpertsCard({ content }) {
  return (
    <div className="mt-24 sm:mt-28 lg:mt-32">
      <h2 className="text-white font-semibold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.2] tracking-tight mb-6 sm:mb-8 lg:mb-10">
        {content.title}
      </h2>

      <div className="iit-layered-frame-outer rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] p-1 sm:p-1.5">
        <div className="iit-layered-frame-gap rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] p-0.5 sm:p-1">
          <div className="iit-advantage-glass-card iit-advantage-glass-card--inset relative overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] p-4 sm:p-5 lg:p-6">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 lg:items-center">
              <div className="flex w-full items-center justify-center lg:justify-stretch">
                <div className="relative w-full overflow-hidden rounded-[12px] sm:rounded-[14px] min-h-[206px] sm:min-h-[244px] lg:min-h-[268px]">
                  <img
                    src={content.image}
                    alt={content.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-center">
                <h3 className="text-white font-bold text-base sm:text-[17px] lg:text-[19px] leading-snug mb-3 sm:mb-4">
                  {content.cardHeading}
                </h3>
                <ExpertHighlightList items={content.highlights} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExpertSessions() {
  const { eyebrow, title, experts, bootcamp } = expertSessionsContent
  const marqueeExperts = [...experts, ...experts]

  return (
    <section id="expert-sessions" className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <p className="text-[#8b95a5] text-[10px] sm:text-[14px] font-semibold tracking-[0.14em] uppercase mb-3 sm:mb-4">
        {eyebrow}
      </p>
      <h2 className="text-white font-semibold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.2] tracking-tight mb-6 sm:mb-8 lg:mb-10">
        {title}
      </h2>

      <div className="expert-sessions-marquee relative overflow-hidden sm:-mx-6">
        <div
          className="expert-sessions-track flex w-max items-stretch"
          style={{ '--expert-marquee-duration': `${MARQUEE_DURATION_S}s` }}
        >
          {marqueeExperts.map((expert, index) => (
            <div
              key={`${expert.id}-${index}`}
              className="expert-sessions-marquee-cell flex shrink-0 px-2 sm:px-2.5"
            >
              <ExpertSessionCard expert={expert} />
            </div>
          ))}
        </div>
      </div>

      <BootcampExpertsCard content={bootcamp} />
    </section>
  )
}
