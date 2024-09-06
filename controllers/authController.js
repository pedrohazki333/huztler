const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// CREATE
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const user = await User.create({
            name,
            email,
            password
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// USER LOGIN
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Wrong credentials!" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong credentials!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};