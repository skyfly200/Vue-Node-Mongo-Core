const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConversationSchema = new Schema({
    id: {type: String, required: true},
    created: {type: Date, default: Date.now},
    creator: {type: String, required: true},
    title: {type: String},
    members: {type: Array},
    messages: {type: Array},
});


// Export the model
module.exports = mongoose.model('Conversation', ConversationSchema)
