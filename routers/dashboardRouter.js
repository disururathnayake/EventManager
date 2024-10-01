const express = require("express");
const router = express.Router();
const eventModel = require("../models/eventModel"); // Assuming eventModel handles DB interactions

// Fetch and return events
router.get("/reviewevents", async (req, res) => {
  try {
    const events = await eventModel.getAllEvents(); // Fetch all events
    res.status(200).json(events); // Return events as JSON
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

module.exports = router;
