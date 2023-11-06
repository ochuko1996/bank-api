import { Router } from 'express'
const router = Router()
import { addBillingCode, deleteBillingCode, updateBillingCode, getBillingCode, getBillingCodes } from '../controllers/billingCodeController.js'


router.route('/:billingId')
    .post(addBillingCode)
    .get(getBillingCodes)

router.route('/:billingId/:billingCodeId')
    .delete(deleteBillingCode)
    .put(updateBillingCode)
    .get(getBillingCode)

export default router