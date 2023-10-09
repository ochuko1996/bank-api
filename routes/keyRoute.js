const router = require('express').Router()

const apiKey = require('../controllers/keyController')

router.get('/api_key', apiKey)

module.exports = router
