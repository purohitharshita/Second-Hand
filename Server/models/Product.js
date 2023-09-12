const mongoose = require("mongoose");

// Define the specifications schema
const SpecificationSchema = new mongoose.Schema({
  key: String,
  value: String,
});

// Define the reviews schema
const ReviewSchema = new mongoose.Schema({
  id: Number,
  username: String,
  rating: Number,
  comment: String,
});

// Define the product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  numRatings: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  specifications: [SpecificationSchema], // Embed specifications as an array of objects
  reviews: [ReviewSchema], // Embed reviews as an array of objects
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
