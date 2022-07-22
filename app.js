const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://Bharath_xD:Saibharat%40123@cluster0.cgaoktp.mongodb.net/todolistDB?retryWrites=true&w=majority");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "To-Do-List",
});

const defaultItems = [item1];

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } 
      });
      res.redirect("/");
    }
    else 
    {
    res.render("list", {
      listTitle: date,
      newListItems: foundItems,
    });
   }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.addItem;
   if(req.body.submit==="submit"){
    if (itemName.length===0){
      res.redirect("/");
    }
    Item.deleteOne({name: "To-Do-List"}, function(err, result) {});
    const item = new Item({
      name: itemName
    });
    item.save();
    setTimeout(function() {
      res.redirect("/");
    }, 100);
  }
   if(req.body.reset==="reset"){
    Item.deleteMany({}, function(err) { 
      res.redirect("/");
  });
  
}
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.newItem;
    Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err){
      res.redirect("/");
    }
  });  
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.newItem;
    Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err){
      res.redirect("/");
    }
  });  
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.newItem;
    Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err){
      res.redirect("/");
    }
  });  
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
