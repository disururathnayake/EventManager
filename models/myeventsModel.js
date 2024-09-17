const client = require("../dbConnection");

// Access the events collection
const collection = client.db().collection("events");

function getEventsByUserId(userId, callback) {
  // Find events where userId matches the logged-in user
  collection.find({ userId: userId }).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return the fetched events
  });
}

module.exports = { getEventsByUserId };
