import {login, logout, registerUser} from '../controllers/authController.js'

import {Router} from 'express'
const router = Router()

router.post('/create-user', registerUser)
router.post('/login', login)
router.post('/logout', logout)

export default router