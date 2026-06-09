const { sendInquiryEmail } = require('../services/email.service')
const { submitLeadToCrm } = require('../services/crm.service')

function buildDeliveryFailureMessage(emailResult, crmResult) {
  const parts = []

  if (emailResult.status === 'rejected') {
    parts.push(`Email: ${emailResult.reason?.message || 'delivery failed'}`)
  }

  if (crmResult.status === 'rejected') {
    parts.push(`CRM: ${crmResult.reason?.message || 'delivery failed'}`)
  }

  return parts.join(' | ')
}

async function createLead(req, res, next) {
  try {
    const [emailResult, crmResult] = await Promise.allSettled([
      sendInquiryEmail(req.lead),
      submitLeadToCrm(req.lead),
    ])

    const emailSucceeded = emailResult.status === 'fulfilled'
    const crmSucceeded = crmResult.status === 'fulfilled'

    if (!emailSucceeded || !crmSucceeded) {
      const error = new Error(
        buildDeliveryFailureMessage(emailResult, crmResult) ||
          'Failed to deliver inquiry. Please try again shortly.'
      )
      error.statusCode = 500
      error.deliveryResults = {
        email:
          emailResult.status === 'fulfilled'
            ? { ok: true, ...emailResult.value }
            : { ok: false, message: emailResult.reason?.message },
        crm:
          crmResult.status === 'fulfilled'
            ? { ok: true, ...crmResult.value }
            : { ok: false, message: crmResult.reason?.message },
      }
      return next(error)
    }

    return res.status(201).json({
      ok: true,
      message: 'Inquiry submitted successfully',
      delivered: {
        email: true,
        crm: true,
      },
      crmFormType: crmResult.value.formType,
      messageId: emailResult.value.messageId,
    })
  } catch (error) {
    error.statusCode = error.statusCode || 500
    error.message = error.message || 'Failed to process inquiry'
    return next(error)
  }
}

module.exports = {
  createLead,
}
