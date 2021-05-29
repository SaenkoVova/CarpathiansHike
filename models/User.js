const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    places: [{type: Types.ObjectId, ref: 'Place'}],
    routes: [{type: Types.ObjectId, ref: 'Route'}],
    avatar: {type: String, required: false, default: null},
    newsSubscribe: {type: Boolean, required: false, default: true},
    allowReview: {type: Boolean, required: false, default: true},
    allowReply: {type: Boolean, required: false, default: true}
})

module.exports = model('User', schema)
