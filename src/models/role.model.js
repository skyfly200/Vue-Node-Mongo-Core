const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = new Schema({
    title: {type: String, required: true},
    created: { type: Date, default: Date.now },
    actions: {type: Array},
});

// Export the model
module.exports = mongoose.model('Role', RoleSchema)
