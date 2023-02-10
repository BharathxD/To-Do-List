import express from "express";
const router = express.Router();
import Item from "../models/user_model.js";

router.post("/delete", async (req, res) => {
  const checkedItemId = await req.body.newItem;
  Item.findByIdAndRemove(checkedItemId, (err) => {
    !err ? res.redirect("/") : console.log(err);
  });
});

export default router;
