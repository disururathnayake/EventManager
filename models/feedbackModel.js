const { v4: uuidv4 } = require('uuid');
const client = require('../dbConnection'); // MongoDB connection

// Access the feedbacks collection
const feedbacksCollection = client.db('users').collection('feedbacks');

// Function to create feedback
function createFeedback(feedback, callback) {
  feedback.feedbackId = uuidv4(); // Generate a unique feedback ID
  feedback.createdAt = new Date(); // Add the current date as the feedback creation date
  feedbacksCollection.insertOne(feedback, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// Function to fetch all feedbacks
function getAllFeedbacks(callback) {
  feedbacksCollection.find().toArray((err, feedbacks) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, feedbacks);
  });
}

// Function to update feedback
function updateFeedback(feedbackId, updatedFeedback, callback) {
  feedbacksCollection.updateOne({ feedbackId: feedbackId }, { $set: updatedFeedback }, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// Function to delete feedback
function deleteFeedback(feedbackId, callback) {
  feedbacksCollection.deleteOne({ feedbackId: feedbackId }, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

module.exports = {
  createFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
