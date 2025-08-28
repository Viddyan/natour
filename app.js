const express = require('express');
const app = express();
app.set('query parser', str => require('qs').parse(str));
const morgan = require('morgan');
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(
    `${__dirname}/public`
))

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');  

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;