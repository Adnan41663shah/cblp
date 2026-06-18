import { useCallback, useEffect, useRef, useState } from 'react'
import { TbCheck, TbSparkles, TbX } from 'react-icons/tb'
import FormStatusMessage from './FormStatusMessage'
import ModalPortal from './ModalPortal'
import PhoneInputField from './PhoneInputField'
import { getPhoneValidationError, submitLeadForm } from '../utils/leadForm'

const VALUE_PROPS = [
  'Personalized career roadmap',
  'Salary growth opportunities',
  'Right course & learning path',
  'Placement preparation',
  'Skill gap analysis',
]

const AUTO_CLOSE_AFTER_SUCCESS_MS = 2600
const DRAG_CLOSE_THRESHOLD = 110 // px dragged down before the sheet dismisses

/**
 * "Reach out to our career counsellor for free" — a low-friction consultation
 * invite. Native slide-up bottom sheet on mobile (drag-to-close), soft floating
 * modal on desktop. Asks only Full Name + Phone (career goal optional).
 */
export default function ConsultationPopup({
  courseKey = 'data-science',
  source = 'consultation-popup',
  onClose,
  onConverted,
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('')
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const closedRef = useRef(false)
  const dragRef = useRef({ startY: 0, dy: 0, active: false })

  const requestClose = useCallback(() => {
    if (closedRef.current) return
    closedRef.current = true
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') requestClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [requestClose])

  const clearFieldError = (field) =>
    setErrors((current) => (current[field] ? { ...current, [field]: '' } : current))

  const validate = () => {
    const next = {}
    const trimmedName = name.trim()
    if (!trimmedName) next.name = 'Name is required'
    else if (trimmedName.length < 2) next.name = 'Enter a valid name'

    const phoneError = getPhoneValidationError(phone)
    if (phoneError) next.phone = phoneError

    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting' || status === 'success') return

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setSubmitError('')

    try {
      await submitLeadForm({ name, phone, careerGoal: goal, source, course: courseKey })
      setStatus('success')
      onConverted?.()
      window.setTimeout(() => {
        if (!closedRef.current) requestClose()
      }, AUTO_CLOSE_AFTER_SUCCESS_MS)
    } catch (error) {
      setStatus('error')
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong. Please try again in a moment.',
      )
    }
  }

  // ── Drag-to-close (mobile bottom-sheet) ──────────────────────────────────
  const onDragStart = (event) => {
    dragRef.current = { startY: event.clientY, dy: 0, active: true }
    setIsDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onDragMove = (event) => {
    if (!dragRef.current.active) return
    const dy = Math.max(0, event.clientY - dragRef.current.startY)
    dragRef.current.dy = dy
    setDragY(dy)
  }

  const onDragEnd = () => {
    if (!dragRef.current.active) return
    const { dy } = dragRef.current
    dragRef.current.active = false
    setIsDragging(false)
    if (dy > DRAG_CLOSE_THRESHOLD) {
      requestClose()
    } else {
      setDragY(0) // snap back
    }
  }

  const isBusy = status === 'submitting'
  const isDone = status === 'success'

  // While dragging, follow the finger with no transition; on release, animate the snap-back.
  const sheetStyle = dragY
    ? { transform: `translateY(${dragY}px)`, transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }
    : undefined
  const backdropStyle = dragY ? { opacity: Math.max(0.35, 1 - dragY / 320) } : undefined

  const fieldWrap =
    'flex items-center overflow-hidden rounded-lg border bg-[#0a0a0a] transition-colors duration-200 focus-within:border-[#ff6b35]/60'

  return (
    <ModalPortal>
      <div
        className="consult-popup fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-popup-title"
      >
        <button
          type="button"
          className="consult-popup__backdrop absolute inset-0 cursor-default bg-black/80 backdrop-blur-[2px]"
          style={backdropStyle}
          onClick={requestClose}
          aria-label="Close consultation invite"
        />

        <div
          className="consult-popup__sheet relative z-10 w-full overflow-hidden rounded-t-[24px] border border-white/10 bg-gradient-to-b from-[#161616] to-[#0c0c0c] shadow-[0_-12px_60px_rgba(0,0,0,0.6)] sm:max-w-[440px] sm:rounded-[24px] sm:shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
          style={sheetStyle}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/70 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ff6b35]/[0.10] to-transparent"
            aria-hidden="true"
          />

          {/* Mobile grab handle — native bottom-sheet drag affordance */}
          <div
            className="flex touch-none justify-center pt-2.5 pb-1 sm:hidden cursor-grab active:cursor-grabbing"
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            aria-hidden="true"
          >
            <span className="h-1 w-10 rounded-full bg-white/25" />
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <TbX className="h-4 w-4" />
          </button>

          <div className="scrollbar-none max-h-[82vh] overflow-y-auto px-5 pb-6 pt-2 sm:px-7 sm:pb-7 sm:pt-6">
            {isDone ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="consult-success-pop flex h-16 w-16 items-center justify-center rounded-full border border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]">
                  <TbCheck className="h-8 w-8" />
                </span>
                <h2 className="mt-4 text-[20px] font-semibold tracking-tight text-white">
                  You&rsquo;re all set{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}!
                </h2>
                <p className="mt-2 max-w-[300px] text-[13px] leading-relaxed text-[#aab4c2]">
                  Our career counsellor will reach out to you shortly with personalized guidance.
                </p>
              </div>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#ff8a5c]">
                  <TbSparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Free Career Guidance
                </span>

                <h2
                  id="consult-popup-title"
                  className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[22px]"
                >
                  Reach out to our career counsellor for free
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#aab4c2] sm:text-sm">
                  Get personalized guidance on career opportunities, salary growth, placements, and
                  the best learning path for your goals.
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-y-2">
                  {VALUE_PROPS.map((prop) => (
                    <li key={prop} className="flex items-center gap-2.5 text-[13px] text-[#d4dbe5]">
                      <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#ff6b35]/15 text-[#ff8a5c]">
                        <TbCheck className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {prop}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="consult-name"
                      className="text-xs font-normal text-white sm:text-[13px]"
                    >
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <div className={`${fieldWrap} ${errors.name ? 'border-red-500' : 'border-white/15'}`}>
                      <input
                        id="consult-name"
                        name="consult-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value)
                          clearFieldError('name')
                        }}
                        placeholder="Enter your full name"
                        className="w-full flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-[#64748b] outline-none"
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                  </div>

                  <PhoneInputField
                    name="consult-phone"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    required
                    value={phone}
                    onChange={(value) => {
                      setPhone(value)
                      clearFieldError('phone')
                    }}
                    error={errors.phone}
                  />

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="consult-goal"
                      className="text-xs font-normal text-white sm:text-[13px]"
                    >
                      Career goal <span className="text-[#64748b]">(optional)</span>
                    </label>
                    <div className={`${fieldWrap} border-white/15`}>
                      <input
                        id="consult-goal"
                        name="consult-goal"
                        type="text"
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                        placeholder="e.g. Switch to Data Science"
                        className="w-full flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-[#64748b] outline-none"
                      />
                    </div>
                  </div>

                  <FormStatusMessage isSuccess={false} submitError={submitError} successMessage="" />

                  <button
                    type="submit"
                    disabled={isBusy}
                    className="cta-base cta-primary mt-1 w-full px-6 py-3 text-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:text-[15px]"
                  >
                    {isBusy ? 'Booking…' : 'Book Free Consultation'}
                  </button>

                  <button
                    type="button"
                    onClick={requestClose}
                    className="w-full py-1.5 text-[13px] font-medium text-[#8b95a5] transition-colors hover:text-white cursor-pointer"
                  >
                    Maybe later
                  </button>

                  <p className="text-center text-[11px] text-[#6b7280]">
                    100% free · No spam · Talk to a real counsellor
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}
