const LANDING_COURSE_TO_CRM = {
  'data-science': 'X-DSAAI',
  devops: 'CDEC',
}

const LANDING_COURSE_TITLES = {
  'data-science': 'Data Science & AI (X-DSAAI)',
  devops: 'Cloud DevOps Engineering (CDEC)',
}

function getCrmCourse(courseKey) {
  return LANDING_COURSE_TO_CRM[courseKey] || undefined
}

function getCrmCourseTitle(courseKey) {
  return LANDING_COURSE_TITLES[courseKey] || courseKey
}

module.exports = {
  LANDING_COURSE_TO_CRM,
  LANDING_COURSE_TITLES,
  getCrmCourse,
  getCrmCourseTitle,
}
