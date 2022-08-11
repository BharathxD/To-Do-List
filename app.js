'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

/* - Routes - */

const home = require('./routes/home.js');
const deleteItem = require('./routes/deleteItem.js');

/* ---------- */

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/* Home Route */

app.use(home);

/* Delete Route */

app.use(deleteItem);

/* Server */

let http = require('http');
let server = express().use('/', app);
http.createServer(server).listen(port, () => {
  console.log(`Listening on ${port}`);
});