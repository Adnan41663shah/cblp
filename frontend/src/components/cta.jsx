import boyCtaImage from '../assets/boy-cta.webp'
import { useLeadForm } from '../hooks/useLeadForm'
import ExperienceRadioGroup from './ExperienceRadioGroup'
import FormStatusMessage from './FormStatusMessage'
import PhoneInputField from './PhoneInputField'

function CtaFormField({
  label,
  type = 'text',
  placeholder,
  required,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-white text-xs sm:text-[13px] font-normal">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`flex items-center bg-[#0a0a0a] border rounded-lg overflow-hidden ${
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

function CtaVisual() {
  return (
    <div className="flex h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[480px] items-center justify-center">
      <img
        src={boyCtaImage}
        alt="Career counsellor ready to help"
        className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px] xl:max-w-[460px] h-auto object-contain"
        loading="lazy"
      />
    </div>
  )
}

function CtaFormCard({ courseKey }) {
  const { values, errors, setField, handleSubmit, isSubmitting, isSuccess, submitError } = useLeadForm({
    source: 'cta-callback',
    courseKey,
  })

  return (
    <div className="iit-layered-frame-outer rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] p-1 sm:p-1.5 w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[480px]">
      <div className="iit-layered-frame-gap rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] p-0.5 sm:p-1 h-full">
        <div className="iit-advantage-glass-card iit-advantage-glass-card--inset relative overflow-hidden rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] p-4 sm:p-5 lg:p-6 h-full flex flex-col">
          <h2 className="text-white font-semibold text-lg sm:text-xl leading-snug">
            Reach out to our career counsellor for free
          </h2>

          <div className="mt-3 sm:mt-4 h-px bg-white/[0.1]" />

          <form
            className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-3.5 flex-1"
            onSubmit={handleSubmit}
            noValidate
          >
            <CtaFormField
              name="cta-name"
              label="Name"
              placeholder="Enter name"
              required
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              error={errors.name}
            />
            <CtaFormField
              name="cta-email"
              label="Email"
              type="email"
              placeholder="Enter email (optional)"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              error={errors.email}
            />
            <PhoneInputField
              name="cta-phone"
              label="Phone Number"
              placeholder="Enter phone number"
              required
              value={values.phone}
              onChange={(phone) => setField('phone', phone)}
              error={errors.phone}
            />

            <ExperienceRadioGroup
              name="cta-experience"
              value={values.experience}
              onChange={(option) => setField('experience', option)}
              error={errors.experience}
            />

            <FormStatusMessage
              isSuccess={isSuccess}
              submitError={submitError}
              successMessage="Thank you! Our career counsellor will reach out to you soon."
            />

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="mt-auto w-full rounded-lg border border-white bg-transparent hover:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-[15px] py-2.5 sm:py-3 transition-colors duration-200 cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted' : 'Request a callback'}
            </button>

            <p className="text-[#64748b] text-[9px] sm:text-[10px] leading-relaxed">
              I authorise Cloudblitz to contact me with course updates &amp; offers via
              Email/SMS/Whatsapp/Call. I have read and agree to{' '}
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
  )
}

export default function Cta({ courseKey = 'data-science' }) {
  return (
    <section className="relative bg-black pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 lg:items-stretch">
        <div className="order-2 lg:order-1">
          <CtaVisual />
        </div>
        <div className="relative z-10 order-1 bg-black lg:order-2">
          <CtaFormCard courseKey={courseKey} />
        </div>
      </div>
    </section>
  )
}
