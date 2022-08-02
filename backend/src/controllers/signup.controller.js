// const loginModel = require("../models/signup.models");
const express = require("express");
const mongoose = require("mongoose");
const obj = require("mongodb").ObjectId;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const homemodel = require("../models/home.model");
app = express();
const signupModel = require("../models/signup.model");
// const homeModel = require("../models/home.model");
const productsModel = require("../models/product.model");
require("dotenv").config();
const router = express.Router();
const webToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "2h",
  });
};

router.post("/login", async (req, res) => {
  console.log(req.body);
  let user = await signupModel.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(400)
      .json({ status: "failed", message: "Register first!" });
  }
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res
      .status(400)
      .json({ status: "failed", message: "Email or password must be wrong" });
  }
  let token = await webToken(user);
  res.send({ user, token });
});
router.post("/signup", async (req, res) => {
  let user = await signupModel.findOne({ email: req.body.email }).lean().exec();
  if (user) {
    return res.status(400).send("email already exists");
  } else {
    user = await signupModel.create(req.body);
    user.save();
    const token = webToken(user);
    user.token = token;
    return res.status(200).send({ user, token });
  }
});
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token, "inside midddleware");
  const bearertoken = token.split(" ")[1];
  jwt.verify(bearertoken, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) return res.status(403).send("not applicable");
    req.user = user;
    next();
  });
};
router.post("/createproducts", verifyToken, async (req, res) => {
  if (req.user.user.role == "admin") {
    let mydata = await productsModel.findOne({
      productname: req.body.productname,
    });
    if (mydata) {
      return res.send({
        message: "product is already added!only product quantity can be added",
      });
    } else {
      mydata = await productsModel.create(req.body);
      return res.send(mydata);
    }
  } else {
    return res.send({ message: "only admin can add the products" });
  }
});
router.get("/getallproducts", verifyToken, async (req, res) => {
  if (req.user.user.role !== "staff") {
    let mydata = await productsModel.find().lean().exec();
    return res.send(mydata);
  } else {
    return res.send({ message: "no access for staffs" });
  }
});
router.put("/updateinventory", verifyToken, async (req, res) => {
  if (req.user.user.role !== "staff") {
    let mydata = await productsModel.find().lean().exec();
    return res.send(mydata);
  } else {
    return res.send({ message: "no access for staffs" });
  }
});

module.exports = router;
