import { Router } from 'express'
const router = Router()

import { addBilling, getBillings, getBilling, updateBilling, deleteBilling } from '../controllers/billingController.js'
import verifyJWT from '../../../middleware/verifyJWT.js'

router.route('/:siteId')
    .post(verifyJWT, addBilling)
    .get(verifyJWT, getBillings)
router.route('/:siteId/:billingId')
    .get(verifyJWT, getBilling)
    .put(verifyJWT, updateBilling)
    .delete(verifyJWT, deleteBilling)

export default router