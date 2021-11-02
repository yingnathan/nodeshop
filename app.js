const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/goldenshoe');
let db = mongoose.connection;

// Check connection
db.once('open', () => console.log('Connected to MondoDB'));

// Check for DB errors
db.on('error', (err) => console.log(err));

// Init app
const app = express();

// Import model
let Shoe = require('./models/shoe');

// Import query model
let Query = require('./models/query');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/JSON
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Create Routes
// Home Route
app.get('/', (req, res) => {
  Shoe.find({id: {
    $in: [1,2,3]
  }}, (err, shoes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        shoes: shoes
      });
    }
  });
});

app.get('/shoes', (req, res) => {
  Shoe.find({}, (err, shoes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('allshoes', {
        shoes: shoes
      });
    }
  });
});

app.get('/faqs?', (req, res) => {
  res.render('faqs');
});

// Submit POST route
app.post('/faqs', (req, res) => {
  let query = new Query();
  query.title = req.body.title;
  query.query = req.body.query;
  query.name = req.body.name;
  query.email = req.body.email;


  query.save(function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Route Files
let shoes = require('./routes/shoes');
app.use('/shoe', shoes);

// Start server
let portNumber = process.env.PORT || 4000;
app.listen(portNumber, () => {
  console.log(`Server started on port: ${portNumber}`);
});
