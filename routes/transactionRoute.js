import { Router } from 'express'
const router = Router()
import { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js'


router.route('/:memberId')
    .post(addTransaction)
    .get(getTransactions)

router.route('/:memberId/:transactionId')
    .get(getTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction)

export default router
