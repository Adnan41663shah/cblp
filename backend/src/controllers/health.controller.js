const { getHealthReport } = require('../services/health.service')

async function getHealth(req, res, next) {
  try {
    const report = await getHealthReport()
    const statusCode = report.status === 'ok' ? 200 : 503

    return res.status(statusCode).json(report)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getHealth,
}
