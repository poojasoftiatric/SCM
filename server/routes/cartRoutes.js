const express = require('express');
const { createProductCart, getProductsCart, getProductByIdCart, updateProductCart, deleteProductCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/', createProductCart);
router.get('/', getProductsCart);
router.get('/:id', getProductByIdCart);
router.put('/:id', updateProductCart);
router.delete('/:id', deleteProductCart);

module.exports = router;
