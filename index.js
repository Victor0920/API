"use strict";

require("./src/env");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bvision-user:bvision-password@bvisioncluster.ha3na.mongodb.net/bvision-bbdd?retryWrites=true&w=majority",
  () => {
    console.log("connected to db");
  },
  (e) => console.error(e)
);

const app = require("./src/app");

app.listen(8081, () => {
  console.log("Server initialized!");
});
