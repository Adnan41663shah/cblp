import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.webp'
import {
  CAMPUS_BRANCHES,
  DATA_SCIENCE_LINKS,
  DEVOPS_LINKS,
} from '../data/footer'

function FooterLinkColumn({ title, links, hoverClass }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.08em] text-white">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className={`text-[12px] sm:text-[13px] text-[#9ca3af] font-medium leading-snug transition-colors duration-200 ${hoverClass}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CampusItem({ campus }) {
  if (campus.isSoon || !campus.mapsUrl) {
    return (
      <li>
        <span className="flex cursor-default items-start gap-2 opacity-70">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
          <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-snug text-[12px] sm:text-[13px] text-[#9ca3af] font-medium">
            <span>{campus.name}</span>
            <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[8px] font-black leading-none tracking-wide text-amber-400">
              SOON
            </span>
          </span>
        </span>
      </li>
    )
  }

  return (
    <li>
      <a
        href={campus.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${campus.name} location in a new tab`}
        className="group flex cursor-pointer items-start gap-2 transition-colors hover:text-[#ff8a5c]"
      >
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35] transition-transform group-hover:scale-125" />
        <span className="text-[12px] sm:text-[13px] text-[#9ca3af] font-medium leading-snug group-hover:text-[#ff8a5c] transition-colors">
          {campus.name}
        </span>
      </a>
    </li>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/[0.08]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ff6b35]/[0.04] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-[calc(2rem+var(--mobile-sticky-cta-height))] sm:px-6 sm:pb-10 sm:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-8 lg:gap-10 items-start">
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 space-y-4 sm:space-y-5">
            <a
              href="https://cloudblitz.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={logoImg}
                alt="Cloudblitz"
                className="h-7 sm:h-8 w-auto object-contain"
                loading="lazy"
              />
            </a>

            <p className="text-[12px] sm:text-[13px] text-[#9ca3af] leading-relaxed font-medium max-w-md">
              Cloudblitz is a premium professional education platform delivering hands-on, live
              interactive training pathways in Cloud Computing, DevOps Engineering, Data Science, and
              Machine Learning.
            </p>

            <div className="text-[11px] sm:text-[12px] text-[#6b7280] space-y-2 leading-relaxed">
              <p>
                <span className="text-[#9ca3af]">Address:</span>{' '}
                2nd Floor, Dev heights, Lane Ring Road, above Carat, Pratap Nagar Square, Tatya
                Tope Nagar, Pratap Nagar, Nagpur, Maharashtra 440022
              </p>
              <p>
                <span className="text-[#9ca3af]">Email:</span>{' '}
                <a
                  href="mailto:info@cloudblitz.in"
                  className="text-[#c5cdd8] hover:text-[#ff8a5c] transition-colors"
                >
                  info@cloudblitz.in
                </a>
              </p>
              <p>
                <span className="text-[#9ca3af]">Phone:</span>{' '}
                <a
                  href="tel:+919834887259"
                  className="text-[#c5cdd8] hover:text-[#ff8a5c] transition-colors"
                >
                  +91 98348 87259
                </a>
              </p>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <FooterLinkColumn
              title="DevOps Pathway"
              links={DEVOPS_LINKS}
              hoverClass="hover:text-[#ff8a5c]"
            />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <FooterLinkColumn
              title="Data Science Pathway"
              links={DATA_SCIENCE_LINKS}
              hoverClass="hover:text-[#c4b5fd]"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-4 space-y-3 sm:space-y-4 min-w-0">
            <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              Our Campuses
            </h4>
            <ul className="grid grid-cols-2 min-[400px]:grid-cols-2 gap-x-6 gap-y-2.5">
              {CAMPUS_BRANCHES.map((campus) => (
                <CampusItem key={campus.name} campus={campus} />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#6b7280]">
          <p className="text-center sm:text-left">
            © {currentYear} CLOUDBLITZ Academic Networks. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 sm:gap-x-6 gap-y-2">
            <a
              href="https://cloudblitz.in/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff8a5c] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://cloudblitz.in/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff8a5c] transition-colors"
            >
              Privacy Policy
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
