const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./dbConnection');
const feedbackRouter = require('./routers/feedbackRouter');
const session = require('express-session');


const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

let userIdCounter = 1;


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


// Start the server

http.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
