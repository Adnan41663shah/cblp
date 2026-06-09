import { TbSparkles } from 'react-icons/tb'
import iitLogo from '../assets/iit.webp'
import { toolIconClass } from '../data/courses'
import { useLeadForm } from '../hooks/useLeadForm'
import ExperienceRadioGroup from './ExperienceRadioGroup'
import GlowBullet from './GlowBullet'
import MobileStickyWebinarCta from './MobileStickyWebinarCta'
import FormStatusMessage from './FormStatusMessage'
import PhoneInputField from './PhoneInputField'

function HeroStatsCard({ stats }) {
  return (
    <div className="hero-stats-card order-2 lg:hidden hero-card-enter bg-[#121212] border border-white/[0.08] rounded-[20px] px-5 py-1">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={index < stats.length - 1 ? 'border-b border-white/[0.08]' : undefined}
        >
          <div className="flex items-center gap-3.5 py-4">
            <TbSparkles className="w-5 h-5 flex-shrink-0 text-white" aria-hidden="true" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-white font-bold text-base leading-tight">{stat.value}</span>
              <span className="text-[#9ca3af] text-sm leading-snug">{stat.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const HERO_TOOLS_MARQUEE_DURATION_S = 36

function ToolBadge({ icon: Icon, label, color, className = '' }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-black px-4 py-2 transition-transform duration-200 hover:scale-[1.03] ${className}`}
    >
      <Icon className={toolIconClass} style={{ color }} />
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  )
}

function ToolsMarquee({ tools }) {
  const marqueeTools = [...tools, ...tools]

  return (
    <div className="hero-tools-marquee relative -mx-6 overflow-hidden sm:hidden">
      <div
        className="hero-tools-marquee-track flex w-max items-center py-0.5"
        style={{ '--hero-tools-marquee-duration': `${HERO_TOOLS_MARQUEE_DURATION_S}s` }}
      >
        {marqueeTools.map((tool, index) => (
          <div key={`${tool.label}-${index}`} className="hero-tools-marquee-cell shrink-0 px-2">
            <ToolBadge icon={tool.icon} label={tool.label} color={tool.color} />
          </div>
        ))}
      </div>
    </div>
  )
}

function FormInput({
  label,
  type = 'text',
  placeholder,
  error,
  required,
  value,
  onChange,
  name,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-[#cbd5e1] text-xs font-normal">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center bg-[#050a14] border rounded-md overflow-hidden ${
          error ? 'border-red-500' : 'border-white/15'
        }`}
      >
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-[#64748b] text-sm px-3 py-2 outline-none w-full"
        />
      </div>
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  )
}

export default function HeroSection({ course, courseKey = 'data-science' }) {
  const { values, errors, setField, handleSubmit, isSubmitting, isSuccess, submitError } = useLeadForm({
    source: 'hero-webinar',
    courseKey,
  })

  return (
    <section id="hero" className="hero-section w-full relative overflow-hidden">
      <div className="hero-section__glow-left absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="hero-section__glow-right absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="hero-section__noise-primary absolute inset-0 pointer-events-none opacity-[0.32] mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="hero-section__noise-secondary absolute inset-0 pointer-events-none opacity-[0.18]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 lg:gap-5 items-stretch">
          <div className="order-3 lg:order-1 hero-card-enter bg-black sm:bg-white/[0.07] sm:backdrop-blur-lg border border-white/10 rounded-[20px] p-6 sm:p-7 lg:p-8 flex flex-col gap-6 relative overflow-hidden">
            <h1 className="relative z-10 text-white font-semibold text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.25] tracking-tight">
              {course.heading}
            </h1>

            <div className="relative z-10 flex flex-col gap-2 sm:gap-2.5">
              <span className="text-[#b8c4d4] text-[11px] font-bold leading-relaxed">
                In collaboration with
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-1 sm:p-1.5">
                  <img
                    src={iitLogo}
                    alt="IIT(BHU) Varanasi"
                    className="h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
                  />
                </div>
                <span className="text-white font-medium text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                  IIT(BHU) Varanasi
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
              {course.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1.5">
                    <GlowBullet />
                  </div>
                  <p className="text-[#e2e8f0] text-[13px] sm:text-sm leading-relaxed pt-2">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <div id="tools-showcase" className="relative z-10 flex flex-col gap-3 mt-auto scroll-mt-24">
              <h3 className="text-white font-semibold text-base sm:text-lg">{course.toolsHeading}</h3>
              <ToolsMarquee tools={course.tools} />
              <div className="hidden flex-wrap gap-2.5 sm:flex sm:gap-4">
                {course.tools.map((tool) => (
                  <ToolBadge
                    key={tool.label}
                    icon={tool.icon}
                    label={tool.label}
                    color={tool.color}
                  />
                ))}
              </div>
            </div>
          </div>

          <HeroStatsCard stats={course.companyValues.stats} />

          <div
            id="hero-form"
            className="order-1 lg:order-2 hero-card-enter hero-card-enter-delay scroll-mt-20 bg-white/[0.07] backdrop-blur-lg border border-white/10 rounded-[20px] p-6 sm:p-7 lg:p-8"
          >
            <h2 className="text-white text-[15px] sm:text-base font-semibold mb-5 leading-snug">
              Book a <span className="text-[#ff6b35]">free live webinar</span> to know more
            </h2>

            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
              <FormInput
                name="name"
                label="Name"
                placeholder="Enter name"
                required
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                error={errors.name}
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="Email (optional)"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                error={errors.email}
              />

              <PhoneInputField
                name="phone"
                label="Phone Number"
                labelClassName="text-[#cbd5e1] text-xs font-normal"
                placeholder="Phone number"
                variant="hero"
                required
                value={values.phone}
                onChange={(phone) => setField('phone', phone)}
                error={errors.phone}
              />

              <ExperienceRadioGroup
                name="experience"
                value={values.experience}
                onChange={(opt) => setField('experience', opt)}
                error={errors.experience}
                labelClassName="text-[#cbd5e1] text-xs"
                optionLabelGap="gap-2"
              />

              <FormStatusMessage
                isSuccess={isSuccess}
                submitError={submitError}
                successMessage="Thank you! We'll contact you shortly about the webinar."
                className="text-center"
              />

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="mt-1 w-full bg-[#ff6b35] hover:bg-[#e85a28] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted' : 'Register for FREE'}
              </button>

              <p className="text-[#64748b] text-[9px] sm:text-[10px] leading-relaxed text-center">
                I authorize Cloudblitz to contact me with course updates &amp; offers via
                Email/SMS/WhatsApp/Call. Please read and agree to{' '}
                <a
                  href="https://cloudblitz.in/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94a3b8]"
                >
                  Privacy Policy
                </a>
                {' '}&amp;{' '}
                <a
                  href="https://cloudblitz.in/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94a3b8]"
                >
                  Terms of use
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>

      <MobileStickyWebinarCta />
    </section>
  )
}
