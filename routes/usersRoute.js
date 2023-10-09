const { postApiKeyandSecretKey } = require('../controllers/usersController')

const router = require('express').Router()

router.post('/post-keys', postApiKeyandSecretKey)

module.exports = router