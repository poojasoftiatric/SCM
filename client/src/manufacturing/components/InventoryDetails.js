import React, { useState, useEffect } from "react";
import { getInventory, searchInventoryByCode } from "../utils/api";
import "../styles/inventoryDetails.css";

const InventoryDetails = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [searchCode, setSearchCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // Error state to store error messages

    // Fetch all inventory on component mount
    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        setIsLoading(true);
        setError(""); // Clear any previous errors
        try {
            const data = await getInventory();
            setInventoryData(data);
        } catch (error) {
            setError("Error fetching inventory. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
    if (!searchCode) {
        fetchInventory(); // Fetch all inventory if search field is empty
        return;
    }

    setIsLoading(true);
    setError(""); // Clear any previous errors
    setInventoryData([]); // Clear the inventory data to prevent showing outdated entries
    try {
        const data = await searchInventoryByCode(searchCode);
        setInventoryData(data); // Set the new data if found
    } catch (error) {
        setError(error.message); // Show user-friendly error message
    } finally {
        setIsLoading(false);
    }
};


return (
    <div className="inventory-details-container">
        <h2>Inventory Details</h2>

        {/* Search Input */}
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by Product Code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Inventory Table */}
        <table>
            <thead>
                <tr>
                    <th>Product Code</th>
                    <th>Qty. Inhand</th>
                    <th>Qty. Distributed</th>
                    <th>Add to Warehouse Stock</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                            Loading...
                        </td>
                    </tr>
                ) : inventoryData.length > 0 ? (
                    inventoryData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.code}</td>
                            <td>{item.quantity}</td>
                            <td>{item.distributed || 0}</td>
                            <td>
                                <button className="add-to-warehouse-button">
                                    Add to Warehouse Stock
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    // If no inventory is found, show this message
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                            No inventory found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

};

export default InventoryDetails;
