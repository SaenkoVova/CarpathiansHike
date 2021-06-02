const {Router} = require('express');
const router = Router();
const AdminController = require('../controllers/admin.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/loadUsers',
    AuthMiddleware,
    AdminController.loadUsers
)

router.get(
    '/loadCategories',
    AuthMiddleware,
    AdminController.loadCategories
)

router.post(
    '/addCategory',
    AuthMiddleware,
    AdminController.addCategory
)

router.get(
    '/loadMassifs',
    AuthMiddleware,
    AdminController.loadMassifs
)

router.get(
    '/loadLocations',
    AuthMiddleware,
    AdminController.loadLocations
)

router.get(
    '/loadRouteCategories',
    AuthMiddleware,
    AdminController.loadRouteCategories
)


router.post(
    '/addMassif',
    AuthMiddleware,
    AdminController.addMassif
)

router.post(
    '/addRoute',
    AuthMiddleware,
    AdminController.addRoute
)

router.post(
    '/addRouteCategory',
    AuthMiddleware,
    AdminController.addRouteCategory
)


router.post(
    '/addLocation',
    AuthMiddleware,
    AdminController.addLocation
)

module.exports = router
