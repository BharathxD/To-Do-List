const express = require('express');
const router = express.Router();
const Item = require('../models/user_model');

router.post('/delete', async (req, res) => {
  const checkedItemId = await req.body.newItem;
  Item.findByIdAndRemove(checkedItemId, (err) => {
     !err ? res.redirect('/') : console.log(err);
  });
});

module.exports = router;
