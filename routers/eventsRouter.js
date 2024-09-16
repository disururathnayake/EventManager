const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/myeventsController");

// Route to get events
router.get("/", eventsController.getMyEvents);

//router.get('/', (req, res) => {
//    console.log('Fetching events...'); // Add this to verify the request is hitting the route
//    eventsController.getMyEvents(req, res);
//});

module.exports = router;
