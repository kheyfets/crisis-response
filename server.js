// Express setup
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

// Models
const Alert = require('./models/alert');

// how prioritize, feature impact, technical considerations, legal, user adoption

// Set up middleware
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
  Alert.find({}, function(err, results) {
    res.render('dashboard', {
      alerts: results
    });
  });
});

// POST /api/alert/new
// Send alert to headquarters
app.post('/api/alert/new', function(req, res) {
  var alert = new Alert({
    priority: req.body.priority,
    issueType: req.body.issueType,
    flightNumber: req.body.flightNumber,
    seatNumber: req.body.seatNumber,
    passengerName: req.body.passengerName,
    crewId: req.body.crewId,
    comments: req.body.comments,
  });

  alert.save(function(err, alert) {
    res.render('alert', {
      message: 'Alert succesfully posted'
    });
  });
});

app.listen(3001, function() {
  console.log('Crisis Response Demo running in port 3001');
});