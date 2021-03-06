const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/v1/account');
const projects = require('./routes/api/v1/project');
const tasks = require('./routes/api/v1/task');

//passport config
require('./config/passport');
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

app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);

/*********************SET UPS*************************/

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*********************PORT*************************/
const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`***********Dev Server Running on Port ${port}***********`)
);
/*********************PORT*************************/
