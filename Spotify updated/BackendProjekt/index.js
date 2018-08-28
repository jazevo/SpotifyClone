const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const config = require('config');

const db = mongoose.connection;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use(bodyparser.text());
app.use(bodyparser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);

app.listen(config.port);

console.log('Listening on port: ' + config.port + '...');

module.exports=app;