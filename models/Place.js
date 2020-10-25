const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    categoryId: {type: Types.ObjectId, ref: 'PlaceCategory', required: true},
    title: {type: String, required: true},
    info: {type: String, required: true},
    height: {type: Number, required: false, default: 0},
    features: {type: Number, required: false, default: null},
    transportHub: {type: Boolean, required: true},
    railwayConnection: {type: Boolean, required: true},
    tourCity: {type: Boolean, required: true},
    publicTransport: {type: Boolean, required: true},
    lt: {type: Number, required: true},
    lg: {type: Number, required: true},
    creator: {type: Types.ObjectId, ref: 'User'},
    creationDate: {type: Date, required: false, default: Date.now},
    allowReview: {type: Boolean, required: true},
    nearestSettlements: [{type: Types.ObjectId, ref: 'Place'}],
    routes: [{type: Types.ObjectId, ref: 'Route'}],
    reviews: [{type: Types.ObjectId, ref: 'Review'}]
})

module.exports = model('Place', schema)