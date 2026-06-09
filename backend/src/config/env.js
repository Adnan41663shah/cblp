require('dotenv').config()

function hasEmailConfig() {
  return Boolean(
    process.env.GMAIL_USER &&
      process.env.GMAIL_APP_PASSWORD &&
      process.env.INQUIRY_RECIPIENT_EMAIL
  )
}

function hasCrmConfig() {
  return Boolean(process.env.CRM_API_URL?.trim())
}

if (!hasEmailConfig() || !hasCrmConfig()) {
  throw new Error(
    'Both inquiry delivery methods are required: CRM_API_URL and Gmail settings (GMAIL_USER, GMAIL_APP_PASSWORD, INQUIRY_RECIPIENT_EMAIL).'
  )
}

const env = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  crmApiUrl: process.env.CRM_API_URL?.trim().replace(/\/$/, '') || null,
  crmRequestTimeoutMs: Number(process.env.CRM_REQUEST_TIMEOUT_MS) || 10000,
  healthCheckTimeoutMs: Number(process.env.HEALTH_CHECK_TIMEOUT_MS) || 5000,
  gmailUser: process.env.GMAIL_USER || null,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD || null,
  inquiryRecipientEmail: process.env.INQUIRY_RECIPIENT_EMAIL || null,
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  hasEmailConfig,
  hasCrmConfig,
}

module.exports = env
