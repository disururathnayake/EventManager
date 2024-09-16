let express = require("express");
let app = express();
let port = process.env.port || 3000;
require("./dbConnection");

const session = require("express-session");

const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

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

const userRouter = require("./routers/router");
app.use("/api/users", userRouter);

const eventsRouter = require("./routers/eventsRouter"); // Event-related routes
app.use("/events", eventsRouter);

http.listen(port, () => {
  console.log("express server started");
});
