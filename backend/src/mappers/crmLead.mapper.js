const { getLeadSourceLabel } = require('../constants/leadSources')
const { getCrmCourse, getCrmCourseTitle } = require('../constants/crmCourses')

const CAREER_COUNSELING_SOURCES = new Set([
  'hero-webinar',
  'cta-callback',
  'navbar-callback',
  'placement-webinar',
])

function formatPhoneForCrm(phone) {
  return String(phone || '').trim()
}

function buildLandingContext(lead) {
  const parts = [
    `landingSource: ${getLeadSourceLabel(lead.source)}`,
    `course: ${getCrmCourse(lead.course) || lead.course}`,
  ]

  if (lead.pageUrl) {
    parts.push(`pageUrl: ${lead.pageUrl}`)
  }

  if (lead.submittedAt) {
    parts.push(`submittedAt: ${lead.submittedAt}`)
  }

  return parts.join(' | ')
}

function mapLeadToCrmRequest(lead) {
  const phone = formatPhoneForCrm(lead.phone)
  const crmCourse = getCrmCourse(lead.course)
  const courseTitle = getCrmCourseTitle(lead.course)
  const contextMessage = buildLandingContext(lead)

  if (lead.source === 'curriculum-download') {
    return {
      formType: 'syllabus-download',
      payload: {
        fullName: lead.name,
        phoneNumber: phone,
        courseTitle: crmCourse || courseTitle,
        message: `experienceLevel: ${lead.experience} | ${contextMessage}`,
      },
    }
  }

  if (CAREER_COUNSELING_SOURCES.has(lead.source)) {
    const preferredTime =
      lead.source === 'hero-webinar' || lead.source === 'placement-webinar'
        ? 'Webinar booking'
        : 'Callback requested'

    return {
      formType: 'career-counseling',
      payload: {
        name: lead.name,
        email: lead.email || undefined,
        phone,
        experienceLevel: lead.experience,
        preferredTime,
        course: crmCourse,
        message: contextMessage,
      },
    }
  }

  return {
    formType: 'contact',
    payload: {
      name: lead.name,
      email: lead.email || undefined,
      phone,
      subject: getLeadSourceLabel(lead.source),
      courseInterest: crmCourse || courseTitle,
      message: `experienceLevel: ${lead.experience} | ${contextMessage}`,
    },
  }
}

module.exports = {
  mapLeadToCrmRequest,
  formatPhoneForCrm,
}
