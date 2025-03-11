const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    vendorEmail: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
