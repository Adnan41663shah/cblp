const EXPERIENCE_OPTIONS = [
  'Working professional - Technical roles',
  'Working professional - Non technical',
  'College student - Final year',
  'College student - 1st to pre-final year',
  'Others',
]

const { getPhoneValidationError, normalizePhone } = require('../utils/phone')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

function validateLeadPayload(body) {
  const errors = {}

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const experience = String(body.experience || '').trim()
  const source = String(body.source || '').trim()
  const course = String(body.course || '').trim()

  if (!name) {
    errors.name = 'Name is required'
  } else if (name.length < 2) {
    errors.name = 'Enter a valid name'
  }

  const phoneError = phone ? getPhoneValidationError(phone) : 'Phone number is required'
  if (phoneError) {
    errors.phone = phoneError
  }

  if (!experience) {
    errors.experience = 'Please select your experience'
  } else if (!EXPERIENCE_OPTIONS.includes(experience)) {
    errors.experience = 'Invalid experience option'
  }

  if (email && !isValidEmail(email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!source) {
    errors.source = 'Source is required'
  }

  if (!course) {
    errors.course = 'Course is required'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return {
    lead: {
      name,
      email: email || null,
      phone: normalizePhone(phone),
      experience,
      source,
      course,
      submittedAt: body.submittedAt || new Date().toISOString(),
      pageUrl: String(body.pageUrl || '').trim() || null,
    },
  }
}

function validateLead(req, res, next) {
  const result = validateLeadPayload(req.body)

  if (result.errors) {
    return res.status(400).json({
      ok: false,
      message: 'Validation failed',
      errors: result.errors,
    })
  }

  req.lead = result.lead
  return next()
}

module.exports = {
  validateLead,
  validateLeadPayload,
}
