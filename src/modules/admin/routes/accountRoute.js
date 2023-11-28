import { Router } from 'express'
const router = Router()

import { addAccount, updateAccount, deleteAccount, getAccount, getAccounts } from '../controllers/accountController.js'
import verifyJWt from '../../../middleware/verifyJWT.js'

router.route('/')
    .get(verifyJWt, getAccounts)
router.route('/:memberId')
    .post(verifyJWt, addAccount)
router.route('/:memberId/:accountId')
    .put(verifyJWt, updateAccount)
    .get(verifyJWt, getAccount)
    .delete(verifyJWt, deleteAccount)
export default router