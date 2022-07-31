var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect(
  "mongodb+srv://Bharath_xD:Saibharat%40123@cluster0.cgaoktp.mongodb.net/todolistDB?retryWrites=true&w=majority"
);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

module.exports = Item;
