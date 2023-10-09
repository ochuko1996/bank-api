const { registerUser, login } = require('../controllers/authController')

const router = require('express').Router()

router.post('/create-user', registerUser)
router.post('/login', login)

module.exports = router