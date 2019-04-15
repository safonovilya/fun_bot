let path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), '.env')
});
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME || 'KOLKA_DB'}`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', () => {
    console.error('DB connection error')
});
db.once('open', () => {
    console.log('DB connected');
});
