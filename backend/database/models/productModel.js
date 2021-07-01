const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  image: String,
  brand: { type: String, enum: ["UADE Made"] },
  rating: String,
  numReviews: String,
});

module.exports = mongoose.model("Product", ProductModel);
