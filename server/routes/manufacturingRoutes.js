const express = require('express');
const { register, login, getProfile } = require('../controllers/manufacturingController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getProfile);

module.exports = router;
