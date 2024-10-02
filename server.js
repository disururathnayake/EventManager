const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
require('./dbConnection');
const feedbackRouter = require('./routers/feedbackRouter');
const session = require('express-session');
const sharedsession = require("express-socket.io-session");


const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

let userIdCounter = 1;

const sessionMiddleware = session({
  secret: 'eventmanager',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto', httpOnly: true }
});

// Apply session middleware to Express
app.use(sessionMiddleware);

// Apply shared session middleware to Socket.IO
io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));


app.use(
  session({
    secret: 'eventmanager',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto', httpOnly: true },
  })
);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Admin routes
const adminRouter = require('./routers/adminRouter.js');
app.use('/admin', adminRouter);

const userRouter = require("./routers/router");
app.use("/api/users", userRouter);

// Event-related routes
const eventsRouter = require('./routers/eventsRouter');
app.use('/events', eventsRouter);

// Feedback-related routes
app.use('/api/feedback', feedbackRouter);


const reviewRouter = require("./routers/reviewRouter"); // Event-related routes
app.use("/reviewevents", reviewRouter);



io.on('connection', (socket) => {
  console.log('A user connected');
  let intervalId; // Declare intervalId at a scope accessible by all relevant socket handlers

  if (socket.handshake.session.userId) {
    console.log('Session ID:', socket.handshake.session.userId);
    intervalId = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 100);
      socket.emit('number', randomNum);
      console.log(`The user : ${socket.handshake.session.email} logged in to the application` );
    }, 1000);
  } else {
    console.log('No session userId available');
  }

  socket.on('logout', () => {
    console.log('User initiated logout');
    clearInterval(intervalId);
    socket.disconnect(true);
  });

  
});

// Start the server

http.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
