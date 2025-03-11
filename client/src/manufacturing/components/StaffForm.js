import React, { useState } from 'react';
import '../styles/staffForm.css';
import { createStaff } from '../utils/api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StaffForm = () => {
    const [staff, setStaff] = useState({
        designation: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createStaff(staff);
            console.log("Staff data submitted:", response);
            toast.success("Staff created successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            handleReset();
        } catch (error) {
            console.error("Error submitting staff data:", error);
            toast.error("Failed to create staff. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }
    };

    const handleReset = () => {
        setStaff({
            designation: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        });
    };

    return (
        <><ToastContainer/>
        <div className="add-staff-form">
            <h3>Add Staff</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Designation</label>
                    <select 
                        name="designation" 
                        value={staff.designation} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <div className='name-group'>
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={staff.firstName} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last Name" 
                            value={staff.lastName} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Distributor Email" 
                        value={staff.email} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        placeholder="+91 - 81234 56789" 
                        value={staff.phoneNumber} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
                <button type="button" onClick={handleReset} className="reset-button">Reset</button>
            </form>
        </div>
        </>
    );
};

export default StaffForm;
