const express = require('express');
const router = express.Router();
const Transaction = require('../../models/transactionModel');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.render('transactionsViews/index.njk', {
            title: 'Transactions',
            transactions: transactions
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;