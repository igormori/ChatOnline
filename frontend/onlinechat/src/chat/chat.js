import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import TextField from '@material-ui/core/TextField';
import './chat.css'
import io from "socket.io-client";
import { CheckUserConnected } from '../FrontEndController'
import { API } from '../FrontEndController'
import { DATE } from '../FrontEndController'
import { TIME } from '../FrontEndController'
import { EVENTID } from '../FrontEndController'
import { PPID } from '../FrontEndController'

let isNewUser = true

class Chat extends Component {
  state ={
    name:"Guest",
    room:"",
    rooms:[],
    disconectionBtn :"",
    messages:[],
    users:[]
  }
  
  componentWillMount(){
    this.socket = io("http://localhost:5000");
  }
  
  async componentDidMount() {

    API.frontEnd.rooms.get().then((success) => {
      console.log(success.data)
                  var roomsArray =[]
                  for(var i=0; i < success.data.length ; i++){
                    roomsArray.push(success.data[i]) 
                  }
                  this.setState({rooms:roomsArray})
    }).catch((error) => {
    })

     if(CheckUserConnected()){
      isNewUser = false
      var user = CheckUserConnected()
      this.setState({name: user.name,room:user.room})
      this.setState({disconectionBtn: <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  p-5'><h5>Click bellow to disconnect</h5><button className='btn mt-2 bg-danger text-white' onClick={this.handleClick}>Disconnect</button></div>})
    } else{
      this.setState({disconectionBtn:<div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  p-5'> <h5>Plese select you name</h5><TextField id='outlined-name' label='Name' onChange={this.handleChangeName} /><button className='btn m-4' id='sub2' onClick={this.handleClick}>Connect</button></div> })
    }  

// <------ listen for messages update ------->
    this.socket.on("new_update",(data)=>{
      this.setState(prevState => { const { messages }  = prevState;messages.push(data.message);return { messages };});
      this.setState({disconectionBtn: <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  p-5'><h5>Click bellow to disconnect</h5><button className='btn mt-2 bg-danger text-white' onClick={this.handleClick}>Disconnect</button></div>})
    })
// <------ listen for users list update ------->



// <------ listen messages update   ------->

  }





  
   handleChangeName =  event => {
    this.setState({name: event.target.value})
  };

  handlerRoom = event => {
    this.setState({room: event.target.innerText})
  };

  handleClick = event =>{
    event.preventDefault();
    if(isNewUser){
      localStorage.setItem('userName',this.state.name)
      localStorage.setItem('userRoom',this.state.room)
      isNewUser = false
      this.socket.emit('sendUserInfo', { name: this.state.name, room: this.state.room });
      //create connection event log
       API.frontEnd.eventLogs.post("connection",this.state.name,DATE(),TIME(),EVENTID("connection"),PPID("connection")).then((success) => {
          console.log(success.data)
        }).catch((error) => {
          console.log(error)
        })
        //create joined event log
       API.frontEnd.eventLogs.post("joined",this.state.name,DATE(),TIME(),EVENTID("joined"),PPID("joined")).then((success) => {
          console.log(success.data)
        }).catch((error) => {
          console.log(error)
        })

    }else{
      localStorage.removeItem('userName')
      localStorage.removeItem('userRoom')
      this.socket.emit('disconnection',{userName:this.state.name})
       API.frontEnd.eventLogs.post("disconnection",this.state.name,DATE(),TIME(),EVENTID("disconnection"),PPID("disconnection")).then((success) => {
  console.log(success.data)
        }).catch((error) => {
          console.log(error)
        })
      isNewUser = true
      window.location ='/chat'
    }
   
  }

  render() {
    return <div className="m-1" >
    
      <div className='container-fluid  blue-grey lighten-5 rounded z-depth-1 mt-3'>
        <div className='row text-center'>
        <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-5 '>
                <h4>Hello <b class='text-primary'>{this.state.name}</b></h4>
                <h4>Welcome to online chat room <b class='text-primary'>{this.state.room}</b>! </h4>
            </div>
            <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  p-5 '>   
            <h5 className="mb-4">Plese select you room</h5>  
            <DropdownButton className="mt-2" id="dropdown-basic-button" title="Rooms avaliables"> 
              {this.state.rooms.map((value, index) => {
                                    return <Dropdown.Item onClick={this.handlerRoom}>{value.name}</Dropdown.Item>
                                })}
            </DropdownButton>
            </div>
           {this.state.disconectionBtn}
        </div>
      </div>


        <div className="container-fluid">
          <div className="row">
            <div className="col-8 border p-2 blue-grey lighten-5 rounded">
            <i className="material-icons small">chat</i><h5>Chat messages </h5>
                   <ul className="collection" id="messages">
                   {this.state.messages.map((value, index) => {
                                    return  <li>{value}</li>
                                })}
                   </ul>
              </div>
              <div className="col-4 border p-2  blue-grey lighten-5 rounded ">
              <i className="material-icons small">group</i><h5>User`s list </h5>
                   <ul className="collection" id="users">
                    {this.state.users.map((value, index) => {
                                    return  <li>{value}</li>
                                })}
                   </ul>
              </div>
            </div>
          </div> 
        

    <div className='col'>
    <div className="form m-2"><input id='m' autoComplete='off'/></div>
    </div>
    <div className='col m-2'>
    <button className='btn' id='sub'>Send</button>
    </div>
      
    </div>;
  }
}

export default Chat;
