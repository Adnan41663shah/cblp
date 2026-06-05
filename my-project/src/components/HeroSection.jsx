import { useState } from 'react'
import iitLogo from '../assets/iit.webp'
import { PiMicrosoftExcelLogo } from 'react-icons/pi'
import { SiGooglecolab, SiJupyter, SiPython } from 'react-icons/si'
import { TbChartBar, TbDatabase } from 'react-icons/tb'

const toolIconClass = 'w-[18px] h-[18px] flex-shrink-0'

function GlowBullet() {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center mt-1.5"
      style={{ width: 40, height: 40 }}
      aria-hidden="true"
    >
      {/* Soft horizontal bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 52,
          height: 38,
          background:
            'radial-gradient(ellipse 40% 80% at 50% 50%, rgba(130, 160, 230, 0.42) 0%, rgba(80, 110, 190, 0.18) 42%, transparent 72%)',
        }}
      />
      {/* Mid blue sphere */}
      <div
        className="absolute rounded-full"
        style={{
          width: 22,
          height: 22,
          background:
            'radial-gradient(circle at 50% 45%, rgba(90, 140, 200, 0.95) 0%, rgba(55, 95, 155, 0.85) 50%, rgba(40, 72, 125, 0.55) 100%)',
          boxShadow: '0 0 16px 6px rgba(100, 150, 220, 0.38)',
        }}
      />
      {/* Bright center dot */}
      <div
        className="relative rounded-full"
        style={{
          width: 9,
          height: 9,
          background: '#e8f4ff',
          boxShadow: '0 0 8px 3px rgba(220, 240, 255, 0.9)',
        }}
      />
    </div>
  )
}

function ToolBadge({ icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-black rounded-full px-4 py-2">
      {icon}
      <span className="text-white text-sm font-medium">{label}</span>
    </div>
  )
}

