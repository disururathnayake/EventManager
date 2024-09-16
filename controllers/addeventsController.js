const addeventsModel = require('../models/addeventsModel');

const addEvent = (req, res) => {
    // Check if user is authenticated
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized: Please log in to add events' });
    }

    let event = req.body;
    event.userId = req.session.userId; // Associate event with the logged-in user

    addeventsModel.createEvent(event, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding event' });
        } else {
            res.status(201).json({ message: 'Event added successfully' });
        }
    });
};

module.exports = { addEvent };
