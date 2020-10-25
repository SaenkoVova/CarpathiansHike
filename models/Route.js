const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    identifier: {type: String, required: true},
    path: {type: String, required: true},
    start: {type: Types.ObjectId, required: true, ref: 'Place'},
    end: {type: Types.ObjectId, required: true, ref: 'Place'},
    distance: {type: Number, required: true},
    level: {type: String, required: true},
    description: {type: Text, required: true},
    routeCategoryId: {type: Types.ObjectId, required: true}
})

module.exports = model('Route', schema)