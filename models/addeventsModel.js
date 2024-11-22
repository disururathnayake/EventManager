const { v4: uuidv4 } = require("uuid");
const client = require("../dbConnection");

const collection = client.db().collection("events");

function createEvent(event, callback) {
  event.eventId = uuidv4();
  collection.insertOne(event, callback);
}


function getEventCount(callback) {
  collection.countDocuments({}, callback); // Get the count of all events
}

module.exports = { createEvent, getEventCount };
