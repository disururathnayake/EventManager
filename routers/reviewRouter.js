const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/reviewController");

// Route to get events
router.get("/", eventsController.getAllEvents);

router.post("/submitComment", eventsController.submitComment);


module.exports = router;