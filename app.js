import express from "express";
const app = express();
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3000;

/* - Routes - */

import home from "./routes/home.js";
import deleteItem from "./routes/deleteItem.js";

/* ---------- */

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Home Route */

app.use(home);

/* Delete Route */

app.use(deleteItem);

/* Server */

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
