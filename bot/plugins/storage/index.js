const
    storage = require('./storage'),
    {getInfo} = require('./services/user.service'),
    {save} = require('./services/chat.service');

module.exports = {

    id: 'storage',
    defaultConfig: {},

    plugin(bot) {
        bot.mod('message', (data) => {
            let msg = data.message;
            data.storage = {
                info: getInfo(msg.chat.id, msg.from.id),
                save
            };
            return data;
        })
    }
};
