const cors = require('cors')
const express = require('express')
const env = require('./config/env')
const errorHandler = require('./middleware/errorHandler')
const healthRoutes = require('./routes/health.routes')
const leadRoutes = require('./routes/lead.routes')

const app = express()

app.use(
  cors({
    origin: env.corsOrigins,
  })
)

app.use(express.json({ limit: '32kb' }))

app.use('/api/health', healthRoutes)

app.use('/api/leads', leadRoutes)

app.use((req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found' })
})

app.use(errorHandler)

module.exports = app
