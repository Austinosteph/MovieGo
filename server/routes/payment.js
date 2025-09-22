const express = require('express');
const router = express.Router();
const { initializePayment, verifyPayment } = require('../controllers/Payment');
const authenticateUser = require('../middleware/authenticaton');

router.post('/initialize', authenticateUser, initializePayment);
router.post('/verify', verifyPayment);

module.exports = router;
