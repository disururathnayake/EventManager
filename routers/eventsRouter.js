const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/myeventsController");
const eventsModel = require("../models/myeventsModel");
const bookingsController = require("../controllers/bookingsController"); // Import bookingsController

// Route to get events
router.get("/", eventsController.getMyEvents);

// Route to get events
router.get("/all/", eventsController.getAllEvents);

// Route to update an event
router.put("/:id", eventsController.updateEvent);

// Route to delete an event
router.delete("/:id", eventsController.deleteEvent);
// Route to fetch all events
router.get("/all", (req, res) => {
  eventsModel.getAllEvents((err, events) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching events" });
    }
    res.status(200).json(events); // Send the fetched events as JSON response
  });
});

// Route to fetch all bookings
router.get("/bookings", bookingsController.getAllBookings);

// Route to handle booking submissions
router.post("/book", bookingsController.createBooking);

// Route to update a booking by booking ID
router.put("/update/:bookingId", bookingsController.updateBooking);

// Route to delete a booking by booking ID
router.delete("/delete/:bookingId", bookingsController.deleteBooking);

module.exports = router;
