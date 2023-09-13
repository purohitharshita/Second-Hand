const mongoose = require("mongoose");

// Define the specifications schema
const SpecificationSchema = new mongoose.Schema({
  key: String,
  value: String,
});

// Define the seller schema
const SellerSchema = new mongoose.Schema({
  id: String,
  name: String,
  college: String,
});

// Define the product schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: SellerSchema,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  specifications: [SpecificationSchema], // Embed specifications as an array of objects
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
