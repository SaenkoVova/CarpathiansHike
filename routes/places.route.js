const {Router} = require('express');
const router = Router();
const PlacesController = require('../controllers/place.controller');

router.get(
    '/getPlaces',
    PlacesController.getPlaces
);

router.get(
    '/getPlaceById',
    PlacesController.getPlaceById
)

module.exports = router;