const { ObjectId } = require('mongodb');
const User = require('../models/adminModel');  // Adjusted to use the MongoClient model

// Get all users
const getAllUsers = (req, res) => {
    User.findAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.status(200).json(users);  // Successfully return the users as JSON
    });
};

// Delete a user by ID
const deleteUser = (req, res) => {
    const userId = req.params.id;  // The ID passed in the URL

    // Validate that the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Use the deleteOne method to delete the user by ObjectId
    User.deleteUserById(ObjectId(userId), (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    });
};


module.exports = { getAllUsers, deleteUser };
