const Chat = require('../models/chat.model');

function findChat(chatId){
    return Chat.findOne({ id: chatId });
}

function saveChat(id){
    if(!id)return Promise.reject();

    return Chat.create({ id: id, users: [] })
        .catch(console.error)
}

function updateChat(id, customData){
    return Chat.findOne({ id: id })
        .then(chat => {
            Object.assign(chat, customData);
            chat.save();
            return chat;
        })
        .catch(console.error)
}

module.exports = {
    findChat,
    saveChat,
    save: updateChat
};