const Transaction = require('../models/transactionModel');

// CREATE
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE
exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found!" });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found!" });
        }
        res.status(200).json({ message: "Transaction deleted." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};