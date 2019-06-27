const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const passport = require('passport');

//passport config
require('./config/passport')(passport);
/*********************REQUIRES*************************/

/*********************SET UPS*************************/
const app = express();

//express recognizes the use of the following four params as
//an error handling function.
//use 'next' in the router files to have those send the errors
//to this middleware.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: 'error',
    message: err.message
  });
});

//cors
app.use(
  cors({
    origin: process.env.CORS_DEV_ORIGIN,
    credentials: true
  })
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//passport middleware
app.use(passport.initialize());
