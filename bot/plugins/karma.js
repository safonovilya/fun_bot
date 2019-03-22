// Export bot module
module.exports = {

    id: 'karma',
    defaultConfig: {},

    plugin(bot) {


        bot.mod('message', (data) => {
            const {message} = data;
            const {chat} = message;
            const fromId = message.from.id;

            let top = [];

            // топ  - статистика
            // + %number%[k+] : 1k = 1000; 1kk = 1000000
            if (chat) {
                const chatId = chat.id;
                const msgText = data.message.text;

                if(/top/i.test(msgText)) {
                    for (let k in stats) {
                        top.push([k, stats[k]]);
                    }
        
                    top.sort(function(a, b) {
                        return b[1] - a[1];
                    });

                    let str = top.splice(0,10).map( x => { return x[0]+' '+x[1] }).join('\n');
                    bot.sendMessage(chatId, str);
                }

                if(/@\w+\s+d+/.test(msgText)) {
                    let str = msgText.match(/@\w+\s+d+/)[0];
                    let mult = Math.pow(1000, (str.match(/k/g)||[]).length);
                    let add = +str.match(/\d+/g)[0]* mult;
                    if(stat[fromId]) {
                        stats[fromId].score += add;
                    } else {
                        stats[fromId].score = 0;
                    }
                }
                // если в тексте ссылка на пользователя и паттерн %+число%
                // добавить карму
            }
            return data;

        });

    }
};
