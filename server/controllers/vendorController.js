const Vendor = require("../models/vendor");

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ message: "Vendor added successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error adding vendor", error });
  }
};

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};
