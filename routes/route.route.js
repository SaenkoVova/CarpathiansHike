const {Router} = require('express');
const router = Router();
const RouteController = require('../controllers/route.controller');

router.get(
    '/getRoutes',
    RouteController.getRoutes
);

router.get(
    '/getRouteById',
    RouteController.getRouteById
)

module.exports = router;