const { addMember, getMembers, getMember, updateMember, deleteMember } = require('../controllers/membersController')

const router = require('express').Router()

router.route('/:siteId')
    .get(getMembers)
    .post(addMember)
router.route('/:siteId/:memberId')
    .get(getMember)
    .put(updateMember)
    .delete(deleteMember)

module.exports = router
