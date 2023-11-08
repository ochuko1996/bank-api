import { Router } from "express";
import { addCardTransfer, deleteCardTransfer, getCardTransfer, getCardTransfers, updateCardTransfer } from "../controllers/cardTransferController.js";
const router = Router()
import verifyJWT from '../../../middleware/verifyJWT.js'

router.route('/:siteId/:memberId')
    .get(verifyJWT, getCardTransfers)
router.route('/:siteId/:memberId')
    .post(verifyJWT, addCardTransfer)
router.route('/:siteId/:cardTransferId')
    .get(verifyJWT, getCardTransfer)
    .delete(verifyJWT, deleteCardTransfer)
    .put(verifyJWT, updateCardTransfer)

export default router
