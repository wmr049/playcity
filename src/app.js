'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')

const app = express();
app.set('trust proxy', true);
const router = express.Router();

//Conectar ao banco de dados
mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString)

//Carregar os Models
const Music = require('./models/music');
const Log = require('./models/log');
const User = require('./models/user');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const logRoute = require('./routes/log-route');
const userRoute = require('./routes/user-route');
const weatherRoute = require('./routes/weather-route');
const playcityRoute = require('./routes/playcity-route');

app.use(bodyParser.json({
    limit:'5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(global.APIVERSION + '/', indexRoute);
app.use(global.APIVERSION + '/logs', logRoute);
app.use(global.APIVERSION + '/users', userRoute);
app.use(global.APIVERSION + '/weathers', weatherRoute);
app.use(global.APIVERSION + '/playcities', playcityRoute);

module.exports = app;

