const {Router} = require('express');
const router = Router();
const TablesController = require('../controllers/tables.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/',
    authMiddleware,
    TablesController.getTables
);

router.get(
    '/read',
    authMiddleware,
    TablesController.readTable
)

module.exports = router;