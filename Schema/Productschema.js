const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Properties: {
    Weight: {
      type: Number,
      required: true,
    },
    Sizes: {
      type: Number,
      required: true,
    },
  },
  Tags: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
});

const ProductDetails = mongoose.model("ProductDetail", Products);
module.exports = ProductDetails;
