const stat = {

};
// Export bot module
module.exports = {

    id: 'karma',
    defaultConfig: {},

    plugin(bot) {


        bot.mod('message', (data) => {
            const {message} = data;
            const {chat} = message;

            // топ  - статистика
            // + %number%[k+] : 1k = 1000; 1kk = 1000000
            if (chat) {
                // если в тексте ссылка на пользователя и паттерн %+число%
                // добавить карму
            }
            return data;

        });

    }
};
