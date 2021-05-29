const User = require('../models/User');
const Place = require('../models/Place');
const ObjectId = require('mongoose').Types.ObjectId

exports.loadUsersEmails = async (req, res) => {
    try {
        let users = await User.find({}, 'email');
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз'});
    }
}

exports.loadUserLocations = async (req, res) => {
    try {
        const userId = req.query.userId
        const locations = await Place.find({creator: ObjectId(userId)}, 'title info lt lg')
        res.status(200).json(locations)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз'});
    }
}

exports.loadLocations = async (req, res) => {
    try {
        const locations = await Place.find({}, 'title lg lt');
        res.status(200).json(locations)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте ще раз'});
    }
}
