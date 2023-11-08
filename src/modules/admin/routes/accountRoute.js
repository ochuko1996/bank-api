import { Router } from 'express'
const router = Router()

import { addAccount, updateAccount, deletetAccount, getAccount, getAccounts } from '../controllers/accountController.js'
import verifyJWt from '../../../middleware/verifyJWT.js'

router.route('/')
    .get(verifyJWt, getAccounts)
router.route('/:memberId')
    .post(verifyJWt, addAccount)
router.route('/:memberId/:accountId')
    .put(verifyJWt, updateAccount)
    .get(verifyJWt, getAccount)
    .delete(verifyJWt, deletetAccount)
export default router