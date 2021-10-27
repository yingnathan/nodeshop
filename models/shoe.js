let mongoose = require('mongoose');

// Shoe schema
let shoeSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  imageFileName: {
    type: String,
    required: true
  },
  fit: {
    type: Number,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  }
});

let Shoe = module.exports = mongoose.model('Shoe', shoeSchema, 'shoes');
