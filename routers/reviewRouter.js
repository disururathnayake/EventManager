const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/reviewController");

// Route to get events
router.get("/", eventsController.getAllEvents);
router.get("/all", eventsController.getAll);

router.post("/submitComment", eventsController.submitComment);
router.get("/:eventId", eventsController.getReviewsForEvent);


module.exports = router;