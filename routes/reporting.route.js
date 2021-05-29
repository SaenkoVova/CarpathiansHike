const {Router} = require('express');
const router = Router();
const ReportingController = require('../controllers/reporting.controller')

router.get(
    '/loadUsersEmails',
    ReportingController.loadUsersEmails
)

router.get(
    '/loadUserLocations',
    ReportingController.loadUserLocations
)

router.get(
    '/loadLocations',
    ReportingController.loadLocations
)


module.exports = router
