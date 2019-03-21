const log = console.log;
const {bot} = require('../index');


bot.on(['/start', '/back'], msg => {

    let replyMarkup = bot.keyboard([
        ['/Dolphin', '/bigben']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'поехали?', {replyMarkup});

});
