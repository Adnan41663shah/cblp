import ExperienceRadioGroup from './ExperienceRadioGroup'
import FormStatusMessage from './FormStatusMessage'
import PhoneInputField from './PhoneInputField'

function LeadFormField({
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
          className="flex-1 bg-transparent text-white placeholder-[#64748b] text-sm px-3 py-2.5 outline-none w-full"
        />
      </div>
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  )
}

function LeadFormDisclaimer() {
  return (
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
  )
}

export default function LeadForm({
  idPrefix,
  values,
  errors,
  setField,
  handleSubmit,
  isSubmitting,
  isSuccess,
  submitError,
  submitLabel,
  submittingLabel = 'Submitting...',
  successMessage,
  experienceName,
  submitClassName,
  className = '',
}) {
  return (
    <form className={`flex flex-col gap-3 sm:gap-3.5 ${className}`} onSubmit={handleSubmit} noValidate>
      <LeadFormField
        name={`${idPrefix}-name`}
        label="Name"
        placeholder="Enter name"
        required
        value={values.name}
        onChange={(e) => setField('name', e.target.value)}
        error={errors.name}
      />
      <LeadFormField
        name={`${idPrefix}-email`}
        label="Email"
        type="email"
        placeholder="Enter email (optional)"
        value={values.email}
        onChange={(e) => setField('email', e.target.value)}
        error={errors.email}
      />
      <PhoneInputField
        name={`${idPrefix}-phone`}
        label="Phone Number"
        placeholder="Enter phone number"
        required
        value={values.phone}
        onChange={(phone) => setField('phone', phone)}
        error={errors.phone}
      />

      <ExperienceRadioGroup
        name={experienceName}
        value={values.experience}
        onChange={(option) => setField('experience', option)}
        error={errors.experience}
      />

      <FormStatusMessage
        isSuccess={isSuccess}
        submitError={submitError}
        successMessage={successMessage}
      />

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={submitClassName}
      >
        {isSubmitting ? submittingLabel : isSuccess ? 'Submitted' : submitLabel}
      </button>

      <LeadFormDisclaimer />
    </form>
  )
}
