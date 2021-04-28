const bodyParser = require("body-parser");
const express = require("express");
const hbs = require('hbs');
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "hbs");
app.use(express.static("public"));
const pages = require("./routers/pages");
const birdRouter = require("./routers/birds");
const sightingRouter = require("./routers/sighting");
hbs.s
console.log(__dirname);
app.set("views", __dirname + "/views");
app.use(pages);
app.use(birdRouter);
app.use(sightingRouter);

app.listen(port, () => {
  console.log("Server is running on Port" + port);
});
