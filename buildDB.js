'use strict';

console.log("Building databases.")

const mongoose = require('mongoose');
const uri = 'mongodb://localhost/goldenshoe';
const conn = mongoose.createConnection(uri);
const Schema = mongoose.Schema;
const collectionName = 'shoes';

// Check if shoes collection exists
conn.dropCollection(collectionName, function(err, result) {
  if (err) {
    console.log(`Drop ${collectionName} collection failed. Error: ${err}`);
  } else {
    console.log(`Collection called ${collectionName} dropped successfully.`)
  }
});

const shoeSchema = new Schema(
  {
    id: {type: Number, unique: true},
    title: String,
    brand: String,
    gender: String,
    sizes: [],
    price: String,
    imageFileName: String,
    fit: Number
  },
  {
    collection: collectionName
  }
);

const ShoeCollection = conn.model(collectionName, shoeSchema);

// Query schema
let querySchema = new Schema(
  {
    title: String,
    query: String,
    name: String,
    email: String
  },
  {
    collection: "queries"
  }
);

const QueryCollection = conn.model("queries", querySchema);

const shoes = [
    {
      id: 1,
      title: 'Mercurial',
      brand: 'Nike',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 159.99,
      imageFileName: "nike-mercurial.jpg",
      fit: 9
    },
    {
      id: 2,
      title: 'Predator',
      brand: 'Adidas',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 105,
      imageFileName: "adidas-predator.jpg",
      fit: 8
    },
    {
      id: 3,
      title: 'Eclipse Ultra 1.3 FG',
      brand: 'Puma',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 180,
      imageFileName: "puma-eclipse.jpg",
      fit: 1
    },
    {
      id: 4,
      title: 'Predator freak .1 FG',
      brand: 'Adidas',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 180,
      imageFileName: "adidas-freak.jpg",
      fit: 4
    },
    {
      id: 5,
      title: 'Phantom GT Club FG',
      brand: 'Nike',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 38,
      imageFileName: "nike-phantom.jpg",
      fit: 1
    },
    {
      id: 6,
      title: 'Stadio',
      brand: 'Lotto',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 160,
      imageFileName: "lotto-green.jpg",
      fit: 1
    },
    {
      id: 7,
      title: 'B-Elite Italia Tech FG',
      brand: 'Diadora',
      gender: 'Mens',
      sizes: ["7:10", "8:9", "9:1", "10:9", "11:3"],
      price: 180,
      imageFileName: "diadora-red.jpg",
      fit: 8
    },
];

conn.once('connected', function (err) {
  if (err) {
    return console.error(err);
  }

  ShoeCollection.insertMany(shoes, function (err, doc) {
    if (err) {
      return console.error("Insert many error: ", err);
    }
    return conn.close();
  });
})
