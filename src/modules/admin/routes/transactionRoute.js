import { Router } from 'express'
const router = Router()
import { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js'
import verifyJWt from '../../../middleware/verifyJWT.js'

router.route('/:memberId')
    .post(verifyJWt, addTransaction)
    .get(verifyJWt, getTransactions)

router.route('/:memberId/:transactionId')
    .get(verifyJWt, getTransaction)
    .put(verifyJWt, updateTransaction)
    .delete(verifyJWt, deleteTransaction)

export default router
