const staffForm = require('../models/staffForm');

// Create a new product
exports.createStaff = async (req, res) => {
    const { designation, firstName, lastName, email, phoneNumber } = req.body;
    try {
        const newStaff = new staffForm({ designation, firstName, lastName, email, phoneNumber });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        console.error('Error creating staff:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getStaffs = async (req, res) => {
    try {
        const staffs = await staffForm.find();
        res.status(200).json(staffs);
    } catch (err) {
        console.error('Error fetching staffs:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findOne({ productId: req.params.id });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (err) {
//         console.error('Error fetching product:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     const { productName, stockAvailability, productClass, vendorName, price, imageUrl } = req.body;
//     try {
//         const updatedProduct = await Product.findOneAndUpdate(
//             { productId: req.params.id },
//             { productName, stockAvailability, productClass, vendorName, price, imageUrl },
//             { new: true }
//         );
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         console.error('Error updating product:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findOneAndDelete({ productId: req.params.id });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product deleted' });
//     } catch (err) {
//         console.error('Error deleting product:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
