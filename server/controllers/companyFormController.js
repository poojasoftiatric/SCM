const companyForm = require('../models/companyForm');

exports.createCompany = async (req, res) => {
    try {
        const companyData = { ...req.body };
        
        // Parse warehouses if it is a JSON string
        companyData.warehouses = JSON.parse(companyData.warehouses);

        if (req.file) {
            companyData.logo = req.file.path;
        }

        const company = await companyForm.create(companyData);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getWarehouseCodes = async (req, res) => {
    try {
        const companies = await companyForm.find({}, 'warehouses'); // Fetch warehouses only
        let warehouseCodes = [];

        companies.forEach(company => {
            company.warehouses.forEach(warehouse => {
                warehouseCodes.push({
                    code: warehouse.code,
                    
                });
            });
        });

        res.status(200).json({ success: true, warehouseCodes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};