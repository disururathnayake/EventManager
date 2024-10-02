const feedbackModel = require('../models/feedbackModel');

// Create new feedback
const createFeedback = (req, res) => {
  const { name, email, phone, query } = req.body;

  // Check for missing fields
  if (!name || !email || !phone || !query) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newFeedback = {
    name,
    email,
    phone,
    query,
  };

  feedbackModel.createFeedback(newFeedback, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to submit feedback', err });
    }
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: result });
  });
};

// Get all feedbacks
const getAllFeedbacks = (req, res) => {
  feedbackModel.getAllFeedbacks((err, feedbacks) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching feedbacks' });
    }
    res.status(200).json(feedbacks);
  });
};

// Update feedback by ID
const updateFeedback = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, query } = req.body;

  const updatedFeedback = { name, email, phone, query };

  feedbackModel.updateFeedback(id, updatedFeedback, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating feedback' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', result });
  });
};

// Delete feedback by ID
const deleteFeedback = (req, res) => {
  const { id } = req.params;

  feedbackModel.deleteFeedback(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting feedback' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully', result });
  });
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
