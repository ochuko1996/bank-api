const { addAccount, updateAccount, deletetAccount, getAccount, getAccounts } = require('../controllers/accountController')

const router = require('express').Router()

router.route('/')
    .get(getAccounts)
router.route('/:memberId')
    .post(addAccount)
router.route('/:memberId/:accountId')
    .put(updateAccount)
    .get(getAccount)
    .delete(deletetAccount)
module.exports = router