import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

const INTERVAL_MS = 2200

/**
 * Cycles through role words with a vertical slide/fade. Under reduced motion it
 * shows the first word statically. The accent gradient is applied by the caller.
 */
export default function RotatingWord({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return undefined

    const timer = setInterval(() => {
      setAnimating(true)
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setAnimating(false)
      }, 320)
      return () => clearTimeout(swap)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [words.length])

  return (
    <span className="rotating-word" aria-live="polite">
      <span
        className={`rotating-word__text ${className} ${animating ? 'rotating-word__text--out' : ''}`}
      >
        {words[index]}
      </span>
    </span>
  )
}
