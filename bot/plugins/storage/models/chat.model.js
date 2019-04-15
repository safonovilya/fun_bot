const mongoose = require('mongoose');

const chatSchema =  new mongoose.Schema({
    id: String,
    custom: {},
    users: [{
        id: String,
        custom: {}
    }]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;