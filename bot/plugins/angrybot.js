const phrase = [
    'чего тебе, кожанный мешок?',
    'че надо кусок мяса?'
];

// Export bot module
module.exports = {

    id: 'angry',
    defaultConfig: {
    },

    plugin(bot, pluginConfig) {


        bot.mod('message', (data) => {

            if (data.message.chat) {
                const chatId = data.message.chat.id;
                const msgText = data.message.text;

                if (msgText === 'бот') {
                    bot.sendMessage(chatId, phrase[Math.floor(Math.random() * phrase.length)]);
                } else if (/(bot)|(бот)/i.test(msgText)) {
                    bot.sendMessage(chatId, 'чё опять?!', { replyToMessage: data.message.id });
                }
            }
            return data;

        });

    }
};
