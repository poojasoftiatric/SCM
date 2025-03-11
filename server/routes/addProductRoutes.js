const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/addProductController");
const multer = require("multer");
const path = require("path");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post("/", upload.single("productImage"), addProduct);
router.get("/", getProducts);

module.exports = router;
