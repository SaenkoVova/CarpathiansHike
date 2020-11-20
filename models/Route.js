const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    path: {type: String, required: true},
    previewImage: {type: String, required: true},
    images: [{type: String}],
    geoJson: {type: String, required: true},
    start: {type: Types.ObjectId, required: true, ref: 'Place'},
    end: {type: Types.ObjectId, required: true, ref: 'Place'},
    distance: {type: Number, required: true},
    level: {type: String, required: true},
    description: {type: String, required: true},
    routeCategoriesId: [{type: Types.ObjectId, required: true}],
    duration: {type: Number, required: true},
    routePeaks: [{type: Types.ObjectId, ref: 'Place'}],
    routeInteresting: [{type: Types.ObjectId, ref: 'Place'}],
    nearestPlaces: [{type: Types.ObjectId, ref: 'Place'}],
    allowReview: {type: Boolean, required: true},
})

module.exports = model('Route', schema)
