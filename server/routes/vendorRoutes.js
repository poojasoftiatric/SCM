const express = require("express");
const { createVendor, getVendors } = require("../controllers/vendorController");

const router = express.Router();

router.post("/", createVendor);
router.get("/", getVendors);

module.exports = router;
