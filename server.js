const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./dbConnection');
const feedbackRouter = require('./routers/feedbackRouter');
const session = require('express-session');

const { Socket } = require('socket.io');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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

// Start the server
http.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
