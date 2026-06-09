const nodemailer = require('nodemailer')
const env = require('../config/env')
const { buildInquiryEmail } = require('../templates/inquiryEmail')

let transporter

function getTransporter() {
  if (!env.hasEmailConfig()) {
    throw new Error('Gmail inquiry email is not configured')
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.gmailUser,
        pass: env.gmailAppPassword,
      },
    })
  }

  return transporter
}

async function sendInquiryEmail(lead) {
  if (!env.hasEmailConfig()) {
    return { skipped: true, reason: 'Gmail inquiry email is not configured' }
  }

  const { subject, html, text } = buildInquiryEmail({ lead })

  const info = await getTransporter().sendMail({
    from: {
      name: 'CloudBlitz Landing Page',
      address: env.gmailUser,
    },
    to: env.inquiryRecipientEmail,
    replyTo: lead.email || undefined,
    subject,
    text,
    html,
  })

  return {
    skipped: false,
    messageId: info.messageId,
    accepted: info.accepted,
  }
}

async function verifyEmailService() {
  const transporter = getTransporter()
  await transporter.verify()

  return {
    status: 'healthy',
    configured: true,
    message: 'Gmail SMTP connection verified',
    from: env.gmailUser,
    to: env.inquiryRecipientEmail,
  }
}

module.exports = {
  sendInquiryEmail,
  verifyEmailService,
  getTransporter,
}
