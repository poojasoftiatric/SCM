const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;