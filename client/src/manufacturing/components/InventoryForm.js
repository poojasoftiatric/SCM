import React, { useState } from "react";
import "../styles/inventoryForm.css";
import { addInventory } from "../utils/api";

const InventoryForm = () => {
    const [formData, setFormData] = useState({
        productCode: "",
        qtyInhand: "",
    });
    const [message, setMessage] = useState(""); // For displaying success/error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const inventoryData = {
                code: formData.productCode,
                quantity: Number(formData.qtyInhand),
            };

            // Call the API to add inventory
            const response = await addInventory(inventoryData);
            setMessage(`Inventory added successfully: ${JSON.stringify(response)}`);

            // Reset the form after successful submission
            handleReset();
        } catch (error) {
            console.error("Error adding inventory:", error);
            setMessage("Error: Unable to add inventory. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            productCode: "",
            qtyInhand: "",
        });
        setMessage("");
    };

    return (
        <div className="inventory-form-container">
            <h2>Inventory</h2>
            <form onSubmit={handleSubmit}>
                {/* Product Code Dropdown */}
                <div className="form-group">
                    <label htmlFor="productCode">Product Code *</label>
                    <select
                        id="productCode"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-Select-</option>
                        <option value="ProductA">ProductA</option>
                        <option value="ProductB">ProductB</option>
                        <option value="ProductC">ProductC</option>
                    </select>
                </div>

                {/* Qty. Inhand Input */}
                <div className="form-group">
                    <label htmlFor="qtyInhand">Qty. Inhand *</label>
                    <input
                        type="number"
                        id="qtyInhand"
                        name="qtyInhand"
                        value={formData.qtyInhand}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    <button type="button" className="reset-button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>

            {/* Message Display */}
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default InventoryForm;
