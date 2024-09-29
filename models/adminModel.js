const { v4: uuidv4 } = require('uuid');
const client = require('../dbConnection'); 

const collection = client.db().collection('users');

function findAllUsers(callback) {
    collection.find({}).toArray(callback);  // Use native MongoDB collection.find() and convert to an array
}

// Function to delete a user by ID
function deleteUserById(userId, callback) {
    collection.deleteOne({ _id: userId }, callback);  // Native MongoDB deleteOne() method
}

module.exports = { findAllUsers, deleteUserById }; 