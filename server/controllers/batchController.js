const Batch = require("../models/batch");

// Create a new production batch
exports.createBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json({ message: "Production batch added successfully", batch });
  } catch (error) {
    res.status(500).json({ message: "Error adding batch", error });
  }
};

// Get all production batches
exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error });
  }
};
