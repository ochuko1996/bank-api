import { Router } from 'express'
const router = Router()

import { addMember, getMembers, getMember, updateMember, deleteMember } from '../controllers/membersController.js'



router.route('/:siteId')
    .get(getMembers)
    .post(addMember)
router.route('/:siteId/:memberId')
    .get(getMember)
    .put(updateMember)
    .delete(deleteMember)

export default router
