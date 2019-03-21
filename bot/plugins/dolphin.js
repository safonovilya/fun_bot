// Export bot module
module.exports = {

    id: 'dolphin',
    defaultConfig: {
        interval: 1,
        message: '🐬 iiii iii ii iiiiii ii ii iiiii'
    },

    plugin(bot, pluginConfig) {

        const text = pluginConfig.message;

        bot.mod('message', (data) => {

            const msg = data.message;
            const msgText = data.message.text;
            const id = msg.from.id;

            if (data.message.chat && /[iи]+/i.test(msgText)) {
                const chatId = data.message.chat.id;

                // bot.sendMessage(chatId, text);
                // data.message = {};

            }

            return data;

        });

    }
};