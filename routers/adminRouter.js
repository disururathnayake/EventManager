

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const loginController = require("../controllers/loginController"); // Import the login controller correctly
const addeventsController = require("../controllers/addeventsController");
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Route to get all users (admin-only route)
router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);

// Route to delete a user (admin-only route)
router.delete('/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);

module.exports = router;
