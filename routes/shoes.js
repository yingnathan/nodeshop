const express = require('express');
const router = express.Router();

// Import shoe model
let Shoe = require('../models/shoe');

// Get Shoe Route
router.get('/:id', (req, res) => {
  Shoe.findById(req.params.id, (err, shoe) => {
    res.render('shoe', {
      shoe:shoe
    });
  });
});

// Load edit form
router.get('/edit/:id', (req, res) => {
  Shoe.findById(req.params.id, (err, shoe) => {
    res.render('edit_shoe', {
      title: 'Edit Shoe',
      shoe:shoe
    });
  });
});

// Update and submit POST route
router.post('/edit/:id', (req, res) => {
  let shoe = {};
  shoe.title = req.body.title;
  shoe.brand = req.body.brand;
  shoe.gender = req.body.gender;
  shoe.price = req.body.price;
  shoe.sizes = req.body.sizes;
  shoe.imageFile = req.body.imageFileName;

  let query =  {_id:req.params.id};

  Shoe.update(query, shoe, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
