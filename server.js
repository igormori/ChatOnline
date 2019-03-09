var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
const PORT = process.env.PORT || 3030;

//mangoose connection
var db = require('./backend/dbConnection.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//socke.io
var socketIO = require('socket.io');
var io = socketIO(server);

//routes 
let eventsLog=require("./backend/routes/routes.js");

//routes to use
app.use('/api',eventsLog); 
app.set('port', PORT);
app.use('/static', express.static(__dirname + '/frontend/static'));
// Routing
app.get('/chat', function(request, response) {
  response.sendFile(path.join(__dirname, '/frontend/index.html'));
});
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/frontend/login.html'));
});
app.get('/register', function(request, response) {
  response.sendFile(path.join(__dirname, '/frontend/register.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/index.html'))
  })
// Starts the server.
server.listen(PORT, function() {
  console.log('Starting server on port 5000');
});


//socket.io functions
require('./backend/sockets.js')(io);



