import { useCallback, useEffect, useRef, useState } from 'react'

const CONVERTED_KEY = 'cb_consult_popup_converted'
const INTERVAL_MS = 15000 // 15 seconds

export function useConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const isConvertedRef = useRef(false)

  const open = useCallback(() => {
    if (isConvertedRef.current) return
    // Never stack on top of another modal that already owns the screen.
    if (document.body.style.overflow === 'hidden' && !isOpen) return
    
    setIsOpen(true)
  }, [isOpen])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const markConverted = useCallback(() => {
    isConvertedRef.current = true
    setIsOpen(false)
    try {
      localStorage.setItem(CONVERTED_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      if (localStorage.getItem(CONVERTED_KEY) === '1') {
        isConvertedRef.current = true
        return undefined
      }
    } catch {
      /* ignore */
    }

    let secondsPassed = 0

    const interval = window.setInterval(() => {
      if (isConvertedRef.current) {
        window.clearInterval(interval)
        return
      }

      // If any modal is open (including this one), the app generally sets overflow to hidden.
      // Pause the counter while any modal is open.
      if (document.body.style.overflow === 'hidden') {
        return
      }

      secondsPassed += 1

      if (secondsPassed >= 15) {
        setIsOpen((currentIsOpen) => {
          if (!currentIsOpen && !isConvertedRef.current) {
            secondsPassed = 0 // Reset counter for the next interval
            return true
          }
          return currentIsOpen
        })
      }
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return { isOpen, close, markConverted }
}
