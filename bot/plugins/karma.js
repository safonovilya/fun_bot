const stat = {};
var multipliers = {k: 1000, m: 1000000};

function parseKString(string) {
    return parseFloat(string) * multipliers[string.charAt(string.length - 1).toLowerCase()];
}

// Export bot module
module.exports = {

    id: 'karma',
    defaultConfig: {},

    plugin(bot) {


        // TODO on picture or resource send in group
        // add inline keyboards like/dislike
        // like +100 karma dislike -100 karma

        bot.on(['photo', 'video'], msg => {
            const {chat} = msg;

            let replyMarkup = bot.inlineKeyboard([
                [
                    bot.inlineButton('like', {callback: `${msg.message_id}_${msg.from.username}_like`}),
                    bot.inlineButton('unlike', {callback: `${msg.message_id}_${msg.from.username}_unlike`}),
                ]
            ]);

            const replyToMessage = msg.message_id;
            bot.sendMessage(chat.id, 'vote', {replyMarkup});
        });

        bot.mod('message', (data) => {
            const {message} = data;
            const {chat, entities, from} = message;

            if (message.edit_date) {
                return data;
            }
            if (/\/top/i.test(message.text)) {

                const top = [];
                for (let k in stat) {
                    top.push([k, stat[k]]);
                }

                top.sort(function (a, b) {
                    return b[1] - a[1];
                });

                let str = top.splice(0, 10).map(x => {
                    return x[0] + ' ' + x[1]
                }).join('\n');
                return bot.sendMessage(chat.id, str);
            }


            if (entities) {
                const mention = entities.find(e => e.type === 'mention');
                let text = spliceSplit(message.text, mention.offset, mention.length);
                // todo: support multiply mentioned
                let user = message.text.slice(mention.offset, mention.length);

                try {
                    const karma = parseKString(text.toLowerCase());

                    if (chat.type === 'group' || chat.type === 'supergroup') {
                        stat[user] = (stat[user] || 0) + karma;
                        bot.sendMessage(chat.id, `${from.username} give ${karma} karma to ${user}(${stat[user]})`);
                    }
                    return data;
                } catch (e) {
                    console.log(e);
                }
            }
            return data;
        });

    }
};

function spliceSplit(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
}