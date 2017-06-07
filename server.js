// Express setup
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Display form
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', index.html));
});

// Send alert to headquarters
app.post('/api/crew/alert', function(req, res) {
  // Take data and store in database
  // Send out e-mail
});

app.listen(3001, function() {
  console.log('Crisis Response Demo running in port 3001');
});