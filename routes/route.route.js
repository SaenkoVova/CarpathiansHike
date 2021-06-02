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

router.get(
    '/loadByDuration',
    RouteController.loadByDuration
)

router.get(
    '/loadByLevel',
    RouteController.loadByLevel
)

router.get(
    '/loadRoutesDurations',
    RouteController.loadRoutesDurations
)

module.exports = router;
