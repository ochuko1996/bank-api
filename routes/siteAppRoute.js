const { addSiteApp, deleteSiteApp, getAllSiteApp, getSiteApp, updateSiteApp } = require('../controllers/siteAppController')

const router = require('express').Router()

router.route('/')
    .post(addSiteApp)
    .get(getAllSiteApp)
router.route('/:id')
    .get(getSiteApp)
    .put(updateSiteApp)
    .delete(deleteSiteApp)

module.exports = router