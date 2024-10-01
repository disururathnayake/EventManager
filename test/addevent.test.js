const { expect } = require('chai');
const { addEvent } = require('../controllers/addeventsController');
const addeventsModel = require('../models/addeventsModel');

describe('Add Event Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        eventName: 'Test Event',
        eventDate: '2024-10-01',
        eventTime: '10:00 AM',
        venue: 'Test Venue',
        aboutEvent: 'This is a test event.',
        specialNotes: 'None',
        type: 'Workshop',
      },
      session: {},
      file: { filename: 'test-image.jpg' }, // Simulate the uploaded file
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

  it('should return 401 if user is not authenticated', () => {
    addEvent(req, res);

    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Unauthorized: Please log in to add events');
  });

  it('should return 201 and add the event if data is valid and user is authenticated', (done) => {
    // Mock session to simulate logged-in user
    req.session.userId = '123';

    // Mock the database call
    addeventsModel.createEvent = function(eventData, callback) {
      callback(null, { ...eventData, eventId: 1 });
    };

    addEvent(req, res);

    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Event added successfully');
    expect(res.body.event).to.have.property('eventName', 'Test Event');
    done();
  });

  it('should return 500 if an error occurs while adding the event', (done) => {
    // Mock session to simulate logged-in user
    req.session.userId = '123';

    // Mock the database call to return an error
    addeventsModel.createEvent = function(eventData, callback) {
      callback(new Error('Database error'), null);
    };

    addEvent(req, res);

    expect(res.statusCode).to.equal(500);
    expect(res.body.message).to.equal('Error adding event');
    done();
  });

  it('should handle file upload with multer (optional check)', () => {
    req.file = { filename: 'test-image.jpg' }; // Simulating an uploaded file
    req.session.userId = '123';

    addeventsModel.createEvent = function(eventData, callback) {
      callback(null, eventData);
    };

    addEvent(req, res);

    expect(res.statusCode).to.equal(201);
    expect(res.body.event).to.have.property('eventPhoto', 'test-image.jpg');
  });

 

});
