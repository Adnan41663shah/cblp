export default function FormStatusMessage({
  isSuccess,
  submitError,
  successMessage,
  className = '',
}) {
  if (isSuccess) {
    return (
      <p
        role="status"
        aria-live="polite"
        className={`form-status-success ${className}`.trim()}
      >
        {successMessage}
      </p>
    )
  }

  if (submitError) {
    return (
      <p role="alert" className={`form-status-error ${className}`.trim()}>
        {submitError}
      </p>
    )
  }

  return null
}
