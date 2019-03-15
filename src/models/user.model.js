const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    joined: { type: Date, default: Date.now },
    type: {type: String, required: true},
    email: {type: String, required: true},
    home_phone: {type: String},
    cell_phone: {type: String},
    memberships: [{name: String}]
});


// Export the model
module.exports = mongoose.model('User', UserSchema)
