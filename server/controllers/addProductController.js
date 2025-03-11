const AddProduct = require("../models/addProduct");

// @desc    Add Product
// @route   POST /api/addProducts

exports.addProduct = async (req, res) => {
    try {
    //   console.log("🔹 Request Body:", req.body);
    //   console.log("🔹 Uploaded File:", req.file);
  
      const { productCode, productName, model, price, vendor, description } = req.body;
      const productImage = req.file ? req.file.path : null;
  
      if (!productCode || !productName || !price || !vendor) {
        return res.status(400).json({ message: "Required fields missing" });
      }
  
      const addProduct = new AddProduct({
        productCode,
        productName,
        model,
        price,
        vendor, // Vendor now includes "FirstName LastName"
        productImage,
        description,
      });
  
      await addProduct.save();
      res.status(201).json({ message: "✅ Product added successfully", addProduct });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// @desc    Get All Products
// @route   GET /api/addProducts
exports.getProducts = async (req, res) => {
  try {
    const addProducts = await AddProduct.find();
    res.status(200).json(addProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
