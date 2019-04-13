const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique:true, trim: true, lowercase:true},
    password: {type: String},
    joined: { type: Date, default: Date.now },
    roles: [{type: String}],
    email: {type: String, required: true, unique:true, trim: true, lowercase:true},
    home_phone: {type: String},
    cell_phone: {type: String},
    memberships: [{name: String}]
});

UserSchema.pre('save', async function(next){
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
})

UserSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', UserSchema)
