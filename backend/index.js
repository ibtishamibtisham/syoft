const express = require("express");
// const bodyparser = require("body-parser");
app = express();
// app.use(bodyparser.json());
app.use(express.json());
// app.use(bodyparser.urlencoded({ extended: false }));

const mongoose = require("mongoose");

//   ..include .env
require("dotenv").config();
// var cors = require("cors");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
const controller = require("./src/controllers/signup.controller");
//middleware for json convertor parsing request of content-Type:json
app.use(express.json());
app.use("/", controller);
// app.use(express.static(path.join(__dirname, "index.js")));

// console.log(process.env.JWT_ACCESS_KEY);
// const options = {
//   origin: false,
//   Credentials: true,
// };
// app.use(cors());
const db =
  "mongodb+srv://ibtisham:ibtisham1@cluster0.ufyhk.mongodb.net/?retryWrites=true&w=majority";
function connect() {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("connected"))
    .catch((err) => {
      console.log("not");
    });
}

const port = process.env.PORT || 3001;
// console.log(process.env.pt);
app.listen(port, async () => {
  await connect();
  console.log("Server is live on port 5001");
});
