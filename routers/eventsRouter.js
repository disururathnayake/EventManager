const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/myeventsController");

// Route to get events
router.get("/", eventsController.getMyEvents);

// Route to update an event
router.put("/:id", eventsController.updateEvent);

// Route to delete an event
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
