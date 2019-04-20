var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var cors = require('cors')
const PORT = process.env.PORT || 5000

//mangoose connection
var db = require('./dbConnection.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname,'../client/build')))

//socke.io
var socketIO = require('socket.io');
var io = socketIO(server);

//routes 
let routes = require("./routes/routes.js");

//routes to use
app.use('/api',routes); 

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})



app.set('port', PORT );

// Starts the server.
server.listen(PORT , function() {
  console.log('Starting server on port 5000');
});

//socket.io functions
require('./sockets.js')(io);



