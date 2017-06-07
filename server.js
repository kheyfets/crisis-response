// Express setup
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

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
  res.json({
    'message': 'ayy'
  });
});

// GET /dashboard
// Show dashboard
app.get('/dashboard', function(req, res) {
  res.json({
    'message': 'ayy'
  });
});

// POST /api/alert/new
// Send alert to headquarters
app.post('/api/alert/new', function(req, res) {
  // Take data and store in database
});

app.listen(3001, function() {
  console.log('Crisis Response Demo running in port 3001');
});