const addeventsModel = require('../models/addeventsModel');

// const addEvent = (req, res) => {
//     // Check if user is authenticated
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized: Please log in to add events' });
//     }

//     let event = req.body;
//     event.userId = req.session.userId; // Associate event with the logged-in user

//     addeventsModel.createEvent(event, (err, result) => {
//         if (err) {
//             res.status(500).json({ message: 'Error adding event' });
//         } else {
//             res.status(201).json({ message: 'Event added successfully' });
//         }
//     });
// };

// module.exports = { addEvent };

const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: './uploads/',  // Directory where files will be stored
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only images are allowed');
    }
  },
}).single('eventPhoto');  // 'eventPhoto' is the name of the file input field

// Add Event Controller with image upload
const addEvent = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Event data including the file path for the image
    const event = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      venue: req.body.venue,
      aboutEvent: req.body.aboutEvent,
      specialNotes: req.body.specialNotes,
      type: req.body.type,
      eventPhoto: req.file.filename,  // Save the uploaded file's filename
      userId: req.session.userId,     // Associate event with the logged-in user
    };

    // Save event data to your database
    addeventsModel.createEvent(event, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding event' });
      } else {
        return res.status(201).json({ message: 'Event added successfully', event: result });
      }
    });
  });
};

module.exports = { addEvent };

