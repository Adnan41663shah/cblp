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
    <section className="bg-black w-full border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
        <p className="text-center text-[#9aa6b6] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase mb-5 sm:mb-6">
          Our learners get hired at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:gap-x-16 opacity-90">
          {trustPartners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center">
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
