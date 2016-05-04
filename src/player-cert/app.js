var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

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

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/', routes);
app.use('/users', users);
app.use('/api', router);

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

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('player-cert', 'username', 'secret', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: './data/player-cert.sqlite'
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


var Referee = sequelize.define('referees', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  emailAddress: {
    type: Sequelize.STRING,
    field: 'email_address'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password' 
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

var Player = sequelize.define('players', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  emailAddress: {
    type: Sequelize.STRING,
    field: 'email_address'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password' 
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

var Team = sequelize.define('teams', {
  teamName: {
    type: Sequelize.STRING,
    field: 'team_name'
  },
  city: {
    type: Sequelize.STRING,
    field: 'city'
  },
  state: {
    type: Sequelize.STRING,
    field: 'state'
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Player.belongsTo(Team);

/*
var fs = require("fs");
var file = "./data/player-cert.db";
//var file = "player-cert.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
//create initial db if it doesn't exist
db.serialize(function() {
  if(!exists) {
    console.log("did not exist")
    db.run("CREATE TABLE Referees (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email_address TEXT, password TEXT)");
    db.run("CREATE TABLE Players (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email_address TEXT, password TEXT)");
    db.run("CREATE TABLE Teams (id INTEGER PRIMARY KEY, name TEXT, city TEXT, state TEXT)");
    db.run("CREATE TABLE Team_Players (id INTEGER PRIMARY KEY, player_id INTEGER, team INTEGER)");
  }
});
*/

var msg = "hello world";
console.log(msg)