const env = require('../config/env')
const { verifyEmailService } = require('./email.service')
const { verifyCrmService, CrmServiceError } = require('./crm.service')

function checkBackendHealth() {
  return {
    status: 'healthy',
    message: 'Landing page backend is operational',
    uptimeSeconds: Math.round(process.uptime()),
    environment: env.nodeEnv,
  }
}

async function checkEmailHealth() {
  try {
    return await verifyEmailService()
  } catch (error) {
    return {
      status: 'unhealthy',
      configured: env.hasEmailConfig(),
      message: error.message || 'Email service check failed',
    }
  }
}

async function checkCrmHealth() {
  try {
    return await verifyCrmService()
  } catch (error) {
    const crmError = error instanceof CrmServiceError ? error : null

    return {
      status: 'unhealthy',
      configured: env.hasCrmConfig(),
      message: error.message || 'CRM service check failed',
      url: env.crmApiUrl,
      statusCode: crmError?.statusCode || null,
    }
  }
}

async function getHealthReport() {
  const [backend, email, crm] = await Promise.all([
    Promise.resolve(checkBackendHealth()),
    checkEmailHealth(),
    checkCrmHealth(),
  ])

  const services = {
    backend,
    email,
    crm,
  }

  const allHealthy = Object.values(services).every(
    (service) => service.status === 'healthy'
  )

  return {
    status: allHealthy ? 'ok' : 'unhealthy',
    timestamp: new Date().toISOString(),
    service: 'cbz-landing-backend',
    services,
  }
}

module.exports = {
  getHealthReport,
}
