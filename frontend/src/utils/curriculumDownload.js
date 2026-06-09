const CURRICULUM_PDF_BY_COURSE = {
  'data-science': {
    path: '/courses/X-DSAAI.pdf',
    filename: 'X-DSAAI.pdf',
  },
  devops: {
    path: '/courses/CDEC-AI.pdf',
    filename: 'CDEC-AI.pdf',
  },
}

export function getCurriculumPdf(courseKey) {
  return CURRICULUM_PDF_BY_COURSE[courseKey] ?? null
}

export async function downloadCurriculumPdf(courseKey) {
  const pdf = getCurriculumPdf(courseKey)
  if (!pdf) return false

  try {
    const response = await fetch(pdf.path)
    if (!response.ok) {
      throw new Error('Curriculum PDF not found')
    }

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = pdf.filename
    link.rel = 'noopener'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)

    return true
  } catch {
    const fallbackLink = document.createElement('a')
    fallbackLink.href = pdf.path
    fallbackLink.download = pdf.filename
    fallbackLink.rel = 'noopener'
    document.body.appendChild(fallbackLink)
    fallbackLink.click()
    document.body.removeChild(fallbackLink)
    return true
  }
}
