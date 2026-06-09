import { useCallback, useRef, useState } from 'react'
import { submitLeadForm, validateLeadForm } from '../utils/leadForm'

const EMPTY_VALUES = {
  name: '',
  email: '',
  phone: '',
  experience: '',
}

export function useLeadForm({ source, courseKey, onSuccess }) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')
  const preserveStatusRef = useRef(false)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: '' } : current))
    if ((status === 'success' || status === 'error') && !preserveStatusRef.current) {
      setStatus('idle')
      setSubmitError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateLeadForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('idle')
      setSubmitError('')
      return
    }

    setStatus('submitting')
    setSubmitError('')

    try {
      await submitLeadForm({
        ...values,
        source,
        course: courseKey,
      })
      preserveStatusRef.current = true
      setValues(EMPTY_VALUES)
      setErrors({})
      setStatus('success')
      window.setTimeout(() => {
        preserveStatusRef.current = false
      }, 300)
      await onSuccess?.()
    } catch (error) {
      setStatus('error')
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong. Please try again in a moment.'
      )
    }
  }

  const reset = useCallback(() => {
    setValues(EMPTY_VALUES)
    setErrors({})
    setStatus('idle')
    setSubmitError('')
  }, [])

  return {
    values,
    errors,
    status,
    submitError,
    setField,
    handleSubmit,
    reset,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
  }
}
