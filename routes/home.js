import express from "express";
const router = express.Router();
import Item from "../models/user_model.js";
import { date } from "../public/js/date.js";

/* Default Item in the List */

const defaultItem = new Item({
  name: "To-Do-List",
});

/* Home Route */

router.get("/", (req, res) => {
  Item.find((err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItem, (err) => {
        err ? console.log(err) : res.redirect("/");
      });
    } else {
      res.render("list", {
        listTitle: date(),
        newListItems: foundItems,
      });
    }
  });
});

router.post("/", async (req, res) => {
  const itemName = req.body.addItem;
  const addTime =
    req.body.addTime.length === 0
      ? `Time not Specified`
      : `at ${req.body.addTime}`;

  if (req.body.submit === "submit") {
    if (itemName.length === 0) {
      res.redirect("/");
    } else {
      Item.deleteOne({ name: "To-Do-List" });
      const item = new Item({
        name: itemName,
        time: addTime,
      });
      await item.save();
      res.redirect("/");
    }
  }
  if (req.body.reset === "reset") {
    Item.deleteMany((err) => {
      !err ? res.redirect("/") : console.log(err);
    });
  }
});

export default router;
