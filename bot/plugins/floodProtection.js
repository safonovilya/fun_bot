/*
    Simple flood protection plugin.
    Note: Received Telegram message time accuracy is one second.
*/

const userList = {};

// Export bot module
module.exports = {

    id: 'floodProtection',
    defaultConfig: {
        stickerInterval: 300,
        message: 'Too many messages, relax!'
    },

    plugin(bot, pluginConfig) {

        const interval = Number(pluginConfig.stickerInterval) || 1;
        const text = pluginConfig.message;

        bot.mod('message', (data) => {

            const {message} = data;
            const msg = message;
            const id = msg.from.id;
            const user = userList[id];
            const now = new Date(msg.date);

            if (user && message.sticker) {

                const diff = now - user.lastTime;
                console.log(diff);
                user.lastTime = now;

                if (diff <=  interval) {

                    if (text) bot.sendMessage(id, text);
                    user.flood = true;
                    const {chat} = message;
                    if (chat.type === 'group' && message.sticker) {
                        bot.deleteMessage(chat.id, data.message.message_id);
                        bot.sendMessage(chat.id, 'flood sticker protection, 1 в 5 минут');
                    }

                    userList[id] = {lastTime: now};
                    data.message = {};

                }

            } else {
                userList[id] = {lastTime: now};
            }

            return data;

        });

    }
};