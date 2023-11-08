import { Router } from 'express'
const router = Router()
import { addBillingCode, deleteBillingCode, updateBillingCode, getBillingCode, getBillingCodes } from '../controllers/billingCodeController.js'
import verifyJWT from '../../../middleware/verifyJWT.js'

router.route('/:billingId')
    .post(verifyJWT, addBillingCode)
    .get(verifyJWT, getBillingCodes)

router.route('/:billingId/:billingCodeId')
    .delete(verifyJWT, deleteBillingCode)
    .put(verifyJWT, updateBillingCode)
    .get(verifyJWT, getBillingCode)

export default router