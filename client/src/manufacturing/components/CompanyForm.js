import React, { useState, useEffect } from 'react';
import { createCompany, getStaffs } from '../utils/api';
import StaffForm from './StaffForm';
import '../styles/companyForm.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyForm = () => {
    const [company, setCompany] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        contactNumber: '',
        mobileNumber: '',
        gstinNumber: '',
        panNumber: '',
        email: '',
        logo: null,
        website: '',
        warehouses: [{ code: '', name: '', addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '', keeper: '' }],
    });

    const [staffList, setStaffList] = useState([]); // Holds the list of staff members for the dropdown
    const [isAddStaffOpen, setIsAddStaffOpen] = useState(false); // Controls pop-up visibility

    

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const staffs = await getStaffs(); // Fetch data from API
                // Sort by first name alphabetically
                const sortedStaffs = staffs.sort((a, b) =>
                    a.firstName.localeCompare(b.firstName)
                );
                setStaffList(sortedStaffs); // Set sorted staff list
            } catch (error) {
                console.error("Error fetching staff list:", error);
            }
        };
        fetchStaffs();
    }, []);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });

        if (name === "keeper" && value === "add-new-staff") {
            handleAddStaffClick();
            // Reset the dropdown to the default value after opening the pop-up
            e.target.value = ""; 
        } else {
            // Otherwise, handle the regular input change
            setCompany({ ...company, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setCompany({ ...company, logo: e.target.files[0] });
    };

    const addWarehouse = () => {
        setCompany({
            ...company,
            warehouses: [...company.warehouses, { code: '', name: '', addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '', keeper: '' }],
        });
    };

    const handleWarehouseChange = (index, e) => {
        const { name, value } = e.target;
        const updatedWarehouses = [...company.warehouses];
        updatedWarehouses[index][name] = value;
        setCompany({ ...company, warehouses: updatedWarehouses });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCompany(company);
            toast.success('Company created successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });

            // Clear the form fields
            setCompany({
                name: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                contactNumber: '',
                mobileNumber: '',
                gstinNumber: '',
                panNumber: '',
                email: '',
                logo: null,
                website: '',
                warehouses: [{ code: '', name: '', addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '', keeper: '' }],
            });


        } catch (error) {
            console.error("Error creating company:", error);
            toast.error('Failed to create company.', {
                position: "top-right",
                autoClose:3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
           
        }
    };

    const handleAddStaffClick = () => {
        setIsAddStaffOpen(true);
    };

    const closeStaffPopup = () => {
        setIsAddStaffOpen(false);
    };

    const handleKeeperChange = (index, e) => {
        const { value } = e.target;
        if (value === "add-new-staff") {
            handleAddStaffClick();
            return;
        }

        const updatedWarehouses = [...company.warehouses];
        updatedWarehouses[index].keeper = value;
        setCompany({ ...company, warehouses: updatedWarehouses });
    };

    return (
        <div>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className="form">
                <h2 className="heading">Company Details</h2>
                
                <div className="section">

                    <div className='company-details-row'>
                        <label className="label">Company Name <span className="required">*</span></label>
                        <input type="text" name="name" value={company.name} onChange={handleInputChange} placeholder="Company Name" required className="input" />
                    </div>

                    <div className='company-details-row'>
                        <label className="label">Company Address <span className="required">*</span></label>
                        <input type="text" name="addressLine1" value={company.addressLine1} onChange={handleInputChange} placeholder="Address Line 1" required className="input" />
                    </div>

                    <div className='company-details-row address-row'>
                        <input type="text" name="addressLine2" value={company.addressLine2} onChange={handleInputChange} placeholder="Address Line 2" required className="input" />
                    </div>

                    <div className='company-details-row address-row'>
                        <input type="text" name="city" value={company.city} onChange={handleInputChange} placeholder="City/District" required className="input" />
                        <input type="text" name="state" value={company.state} onChange={handleInputChange} placeholder="State/Province" required className="input" />
                    </div>

                    <div className='company-details-row address-row'>
                        <input type="text" name="postalCode" value={company.postalCode} onChange={handleInputChange} placeholder="Postal Code" required className="input" />
                        <input type="text" name="country" value={company.country} onChange={handleInputChange} placeholder="Country" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">Contact Number <span className="required">*</span></label>
                        <input type="text" name="contactNumber" value={company.contactNumber} onChange={handleInputChange} placeholder="Contact Number" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">Mobile Number <span className="required">*</span></label>
                        <input type="text" name="mobileNumber" value={company.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">GSTIN Number <span className="required">*</span></label>
                        <input type="text" name="gstinNumber" value={company.gstinNumber} onChange={handleInputChange} placeholder="GSTIN Number" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">PAN Number <span className="required">*</span></label>
                        <input type="text" name="panNumber" value={company.panNumber} onChange={handleInputChange} placeholder="Pan Number" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">Company Email <span className="required">*</span></label>
                        <input type="email" name="email" value={company.email} onChange={handleInputChange} placeholder="Email" required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">Logo</label>
                        <input type="file" name="logo" onChange={handleFileChange} required className="input" />
                    </div>

                    <div className="company-details-row">
                        <label className="label">Website</label>
                        <input type="text" name="website" value={company.website} onChange={handleInputChange} placeholder="Website" className="input" />
                    </div>
                </div>

                <h3 className="heading">Warehouse Details <span className="required">*</span></h3>
                {company.warehouses.map((warehouse, index) => (
                    <div key={index} className="warehouseSection">

                        <div className='warehouse-Details-row warehouse-header'>
                            <label className="label"><span className="required">*</span>Warehouse Code</label>
                            <label className="label"><span className="required">*</span>Warehouse Name</label>
                            <label className="label"><span className="required">*</span>Warehouse Address</label>
                            <label className="label"><span className="required">  </span>Warehouse Keeper</label>
                        </div>

                        <div className='warehouse-Details-row'>
                            <input type="text" name="code" value={warehouse.code} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Warehouse Code" required className="input" />
                            <input type="text" name="name" value={warehouse.name} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Warehouse Name" required className="input" />
                            <input type="text" name="addressLine1" value={warehouse.addressLine1} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Address Line 1" required className="input" />

                            <select
                                name="keeper"
                                value={warehouse.keeper}
                                onChange={(e) => handleKeeperChange(index, e)}
                                className="input"
                            >
                                <option value="">-Select Keeper-</option>
                                {staffList.map((staff) => (
                                    <option key={staff._id} value={`${staff.firstName} ${staff.lastName}`}>
                                        {staff.firstName} {staff.lastName}
                                    </option>
                                ))}
                                <option value="add-new-staff">+ Add New Staff</option>
                            </select>

                        </div>

                        <div className='address-bock'>
                            <div className='warehouse-Details-row address-row2'>
                                <input type="text" name="addressLine2" value={warehouse.addressLine2} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Address Line 2" required className="input" />
                            </div>

                            <div className='warehouse-Details-row address-row2'>
                                <input type="text" name="city" value={warehouse.city} onChange={(e) => handleWarehouseChange(index, e)} placeholder="City" required className="input" />
                                <input type="text" name="state" value={warehouse.state} onChange={(e) => handleWarehouseChange(index, e)} placeholder="State" required className="input" />
                            </div>

                            <div className='warehouse-Details-row address-row2'>
                                <input type="text" name="postalCode" value={warehouse.postalCode} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Postal Code" required className="input" />
                                <input type="text" name="country" value={warehouse.country} onChange={(e) => handleWarehouseChange(index, e)} placeholder="Country" required className="input" />
                            </div>
                        </div>

                    </div>
                ))}
                <button type="button" onClick={addWarehouse} className="button-gray ">Add Warehouse</button>
                <button type="submit" className="companybutton">Submit</button>

                

            </form>
            {/* Add Staff Popup */}
            {isAddStaffOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-button" onClick={closeStaffPopup}>X</button>
                            <StaffForm />
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CompanyForm;
