import { useState } from 'react'
import { placementPartnersContent } from '../data/placementPartners'
import {
  PLACEMENT_PARTNER_ROW_ONE,
  PLACEMENT_PARTNER_ROW_TWO,
} from '../data/placementPartnersList'
import PartnerLogo from './PartnerLogo'
import WebinarLeadModal from './WebinarLeadModal'

const MARQUEE_DURATION_S = 42

function PartnerMarqueeCell({ partner }) {
  return (
    <div className="placement-marquee-cell relative flex shrink-0 items-center justify-center px-8 sm:px-10 md:px-12 lg:px-14">
      <div className="placement-partner-card group relative flex items-center justify-center cursor-default">
        <span
          className="placement-partner-card__name pointer-events-none absolute left-1/2 text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-tight text-white text-center leading-tight whitespace-nowrap"
          style={
            partner.color
              ? { textShadow: `0 0 14px ${partner.color}55` }
              : undefined
          }
        >
          {partner.displayName}
        </span>
        <PartnerLogo partner={partner} />
      </div>
    </div>
  )
}

function PlacementMarqueeRow({ partners, direction = 'left', showRowDivider = false }) {
  const marqueePartners = [...partners, ...partners]

  return (
    <div
      className={`placement-marquee-row relative overflow-hidden py-8 sm:py-10 lg:py-12 ${showRowDivider ? 'border-b border-white/10' : ''
        }`}
    >
      <div
        className={`placement-marquee-track placement-marquee-track--${direction} flex w-max items-center`}
        style={{ '--placement-marquee-duration': `${MARQUEE_DURATION_S}s` }}
      >
        {marqueePartners.map((partner, index) => (
          <PartnerMarqueeCell key={`${partner.id}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  )
}

function PartnerLogoMarquee() {
  return (
    <div className="placement-marquee relative -mx-4 sm:-mx-6 overflow-hidden">
      <PlacementMarqueeRow
        partners={PLACEMENT_PARTNER_ROW_ONE}
        direction="left"
        showRowDivider
      />
      <PlacementMarqueeRow partners={PLACEMENT_PARTNER_ROW_TWO} direction="right" />
    </div>
  )
}

function FeatureList({ features }) {
  return (
    <div className="flex flex-col justify-center w-full lg:max-w-[92%]">
      {features.map((feature, index) => (
        <div key={feature.title}>
          <div className="py-7 sm:py-8 lg:py-9">
            <h3 className="text-white font-semibold text-[16px] sm:text-[19px] lg:text-[22px] leading-snug tracking-tight">
              {feature.title}
            </h3>
            <p className="text-[#8b95a5] text-[14px] sm:text-[15px] lg:text-[16px] mt-2 sm:mt-2.5 leading-relaxed">
              {feature.description}
            </p>
          </div>
          {index < features.length - 1 && <div className="h-px w-full bg-white/[0.1]" />}
        </div>
      ))}
    </div>
  )
}

function PlacementPreviewCard({ previewImage }) {
  return (
    <div className="placement-preview-card relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/[0.1] aspect-[4/3.1] sm:aspect-[5/3.8] lg:aspect-auto lg:min-h-[340px] xl:min-h-[380px]">
      <div className="placement-preview-card__glow absolute inset-0 pointer-events-none" aria-hidden="true" />
      <img
        src={previewImage.src}
        alt={previewImage.alt}
        className="absolute inset-0 z-10 w-full h-full object-cover object-center scale-[1.28] sm:scale-[1.32] lg:scale-[1.35]"
        loading="lazy"
      />
    </div>
  )
}

export default function PlacementPartners({ courseKey = 'data-science' }) {
  const content = placementPartnersContent[courseKey] ?? placementPartnersContent['data-science']
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false)

  return (
    <section id="placements" className="relative scroll-mt-[var(--nav-scroll-offset)] bg-black pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <h2 className="text-white font-semibold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.2] tracking-tight mb-6 sm:mb-8 lg:mb-10">
        <span className="block">{content.heading.line1}</span>
        <span className="block">{content.heading.line2}</span>
      </h2>

      <PartnerLogoMarquee />

      <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 lg:items-center">
        <FeatureList features={content.features} />
        <PlacementPreviewCard previewImage={content.previewImage} />
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-14 flex justify-center">
        <button
          type="button"
          onClick={() => setIsWebinarModalOpen(true)}
          className="bg-[#ff6b35] hover:bg-[#e85a28] text-white font-bold text-sm sm:text-[15px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          {content.ctaLabel}
        </button>
      </div>

      {isWebinarModalOpen && (
        <WebinarLeadModal
          courseKey={courseKey}
          onClose={() => setIsWebinarModalOpen(false)}
        />
      )}
    </section>
  )
}
