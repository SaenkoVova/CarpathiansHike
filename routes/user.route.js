const {Router} = require('express');
const { route } = require('./auth.route');
const router = Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.get(
    '/getUser',
    AuthMiddleware,
    UserController.getUser
);

module.exports = router