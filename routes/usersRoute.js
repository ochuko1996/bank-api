import { getUsers, getUser, updateUser, deleteUser } from '../controllers/usersController.js'

import { Router } from 'express'
const router = Router()

router.route('/')
    .get(getUsers)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default router