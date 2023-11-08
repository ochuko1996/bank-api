import { Router } from 'express'
const router = Router()

import { addMember, getMembers, getMember, updateMember, deleteMember } from '../controllers/membersController.js'
import verifyJWt from '../../../middleware/verifyJWT.js'


router.route('/:siteId')
    .get(verifyJWt, getMembers)
    .post(verifyJWt, addMember)
router.route('/:siteId/:memberId')
    .get(verifyJWt, getMember)
    .put(verifyJWt, updateMember)
    .delete(verifyJWt, deleteMember)

export default router
