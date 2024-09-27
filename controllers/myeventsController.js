const eventsModel = require('../models/myeventsModel');

const getMyEvents = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized: Please log in to view events' });
    }

    const userId = req.session.userId;

    eventsModel.getEventsByUserId(userId, (err, events) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching events' });
        }
        res.status(200).json(events); // Send the fetched events
    });
};

const updateEvent = (req, res) => {
    const eventId = req.params.id;
    const updatedEvent = req.body;
  
    eventsModel.updateEventById(eventId, updatedEvent, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating event" });
      }
      res.status(200).json({ message: "Event updated successfully" });
    });
  };

  const deleteEvent = (req, res) => {
    const eventId = req.params.id;
  
    eventsModel.deleteEventById(eventId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting event" });
      }
      res.status(200).json({ message: "Event deleted successfully" });
    });
  };

module.exports = { getMyEvents, updateEvent, deleteEvent };
