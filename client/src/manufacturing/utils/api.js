import axios from 'axios';

const PRODUCT_API_URL = 'http://localhost:5000/api/products';

export const getProducts = async () => {
    const res = await axios.get(PRODUCT_API_URL);
    return res.data;
};

export const createProduct = async (product) => {
    const res = await axios.post(PRODUCT_API_URL, product);
    return res.data;
};

export const updateProduct = async (id, product) => {
    const res = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${PRODUCT_API_URL}/${id}`);
    return res.data;
};

const CART_API_URL = 'http://localhost:5000/api/cart';

export const getProductsCart = async () => {
    const res = await axios.get(CART_API_URL);
    return res.data;
};

export const createProductCart = async (product) => {
    const res = await axios.post(CART_API_URL, product);
    return res.data;
};

export const updateProductCart = async (id, product) => {
    const res = await axios.put(`${CART_API_URL}/${id}`, product);
    return res.data;
};

export const deleteProductCart = async (id) => {
    const res = await axios.delete(`${CART_API_URL}/${id}`);
    return res.data;
};


const COMPANY_FORM_API_URL = 'http://localhost:5000/api';

export const createCompany = async (companyData) => {
    const formData = new FormData();

    // Append basic fields and warehouses JSON
    for (const key in companyData) {
        if (key === 'warehouses') {
            formData.append('warehouses', JSON.stringify(companyData.warehouses));
        } else if (key !== 'logo') {
            formData.append(key, companyData[key]);
        }
    }
    if (companyData.logo) {
        formData.append('logo', companyData.logo);
    }

    try {
        const response = await axios.post(`${COMPANY_FORM_API_URL}/companies`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error.response?.data || error.message);
        throw error;
    }
};

const STAFF_API_URL = 'http://localhost:5000/api/staff';

export const getStaffs = async () => {
    const res = await axios.get(STAFF_API_URL);
    return res.data;
};

export const createStaff = async (staff) => {
    const res = await axios.post(STAFF_API_URL, staff);
    return res.data;
};


const INVENTORY_API_URL = 'http://localhost:5000/api/inventory';

export const addInventory = async (inventory) => {
    try {
        const res = await axios.post('http://localhost:5000/api/inventory', inventory);
        return res.data;
    } catch (error) {
        console.error("Error in addInventory API:", error.response || error.message);
        throw error;
    }
};


export const getInventory  = async () => {
    const res = await axios.get(INVENTORY_API_URL);
    return res.data
}

export const searchInventoryByCode = async (code) => {
    try {
        const res = await axios.get(`${INVENTORY_API_URL}/search`, {
            params: { code }
        });
        return res.data; // Return the data if successful
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Gracefully handle a 404 error (not found)
            throw new Error("No inventory found for the given code.");
        }
        throw error; // Re-throw other errors
    }
};


const MYPROFILE_API_URL = 'http://localhost:5000/api/manufacturings/';

export const getProfile = async () => {
    const res = await axios.get(MYPROFILE_API_URL);
    return res.data;
};