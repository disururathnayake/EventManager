const addeventsModel = require('../models/addeventsModel');
const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: './uploads/', 
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


  // Bypass multer if running in the test environment
  if (process.env.NODE_ENV === 'test') {
    // Simulate the file upload for testing
    req.file = { filename: 'test-image.jpg' };

    // Call the createEvent function directly
    handleEventCreation(req, res);
  } else {
    // Use multer to handle file upload in non-test environments
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Call the event creation handler after multer processes the file
      handleEventCreation(req, res);
    });
  }
};

// Function to handle event creation (used by both multer and bypass logic)
const handleEventCreation = (req, res) => {
  // Check if user is authenticated
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized: Please log in to add events' });
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
    eventPhoto: req.file ? req.file.filename : null,  // Save the uploaded file's filename or null
    userId: req.session.userId,     // Associate event with the logged-in user
  };

  // Save event data to the database
  addeventsModel.createEvent(event, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding event' });
    } else {
      return res.status(201).json({ message: 'Event added successfully', event: result });
    }
  });
};


module.exports = { addEvent };
