import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'
import logoImg from '../assets/logo.webp'
import CloudblitzShineText from './CloudblitzShineText'
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
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8 text-center md:text-left">
          
          {/* Left Side: Logo + Email/Phone */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
              <img
                src={logoImg}
                alt="Cloudblitz"
                className="h-7 sm:h-8 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <div className="text-[13px] sm:text-[14px] text-[#6b7280] flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2">
              <span>
                <span className="text-[#9ca3af]">Email:</span>{' '}
                <a
                  href="mailto:info@cloudblitz.in"
                  className="text-[#c5cdd8] hover:text-[#ff8a5c] transition-colors"
                >
                  info@cloudblitz.in
                </a>
              </span>
              <span>
                <span className="text-[#9ca3af]">Phone:</span>{' '}
                <a
                  href="tel:+919834887259"
                  className="text-[#c5cdd8] hover:text-[#ff8a5c] transition-colors"
                >
                  +91 98348 87259
                </a>
              </span>
            </div>
          </div>

          {/* Right Side: Address */}
          <div className="text-[13px] sm:text-[14px] text-[#6b7280] leading-relaxed max-w-sm md:text-left pt-1">
            <p>
              <span className="text-[#9ca3af]">Address:</span>{' '} <br />
              2nd Floor, Dev heights, Lane Ring Road, above Carat, Pratap Nagar Square, Tatya
              Tope Nagar, Pratap Nagar, Nagpur, Maharashtra 440022
            </p>
          </div>

        </div>

        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#6b7280]">
          <p className="text-center sm:text-left">
            © 2019 - {currentYear} CloudBlitz | Powered by Greamio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 sm:gap-x-6 gap-y-2">
            <a
              href="https://www.instagram.com/cloudblitz.ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#9ca3af] hover:text-[#ff8a5c] transition-colors"
            >
              <FaInstagram className="w-[24px] h-[24px]" />
            </a>
            <a
              href="https://www.linkedin.com/company/cloudblitz/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#9ca3af] hover:text-[#ff8a5c] transition-colors"
            >
              <FaLinkedin className="w-[24px] h-[24px]" />
            </a>
            <a
              href="https://www.facebook.com/search/top?q=cloudblitz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#9ca3af] hover:text-[#ff8a5c] transition-colors"
            >
              <FaFacebook className="w-[24px] h-[24px]" />
            </a>
          </div>
        </div>

        {/* Important Links Section */}
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10">
          <h3 className="text-white font-bold text-[18px] sm:text-[20px] mb-8 sm:mb-10">Important Links</h3>
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:w-[280px] flex-shrink-0">
              <span className="text-white font-bold text-[14px] sm:text-[15px]">For working professionals & students</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {[
                  { name: 'Cloud DevOps Engineering Course with AI', url: 'https://cloudblitz.in/courses/cloud-devops-engineering-ai' },
                  { name: 'Integrated Full Stack with Cloud DevOps Engineering course', url: 'https://cloudblitz.in/courses/integrated-fullstack-cloud-devops-ai' },
                  { name: 'Expert in Data Science and Analytics with AI', url: 'https://cloudblitz.in/courses/expert-data-science-analytics-ai' },
                  { name: 'Expert in Digital Marketing with AI', url: 'https://cloudblitz.in/courses/expert-digital-marketing-ai' },
                  { name: 'Ultimate Cloud Architect: AWS, Azure & GCP Certification Training', url: 'https://cloudblitz.in/courses/ultimate-cloud-architect' },
                  { name: 'Generative AI Engineering Program – LangChain to Agentic AI', url: 'https://cloudblitz.in/courses/generative-ai-engineering-langchain' }
                ].map((link, linkIdx) => (
                  <div key={linkIdx}>
                    <a href={link.url} className="text-[#c5cdd8] text-[11px] sm:text-[13px] underline decoration-white/[0.5] underline-offset-4 hover:decoration-white hover:text-white transition-all inline-block">
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      <CloudblitzShineText />
    </footer>
  )
}
