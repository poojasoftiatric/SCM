const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    warehouseCode: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stock", stockSchema);
