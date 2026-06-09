const LEAD_SOURCE_LABELS = {
  'hero-webinar': 'Hero — Book Free Webinar',
  'cta-callback': 'CTA — Request Callback',
  'navbar-callback': 'Navbar — Request Callback',
  'placement-webinar': 'Placements — Book Free Webinar',
  'curriculum-download': 'Curriculum Download',
}

const COURSE_LABELS = {
  'data-science': 'Data Science & AI',
  devops: 'Cloud DevOps',
}

function getLeadSourceLabel(source) {
  return LEAD_SOURCE_LABELS[source] || source || 'Unknown'
}

function getCourseLabel(course) {
  return COURSE_LABELS[course] || course || 'Not specified'
}

module.exports = {
  LEAD_SOURCE_LABELS,
  COURSE_LABELS,
  getLeadSourceLabel,
  getCourseLabel,
}
