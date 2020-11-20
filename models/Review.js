const { Schema, Types, model } = require("mongoose");

const schema = new Schema({
    forId: {type: Types.ObjectId, required: true},
    mode: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User', required: true},
    creationTime: {type: Date, default: Date.now},
    text: {type: String, required: true},
    attachments: [{type: String}]
});

module.exports = model('Review', schema);