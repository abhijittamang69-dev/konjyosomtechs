const express = require('express');
const router = express.Router();
const { getAllCustomers } = require('../controllers/customerController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getAllCustomers);

module.exports = router;
