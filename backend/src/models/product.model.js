const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  productname: { type: String, required: true },
  productprice: { type: Number, required: true },
  productdescription: { type: String, required: true },
  inventorycount: { type: Number, default: 1 },
  token: { type: String, required: true },
});

const productsModel = mongoose.model("products", productSchema);
module.exports = productsModel;
