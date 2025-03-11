const express = require('express');
const { createStaff, getStaffs} = require('../controllers/staffFormController');

const router = express.Router();

router.post('/', createStaff);
router.get('/', getStaffs);

module.exports = router;