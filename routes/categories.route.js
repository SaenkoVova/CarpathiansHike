const {Router} = require('express');
const router = Router();
const CategoriesController = require('../controllers/categories.controller');

router.get(
    '/getPlacesCategories',
    CategoriesController.getPlacesCategories
)

module.exports = router;