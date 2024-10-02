const express = require('express');
const router = express.Router();
const addeventsController = require('../controllers/addeventsController');

// get the event count
router.get('/count', addeventsController.getEventCount);

module.exports = router;