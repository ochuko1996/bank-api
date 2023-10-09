const { registerUser, login, logout} = require('../controllers/authController')

const router = require('express').Router()

router.post('/create-user', registerUser)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router