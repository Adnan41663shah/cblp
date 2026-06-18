import { useState } from 'react'
import CallbackLeadModal from './CallbackLeadModal'
import CtaButton from './CtaButton'

/**
 * The page's primary conversion action: "Book Free Consultation".
 * Opens the existing CallbackLeadModal (tracked lead) so every primary CTA
 * routes to the same place instead of competing channels.
 */
export default function BookConsultationCta({
  courseKey = 'data-science',
  label = 'Book Free Consultation',
  variant = 'primary',
  size = 'lg',
  className = '',
  source,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <CtaButton
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </CtaButton>

      {isOpen && (
        <CallbackLeadModal
          courseKey={courseKey}
          source={source}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
