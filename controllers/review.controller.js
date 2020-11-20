const { Types } = require("mongoose");
const sharp = require("sharp");
const Review = require("../models/Review");
const Place = require('../models/Place');
const Route = require('../models/Route');
const User = require('../models/User');

module.exports.makeReview = async (req, res) => {
    try {
        let id = req.body.placeId || req.body.routeId;
        if(req.body.placeId) {
            const place = await Place.findById(id);
            if(!place.allowReview) {
                res.status(500).json({message: 'Коментарі до цього місця вимкнено'})
            }
        }
        else {
            const route = await Route.findById(id);
            if(!route.allowReview) {
                res.status(500).json({message: 'Коментарі до цього маршруту вимкнено'})
            }
        }
        const review = req.body.review;
        if(review === '') {
            res.status(500).json({message: 'Залиште, будь ласка, відгук'});
        }
        if(process.env.NODE_ENV === 'production') {
            console.log('req', req.body.review);
            for(const file of req.files) {
                await sharp(file.path)
                    .toFile(`./client/dist/img/${file.originalname}`);
            }
        }
        else {
            for(const file of req.files) {
                await sharp(file.path)
                    .toFile(`./client/src/assets/${file.originalname}`);
            }
        }
        
        let attachments = req.files.map(i => i.originalname) || [];
        const schema = new Review({
            forId: Types.ObjectId(id),
            owner: Types.ObjectId(req.user.userId),
            mode: req.body.mode,
            text: review,
            attachments
        });
        await schema.save();
        if(req.body.placeId) {
            await Place.findOneAndUpdate(
                {_id: Types.ObjectId(req.body.placeId)},
                {$push: {images: {$each: attachments}}}
            )
        }
        else {
            await Route.findOneAndUpdate(
                {_id: Types.ObjectId(req.body.placeId)},
                {$push: {images: {$each: attachments}}}
            )
        }
        
        let comment = await Review.find({}, 'text creationTime attachments').sort({_id: -1}).limit(1)
        let user = await User.findById(req.user.userId, 'name');
        res.status(200).json({
            message: 'Відгук успішно надіслано',
            comment: comment[0],
            user
        });
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз'});
    }
}

module.exports.getReviews = async (req, res) => {
    try {
        const {id, mode} = req.query;
        const reviews = await Review.find({forId: Types.ObjectId(id), mode: mode}).populate('owner', 'name')
        res.status(200).json({reviews})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз'});
    }
}