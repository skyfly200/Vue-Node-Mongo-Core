const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    id: {type: String, required: true},
    saved: {type: Date, default: Date.now},
    author: {type: String, required: true},
    timestamp: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Message', MessageSchema)
