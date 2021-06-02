const { Types } = require('mongoose');
const Place = require('../models/Place');
const PlaceCategory = require('../models/PlaceCategory');
const User = require('../models/User');
const Massif = require('../models/Massif');


module.exports.getPlaces = async (req, res) => {
    try {
        let {showedItems, page, selected, search} = req.query;
        if(parseInt(selected, 10) !== -1) {
            selected = selected.split(',');
        }
        showedItems = parseInt(showedItems, 10);
        page = parseInt(page, 10);
        let places = [];
        if(page === 1) {
            placesCursor = await Place.find({title: {$regex: search}}, 'title info height previewImage categoryId').limit(showedItems).cursor();
            if(selected != -1) {
                placesCursor = await Place.find({'categoryId': {$in: selected}, title: {$regex: search}},
                'title info height previewImage categoryId').limit(showedItems).cursor();
            }
        }
        else {
            placesCursor = await Place.find().skip(showedItems * (page - 1)).limit(showedItems).cursor();
            if(selected != -1) {
                placesCursor = await Place.find({'categoryId': {$in: selected}},
                'title info height previewImage categoryId').skip(showedItems * (page - 1)).limit(showedItems).cursor();
            }
        }
        for (let doc = await placesCursor.next(); doc != null; doc = await placesCursor.next()) {
            let tmp = {}
            const category = await PlaceCategory.find({_id: Types.ObjectId(doc.categoryId)})
            tmp.category = category[0];
            tmp.data = doc;
            places.push(tmp);
        }
        res.status(200).json({places});
        
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.getPlaceById = async (req, res) => {
    try {
        const {id} = req.query;
        const place = await Place.find({_id: Types.ObjectId(id)});
        const user = await User.find({_id: Types.ObjectId(place[0].creator)}, 'name');
        const massif = await Massif.find({_id: Types.ObjectId(place[0].massif)});
        let data = {
            place: place[0], user: user[0], massif: massif[0]
        }
        res.status(200).json(data)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


module.exports.getMapLocations = async (req, res) => {
    try {
        const places = await Place.find({});
        res.status(200).json(places)
    } catch (e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

// const place = new Place({
//     categoryId: Types.ObjectId("5f995f9b85986607a0ab7d29"),
//     title: 'Вершина ' + i,
//     info: 'Це тестова вершина ' + i,
//     height: 2061 + i,
//     categoryImage: 'mountains.png',
//     transportHub: false,
//     railwayConnection: false,
//     tourCity: false,
//     publicTransport: false,
//     lt: 48.0938,
//     lg: 24.3012,
//     massif: Types.ObjectId("5f9dd713b5e8f1299c90d97b"),
//     creator: Types.ObjectId("5f95f8671383e124848b0bdf"),
//     allowReview: true,
//     images: ['1517479038_goverla-3.jpg', '20170607_1664644203.jpg'],
//     previewImage: '20170607_1664644203-3.jpg'
// })
// await place.save();
