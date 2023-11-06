import { Router } from 'express'
const router = Router()

import { addBilling, getBillings, getBilling, updateBilling, deleteBilling } from '../controllers/billingController.js'


router.route('/:siteId')
    .post(addBilling)
    .get(getBillings)
router.route('/:siteId/:billingId')
    .get(getBilling)
    .put(updateBilling)
    .delete(deleteBilling)

export default router