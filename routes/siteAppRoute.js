import { addSiteApp, deleteSiteApp, getAllSiteApp, getSiteApp, updateSiteApp } from '../controllers/siteAppController.js'

import { Router } from 'express'
const router = Router()

router.route('/')
    .post(addSiteApp)
    .get(getAllSiteApp)
router.route('/:id')
    .get(getSiteApp)
    .put(updateSiteApp)
    .delete(deleteSiteApp)

export default router