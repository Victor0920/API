"use strict";

require("./src/env");

const mongoose = require("mongoose");

// const User = require("./src/models/user");

mongoose.connect(
  "mongodb://localhost/bvision-bbdd",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

// createUser();

// async function createUser() {
//   try {
//     const user = await User.create({ name: "Kyle2", age: 25 });
//     console.log(user);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

const app = require("./src/app");

app.listen(3000);
