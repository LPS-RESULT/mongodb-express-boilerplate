/**
 * Running App without configuration
 * Defaults to Local or Development Environment
 *
 * To Deploy in Production or Testing Environment
 * the following should be configured
 * process.env.PORT = 3000
 * process.env.NODE_ENV = "production"
 * process.env.LOGGER = "short"
 */

require('dotenv').config();

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./app/app-router');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

/**
 * NOT FOUND HANDLING
 */
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const port = process.env.APP_PORT || 80;

app.listen(port, () => {
  console.log('Server running');
});
