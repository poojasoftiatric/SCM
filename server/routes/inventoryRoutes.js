const express = require('express');
const { addInventory, getInventory, searchInventoryByCode } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/', addInventory);
router.get('/', getInventory);
router.get('/search', searchInventoryByCode);

module.exports = router;