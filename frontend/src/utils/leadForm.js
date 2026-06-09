import { isPossiblePhoneNumber, parsePhoneNumber } from 'libphonenumber-js'

const MIN_NATIONAL_PHONE_DIGITS = 6
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/

function isValidIndianPhone(nationalNumber) {
  return INDIAN_MOBILE_PATTERN.test(nationalNumber)
}

export function normalizePhone(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return ''

  try {
    const parsed = parsePhoneNumber(trimmed)
    return parsed.number
  } catch {
    return trimmed.replace(/\s/g, '')
  }
}

export function formatPhoneInternational(phone) {
  const trimmed = String(phone || '').trim()
  if (!trimmed) return ''

  try {
    const parsed = parsePhoneNumber(trimmed)
    return parsed.formatInternational()
  } catch {
    return trimmed
  }
}

export function isValidPhone(phone) {
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

export function getPhoneValidationError(phone) {
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

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function validateLeadForm({ name, phone, experience, email }) {
  const errors = {}

  const trimmedName = name.trim()
  if (!trimmedName) {
    errors.name = 'Name is required'
  } else if (trimmedName.length < 2) {
    errors.name = 'Enter a valid name'
  }

  const phoneError = getPhoneValidationError(phone)
  if (phoneError) {
    errors.phone = phoneError
  }

  if (!experience) {
    errors.experience = 'Please select your experience'
  }

  if (email.trim() && !isValidEmail(email)) {
    errors.email = 'Enter a valid email address'
  }

  return errors
}

export async function submitLeadForm(payload) {
  const url = import.meta.env.VITE_LEAD_API_URL || '/api/leads'

  const body = {
    name: payload.name.trim(),
    email: payload.email.trim() || null,
    phone: normalizePhone(payload.phone),
    experience: payload.experience,
    source: payload.source,
    course: payload.course,
    submittedAt: new Date().toISOString(),
    pageUrl: window.location.href,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      (data.errors && Object.values(data.errors)[0]) ||
      'Submission failed'
    throw new Error(message)
  }

  return data
}
