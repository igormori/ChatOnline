var request = require('request')

  exports.setTrue =  function(user){ 
        request.put({
          url: `http://localhost:5000/api/users/${user}`, 
          json: {
            connected:true
          }
    }, function(error, response, body) {
          try{
            response.body.connected
          }catch(error){
            console.log(error)
          }
    })
  }

  exports.setRoom = function(user,roomNumber){
    request.put({
      url: `http://localhost:5000/api/users/room/${user}`, 
      json: {
        room:roomNumber
      }
}, function(error, response, body) {
      try{
        response.body.connected
      }catch(error){
        console.log(error)
      }
})
  }

  exports.setFalse =  function(user){ 
    request.put({
      url: `http://localhost:5000/api/users/${user}`, 
      json: {
        connected:false
      }
}, function(error, response, body) {
      try{
        response.body.connected
      }catch(error){
        console.log(error)
      }
})
}


exports.addLog =  function(u,d,t,e){ 
  request.post({
    url: `http://localhost:5000/api/eventLog`, 
    json: {
        user : u,
        date: d,
        time: t,
        event: e
    }
}, function(error, response, body) {
    try{
      response.body.connected
    }catch(error){
      console.log(error)
    }
})
}

exports.addHistory = function(u,re,m,d,t,r){
  request.post({
    url: `http://localhost:5000/api/history`, 
    json: {
        sender : u,
        reciever:re,
        message:m,
        date: d,
        time: t,
        room: r
    }
}, function(error, response, body) {
    try{
      console.log("history added")
    }catch(error){
      console.log(error)
    }
})
}

exports.login = function(e,p){
  request.post({
    url: `http://localhost:5000/api/login`, 
    json: {
        email : e,
        password:p
    }
}, function(error, response, body) {
    try{
      console.log("history added")
    }catch(error){
      console.log(error)
    }
})
}


exports.date = function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() ;
}

exports.time = function (date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}