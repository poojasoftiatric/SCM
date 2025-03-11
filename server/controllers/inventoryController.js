const Inventory = require('../models/inventory');

// Add a new inventory
exports.addInventory = async (req, res) => {
    const { code, quantity } = req.body;
    try {
        const newInventory = new Inventory({ code, quantity });
        await newInventory.save();
        res.status(201).json(newInventory);
    } catch (err) {
        console.error('Error creating inventory:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getInventory = async (req, res) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (err) {
        console.error('Error fetching inventories:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.searchInventoryByCode = async (req, res) => {
    const { code } = req.query;

    // Validate the query parameter
    if (!code) {
        return res.status(400).json({ message: 'Code query parameter is required' });
    }

    try {
        // Find matching inventory items
        const matchingInventories = await Inventory.find({ code });

        if (matchingInventories.length === 0) {
            return res.status(404).json({ message: 'No inventory found with the provided code' });
        }

        res.status(200).json(matchingInventories);
    } catch (err) {
        console.error('Error searching inventory:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
