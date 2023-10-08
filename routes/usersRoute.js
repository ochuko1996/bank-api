const { registerUser } = require('../controllers/usersController')

const router = require('express').Router()

router.post('/create-user', registerUser)

module.exports = router