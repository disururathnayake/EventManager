const reviewmanageModel = require('../models/reviewmanageModel');

const getAllEvents = (req, res) => {
    // Check if the user is logged in
    const userId = req.session.userId;
  
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Please log in to view events' });
    }
  
    // Call the model to get events the user has not reviewed
    reviewmanageModel.getAllEvents(userId, (err, events) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching events' });
      }
      
      // Return the events to the client
      res.status(200).json(events);
    });
  };

const submitComment = (req, res) => {
    const { eventId, comment, rating } = req.body;
  
    // Validate input
    if (!eventId || !comment || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(eventId);
  
    const reviewData = {
      eventId,
      comment,
      rating,
      createdAt: new Date(),
      userId: req.session.userId
    };
  
    reviewmanageModel.submitReview(reviewData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error submitting review' });
      }
      res.status(201).json({ success: true, message: 'Review submitted successfully' });
    });
  };
  

module.exports = { getAllEvents, submitComment};