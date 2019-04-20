var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var cors = require('cors')

//mangoose connection
var db = require('./dbConnection.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()) // Use this after the variable declaration

//socke.io
var socketIO = require('socket.io');
var io = socketIO(server);

//routes 
let routes = require("./routes/routes.js");

//routes to use
app.use('/api',routes); 

app.set('port', 5000);

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

//socket.io functions
require('./sockets.js')(io);


