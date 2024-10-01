const client = require("../dbConnection");

// Access the events collection
const collection = client.db().collection("events");

function findAllEvents(callback) {
  // Find events where userId matches the logged-in user
  collection.find({}).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return the fetched events
  });
}

function getEventsByUserId(userId, callback) {
  // Find events where userId matches the logged-in user
  collection.find({ userId: userId }).toArray((err, events) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, events); // Return the fetched events
  });
}

function updateEventById(eventId, updatedEvent, callback) {
  collection.updateOne(
    { _id: new require("mongodb").ObjectID(eventId) },
    { $set: updatedEvent },
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
}

function deleteEventById(eventId, callback) {
  collection.deleteOne(
    { _id: new require("mongodb").ObjectID(eventId) },
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
}

module.exports = {
  findAllEvents,
  getEventsByUserId,
  updateEventById,
  deleteEventById,
};
