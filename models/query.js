let mongoose = require('mongoose');

// Shoe schema
let querySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

let Query = module.exports = mongoose.model('Query', querySchema, 'queries');
