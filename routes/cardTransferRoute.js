import { Router } from "express";
import { addCardTransfer, deleteCardTransfer, getCardTransfer, getCardTransfers, updateCardTransfer } from "../controllers/cardTransferController.js";
const router = Router()


router.route('/:siteId/:memberId')
    .get(getCardTransfers)
router.route('/:siteId/:memberId')
    .post(addCardTransfer)
router.route('/:siteId/:cardTransferId')
    .get(getCardTransfer)
    .delete(deleteCardTransfer)
    .put(updateCardTransfer)

export default router
