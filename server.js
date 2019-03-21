const PORT = process.env.PORT || 3000;
const BOT_URL = process.env.BOT_URL;
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, {"Location": BOT_URL});
    res.end();
}).listen(PORT);

module.exports = {
    http: http
};