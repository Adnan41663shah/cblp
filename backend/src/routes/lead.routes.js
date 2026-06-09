const express = require('express')
const { createLead } = require('../controllers/lead.controller')
const { validateLead } = require('../middleware/validateLead')

const router = express.Router()

router.post('/', validateLead, createLead)

module.exports = router
