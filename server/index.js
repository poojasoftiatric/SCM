const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/supplier', {})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(express.json({ limit: "10mb" })); // Handle JSON requests

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const manufacturingRoutes = require('./routes/manufacturingRoutes');
const userRoutes = require('./routes/userRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const salesRoutes = require('./routes/salesRoutes');
const cartRoutes = require('./routes/cartRoutes');
const companyFormRoutes = require('./routes/companyFormRoutes');
const staffFormRoutes = require('./routes/staffFormRoutes');
const stockRoutes = require('./routes/stockRoutes');
const addProductRoutes = require("./routes/addProductRoutes");
const vendorRoutes = require('./routes/vendorRoutes');
const batchRoutes = require('./routes/batchRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes')

app.use('/api/batchs', batchRoutes);
app.use('/api/vendors', vendorRoutes);
app.use("/api/addProducts", addProductRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/manufacturings', manufacturingRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyFormRoutes);
app.use('/api/staff', staffFormRoutes);
app.use('/api/inventory', inventoryRoutes)

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

