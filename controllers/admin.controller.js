const User = require('../models/User');
const Massif = require('../models/Massif');
const Place = require('../models/Place');
const Route = require('../models/Route');
const PlaceCategory = require('../models/PlaceCategory');
const RouteCategory = require('../models/RouteCategory');
const ObjectID = require('mongoose').Types.ObjectId;

exports.loadUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadCategories = async (req, res) => {
    try {
        const categories = await PlaceCategory.find();
        res.status(200).json(categories);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.addCategory = async (req, res) => {
    try {
        const {title} = req.body;
        let category = new PlaceCategory({title});
        await category.save();
        res.status(200).json({message: 'added'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.addRouteCategory = async (req, res) => {
    try {
        const {title} = req.body;
        let category = new RouteCategory({title});
        await category.save();
        res.status(200).json({message: 'added'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


exports.loadMassifs = async (req, res) => {
    try {
        const massifs = await Massif.find();
        res.status(200).json(massifs);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadRouteCategories = async (req, res) => {
    try {
        const routeCategories = await RouteCategory.find();
        res.status(200).json(routeCategories);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


exports.addMassif = async (req, res) => {
    try {
        const {title} = req.body;
        let massif = new Massif({title});
        await massif.save();
        res.status(200).json({message: 'added'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.addLocation = async (req, res) => {
    try {
        const {
            categoryId,
            massifId,
            title,
            info,
            height,
            transportHub,
            railwayConnection,
            tourCity,
            publicTransport,
            lt,
            lg,
            allowReview,
            previewImage,
            nearestSettlements,
            routes,
            reviews,
            images
        } = req.body
        let place = new Place({
            categoryId: ObjectID(categoryId),
            massif: ObjectID(massifId),
            creator: ObjectID(req.user.userId),
            title,
            info,
            height: Number(height),
            transportHub,
            railwayConnection,
            tourCity,
            publicTransport,
            lt,
            lg,
            allowReview,
            previewImage,
            nearestSettlements,
            routes,
            reviews,
            images
        })
        await place.save();
        res.status(200).json({message: 'added'});
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


exports.addRoute = async (req, res) => {
    try {
        const {
            path,
            previewImage,
            images,
            geoJson,
            start,
            end,
            distance,
            level,
            description,
            routeCategoriesId,
            duration,
            routePeaks,
            routeInteresting,
            nearestPlaces,
            allowReview
        } = req.body
        let route = new Route({
            path,
            previewImage,
            images,
            geoJson,
            start: ObjectID(start),
            end: ObjectID(end),
            distance,
            level,
            description,
            routeCategoriesId: ObjectID(routeCategoriesId),
            duration,
            routePeaks,
            routeInteresting,
            nearestPlaces,
            allowReview
        })
        await route.save();
        res.status(200).json({message: 'added'});
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

exports.loadLocations = async (req, res) => {
    try {
        const massifs = await Place.find();
        res.status(200).json(massifs);
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}
