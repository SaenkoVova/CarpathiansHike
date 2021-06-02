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


router.post(
    '/addMassif',
    AuthMiddleware,
    AdminController.addMassif
)

router.post(
    '/addLocation',
    AuthMiddleware,
    AdminController.addLocation
)

module.exports = router
