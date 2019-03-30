const stat = {

};
const multipliers = {
    k: 1000,
    m: 1000000,
    kk: 1000000,
};
const POST_KARMA_COST = 100;

function parseKString(string) {
    const multiplier = /([a-z]+)$/.exec(string);
    const number = parseFloat(string);

    if (Number.isInteger(number)) {
        if (multiplier && multipliers[multiplier[0].toLowerCase()]) {
            return number * multipliers[multiplier[0].toLowerCase()];

        }
        return number
    }
    return null
}

function getInlineKeyBoard(bot, likeCount, unlikeCount) {
    return bot.inlineKeyboard([
        [
            bot.inlineButton(`like ${likeCount}`, {callback: `like_${likeCount}_${unlikeCount}`}),
            bot.inlineButton(`unlike ${unlikeCount}`, {callback: `unlike_${likeCount}_${unlikeCount}`}),
        ]
    ]);
}

function getStat(likeCount, unlikeCount) {
    const total = likeCount - unlikeCount;
    return `karma: ${total * POST_KARMA_COST}`
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
            let replyMarkup = getInlineKeyBoard(bot, 0, 0);
            const replyToMessage = msg.message_id;
            bot.sendMessage(chat.id, 'vote', {replyToMessage, replyMarkup});
        });

        bot.on('callbackQuery', msg => {
            const [like, l, ul] = msg.data.split('_');
            const {message, from} = msg;
            const {chat, message_id, reply_to_message} = message;
            const user = `@${from.username}`;
            let likeCount = +l;
            let unlikeCount = +ul;
            if (like === 'like') {
                likeCount++
                stat[userId] = (stat[userId] || 0) + POST_KARMA_COST;
            } else {
                unlikeCount++
                stat[userId] = (stat[userId] || 0) - POST_KARMA_COST;
            }
            const statStr = getStat(likeCount, unlikeCount);

            let replyMarkup = getInlineKeyBoard(bot, likeCount, unlikeCount);
            bot.editMessageText({
                chatId: chat.id,
                messageId: message_id
            }, `${statStr}`, {replyToMessage: reply_to_message, replyMarkup});

            return bot.answerCallbackQuery(msg.id, `Inline button callback: ${msg.data}`, true);
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
                return bot.sendMessage(chat.id, str, {replyMarkup: null});
            }

            const mention = entities && entities.find(e => e.type === 'mention' || e.type === 'text_mention');
            if (entities) {
                let text = spliceSplit(message.text, mention.offset, mention.length);
                // todo: support multiply mentioned
                let user = message.text.slice(mention.offset, mention.length);
                const userId = mention.user.id;

                try {
                    const karma = parseKString(text.toLowerCase());

                    if (chat.type === 'group' || chat.type === 'supergroup') {
                        stat[userId] = stat[userId] || {
                            name: mention.user.username || mention.user.firstName,
                            karma: 0
                        };
                        stat[userId].karma += karma;
                        bot.sendMessage(chat.id, `${from.username} give ${karma} karma to ${user}(${stat[userId]})`);
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