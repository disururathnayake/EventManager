const client = require("../dbConnection");

// Access the events collection
const collection = client.db().collection("events");

function getAllEvents(callback) {
  collection.find().toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return the fetched events
  });
}

module.exports = { getAllEvents};
