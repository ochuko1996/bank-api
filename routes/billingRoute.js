const { addBilling, getBillings, getBilling, updateBilling, deleteBilling } = require('../controllers/billingController')

const router = require('express').Router()

router.route('/:siteId')
    .post(addBilling)
    .get(getBillings)
router.route('/:siteId/:billingId')
    .get(getBilling)
    .put(updateBilling)
    .delete(deleteBilling)

module.exports = router