function FormInput({ label, type = 'text', placeholder, hasFlag, error, required }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[#cbd5e1] text-xs font-normal">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center bg-[#050a14] border rounded-md overflow-hidden ${
          error ? 'border-red-500' : 'border-white/15'
        }`}
      >
        {hasFlag && (
          <div className="flex items-center pl-3 pr-2 py-2">
            <svg width="20" height="14" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="5" fill="#FF9933" />
              <rect y="5" width="22" height="5" fill="white" />
              <rect y="10" width="22" height="5" fill="#138808" />
              <circle cx="11" cy="7.5" r="2" fill="none" stroke="#000080" strokeWidth="0.8" />
            </svg>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-[#64748b] text-sm px-3 py-2 outline-none w-full"
        />
      </div>
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  )
}

export default function HeroSection() {
  const [experience, setExperience] = useState('')

  const experienceOptions = [
    'Working professional - Technical roles',
    'Working professional - Non technical',
    'College student - Final year',
    'College student - 1st to pre-final year',
    'Others',
  ]

  return (
    <section
      className="w-full min-h-[calc(100vh-5rem)] relative overflow-hidden"
      style={{
        background:
          'linear-gradient(to right, #120828 0%, #1e0d42 15%, #3a1f6a 28%, #1a1535 45%, #101e2e 55%, #1a3a50 72%, #0e2438 88%, #050e18 100%)',
      }}
    >
      {/* Left purple — darker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 42% 65% at 0% 50%, rgba(45, 18, 80, 0.9) 0%, rgba(30, 10, 55, 0.55) 38%, transparent 72%)',
        }}
      />
      {/* Right teal — darker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 42% 65% at 100% 50%, rgba(8, 45, 72, 0.85) 0%, rgba(5, 30, 50, 0.5) 38%, transparent 72%)',
        }}
      />
      {/* Fine colored noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.32] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.85'/%3E%3C/svg%3E\")",
          backgroundSize: '120px 120px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='0.7'/%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 lg:gap-5 items-stretch">

          {/* Left card */}
          <div className="order-2 lg:order-1 bg-white/[0.07] backdrop-blur-lg border border-white/10 rounded-[20px] p-6 sm:p-7 lg:p-8 flex flex-col gap-6 relative overflow-hidden">
            <h1 className="relative z-10 text-white font-semibold text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.3] tracking-tight">
              Data Analytics with GenAI Program by Coding Ninjas Job Bootcamp
            </h1>

            <div className="relative z-10 flex flex-col gap-2 sm:gap-2.5">
              <span className="text-[#b8c4d4] text-[11px] font-bold leading-relaxed">
                In collaboration with
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={iitLogo}
                  alt="IIT(BHU) Varanasi"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                />
                <span className="text-white font-medium text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                  IIT(BHU) Varanasi
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
              <div className="flex items-start gap-3 sm:gap-4">
                <GlowBullet />
                <p className="text-[#e2e8f0] text-[13px] sm:text-sm leading-relaxed pt-2">
                  Designed for professionals to stand out in the data analytics job market
                </p>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <GlowBullet />
                <p className="text-[#e2e8f0] text-[13px] sm:text-sm leading-relaxed pt-2">
                  AI infused curriculum that helps you master over AI 12+ case studies and workflows
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 mt-auto">
              <h3 className="text-white font-semibold text-lg">Master 20+ analytics tools</h3>
              <div className="flex flex-wrap gap-4">
                <ToolBadge icon={<SiGooglecolab className={toolIconClass} style={{ color: '#F9AB00' }} />} label="Colab" />
                <ToolBadge icon={<TbDatabase className={toolIconClass} style={{ color: '#f16a3a' }} />} label="SQL" />
                <ToolBadge icon={<SiJupyter className={toolIconClass} style={{ color: '#F37626' }} />} label="Jupyter" />
                <ToolBadge icon={<TbChartBar className={toolIconClass} style={{ color: '#F2C811' }} />} label="Power BI" />
                <ToolBadge icon={<PiMicrosoftExcelLogo className={toolIconClass} style={{ color: '#217346' }} />} label="Excel" />
                <ToolBadge icon={<SiPython className={toolIconClass} style={{ color: '#3776AB' }} />} label="Python" />
              </div>
            </div>
          </div>

          {/* Right card — form */}
          <div className="order-1 lg:order-2 bg-white/[0.07] backdrop-blur-lg border border-white/10 rounded-[20px] p-6 sm:p-7 lg:p-8">
            <h2 className="text-white text-[15px] sm:text-base font-semibold mb-5 leading-snug">
              Book a <span className="text-[#ff6b35]">free live webinar</span> to know more
            </h2>

            <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
              <FormInput label="Name" placeholder="Enter name" required error="Name is required" />

              <FormInput label="Email" type="email" placeholder="Email" />

              <FormInput label="Phone Number" type="tel" placeholder="Phone number" hasFlag />

              <div className="flex flex-col gap-2">
                <label className="text-[#cbd5e1] text-xs">
                  Experience<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-1.5">
                  {experienceOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={opt}
                        checked={experience === opt}
                        onChange={() => setExperience(opt)}
                        className="w-3.5 h-3.5 appearance-none rounded-full border border-white/50 bg-transparent checked:border-white flex-shrink-0 cursor-pointer"
                      />
                      <span className="text-white text-[11px] sm:text-xs leading-tight">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full bg-[#ff6b35] hover:bg-[#e85a28] text-white font-bold text-sm py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Register for ₹499 FREE
              </button>

              <p className="text-[#64748b] text-[9px] sm:text-[10px] leading-relaxed text-center">
                I authorize Coding Ninjas to contact me with course updates &amp; offers via
                Email/SMS/WhatsApp/Call. Please read and agree to{' '}
                <span className="underline cursor-pointer hover:text-[#94a3b8]">Privacy Policy</span>
                {' '}&amp;{' '}
                <span className="underline cursor-pointer hover:text-[#94a3b8]">Terms of use</span>.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
