const { addSiteApp } = require('../controllers/siteAppController')

const router = require('express').Router()

router.route('/')
    .post(addSiteApp)
    .get()
router.route('/:id')
    .get()
    .put()
    .delete()

module.exports = router