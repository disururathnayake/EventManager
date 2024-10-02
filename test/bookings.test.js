const { expect } = require('chai');
const {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingsController');
const bookingsModel = require('../models/bookingsModel');

describe('Bookings Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      session: {}, // Mock session
    };

    res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
  });

  // Test for getting all bookings
  describe('getAllBookings', () => {
    it('should return 200 and all bookings', (done) => {
      // Mock the database call
      bookingsModel.getAllBookings = function (callback) {
        callback(null, [{ eventName: 'Test Event' }]);
      };

      getAllBookings(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').that.deep.includes({ eventName: 'Test Event' });
      done();
    });

    it('should return 500 if there is a database error', (done) => {
      bookingsModel.getAllBookings = function (callback) {
        callback(new Error('Database error'));
      };

      getAllBookings(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.body.message).to.equal('Error fetching bookings');
      done();
    });
  });

  // Test for creating a booking
  describe('createBooking', () => {
    beforeEach(() => {
      req.body = {
        name: 'John Doe',
        eventName: 'Test Event',
        tickets: 2,
        email: 'john@example.com',
      };
    });

    it('should return 500 if there is an error creating a booking', (done) => {
      bookingsModel.createBooking = function (bookingData, callback) {
        callback(new Error('Database error'));
      };

      createBooking(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.body.message).to.equal('Error creating booking');
      done();
    });
  });

  // Test for updating a booking
  describe('updateBooking', () => {
    beforeEach(() => {
      req.params.bookingId = '12345'; // Mock booking ID
      req.body = { name: 'Jane Doe' }; // Updated booking data
    });

    it('should return 200 if booking is updated successfully', (done) => {
      bookingsModel.updateBooking = function (bookingId, updatedBooking, callback) {
        callback(null, { success: true }); // Simulate successful update
      };

      updateBooking(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Booking updated successfully');
      done();
    });

    it('should return 500 if there is an error updating a booking', (done) => {
      bookingsModel.updateBooking = function (bookingId, updatedBooking, callback) {
        callback(new Error('Database error'));
      };

      updateBooking(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.body.message).to.equal('Error updating booking');
      done();
    });
  });

  // Test for deleting a booking
  describe('deleteBooking', () => {
    beforeEach(() => {
      req.params.bookingId = '12345'; // Mock booking ID
    });

    it('should return 200 if booking is deleted successfully', (done) => {
      bookingsModel.deleteBooking = function (bookingId, callback) {
        callback(null, { success: true }); // Simulate successful deletion
      };

      deleteBooking(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Booking deleted successfully');
      done();
    });

    it('should return 500 if there is an error deleting a booking', (done) => {
      bookingsModel.deleteBooking = function (bookingId, callback) {
        callback(new Error('Database error'));
      };

      deleteBooking(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.body.message).to.equal('Error deleting booking');
      done();
    });
  });
});
