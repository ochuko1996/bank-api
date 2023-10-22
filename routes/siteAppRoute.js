const { addSiteApp, deleteSiteApp } = require('../controllers/siteAppController')

const router = require('express').Router()

router.route('/')
    .post(addSiteApp)
    .get()
router.route('/:id')
    .get()
    .put()
    .delete(deleteSiteApp)

module.exports = router