const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartSchema = new mongoose.Schema({
    productNo: {
        type: Number,
        unique: true,
    },
    productId: {
        type: Number,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    stockAvailability: {
        type: Number,
        required: true,
    },
    productClass: {
        type: String,
    },
    vendorName: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add auto-increment plugin to the schema
cartSchema.plugin(AutoIncrement, { inc_field: 'productNo' });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
