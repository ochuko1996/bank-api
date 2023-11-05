const { addBillingCode, deleteBillingCode, updateBillingCode, getBillingCode, getBillingCodes } = require('../controllers/billingCodeController')

const router = require('express').Router()

router.route('/:billingId')
    .post(addBillingCode)
    .get(getBillingCodes)

router.route('/:billingId/:billingCodeId')
    .delete(deleteBillingCode)
    .put(updateBillingCode)
    .get(getBillingCode)

module.exports = router