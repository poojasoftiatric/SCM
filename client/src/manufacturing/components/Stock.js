import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import Batch from "./Batch";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/stock.css";
Modal.setAppElement("#root");

const AddStock = ({ isOpen, onClose }) => {
  const [productCode, setProductCode] = useState("");
  const [batch, setBatch] = useState("");
  const [warehouseCode, setWarehouseCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [batchs, setBatchs] = useState([]);
  const [productCodes, setProductCodes] = useState([]);
  const [warehouses, setWarehouses] = useState([]); // State for warehouse codes
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  useEffect(() => {
    fetchWarehouses();
    fetchBatchs();
    fetchProductCodes();
  }, []);

  // Fetch warehouse codes from the API
  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies/warehouses/codes");
      setWarehouses(res.data.warehouseCodes); // Store warehouse data
    } catch (error) {
      console.error("Error fetching warehouse codes", error);
    }
  };

  // Fetch product codes
  const fetchProductCodes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/addProducts");
      setProductCodes(res.data.map((product) => product.productCode));
    } catch (error) {
      console.error("Error fetching product codes", error);
    }
  };

  // Fetch batch numbers
  const fetchBatchs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/batchs");
      setBatchs(res.data.map((batch) => batch.batch));
    } catch (error) {
      console.error("Error fetching batch", error);
    }
  };

  const handleProductChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "addNew") {
      setIsProductModalOpen(true);
    } else {
      setProductCode(selectedValue);
    }
  };

  const handleWarehouseChange = (e) => {
    setWarehouseCode(e.target.value);
  };

  const handleBatchChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "addNew") {
      setIsBatchModalOpen(true);
    } else {
      setBatch(selectedValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/stock", {
        productCode,
        batch,
        warehouseCode,
        quantity,
      });

      toast.success("Stock added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setProductCode("");
      setBatch("");
      setWarehouseCode("");
      setQuantity("");
    } catch (error) {
      toast.error("Error adding stock", {
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
    <ToastContainer/>
    <div className="form-stock">
      <h2 className="stock-head">Add Stock</h2>
      <form  onSubmit={handleSubmit}>
        <div className="block">
          <label className="labeltext">Product Code<span className="red">*</span></label>
          <select className="anytext" value={productCode} onChange={handleProductChange} required>
            <option value="">-Select-</option>
            {productCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
            <option value="addNew">+ Add New Product</option>
          </select>
        </div>

        <div className="block">
          <label className="labeltext">Batch<span className="red">*</span></label>
          <select className="anytext" value={batch} onChange={handleBatchChange} required>
            <option value="">-Select-</option>
            {batchs.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
            <option value="addNew">+ Add New Batch</option>
          </select>
        </div>

        {/* 🏢 Warehouse Code Dropdown */}
        <div className="block">
          <label className="labeltext">Warehouse Code<span className="red">*</span></label>
          <select className="anytext" value={warehouseCode} onChange={handleWarehouseChange} required>
            <option value="">-Select-</option>
            {warehouses.map((warehouse, index) => (
              <option key={index} value={warehouse.code}>
                {warehouse.name} {warehouse.code}
              </option>
            ))}
          </select>
        </div>

        <div className="block">
          <label className="labeltext">Quantity<span className="red">*</span></label>
          <input
            className="anytext anytype"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="block">
        <button className="submitbutton hoverbutton" type="submit">
          Submit
        </button>
        <button
          className="resetbutton hoverreset"
          type="reset"
          onClick={() => {
            setProductCode("");
            setBatch("");
            setWarehouseCode("");
            setQuantity("");
          }}
        >
          Reset
        </button>
        </div>
      </form>

      {/* Add Product Modal */}
      <Modal isOpen={isProductModalOpen} onRequestClose={() => setIsProductModalOpen(false)} className="popup-form">
        <AddProduct
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            fetchProductCodes();
          }}
        />
      </Modal>
      {/* Add Batch Modal */}
      <Modal isOpen={isBatchModalOpen} onRequestClose={() => setIsBatchModalOpen(false)} className="popup-form">
        
              
        <Batch
          isOpen={isBatchModalOpen}
          onClose={() => {
            setIsBatchModalOpen(false);
            fetchBatchs();
          }}
        />
      </Modal>
    </div>
    </>
  );
};

export default AddStock;
