import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManufacturingSidebar from './components/ManufacturingSidebar';
import ManufacturingDashboard from './components/ManufacturingDashboard';
import Productlist from './components/Productlist';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import CompanyForm from './components/CompanyForm';
import StaffForm from './components/StaffForm';
import MyProfile from './components/MyProfile';

const ManufacturingApp = () => {
    return (
        <CartProvider>
            <ManufacturingSidebar>
                <Routes>
                    <Route path="dashboard" element={<ManufacturingDashboard />} />
                    <Route path="productlist" element={<Productlist />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="/CompanyForm" element={<CompanyForm />} />
                    <Route path="/StaffForm" element={<StaffForm />} />
                    <Route path='/MyProfile' element={<MyProfile />}/>
                </Routes>
            </ManufacturingSidebar>
        </CartProvider>
    );
};

export default ManufacturingApp;
