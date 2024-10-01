const client = require("../dbConnection");

// Access the events collection
const collection = client.db().collection("events");

// Function to fetch events by userId (existing function)
function getEventsByUserId(userId, callback) {
  // Find events where userId matches the logged-in user
  collection.find({ userId: userId }).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return the fetched events
  });
}

// Function to fetch all available events (new function)
function getAllEvents(callback) {
  // Fetch all events from the collection
  collection.find({}).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return all events
  });
}

module.exports = { getEventsByUserId, getAllEvents };
