var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {sequelize} = require('./models');
var passport = require('passport');
const passportConfig = require('./passport');

require('dotenv').config();
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const interestRouter = require('./routes/interest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/interest', interestRouter);
//app.use('/gauth', gauthRouter);
//app.use('/mail', mailRouter);
passportConfig(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

sequelize.sync();

//passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;