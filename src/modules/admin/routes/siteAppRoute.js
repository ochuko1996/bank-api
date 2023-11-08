import { addSiteApp, deleteSiteApp, getAllSiteApp, getSiteApp, updateSiteApp } from '../controllers/siteAppController.js'

import { Router } from 'express'
const router = Router()
import verifyJWt from '../../../middleware/verifyJWT.js'

router.route('/')
    .post(verifyJWt, addSiteApp)
    .get(verifyJWt, getAllSiteApp)
router.route('/:id')
    .get(verifyJWt, getSiteApp)
    .put(verifyJWt, updateSiteApp)
    .delete(verifyJWt, deleteSiteApp)

export default router