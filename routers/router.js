const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController'); // Import the login controller correctly

router.post('/register', loginController.registerUser); // Route for registering a user

router.post('/login', loginController.signInUser);

module.exports = router;
