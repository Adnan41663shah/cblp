const { isPossiblePhoneNumber, parsePhoneNumber } = require('libphonenumber-js')

const MIN_NATIONAL_PHONE_DIGITS = 6
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/

function isValidIndianPhone(nationalNumber) {
  return INDIAN_MOBILE_PATTERN.test(nationalNumber)
}

function normalizePhone(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return ''

  try {
    const parsed = parsePhoneNumber(trimmed)
    return parsed.number
  } catch {
    return trimmed.replace(/\s/g, '')
  }
}

function formatPhoneInternational(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return trimmed

  try {
    const parsed = parsePhoneNumber(trimmed)
    return parsed.formatInternational()
  } catch {
    return trimmed
  }
}

function isValidPhone(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return false

  try {
    const parsed = parsePhoneNumber(trimmed)
    if (!parsed?.nationalNumber) return false

    if (parsed.country === 'IN') {
      return isValidIndianPhone(parsed.nationalNumber)
    }

    return (
      parsed.nationalNumber.length >= MIN_NATIONAL_PHONE_DIGITS &&
      isPossiblePhoneNumber(trimmed)
    )
  } catch {
    return false
  }
}

function getPhoneValidationError(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return 'Phone number is required'

  try {
    const parsed = parsePhoneNumber(trimmed)
    if (!parsed?.nationalNumber) {
      return 'Enter a valid phone number for the selected country'
    }

    if (parsed.country === 'IN') {
      return isValidIndianPhone(parsed.nationalNumber)
        ? ''
        : 'Enter a valid 10-digit Indian phone number'
    }

    return isValidPhone(trimmed) ? '' : 'Enter a valid phone number for the selected country'
  } catch {
    return 'Enter a valid phone number for the selected country'
  }
}

module.exports = {
  normalizePhone,
  formatPhoneInternational,
  isValidPhone,
  getPhoneValidationError,
}
