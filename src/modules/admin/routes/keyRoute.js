import { Router } from 'express'
const router = Router()

import {keyGenerator} from '../controllers/keyController.js'
import verifyJWt from '../../../middleware/verifyJWT.js'

router.post('/api_key', verifyJWt, keyGenerator)

export default router
