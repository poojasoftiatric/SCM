const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    model: { type: String },
    price: { type: Number, required: true },
    vendor: { type: String, required: true },
    productImage: { type: String }, // Path to uploaded image
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddProduct", addProductSchema);
