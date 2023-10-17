const router = require('express').Router()

const apiKey = require('../controllers/keyController')

router.post('/api_key', apiKey)

module.exports = router
