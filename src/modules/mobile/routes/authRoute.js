import { Router } from "express";
import { login } from "../controllers/authController.js";
const router = Router()

router.route('/login')
    .post(login)

export default router