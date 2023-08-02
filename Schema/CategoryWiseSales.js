const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  sales: {
    maxPrice: {
      type: Number,
      required: true,
    },

    minPrice: {
      type: Number,
      required: true,
    },
    unitsSold: {
      type: Number,
      required: true,
    },
  },
});

const schema2 = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  unitsSold: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
});

const CategorySales = mongoose.model("categorysale", schema);
const ProductSold = mongoose.model("productsale", schema2);
module.exports = { CategorySales, ProductSold };
