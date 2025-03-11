const Stock = require("../models/stock");

// @desc    Add Stock
// @route   POST /api/stock
exports.addStock = async (req, res) => {
  try {
    const { productCode, batch, warehouseCode, quantity } = req.body;

    if (!productCode || !batch || !warehouseCode || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stock = new Stock({ productCode, batch, warehouseCode, quantity });
    await stock.save();

    res.status(201).json({ message: "Stock added successfully", stock });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all stock records
// @route   GET /api/stock
exports.getStock = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
