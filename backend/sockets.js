const axios = require('axios');
const controller = require('./controller/requestController')
var d = new Date();



module.exports = function(io){
   io.on('connect', function(socket) {
      socket.users = []
//    <----- create a new room ----->
      socket.on("sendUserInfo", data =>{
         socket.users.push(data.name)
         console.log("user"+ data.name +" Connected in "+ data.room)
         socket.room = data.room
         socket.userName = data.name
         socket.emit('new_update',  {message: `** you have joined a new chat **`} );
         socket.join(data.room);
         socket.broadcast.to(data.room).emit('new_update',{message:`** ${data.name} joined the room **`} );
      })

   //    <----- User disconnection ----->
      socket.on("disconnection",(data)=>{
            console.log( data.userName + " Disconnected")
            //save on db
            socket.to(socket.room).emit('new_update',  {message:`** ${socket.userName} disconnected **`} );
      })
 })
 
  
}