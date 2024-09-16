const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); // Import the login controller correctly
const addeventsController = require("../controllers/addeventsController");
const isAuthenticated = require("../middlewares/authMiddleware.js");

router.post("/register", loginController.registerUser); // Route for registering a user

router.post("/login", loginController.signInUser);

router.post("/addEvent", isAuthenticated, addeventsController.addEvent);

module.exports = router;
