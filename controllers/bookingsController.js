const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const bookingsModel = require('../models/bookingsModel');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // For example, using Gmail service
  auth: {
    user: 'chamoxdev@gmail.com', // Replace with your email
    pass: 'ohxw qocx avzr zioh'  // Replace with your email password
  }
});

// Get all bookings
function getAllBookings(req, res) {
  bookingsModel.getAllBookings((err, bookings) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching bookings' });
    }
    res.status(200).json(bookings);
  });
}

function createBooking(req, res) {
    const booking = req.body;
  
    bookingsModel.createBooking(booking, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating booking" });
      }
  
      // Dynamically construct the path to the email template
      const templatePath = path.join(__dirname, '../templates/emailTemplate.html'); // Use relative path
  
      fs.readFile(templatePath, "utf8", (err, html) => {
        if (err) {
          console.error("Error reading email template:", err);
          return res.status(500).json({ message: "Error sending email" });
        }
  
        // Replace placeholders with actual data
        const emailHtml = html
          .replace("{{name}}", booking.name)
          .replace("{{eventName}}", booking.eventName)
          .replace("{{tickets}}", booking.tickets)
          .replace("{{eventDate}}", new Date().toLocaleDateString()) // Replace with actual event date
          .replace("{{venue}}", "Event Venue Address"); // Replace with actual venue
  
        // Email options
        const mailOptions = {
          from: "test@gmail.com",// Replace with your email
          to: booking.email, // Email of the user making the booking
          subject: `Booking Confirmation for ${booking.eventName}`,
          html: emailHtml, // HTML body
        };
  
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Error sending email" });
          } else {
            console.log("Email sent: " + info.response);
          }
  
          // Respond with success
          res.status(201).json({ message: "Booking created successfully", bookingId: result.insertedId });
        });
      });
    });
  }
  

// Update a booking
function updateBooking(req, res) {
  const bookingId = req.params.bookingId;
  const updatedBooking = req.body;

  bookingsModel.updateBooking(bookingId, updatedBooking, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating booking' });
    }
    res.status(200).json({ message: 'Booking updated successfully' });
  });
}

// Delete a booking
function deleteBooking(req, res) {
  const bookingId = req.params.bookingId;
  bookingsModel.deleteBooking(bookingId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting booking' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  });
}

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
