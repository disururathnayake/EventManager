// feedbackRouter.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to create feedback
router.post('/', feedbackController.createFeedback);

// Route to get all feedbacks
router.get('/', feedbackController.getAllFeedbacks);

// Route to update feedback by ID
router.put('/:id', feedbackController.updateFeedback);

// Route to delete feedback by ID
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
