const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    oldPrice: Number,
    newPrice: Number,
    description: String
  });
module.exports = productSchema;