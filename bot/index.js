require('dotenv').config();
const TOKEN = process.env.TELEGRAM_TOKEN;
console.log(TOKEN);
const TeleBot = require('telebot');
const bot = new TeleBot({
    token: TOKEN, // Required. Telegram Bot API token.
    /* webhook: { // Optional. Use webhook instead of polling.
         key: 'key.pem', // Optional. Private key for server.
         cert: 'cert.pem', // Optional. Public key.
         url: 'https://....', // HTTPS url to send updates to.
         host: '0.0.0.0', // Webhook server host.
         port: 443, // Server port.
         maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
     },*/
    allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
    usePlugins: ['storage', 'bigben', 'angrybot'], // Optional. Use user plugins from pluginFolder.
    pluginFolder: `${__dirname}/plugins/`, // Optional. Plugin folder location.
    pluginConfig: { // Optional. Plugin configuration.
        // myPluginName: {
        //   data: 'my custom value'
        // }
    }
});
module.exports = {bot};