import { Router } from 'express'
const router = Router()

import { addAccount, updateAccount, deletetAccount, getAccount, getAccounts } from '../controllers/accountController.js'


router.route('/')
    .get(getAccounts)
router.route('/:memberId')
    .post(addAccount)
router.route('/:memberId/:accountId')
    .put(updateAccount)
    .get(getAccount)
    .delete(deletetAccount)
export default router