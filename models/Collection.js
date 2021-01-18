const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    slag: {type: String, required: true},
    collectionFileds: [
        {
            name: {type: String, required: true},
            slag: {type: String, required: true},
            fieldType: {type: String, required: true}
        }
    ]
})

module.exports = model('Collection', schema);