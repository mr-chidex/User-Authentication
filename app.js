const express =  require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use(userRoute);

app.use((error, req, res, next) => {
    res.status(500).json({message: "Server Error : Sorry for the inconvenience, we're fixing this", error: error.message});
})

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    app.listen(port, () => console.log(`server running on port ${port}...`) ); 
})
.catch(err => {
    const error = new Error('Unable to connect to database')
    return next(error);
});
