let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');

const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let userIdCounter = 1;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const userRouter = require('./routers/router'); 
app.use('/api/users', userRouter);


http.listen(port, ()=>{
    console.log('express server started');
});
