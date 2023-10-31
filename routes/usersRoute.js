const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/usersController')

const router = require('express').Router()

router.route('/')
    .get(getUsers)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
module.exports = router