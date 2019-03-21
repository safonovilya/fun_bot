const pluralize = require('pluralize-ru');
const moment = require('moment');

module.exports = {

    id: 'bigban',
    defaultConfig: {},

    plugin(bot, pluginConfig) {

        bot.mod('message', (data) => {

            if (data.message.chat) {
                const chatId = data.message.chat.id;
                const msgText = data.message.text;

                if (/сколько время?/.test(msgText)) {
                    const str = `${pluralize(moment().minute(), 'ноль блять минут', '%d ебана минута', '%d минуты', '%d гребаных минут')}`;
                    bot.sendMessage(chatId, `🕰 ding-dong ${str}`, {replyToMessage: data.message.id});
                }
            }
            return data;

        });

    }
};
