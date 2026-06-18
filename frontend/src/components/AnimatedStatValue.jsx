import { parseStatValue, useCountUp } from '../hooks/useCountUp'

/**
 * Renders a stat string (e.g. "8.2 LPA") with the numeric part counting up
 * when `active` is true. Preserves prefix/suffix and uses tabular numerals so
 * the layout doesn't jitter while the digits change.
 */
export default function AnimatedStatValue({ value, active, duration = 1400, className = '' }) {
  const { prefix, number, suffix, decimals } = parseStatValue(value)
  const animated = useCountUp(number, { active, duration, decimals })

  if (number == null) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {animated}
      {suffix}
    </span>
  )
}
