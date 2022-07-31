const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = express.Router();
const Item = require('../models/user_model');
const date = require('../public/js/date');

/* Default Item in the List */

const defaultItem = new Item({
  name: 'To-Do-List',
});

router
  .route('/')
  .get((req, res) => { // GET
    Item.find((err, foundItems) => {
      if (foundItems.length === 0) { 
        Item.insertMany(defaultItem, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            res.redirect('/');
          }
        });
      } else {
        res.render('list', {
          listTitle: date,
          newListItems: foundItems,
        });
      }
    });
  })
  .post(async (req, res) => { // POST
    const itemName = req.body.addItem;
    const addTime = 'at '+ req.body.addTime;
    if (req.body.submit === 'submit') {
      if (itemName.length === 0) {
        res.redirect('/');
      } else {
        Item.deleteOne({ name: 'To-Do-List' }, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
        const item = new Item({
          name: itemName,
          time: addTime,
        });
        await item.save();
        res.redirect('/');
      }
    }
    if (req.body.reset === 'reset') {
      Item.deleteMany((err) => {
        if (!err) {
        res.redirect('/');
        }
        else 
        {
          console.log(err);
        }
      });
    }
  });

module.exports = router;
