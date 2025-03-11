import React, { useState } from "react";
import axios from "axios";

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/vendor.css"; // Import CSS file

const AddVendorForm = ({ isOpen, onClose }) => {
  const [vendor, setVendor] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    vendorEmail: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vendors", vendor);

      toast.success("Vendor added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error("Error adding vendor.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
  <>
  <button className="vendor-close" type="button" onClick={onClose}><i class="fa-solid fa-x"></i></button>
      
    <div className="form-container"><h2 className="head2">Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input className="input-vendor" type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input className="input-vendor" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        </div>
        <input className="input-vendor" type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input className="input-vendor" type="email" name="vendorEmail" placeholder="Vendor Email" onChange={handleChange} required />
        <input className="input-vendor" type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input className="input-vendor" type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} required />
        <input className="input-vendor" type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleChange} />
        <div className="input-group">
          <input className="input-vendor" type="text" name="city" placeholder="City" onChange={handleChange} required />
          <input className="input-vendor" type="text" name="state" placeholder="State / Province" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input className="input-vendor" type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
          <input className="input-vendor" type="text" name="country" placeholder="Country" onChange={handleChange} required />
        </div>
        <div className="button-grouping">
          <button className="button-vendor normal" type="submit">Submit</button>
          <button className="button-vendor upnormal" type="reset" onClick={() => setVendor({})}>Reset</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddVendorForm;
