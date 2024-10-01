const client = require("../dbConnection");
const collection = client.db().collection("events");

function getLatestEvents(callback) {
  // Fetch the latest 5 events, sorted by eventDate in descending order
  collection.find().sort({ eventDate: -1 }).limit(5).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events);
  });
}

module.exports = { getLatestEvents };
