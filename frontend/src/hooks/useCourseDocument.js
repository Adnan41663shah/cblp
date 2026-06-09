import { useEffect } from 'react'
import { courses } from '../data/courses'

const DEFAULT_TITLE = 'Cloudblitz'
const DEFAULT_FAVICON = '/cloudblitz-logo.webp'
const DEFAULT_FAVICON_TYPE = 'image/webp'

function getOrCreateFaviconLink() {
  let link = document.querySelector("link[rel='icon']")

  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  return link
}

export function useCourseDocument(courseKey) {
  useEffect(() => {
    const course = courses[courseKey]
    const faviconLink = getOrCreateFaviconLink()

    if (course) {
      document.title = course.pageTitle || course.title || DEFAULT_TITLE
      faviconLink.href = course.favicon || DEFAULT_FAVICON
      faviconLink.type = course.faviconType || DEFAULT_FAVICON_TYPE
      return
    }

    document.title = DEFAULT_TITLE
    faviconLink.href = DEFAULT_FAVICON
    faviconLink.type = DEFAULT_FAVICON_TYPE
  }, [courseKey])
}
