var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var contacts = require('./modules/contacts');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
//var mirouter = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Contacts--------
app.get('/contacts', function(req, res){
  var get_params = url.parse(req.url, true).query;
  if (Object.keys(get_params).length == 0) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(contacts.list()));
  } else {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(contacts.query_by_arg(get_params.arg, get_params.value)));
  }
});
app.get('/contacts/:number', function(req, res){
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.query(req.params.number)));
});
app.get('/groups', function(req, res){
  console.log('groups');
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.list_groups()));
});
app.get('/groups/:name', function(req, res){
  console.log('groups name');
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(contacts.get_members(req.params.name)));
})
//Contacts--------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
