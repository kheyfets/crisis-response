// Express setup
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('req-flash');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Database connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URL || 'localhost/ia');

// Models
const Alert = require('./models/Alert');

// Set up middleware
app.use(cookieParser());
app.use(session({ secret: 'kittycat' }));
app.use(flash({locals: 'flash'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GET /
// Display form
app.get('/', function(req, res) {
  res.render('alert');
});

// GET /dashboard
// Show dashboard
app.get('/dashboard', function(req, res) {
  // Take data and store in database
  Alert.find({}).sort({priority: -1, created: -1}).exec(function(err, results) {
    res.render('dashboard', {
      data: results
    });
  });
});

// POST /api/alert/new
// Send alert to headquarters
app.post('/alert/new', function(req, res) {
  var alert = new Alert({
    priority: req.body.priority,
    issueType: req.body.issueType,
    flightNumber: req.body.flightNumber,
    comments: req.body.comments,
  });

  alert.save(function(err, alert) {
    // Emit info to sockets
    io.sockets.emit('alert:new', alert);

    req.flash('success', 'Alert succesfully posted');
    res.redirect('/');
  });
});

// Sockets
server.listen(3001, function() {
  console.log('Crisis Response Demo running in port 3001');
});