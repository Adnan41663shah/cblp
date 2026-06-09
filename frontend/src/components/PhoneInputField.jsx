import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

const PREFERRED_COUNTRIES = ['in', 'us', 'gb', 'ae', 'ca', 'au', 'sg', 'de']

export default function PhoneInputField({
  name,
  label,
  labelClassName = 'text-white text-xs sm:text-[13px] font-normal',
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Enter phone number',
  variant = 'default',
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`phone-input-field phone-input-field--${variant} ${
          error ? 'phone-input-field--error' : ''
        }`}
      >
        <PhoneInput
          name={name}
          id={name}
          defaultCountry="in"
          preferredCountries={PREFERRED_COUNTRIES}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          forceDialCode
          className="phone-input-field__container"
          inputClassName="phone-input-field__input"
          countrySelectorStyleProps={{
            buttonClassName: 'phone-input-field__selector',
            dropdownStyleProps: {
              className: 'phone-input-field__dropdown',
              listItemClassName: 'phone-input-field__dropdown-item',
              listItemCountryNameClassName: 'phone-input-field__dropdown-country',
              listItemDialCodeClassName: 'phone-input-field__dropdown-dial',
              preferredListDividerClassName: 'phone-input-field__dropdown-divider',
            },
          }}
          inputProps={{
            id: name,
            name,
            required,
            autoComplete: 'tel',
            'aria-invalid': Boolean(error),
            'aria-describedby': error ? `${name}-error` : undefined,
          }}
        />
      </div>

      {error && (
        <p id={`${name}-error`} className="text-red-500 text-[11px]">
          {error}
        </p>
      )}
    </div>
  )
}
