const chatService = require('./chat.service');

function findUser(chatId, userId){
    return chatService.findChat(chatId)
        .then(chat => {
            return chat ? chat : chatService.saveChat(chatId)
        })
        .then(chat => {
            return {
                chat: chat.toObject(),
                user: chat.users.find(user => user.id === userId) || null
            }
        })
}

function createUser(chatId, userId){
    return chatService.findChat(chatId, userId)
        .then(chat => {
            let user = {
                id: userId,
                custom: {}
            };
            chat.users.push(user);
            chat.save();

            return user;
        });
}

function getInfo(chatId, userId){
    return Promise.resolve()
        .then(() => findUser(chatId, userId))
        .then(async chatInfo => {
            if (!chatInfo.user)
                chatInfo.user = await createUser(chatInfo.chat.id, userId);

            return chatInfo;
        })
        .catch(console.error)
}

module.exports = {
    getInfo
};