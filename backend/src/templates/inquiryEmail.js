const { getCourseLabel, getLeadSourceLabel } = require('../constants/leadSources')
const { formatPhoneInternational } = require('../utils/phone')

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatSubmittedAt(isoString) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) {
    return isoString || 'Not provided'
  }

  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })
}

function buildInquiryEmail({ lead }) {
  const sourceLabel = getLeadSourceLabel(lead.source)
  const courseLabel = getCourseLabel(lead.course)
  const submittedAt = formatSubmittedAt(lead.submittedAt)

  const rows = [
    ['Form', sourceLabel],
    ['Course', courseLabel],
    ['Name', lead.name],
    ['Phone', formatPhoneInternational(lead.phone)],
    ['Email', lead.email || 'Not provided'],
    ['Experience', lead.experience],
    ['Submitted at', submittedAt],
    ['Page URL', lead.pageUrl || 'Not provided'],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;width:180px;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join('')

  const subject = `New Inquiry: ${sourceLabel} — ${lead.name} (${courseLabel})`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;">
          <tr>
            <td>
              <div style="background:#111827;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ff6b35;">
                  CloudBlitz Landing Page
                </p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;">New Lead Inquiry</h1>
                <p style="margin:8px 0 0;font-size:14px;color:#d1d5db;">
                  ${escapeHtml(sourceLabel)} · ${escapeHtml(courseLabel)}
                </p>
              </div>
              <div style="background:#ffffff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                  ${tableRows}
                </table>
                <p style="margin:20px 0 0;font-size:12px;color:#6b7280;line-height:1.5;">
                  This email was sent automatically from the CloudBlitz landing page lead form.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  const text = [
    'New Lead Inquiry',
    '================',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Sent automatically from the CloudBlitz landing page.',
  ].join('\n')

  return { subject, html, text }
}

module.exports = {
  buildInquiryEmail,
}
