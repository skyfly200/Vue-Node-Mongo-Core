const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
    name: {type: String, required: true},
    created: { type: Date, default: Date.now },
    email: {type: String, required: true},
    web_url: {type: String},
    phone: {type: String},
});


// Export the model
module.exports = mongoose.model('Group', GroupSchema)
