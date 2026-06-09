function readNavVar(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function getMainNavHeight() {
  return readNavVar('--main-nav-height', 44)
}

export function getSubNavHeight() {
  return readNavVar('--sub-nav-height', 40)
}

export function getScrollOffset() {
  return readNavVar('--nav-scroll-offset', getMainNavHeight() + getSubNavHeight())
}
