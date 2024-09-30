const client = require("../dbConnection");


const collection = client.db().collection("events");
const reviewsCollection = client.db().collection("reviews");

function getAllEvents(userId, callback) {
    
    reviewsCollection.find({ userId: userId }).toArray((err, reviews) => {
      if (err) {
        return callback(err, null);
      }

      const reviewedEventIds = reviews.map(review => review.eventId);

      collection.find({ eventId: { $nin: reviewedEventIds } }).toArray((err, events) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, events); 
      });
    });
  }



function submitReview(reviewData, callback) {
  reviewsCollection.insertOne(reviewData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result); 
  });
}

module.exports = { getAllEvents, submitReview};
