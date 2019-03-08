const axios = require('axios');
const controller = require('./controller/requestController')
var d = new Date();
var list =''


module.exports = function(io){
   io.on('connect', function(socket) {
      socket.room = 1
      socket.userName =""
      socket.colors = ["primary","danger","success","warning","light"];
      socket.list=[]

//    <----- Set true if user connects ----->
       socket.on("true",(data)=>{
         controller.setTrue(data.userName);
         //save on db
         controller.addLog(data.userName,controller.date(d),controller.time(d),"connection")
         socket.emit('new_update',  {message: `** you have joined a new chat **`} ); 
         console.log("user connected")
      })
      
//    <----- create a new room ----->
      socket.on('create', function(data) {  
         socket.userName = data.userName
         socket.room =  data.room
         socket.email = data.email
         socket.list='';
         socket.join(data.room);
         socket.broadcast.to(data.room).emit('new_update',{message:`** ${data.userName} joined the room **`} );
         socket.emit('room_color',  {newColor:socket.colors[data.room-1]} ); 
         })

//    <----- Send list of all users in the same room----->
       socket.on('users_list',function(data){
         axios.get("http://localhost:5000/api/users").then(function (response) { 
            list=(response.data)
            var lists = []
            for (var i = 0; i < response.data.length; i++) {
               if(response.data[i].room == data.room && response.data[i].connected == true){
                  lists.push(response.data[i].user)
                }
            }
            io.sockets.in(data.room).emit('users',{users:lists});
          }).catch(function (error) {console.log(error);});
   })
  
     
//    <----- Listen for messages and save messages on DB ----->
       socket.on('new_message',(data)=>{
          var userList = []
          for (var i=0;i<list.length;i++){
            if(list[i].room == socket.room && list[i].email !=socket.email ){
               userList.push(list[i].email)
            }
          }
          console.log("message sent history saved!")
          //save on db
         controller.addHistory(data.userName, userList , data.message ,controller.date(d),controller.time(d),socket.room)
         io.sockets.in(socket.room).emit('new_message',{ message:data.message , userName:socket.userName}); 
       });


//    <----- Change room and update old room and neww room ----->
      socket.on("changeRoom", (room) => {
            var oldRoom =  socket.room
            if(socket.room < 5){socket.room ++;}else{socket.room = 1;}
            console.log("Room changed to: "+socket.room)
            socket.leave(socket.room, function (err) {});

            //save on db
            controller.addLog(room.email,controller.date(d),controller.time(d),"Joined")
            controller.setRoom(room.email,socket.room)
            socket.join(socket.room);

            // emito update to the old room
            io.sockets.in(oldRoom).emit('new_update',  {message: `** ${socket.userName} left the room **`} );  
            socket.broadcast.to(oldRoom).emit('list_update',{userName:socket.userName,status:false});
            
            // emit update to the new room
            io.sockets.in(socket.room).emit('list_update',{userName:socket.userName,status:true});
            io.sockets.in(socket.room).emit('room',{room:socket.room})
            io.sockets.in(socket.room).emit('room_color',  {oldColor:socket.colors[oldRoom-1],newColor:socket.colors[socket.room-1]} );  
            io.sockets.in(socket.room).emit('new_update',  {message:`** ${socket.userName} joined the room **`} );  
            socket.emit('list_update',{userName:socket.userName,status:"reload"});
      });

//    <----- User disconnection ----->
      socket.on("disconnection",(data)=>{
            console.log( data.userName + " Disconnected")
            //save on db
            controller.setFalse(data.email)
            controller.addLog(data.email,controller.date(d),controller.time(d),"disconnection")
            socket.broadcast.emit('list_update',{userName:data.userName,status:false});
            socket.to(socket.room).emit('new_update',  {message:`** ${socket.userName} disconnected **`} );
      })
   })
  
}