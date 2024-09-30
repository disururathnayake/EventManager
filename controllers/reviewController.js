const reviewmanageModel = require('../models/reviewmanageModel');

const getAllEvents = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized: Please log in to view events' });
    }

    

    reviewmanageModel.getAllEvents((err, events) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching events' });
        }
        res.status(200).json(events); // Send the fetched events
    });
};

module.exports = { getAllEvents};