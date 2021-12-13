require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//const favicon = require('serve-favicon');
//const bodyParser = require('body-parser');
const passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');
//require('./app_server/models/db');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
// const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const usersRouter = require('./app_server/routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

// app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use('/api', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, \
  Context-Type, Accept, Authorization');
  next();
});


// app.get('*', function(req, res, next) {
//  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
// });

app.get(/(\/about)|(\/location\/[a-z0-9]{24})/, function(req, res, next){
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
  });

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message" : err.name + ": " + err.message});
  }
});

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
