"use strict";

require("./src/env");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/bvision-bbdd",
  () => {
    console.log("connected to db");
  },
  (e) => console.error(e)
);

const app = require("./src/app");

app.listen(3000);
