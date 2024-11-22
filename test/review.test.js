const { expect } = require('chai');
const { getAllEvents, submitComment, getReviewsForEvent } = require('../controllers/reviewController');
const reviewmanageModel = require('../models/reviewmanageModel');

describe('Review Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      session: {},  // Mock session
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

  // Test for unauthenticated user
  it('should return 401 if user is not authenticated', () => {
    getAllEvents(req, res);
    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Unauthorized: Please log in to view events');
  });

  // Test for successful event retrieval
  it('should return 200 and events if user is authenticated', (done) => {
    req.session.userId = '123';  // Simulate logged-in user

    // Mock the database call
    reviewmanageModel.getAllEvents = function(userId, callback) {
      callback(null, [{ eventName: 'Test Event' }]);
    };

    getAllEvents(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array').that.deep.includes({ eventName: 'Test Event' });
    done();
  });

  // Test for database error
  describe('getReviewsForEvent', () => {
    beforeEach(() => {
      req = { params: { eventId: '123' } };  // Mock request with eventId
  
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
  
    // Test for successful review fetching
    it('should return 200 and reviews for the event', (done) => {
      // Mock the database call
      reviewmanageModel.getReviewsByEventId = function(eventId, callback) {
        callback(null, [{ comment: 'Great event!' }]);  // Simulate successful data retrieval
      };
  
      getReviewsForEvent(req, res);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').that.deep.includes({ comment: 'Great event!' });
      done();
    });
  
   
  });
});

describe('submitComment', () => {
    beforeEach(() => {
      req = {
        body: {
          eventId: '123',
          comment: 'Great event!',
          rating: 5,
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
      delete req.body.comment;  // Remove the comment field
  
      submitComment(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal('All fields are required');
    });
  
    // Test for successful comment submission
    it('should return 201 if comment is submitted successfully', (done) => {
      // Mock the database call
      reviewmanageModel.submitReview = function(reviewData, callback) {
        callback(null, reviewData);  // Simulate successful insertion
      };
  
      submitComment(req, res);
      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('Review submitted successfully');
      done();
    });
  
  
  });

  describe('getReviewsForEvent', () => {
    beforeEach(() => {
      req = { params: { eventId: '123' } };  // Mock request with eventId
  
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
  
    // Test for successful review fetching
    it('should return 200 and reviews for the event', (done) => {
      // Mock the database call
      reviewmanageModel.getReviewsByEventId = function(eventId, callback) {
        callback(null, [{ comment: 'Great event!' }]);  // Simulate successful data retrieval
      };
  
      getReviewsForEvent(req, res);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').that.deep.includes({ comment: 'Great event!' });
      done();
    });
  
 
  });
