import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/manufacturingSidebar.css';
import 'boxicons/css/boxicons.min.css';
import PopupMenu from './PopupMenu';
import ManufacturingTopbar from './ManufacturingTopbar';
import ManufacturingDashboard from './ManufacturingDashboard';
import Productlist from './Productlist';
import Cart from './Cart';
import ManufacturingFooter from './ManufacturingFooter';
import CompanyForm from './CompanyForm';
import StaffForm from './StaffForm'
import InventoryForm from './InventoryForm';
import logo from "../assets/logo.jpg";
import MyProfile from './MyProfile';
import InventoryDetails from './InventoryDetails';
import Stock from './Stock';
import AddProduct from './AddProduct';
import Vendor from './Vendor';
import Batch from './Batch';

const ManufacturingSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const menuOptions = {
        "MDashboard": [{ label: "Dashboard Home", path: "/manufacturing/manufacturingdashboard" }, { label: "Manufacturing", path: "/inventory/categories" }],
        "Inventory": [{ label: "Inventory", path: "/manufacturing/InventoryForm" }, { label: "Inventory Details", path: "/manufacturing/InventoryDetails" }, { label: "Stocks Details", path: "/inventory/stocksDetails" }],
        "Warehouse": [
            { label: "Add Stock", path: "/manufacturing/Stock" },
            { label: "Warehouse Details", path: "/warehouse/warehouseDetails" },
            { label: "Warehouse Map", path: "/warehouse/warehouseMap" },
            { label: "Stock Transfer From", path: "/warehouse/stockTransferFrom" },
            { label: "All Stock Transfers", path: "/warehouse/allStockTransfers" },
            { label: "Stock Adjusment Requests", path: "/warehouse/stockAdjusmentRequests" },
            { label: "Product Requests", path: "/warehouse/productRequests" }
        ],
    };    

    return (
        <div className={`manufacturing-body ${isDarkMode ? 'dark' : ''}`}>
            <nav className={`manufacturing-sidebar ${isSidebarOpen ? '' : 'close'}`}>
                <header>
                    <div className="manufacturing-image-text">
                        <span className="manufacturing-image">
                            <img src={logo} alt="Logo" />
                        </span>
                        <div className="manufacturing-text manufacturing-logo-text">
                            <span className="manufacturing-name">SCM Soft</span>
                            <span className="manufacturing-profession">SCM</span>
                        </div>
                    </div>
                    <i className='bx bx-chevron-right manufacturing-toggle' onClick={toggleSidebar}></i>
                </header>

                <div className="manufacturing-menu-bar">
                    <div className="manufacturing-menu">
                        <ul className="manufacturing-menu-links">
                            <li
                                className="manufacturing-nav-link"
                                onMouseEnter={() => setHoveredMenu("MDashboard")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <Link to="/manufacturing/manufacturingdashboard">
                                    <div className="manufacturing-icon-container" data-text="M Dashboard">
                                        <i className='bx bxs-tachometer manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">MDashboard</span>
                                </Link>
                                {hoveredMenu === "MDashboard" && <PopupMenu options={menuOptions["MDashboard"]} />}
                            </li>
                            <li
                                className="manufacturing-nav-link"
                                onMouseEnter={() => setHoveredMenu("Inventory")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <Link to="#">
                                    <div className="manufacturing-icon-container" data-text="Main Inventory">
                                        <i className='bx bx-box manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Main Inventory</span>
                                </Link>
                                {hoveredMenu === "Inventory" && <PopupMenu options={menuOptions["Inventory"]} />}
                            </li>
                            <li 
                                className="manufacturing-nav-link"
                                onMouseEnter={() => setHoveredMenu("Warehouse")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <Link to="#">
                                    <div className="manufacturing-icon-container" data-text="Warehouse">
                                        <i className='bx bx-buildings manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Warehouse</span>
                                </Link>
                                {hoveredMenu === "Warehouse" && <PopupMenu options={menuOptions["Warehouse"]} />}
                            </li>
                            <li className="manufacturing-nav-link">
                                <Link to="/manufacturing/StaffForm">
                                    <div className="manufacturing-icon-container" data-text="Order Inventory">
                                        <i className='bx bx-checkbox-checked manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Order<br/>Management</span>
                                </Link>
                            </li>
                            <li className="manufacturing-nav-link">
                                <Link to="#">
                                    <div className="manufacturing-icon-container" data-text="Sales">
                                        <i className='bx bxs-t-shirt manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Sales</span>
                                </Link>
                            </li>
                            <li className="manufacturing-nav-link">
                                <Link to="#">
                                    <div className="manufacturing-icon-container" data-text="Retailers">
                                        <i className='bx bx-group manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Retailers</span>
                                </Link>
                            </li>
                            <li className="manufacturing-nav-link">
                                <Link to="#">
                                    <div className="manufacturing-icon-container" data-text="Payment Notes">
                                        <i className='bx bx-rupee manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Payment Notes</span>
                                </Link>
                            </li>
                            <li className="manufacturing-nav-link">
                                <Link to="/manufacturing/CompanyForm">
                                    <div className="manufacturing-icon-container" data-text="Company Configuration">
                                        <i className='bx bx-cog manufacturing-icon'></i>
                                    </div>
                                    <span className="manufacturing-nav-text">Company<br/>Configuration</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="manufacturing-bottom-content">
                        <li>
                            <a href="/">
                            <div className='manufacturing-icon-container' data-text="Logout">
                                <i className='bx bx-log-out manufacturing-icon'></i>
                            </div>
                                <span className="manufacturing-nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
            <section className="manufacturing-home">
                <ManufacturingTopbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="manufacturing-content">
                    <Routes>
                        <Route path="/manufacturingdashboard" element={<ManufacturingDashboard />} />
                        <Route path="/productlist" element={<Productlist />} />
                        <Route path="/Cart" element={<Cart />} />
                        <Route path="/CompanyForm" element={<CompanyForm />} />
                        <Route path="/StaffForm" element={<StaffForm />} />
                        <Route path="/InventoryForm" element={<InventoryForm />} />
                        <Route path="/InventoryDetails" element={<InventoryDetails />} />
                        <Route path="/MyProfile" element={<MyProfile />} />
                        <Route path="/Stock" element={<Stock />} />
                        <Route path="/AddProduct" element={<AddProduct />} />
                        <Route path="/Vendor" element={<Vendor />} />
                        <Route path="/Batch" element={<Batch />} />
                    </Routes>
                </div>
                <ManufacturingFooter />
            </section>
        </div>
    );
};

export default ManufacturingSidebar;
