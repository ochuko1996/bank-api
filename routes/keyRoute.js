import { Router } from 'express'
const router = Router()

import {keyGenerator} from '../controllers/keyController.js'

router.post('/api_key', keyGenerator)

export default router
