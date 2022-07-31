const { config } = require('dotenv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose.connect(
  'mongodb+srv://Bharath_xD:'
   + process.env.DB_PASS +
  '@cluster0.cgaoktp.mongodb.net/todolistDB?retryWrites=true&w=majority'
);

const itemsSchema = {
  name: String,
  time: String,
};

module.exports = mongoose.model('Item', itemsSchema);
