const router = require('express').Router()

const apiKey = require('../controllers/apiKeyController')

router.get('/api_key', apiKey)

module.exports = router
