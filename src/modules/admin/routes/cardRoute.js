import { Router } from "express";
import { addCard, deleteCard, getCard, getCards, updateCard } from "../controllers/cardController.js";
const router = Router()
import verifyJWT from '../../../middleware/verifyJWT.js'

router.route('/:siteId')
    .get(verifyJWT, getCards)
router.route('/:siteId/:memberId')
    .post(verifyJWT, addCard)
router.route('/:siteId/:memberId')
    .get(verifyJWT, getCard)
    .delete(verifyJWT, deleteCard)
    .put(verifyJWT, updateCard)

export default router
