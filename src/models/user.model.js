const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String},
    joined: { type: Date, default: Date.now },
    type: {type: String, required: true},
    email: {type: String, required: true, unique:true, trim: true, lowercase:true},
    home_phone: {type: String},
    cell_phone: {type: String},
    memberships: [{name: String}]
});


UserSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', UserSchema)
