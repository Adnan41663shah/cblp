import { EXPERIENCE_OPTIONS } from '../data/experienceOptions'

function ExperienceRadioOption({ name, value, label, checked, onChange, gapClass = 'gap-2' }) {
  return (
    <label className={`flex items-center ${gapClass} cursor-pointer group`}>
      <span className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className="h-3.5 w-3.5 rounded-full border border-white/50 bg-transparent transition-colors duration-150 peer-checked:border-[#ff6b35] peer-focus-visible:ring-2 peer-focus-visible:ring-[#ff6b35]/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0a0a0a] group-hover:border-white/80"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#ff6b35] opacity-0 scale-0 transition-all duration-150 peer-checked:opacity-100 peer-checked:scale-100"
          aria-hidden="true"
        />
      </span>
      <span className="text-white text-[11px] sm:text-xs leading-tight">{label}</span>
    </label>
  )
}

export default function ExperienceRadioGroup({
  name,
  value,
  onChange,
  error,
  labelClassName = 'text-white text-xs sm:text-[13px] font-normal',
  optionGapClass = 'gap-1.5',
  optionLabelGap = 'gap-2.5',
}) {
  return (
    <div className="experience-radio-group flex flex-col gap-2">
      <span className={labelClassName}>
        Experience<span className="text-red-500">*</span>
      </span>
      <div className={`flex flex-col ${optionGapClass}`}>
        {EXPERIENCE_OPTIONS.map((option) => (
          <ExperienceRadioOption
            key={option}
            name={name}
            value={option}
            label={option}
            checked={value === option}
            onChange={() => onChange(option)}
            gapClass={optionLabelGap}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  )
}
