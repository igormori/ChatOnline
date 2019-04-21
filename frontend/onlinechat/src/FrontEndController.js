import axios from "axios"
import { CardActions } from "@material-ui/core";
let baseURL = process.env.baseURL || "http://localhost:5000"

export const API = {
  frontEnd: {
    rooms: {
      get: function () {
        return axios.get(`/api/rooms`)
      },
      getOne:function(room){
        return axios.get(`http://localhost:5000/api/rooms/${room}`)
      },
      editOne:function(room,name,id,createdDate,editDate,status){
        return axios.put(`http://localhost:5000/api/rooms/${room}`,{
          id:id,
          name:name,
          createdDate:createdDate,
          editDate:editDate,
          status:status
        })
      },
      delete: function(room){
        return axios.post(`http://localhost:5000/api/rooms/${room}`)
      },
      create: function(name,id,createdDate,editDate,status){
        return axios.post(`http://localhost:5000/api/rooms`,{
          id:id,
          name:name,
          createdDate:createdDate,
          editDate:editDate,
          status:status
        })
      }
    },
    eventLogs:{
      post:function(type,user,date,time,eventID,PPID){
        return axios.post('http://localhost:5000/api/eventLog',{
          type:type,
          user:user,
          date:date,
          time:time,
          eventID:eventID,
          PPID:PPID
        })
      }
    },
    user:{
      get:function(room){
        return axios.get(`http://localhost:5000/api/users/${room}`)
    },
      post:function(user,date,time,room){
        return axios.post('http://localhost:5000/api/users',{
          user:user,
          date:date,
          time:time,
          room:room,
          connected:true
        })
      },
      put:function(user){
        return axios.put(`http://localhost:5000/api/users/${user}`,{
          connected:false
        })
      },
      putRoom:function(user,room){
        return axios.put(`http://localhost:5000/api/users/room/${user}`,{
          room:room
        })
      }
    },
    messages:{
      post:function(id,sender,reciever,message,date,time,room){
        return axios.post('http://localhost:5000/api/history',{
          id:id,
          sender:sender,
          reciever:reciever,
          message:message,
          date:date,
          time:time,
          room:room
        })
      }

    }
  }

}

export const CheckUserConnected =  function(){
  var user ={}
  if(localStorage.getItem('userName')){
    user = {
      name:localStorage.getItem('userName'),
      room:localStorage.getItem('userRoom')
    }
    return user
  }else{
    return false
  }
}


export const DATE = function() {
  var date = new Date();
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() ;
}

export const TIME = function () {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


export const EVENTID = function(event) {
  // eslint-disable-next-line
  if(event == "connection"){
    return "101"
  }// eslint-disable-next-line
  if(event == "joined"){
    return "102"
  }// eslint-disable-next-line
  if(event == "disconnection"){
    return "103"
  }// eslint-disable-next-line
    if(event == "error"){
    return "104"
  }
}

export const PPID = function(event) {
  // eslint-disable-next-line
   if(event == "connection"){
    return "1005"
  }
  // eslint-disable-next-line
  if(event == "joined"){
    return "1006"
  }
  // eslint-disable-next-line
  if(event == "disconnection"){
    return "1007"
  }// eslint-disable-next-line
    if(event == "error"){
    return "1008"
  }
}

export const RND =  function(){
  return Math.floor(Math.random() * 1000)
}
