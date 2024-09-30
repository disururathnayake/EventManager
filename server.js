let express = require("express");
let app = express();
let port = process.env.port || 3000;
require("./dbConnection");

const session = require("express-session");

const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

let userIdCounter = 1;

app.use(
  session({
    secret: "eventmanager",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: "auto", httpOnly: true },
  })
);

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Admin routes
const adminRouter = require('./routers/adminRouter.js');
app.use('/admin', adminRouter);

const userRouter = require("./routers/router");
app.use("/api/users", userRouter);

const eventsRouter = require("./routers/eventsRouter"); // Event-related routes
app.use("/events", eventsRouter);

const reviewRouter = require("./routers/reviewRouter"); // Event-related routes
app.use("/reviewevents", reviewRouter);

http.listen(port, () => {
  console.log("express server started");
});
