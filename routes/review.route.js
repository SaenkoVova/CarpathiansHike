const {Router} = require('express');
const router = Router();
const ReviewController = require('../controllers/review.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const ImageUploaderMiddleware = require('../middlewares/imageUploader.middleware');
const multer = require('multer');
const config = require('config');

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Невірний тип файлу");
        error.code = 'LIMIT_FYLE_TYPES';
        cb(error, false);
    }
    cb(null, true)
}

const upload = multer({
    dest: './uploads/',
    fileFilter,
    limits: {
        fileSize: config.get('imageSize')
    }
});

router.post(
    '/makeReview',
    AuthMiddleware,
    upload.array('images'),
    ImageUploaderMiddleware,
    ReviewController.makeReview
);

router.get(
    '/getReviews',
    ReviewController.getReviews
);

module.exports = router;