import React, { useState } from "react";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/batch.css"; // Import CSS file

const AddBatch = ({ isOpen, onClose }) => {
  const [batch, setBatch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/batchs", { batch });
      toast.success("Batch added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setBatch(""); // Reset input field after submission
    } catch (error) {
      console.error("Error adding batch:", error);
      toast.error("❌ Error adding batch. Please try again.", {
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
      <button className="vendor-close" type="button" onClick={onClose}>
                <i className="fa-solid fa-x"></i>
              </button>
      <div className="gap-batch">
        <div className="batch-form-container">
          <h2 className="head2batch">Add Batch</h2>
          <form className="batch-form" onSubmit={handleSubmit}>
            <div className="batch-group">
              <label className="batch-label">
                Batch Number<span className="required">*</span>
              </label>
              <input
                className="batch-input"
                type="text"
                placeholder="Enter the product source."
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              />
            </div>
            <div className="batch-block">
              <button type="submit" className="add-btn batch-button">
                Add
              </button>
              <button
                type="reset"
                className="reset-btn batch-button"
                onClick={() => setBatch("")}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBatch;
