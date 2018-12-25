const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const noteRoutes = require("./api/routes/noteRoute");

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/note', noteRoutes);

app.use((req, res, next) => {
    const error =  new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});

const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("**********Successfully connected to the database**********");    
}).catch(err => {
    console.log('**********Connection to the database failed!**********', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notes application. Organize and keep track of your notes."});
});

module.exports = app;