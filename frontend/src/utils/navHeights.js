function convertToPixels(value) {
  if (!value) return null
  
  if (value.includes('calc')) {
    return null
  }

  const parsed = parseFloat(value)
  if (!Number.isFinite(parsed)) return null

  if (value.includes('rem')) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return parsed * rootFontSize
  }
  if (value.includes('em')) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return parsed * rootFontSize
  }
  return parsed
}

function readNavVar(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const px = convertToPixels(value)
  return px !== null ? px : fallback
}

export function getMainNavHeight() {
  return readNavVar('--main-nav-height', 44)
}

export function getSubNavHeight() {
  return readNavVar('--sub-nav-height', 40)
}

export function getScrollOffset() {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const padding = 0.375 * rootFontSize // 6px
  return readNavVar('--nav-scroll-offset', getMainNavHeight() + getSubNavHeight() + padding)
}

