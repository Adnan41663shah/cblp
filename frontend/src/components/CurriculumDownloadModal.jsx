import { useCallback, useEffect } from 'react'
import { useLeadForm } from '../hooks/useLeadForm'
import { downloadCurriculumPdf } from '../utils/curriculumDownload'
import LeadForm from './LeadForm'
import ModalPortal from './ModalPortal'

const MODAL_CONTENT = {
  'data-science': {
    title: 'Download Data Science Curriculum',
    accentBar: 'bg-[#2563eb]',
    submitClass:
      'w-full rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-[15px] py-2.5 sm:py-3 transition-colors duration-200 cursor-pointer',
  },
  devops: {
    title: 'Download Cloud DevOps Curriculum',
    accentBar: 'bg-[#ff6b35]',
    submitClass:
      'w-full rounded-lg bg-[#ff6b35] hover:bg-[#e85a28] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-[15px] py-2.5 sm:py-3 transition-colors duration-200 cursor-pointer',
  },
}

export default function CurriculumDownloadModal({ courseKey, onClose }) {
  const content = MODAL_CONTENT[courseKey] ?? MODAL_CONTENT['data-science']

  const handleDownloadSuccess = useCallback(async () => {
    await downloadCurriculumPdf(courseKey)
  }, [courseKey])

  const {
    values,
    errors,
    setField,
    handleSubmit,
    reset,
    isSubmitting,
    isSuccess,
    submitError,
  } = useLeadForm({
    source: 'curriculum-download',
    courseKey,
    onSuccess: handleDownloadSuccess,
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      reset()
    }
  }, [onClose, reset])

  return (
    <ModalPortal>
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-[2px] cursor-default"
        onClick={onClose}
        aria-label="Close curriculum download form"
      />

      <div className="curriculum-modal relative z-10 w-full sm:max-w-[480px] overflow-hidden rounded-t-[20px] sm:rounded-[22px] border border-white/10 bg-[#121212] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <div className={`h-0.5 w-full ${content.accentBar}`} aria-hidden="true" />

        <div className="scrollbar-none max-h-[92vh] sm:max-h-none overflow-y-auto sm:overflow-visible">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-4 sm:px-6 py-4 sm:py-5">
          <div className="min-w-0 pr-2">
            <h2
              id="curriculum-modal-title"
              className="text-white font-semibold text-lg sm:text-xl leading-snug"
            >
              {content.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 pb-6 sm:pb-6">
          <LeadForm
            idPrefix={`curriculum-${courseKey}`}
            experienceName={`curriculum-experience-${courseKey}`}
            values={values}
            errors={errors}
            setField={setField}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            submitError={submitError}
            submitLabel="Download Curriculum"
            successMessage="Thank you! Your curriculum PDF is downloading now."
            submitClassName={content.submitClass}
          />
        </div>
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
