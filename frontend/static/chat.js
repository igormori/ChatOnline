  var socket = io();

    var d = new Date();
    var time = formatDate(d);
 
    // inputs
    var message = $('#m');
    var send_message = $('#sub');
    var chatRoom = $('#messages');
    var users = $('#users');
    var room_change =$('#btnChange');
    var email = localStorage.getItem("user");
    var disconnect = $("#btnDisconnect");
    var room = localStorage.getItem("room")
    var userName = localStorage.getItem("userName")
    $('#message').html("Room number: "+room)
    
//  <------  Emit the initial connection ------>
      socket.emit('connect',socket);
      socket.emit('true',{userName:email});
      socket.emit('create', {room:room,userName:userName,email:email});
      socket.emit('users_list', {room:room,userName:userName,email:email});

   
//  <------  Send initial user`s list  ------>
socket.on('users',(data)=>{    
  for (var i = 0; i < data.users.length; i++) {
         console.log(data.users[i])
        if(!$("#"+data.users[i]).length == 0) {
          $("#"+data.users[i]).remove()
          users.append($('<li '+'id='+data.users[i]+'>'+'('+time+') '+data.users[i]+'</li>'  ));
        }else
        if(data.status){
          $("#"+data.users[i]).remove()
        }
        else{
          users.append($('<li '+'id='+data.users[i]+'>'+'('+time+') '+data.users[i]+'</li>'  ));
        }    
}
})
      

//  <------  Change room color------>
    socket.on('room_color',(data)=>{
        $('.chat').removeClass(`bg-${data.oldColor}`);
        $('.chat').addClass(`bg-${data.newColor}`)
    })    
  
//  <------  emit message ------>
    send_message.click(function(){
      socket.emit('new_message',{message:message.val(),userName:userName})
      $('#m').val('');
    })
    
//  <------  add messages to the list ------>
    socket.on("new_message",(data)=>{
      chatRoom.append($('<li> ('+time+') <b> '+ data.userName+ '</b>'+ ' says:  '+ data.message+ '</li>'));
    })

//  <------  listen for update messages  ------>
    socket.on("new_update",(data)=>{
      chatRoom.append($('<li> <i>'+ data.message + '<i>'+'</li>' ));
    })

//  <------  Change room   ------>
    socket.on("room",(data)=>{
      localStorage.setItem("room",data.room)
    })

//  <------  Change room on server   ------>
room_change.click(function(){
  socket.emit('changeRoom',{roomNumber:room,user:userName,email:email})
})

//  <------  Update user`s list  ------>
    socket.on("list_update",(data)=>{
      if(data.status == false){
        if(!$("#"+data.userName).length == 0) {
          $("#"+data.userName).remove()
        }
      }else{
        $("#"+data.userName).remove()
        users.append($('<li '+'id='+data.userName+'>'+'('+time+') '+data.userName+'</li>'  ));
      }
      if(data.status == "reload"){
        location.reload()
      }
    })
    
//  <------  emit user disconnection  ------>
    disconnect.click(function(){
      socket.emit('disconnection',{userName:userName,room:room,email:email})
      localStorage.clear()
      window.location="/";
    
  })
//  <------  redirect the page when needed  ------>
  socket.on('redirect',(data)=>{
    location.reload();
  });


    //time stamp
    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      return strTime;
    }
  