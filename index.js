require('dotenv').config();
const server = require('./server');
const {bot} = require('./bot/index');

const moment = require('moment');
moment.locale('ru');

// MENU
require('./bot/commands/start');


bot.start();