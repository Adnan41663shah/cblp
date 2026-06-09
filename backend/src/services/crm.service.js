const env = require('../config/env')
const { mapLeadToCrmRequest } = require('../mappers/crmLead.mapper')

class CrmServiceError extends Error {
  constructor(message, { statusCode, crmResponse } = {}) {
    super(message)
    this.name = 'CrmServiceError'
    this.statusCode = statusCode
    this.crmResponse = crmResponse
  }
}

async function submitLeadToCrm(lead) {
  if (!env.hasCrmConfig()) {
    return { skipped: true, reason: 'CRM_API_URL is not configured' }
  }

  const { formType, payload } = mapLeadToCrmRequest(lead)
  const url = `${env.crmApiUrl}/api/website-forms/${formType}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), env.crmRequestTimeoutMs)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))
    const crmMessage = data?.message || response.statusText || 'CRM request failed'

    if (!response.ok) {
      throw new CrmServiceError(crmMessage, {
        statusCode: response.status,
        crmResponse: data,
      })
    }

    if (data?.success === false) {
      throw new CrmServiceError(crmMessage, {
        statusCode: response.status,
        crmResponse: data,
      })
    }

    return {
      skipped: false,
      formType,
      message: crmMessage || 'Inquiry submitted to CRM',
      crmResponse: data,
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new CrmServiceError('CRM request timed out', { statusCode: 504 })
    }

    if (error instanceof CrmServiceError) {
      throw error
    }

    throw new CrmServiceError(error.message || 'Unable to reach CRM API', {
      statusCode: 503,
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function verifyCrmService() {
  const healthUrl = `${env.crmApiUrl}/health`
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), env.healthCheckTimeoutMs)

  try {
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new CrmServiceError(data?.error || data?.message || 'CRM health check failed', {
        statusCode: response.status,
        crmResponse: data,
      })
    }

    return {
      status: 'healthy',
      configured: true,
      message: 'CRM API is reachable',
      url: env.crmApiUrl,
      crmHealth: data,
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new CrmServiceError('CRM health check timed out', { statusCode: 504 })
    }

    if (error instanceof CrmServiceError) {
      throw error
    }

    throw new CrmServiceError(error.message || 'Unable to reach CRM API', {
      statusCode: 503,
    })
  } finally {
    clearTimeout(timeout)
  }
}

module.exports = {
  submitLeadToCrm,
  verifyCrmService,
  CrmServiceError,
}
