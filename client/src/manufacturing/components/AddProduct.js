import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Vendor from "./Vendor";
import "../styles/addProduct.css";

Modal.setAppElement("#root");

const AddProduct = ({ isOpen, onClose }) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [vendor, setVendor] = useState(""); // Updated field
  const [vendors, setVendors] = useState([]); // Store fetched vendors
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  // Fetch vendors from API
  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vendors");
      const vendorList = res.data.map((vendor) => ({
        id: vendor._id, // Keep ID for reference
        name: `${vendor.firstName} ${vendor.lastName}`, // Combine first & last name
      }));
      setVendors(vendorList);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  // Handle vendor selection
  const handleVendorChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "addNew") {
      setIsVendorModalOpen(true);
    } else {
      setVendor(selectedValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productCode", productCode);
    formData.append("productName", productName);
    formData.append("model", model);

    formData.append("price", price);
    formData.append("vendor", vendor); // Send full name of vendor
    formData.append("description", description);
    
    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      await axios.post("http://localhost:5000/api/addProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(" Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onClose();
    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error.message);
      toast.error("Error adding product", {
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
    <div className="gap-batch">
      <h2 className="head-product">Add Product</h2>
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="seperated">
          <label className="labelname">Product Code:</label>
          <input className="inputproduct" type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
        </div>
        <div className="seperated">
          <label className="labelname">Product Name:</label>
          <input className="inputproduct" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="seperated">
          <label className="labelname">Model:</label>
          <input className="inputproduct" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="seperated">
          <label className="labelname">Product Selling Price:</label>
          <input className="inputproduct" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="seperated">
          <label className="labelname">Vendor:</label>
          <select className="inputproduct" value={vendor} onChange={handleVendorChange} required>
            <option value="">-Select-</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
            ))}
            <option value="addNew">+ Add New Vendor</option>
          </select>
        </div>
        <div className="seperated">
          <label className="labelname">Product Image:</label>
          <input className="inputproduct" type="file" onChange={(e) => setProductImage(e.target.files[0])} required/>
        </div>
        <div className="seperated">
          <label className="labelname">Product Description:</label>
          <textarea className="inputproduct" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="block">
        <button className="product-button" type="submit">Submit</button>
        <button className="product-close" type="button" onClick={onClose}>Close</button>
        </div>
      </form>

      {/* Add Vendor Modal */}
      <Modal isOpen={isVendorModalOpen} onRequestClose={() => setIsVendorModalOpen(false)} className="popup-form">
        <Vendor 
          isOpen={isVendorModalOpen} 
          onClose={() => { 
            setIsVendorModalOpen(false); 
            fetchVendors(); 
          }} 
        />
      </Modal>
    </div>
  );
};

export default AddProduct;
