const { v4: uuidv4 } = require('uuid');
const client = require('../dbConnection'); 

const collection = client.db().collection('users'); 

function createUser(user, callback) {
    user.userId = uuidv4();
    collection.insertOne(user, callback); // Function to insert a new user
}

function findUserByEmail(email, callback) {
    collection.findOne({ email: email }, callback); //Function to findUser for signin
}

module.exports = { createUser, findUserByEmail };
