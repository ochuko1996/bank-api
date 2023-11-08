import { getUsers, getUser, updateUser, deleteUser } from '../controllers/usersController.js'

import { Router } from 'express'
const router = Router()
import verifyJWt from '../../../middleware/verifyJWT.js'

router.route('/')
    .get(verifyJWt,getUsers)
router.route('/:id')
    .get(verifyJWt,getUser)
    .put(verifyJWt, updateUser)
    .delete(verifyJWt,deleteUser)

export default router