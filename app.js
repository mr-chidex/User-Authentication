const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const logger = require("./handlers/logger")
const userRoute = require('./routes/user');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use(userRoute);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
    logger.log("error", error.message)
})

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        logger.log("info", `db connected...`);
        app.listen(port, () => logger.log("info", `server running on port ${port}...`));
    })
    .catch(err => {
        const error = new Error('Unable to connect to database')
        next(error);
    });
