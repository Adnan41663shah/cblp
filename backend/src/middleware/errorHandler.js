function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = err.statusCode || 500
  const message =
    statusCode === 500
      ? 'Unable to process your request right now. Please try again shortly.'
      : err.message || 'Request failed'

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  const response = {
    ok: false,
    message,
  }

  if (process.env.NODE_ENV !== 'production' && err.deliveryResults) {
    response.deliveryResults = err.deliveryResults
  }

  return res.status(statusCode).json(response)
}

module.exports = errorHandler
