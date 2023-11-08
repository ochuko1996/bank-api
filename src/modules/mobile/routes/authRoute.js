import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

export default router