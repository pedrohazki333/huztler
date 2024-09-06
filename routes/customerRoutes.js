const express = require('express');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createCustomer);
router.get('/', getCustomers);
router.put('/:id', protect, updateCustomer);
router.delete('/:id', protect, deleteCustomer);

module.exports = router;