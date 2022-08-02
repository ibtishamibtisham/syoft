// const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const signupSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

//hook
signupSchema.pre("save", function (next) {
  if (this.isModified("password")) return next();
  if (this.password) {
    //generationg salt
    var salt = bcrypt.genSaltSync(10);
    //hashing the password with salt
    this.password = bcrypt.hashSync(this.password, salt);
    console.log(this.password);
  }
  //moving to next
  return next();
});

const signupModel = mongoose.model("Signup", signupSchema);
module.exports = signupModel;
