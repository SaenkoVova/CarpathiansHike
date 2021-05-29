const {Router} = require('express');
const router = Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');
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

router.get(
    '/getUser',
    AuthMiddleware,
    UserController.getUser
);

router.post(
    '/updateEmail',
    AuthMiddleware,
    UserController.updateEmail
);

router.post(
    '/updateName',
    AuthMiddleware,
    UserController.updateName
);

router.post(
    '/updatePassword',
    AuthMiddleware,
    UserController.updatePassword
);

router.post(
    '/updateAvatar',
    AuthMiddleware,
    upload.single('image'),
    ImageUploaderMiddleware,
    UserController.updateAvatar
);

router.post(
    '/addPlaceToBookmarks',
    AuthMiddleware,
    UserController.addPlaceToBookmarks
);

router.post(
    '/addRouteToBookmarks',
    AuthMiddleware,
    UserController.addRouteToBookmarks
);

module.exports = router
