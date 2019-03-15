const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StationSchema = new Schema({
    name: {type: String, required: true},
    joined: { type: Date, default: Date.now },
    email: {type: String, required: true},
    web_url: {type: String},
    stream_url: {type: String},
    phone: {type: String},
});


// Export the model
module.exports = mongoose.model('Station', StationSchema)
