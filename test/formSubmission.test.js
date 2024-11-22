const { expect } = require('chai');
const { createFeedback } = require('../controllers/feedbackController'); // Adjust as per your actual controller
const feedbackModel = require('../models/feedbackModel'); // Adjust as per your actual model

describe('Feedback Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Chamoth DevinDA',
        email: 'cketipearachchi@gmail.com',
        phone: '1234567890',
        query: 'This is a test feedback.'
      },
      session: { userId: '123' },  // Mock logged-in user
    };

    res = {
      status: function(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };
  });

  // Test for missing fields
  it('should return 400 if any field is missing', () => {
    delete req.body.name;  // Remove the name field

    createFeedback(req, res);
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('All fields are required');
  });

  // Test for successful feedback submission
  it('should return 201 if feedback is submitted successfully', (done) => {
    // Mock the database call
    feedbackModel.createFeedback = function(feedback, callback) {
      callback(null, feedback);  // Simulate successful insertion
    };

    createFeedback(req, res);
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Feedback submitted successfully');
    done();
  });

  // Test for database error
  it('should return 500 if there is a database error', (done) => {
    // Mock the database call to simulate an error
    feedbackModel.createFeedback = function(feedback, callback) {
      callback(new Error('Database error'), null);  // Simulate database error
    };

    createFeedback(req, res);
    expect(res.statusCode).to.equal(500);
    expect(res.body.message).to.equal('Failed to submit feedback');
    done();
  });
});
