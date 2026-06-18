import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './useInView'

/**
 * Splits a stat display string into an animatable number plus its surrounding
 * text, so we can count up the number while preserving labels/units.
 *   "8.2 LPA"        -> { prefix: '',  number: 8.2, suffix: ' LPA',       decimals: 1 }
 *   "128% avg hike"  -> { prefix: '',  number: 128, suffix: '% avg hike', decimals: 0 }
 *   "10K+"           -> { prefix: '',  number: 10,  suffix: 'K+',         decimals: 0 }
 *   "6 months"       -> { prefix: '',  number: 6,   suffix: ' months',    decimals: 0 }
 */
export function parseStatValue(raw) {
  const str = String(raw)
  const match = str.match(/-?\d+(?:\.\d+)?/)

  if (!match) {
    return { prefix: str, number: null, suffix: '', decimals: 0 }
  }

  const numStr = match[0]
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  return {
    prefix: str.slice(0, match.index),
    number: parseFloat(numStr),
    suffix: str.slice(match.index + numStr.length),
    decimals,
  }
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Eased count-up from 0 to `target` when `active` becomes true.
 * Single pass, never loops. Snaps to the final value under reduced motion.
 */
export function useCountUp(target, { active = false, duration = 1400, decimals = 0 } = {}) {
  // Under reduced motion, start (and stay) at the final value — no synchronous
  // setState in the effect; the only update happens inside requestAnimationFrame.
  const [value, setValue] = useState(() =>
    prefersReducedMotion() && target != null ? target : 0,
  )
  const rafRef = useRef(0)

  useEffect(() => {
    if (target == null || prefersReducedMotion() || !active) return undefined

    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * easeOutCubic(progress))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, active, duration])

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
}
