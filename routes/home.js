const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const router = express.Router();
const Item = require("../models/user_model");
const date = require("../public/js/date");

const item = new Item({
  name: "To-Do-List",
});

router
  .route("/")
  .get((req, res) => {
    Item.find({}, (err, foundItems) => {
      if (foundItems.length === 0) {
        Item.insertMany(item, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.redirect("/");
      } else {
        res.render("list", {
          listTitle: date,
          newListItems: foundItems,
        });
      }
    });
  })
  .post(async (req, res) => {
    const itemName = req.body.addItem;
    if (req.body.submit === "submit") {
      if (itemName.length === 0) {
        res.redirect("/");
      } else {
        Item.deleteOne({ name: "To-Do-List" }, (err, result) => {});
        const item = new Item({
          name: itemName,
        });
        await item.save();
        res.redirect("/");
      }
    }
    if (req.body.reset === "reset") {
      Item.deleteMany({}, (err) => {
        res.redirect("/");
      });
    }
  });

module.exports = router;
