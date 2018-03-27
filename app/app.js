var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var admin = require('./routes/admin');
var developers = require('./routes/developers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Modification incase of news.storeco.in
app.use(function(req, res, next) {
  var host = req.headers.host;

  res.locals.URL = function(val) {
    if (host.search('news.storeco.in') >= 0) {
      return "https://storeco.in" + val;
    }

    return val;
  };

  next();
});

// Sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard blocks',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// /admin Pages require login
function requireLogin(req, res, next) {
  if (req.session.authenticated) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/login"); // or render a form, etc.
  }
}

app.all("/admin/*", requireLogin, function(req, res, next) {
  next(); // if the middleware allowed us to get here,
          // just move on to the next route handler
});

// Assign all routes
app.use('/', index);
app.use('/admin', admin);
app.use('/developers', developers);


// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('notfound', { url: req.url, meta: null });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
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

module.exports = app;
