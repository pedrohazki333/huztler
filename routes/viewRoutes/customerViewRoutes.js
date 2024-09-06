const express = require('express');
const router = express.Router();
const Customer = require('../../models/customerModel');

// LIST CUSTOMERS
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render('customersViews/index', { customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CUSTOMER FORM CREATE
router.get('/create', (req, res) => {
    res.render('customersViews/create');
});

// STORE CUSTOMER DATA
router.post('/create', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.redirect('/customers');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CUSTOMER FORM EDIT
router.get('/edit/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.render('customersViews/edit', { customer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//UPDATE CUSTOMER
router.post('/edit/:id', async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/customers');
    } catch (error) {
        res.render(500).json({ message: error.message });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.redirect('/customers');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;