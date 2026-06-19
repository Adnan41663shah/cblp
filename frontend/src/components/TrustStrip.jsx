import { PLACEMENT_PARTNERS } from '../data/placementPartnersList'
import PartnerLogo from './PartnerLogo'

// Curated, recognizable subset shown directly under the hero so the trust
// signal lands above the fold instead of several screens down. Logos reuse
// the existing placement-partner data (no new claims).
const TRUST_PARTNER_IDS = [
  'google',
  'microsoft',
  'amazon',
  'tcs',
  'infosys',
  'accenture',
]

const trustPartners = TRUST_PARTNER_IDS
  .map((id) => PLACEMENT_PARTNERS.find((partner) => partner.id === id))
  .filter(Boolean)

export default function TrustStrip() {
  return (
    <section className="bg-black w-full border-y border-white/[0.06] overflow-hidden">
      <style>{`
        @keyframes trust-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-trust-marquee {
          animation: trust-marquee 20s linear infinite;
        }
      `}</style>
      <div className="max-w-6xl mx-auto py-8 sm:py-7">
        <p className="text-center text-[#9aa6b6] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase mb-5 sm:mb-6 px-4">
          Our learners get hired at
        </p>

        {/* Mobile Infinite Marquee */}
        <div className="sm:hidden relative flex overflow-hidden w-full -my-4 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent" />
          
          <div className="flex w-max animate-trust-marquee opacity-90 hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-x-10 px-5">
              {trustPartners.map((partner) => (
                <div key={`m1-${partner.id}`} className="flex shrink-0 items-center justify-center">
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-x-10 px-5">
              {trustPartners.map((partner) => (
                <div key={`m2-${partner.id}`} className="flex shrink-0 items-center justify-center">
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-12 lg:gap-x-16 opacity-90 px-6">
          {trustPartners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center transition-transform hover:scale-105 hover:opacity-100">
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
