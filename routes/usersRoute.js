const { registerUser, login } = require('../controllers/usersController')

const router = require('express').Router()

router.post('/create-user', registerUser)
router.post('/login', login)

module.exports = router