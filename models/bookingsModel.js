const { v4: uuidv4 } = require('uuid');
const client = require('../dbConnection'); // MongoDB connection

// Access the bookings collection
const bookingsCollection = client.db('users').collection('bookings');

// Function to create a booking
function createBooking(booking, callback) {
  booking.bookingId = uuidv4(); // Generate a unique booking ID
  booking.bookingDate = new Date(); // Add the current date as the booking date
  bookingsCollection.insertOne(booking, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// Function to fetch all bookings
function getAllBookings(callback) {
  bookingsCollection.find().toArray((err, bookings) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, bookings);
  });
}

// Function to update a booking
function updateBooking(bookingId, updatedBooking, callback) {
  bookingsCollection.updateOne({ bookingId: bookingId }, { $set: updatedBooking }, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// Function to delete a booking
function deleteBooking(bookingId, callback) {
  bookingsCollection.deleteOne({ bookingId: bookingId }, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
