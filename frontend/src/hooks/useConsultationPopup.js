import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Auto-opening "Career Counsellor" consultation invite.
 *
 * Behavior (premium, non-intrusive lead capture):
 *   • Appears ~7s after load — long enough to perceive value first.
 *   • Only once per session; never again after a dismissal/conversion.
 *   • If the visitor is actively engaged (scrolling/typing/clicking), it waits
 *     for that activity to settle before surfacing, so it never interrupts.
 */

const SESSION_SHOWN_KEY = 'cb_consult_popup_shown' // once per session
const PERSIST_DISMISS_KEY = 'cb_consult_popup_dismissed' // never again after dismiss/convert

const BASE_DELAY_MS = 7000 // default trigger: 7s after page load
const IDLE_REQUIRED_MS = 1400 // hold off until active interaction slows
const POLL_MS = 400

function isBlocked() {
  try {
    return (
      sessionStorage.getItem(SESSION_SHOWN_KEY) === '1' ||
      localStorage.getItem(PERSIST_DISMISS_KEY) === '1'
    )
  } catch {
    return false
  }
}

export function useConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const firedRef = useRef(false)

  const open = useCallback(() => {
    if (firedRef.current || isBlocked()) return
    // Never stack on top of another modal that already owns the screen.
    if (document.body.style.overflow === 'hidden') return

    firedRef.current = true
    setIsOpen(true)
    try {
      sessionStorage.setItem(SESSION_SHOWN_KEY, '1')
    } catch {
      /* storage unavailable — in-memory firedRef still guards re-showing */
    }
  }, [])

  const persistDismiss = useCallback(() => {
    try {
      localStorage.setItem(PERSIST_DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  // Dismissed ("Maybe later" / close / Esc / tap-outside) — respect across sessions.
  const close = useCallback(() => {
    setIsOpen(false)
    persistDismiss()
  }, [persistDismiss])

  // Converted (booked) — never re-invite.
  const markConverted = useCallback(() => {
    persistDismiss()
  }, [persistDismiss])

  useEffect(() => {
    if (isBlocked()) return undefined

    const start = Date.now()
    let lastInteraction = start

    const bump = () => {
      lastInteraction = Date.now()
    }

    // Signals of *active* engagement we don't want to interrupt. mousemove is
    // intentionally excluded (too noisy — it would defer the invite forever).
    const events = ['scroll', 'wheel', 'keydown', 'pointerdown', 'touchstart']
    events.forEach((event) => window.addEventListener(event, bump, { passive: true }))

    const poll = window.setInterval(() => {
      if (firedRef.current) return
      const now = Date.now()
      if (now - start >= BASE_DELAY_MS && now - lastInteraction >= IDLE_REQUIRED_MS) {
        open()
      }
    }, POLL_MS)

    return () => {
      events.forEach((event) => window.removeEventListener(event, bump))
      window.clearInterval(poll)
    }
  }, [open])

  return { isOpen, close, markConverted }
}
