// require
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');

// routes
var login_userRouter = require('./routes/login_user');
var logoutRouter = require('./routes/logout');
var logsRouter = require('./routes/logs');
var personal_logsRouter = require('./routes/personal_logs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Session
app.use(session({ cookie: { maxAge: 60000},
  secret: 'keyboard cat'
  
}));
// passport
app.use(passport.initialize());
app.use(passport.session());

/*app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);

});*/

// api routes
app.use('/api/login', login_userRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/logs', logsRouter);
app.use('/api/personal_logs', personal_logsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// listen on
var port = 3030;
app.listen (port , function () {
console.log(' app listening on port ' + port);
});

module.exports = app;
