const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    batch: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
