import { Router } from "express";
import { addCard, deleteCard, getCard, getCards, updateCard } from "../controllers/cardController.js";
const router = Router()

router.route('/:siteId')
    .get(getCards)
router.route('/:siteId/:memberId')
    .post(addCard)
router.route('/:siteId/:memberId')
    .get(getCard)
    .delete(deleteCard)
    .put(updateCard)

export default router
