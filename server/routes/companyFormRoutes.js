const express = require('express');
const router = express.Router();
const { createCompany, getWarehouseCodes } = require('../controllers/companyFormController');
const upload = require('../middleware/uploads');

router.post('/', upload.single('logo'), createCompany);
router.get('/warehouses/codes', getWarehouseCodes);
module.exports = router;
