const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = express.Router();
const Item = require('../models/user_model');

router.post('/delete', async (req, res) => {
  const checkedItemId = await req.body.newItem;
  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (!err) {
      res.redirect('/');
    }
  });
});

module.exports = router;
