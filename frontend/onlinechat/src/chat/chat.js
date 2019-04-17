import React, { Component } from 'react';
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
    room:"Room not connected",
    rooms:[],
    disconectionBtn :"",
    textField :"",
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
      this.setState({disconectionBtn: <div className='col s12 m12 l12 mt'><button className='btn mt deep-orange darken-4'  onClick={this.handleClick}>Disconnect</button></div>})
      this.setState({textField: <div className='col s12 m12 l12 mt'>Welcome<b>{this.state.name}</b></div>})
    } else{
      this.setState({disconectionBtn:<div className='col s12 m12 l12 mt'><button className='btn mt' id='sub2' onClick={this.handleClick}>Connect</button></div> })
      this.setState({textField: <div className='col s12 m12 l12 mt'><b>Plese enter you name</b><br></br><TextField id='outlined-name' label='Name' onChange={this.handleChangeName} /></div>})
    }  

// <------ listen for messages update ------->
    this.socket.on("new_update",(data)=>{
      console.log(data.message)
      this.setState(prevState => { const { messages }  = prevState;messages.push(data.message);return { messages };});
        this.setState({textField: <div className='col s12 m12 l12 mt'>Welcome<b>{this.state.name}</b></div>})
      this.setState({disconectionBtn: <div className='col s12 m12 l12 mt'><button className='btn mt deep-orange darken-4'  onClick={this.handleClick}>Disconnect</button></div>})
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
        }).catch((error) => {
        })
        //create joined event log
       API.frontEnd.eventLogs.post("joined",this.state.name,DATE(),TIME(),EVENTID("joined"),PPID("joined")).then((success) => {
        }).catch((error) => {
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
    const { classes } = this.props;
    return <div className=" s" >
    
    <div className="row">

      <div className="col s12 m2 l2 chatNav pb grey lighten-5  z-depth-2 ">
        <div className="row">
            <div className="col s12 m12 l12 text-center pb grey lighten-5 ">
                  <h5>Online chat</h5>
            </div>
            <div className="col s12 m12 l12 text-center mt grey lighten-5 p-2">
                 <i class="material-icons medium">account_circle</i> {this.state.textField}
            </div>
            <div className="col s12 m12 l12 text-center pb  grey lighten-5 p-2  mt">
            <div >
            <h5><b>Avaliables rooms</b></h5>
            </div>
            
            <div class="collection border-none grey lighten-3">
             {this.state.rooms.map((value, index) => {
                                    return  <a href="#!" onClick={this.handlerRoom} class="collection-item text-dark">{value.name}</a>
                                })}
              </div>
            </div>
            <div className="col s12 m12 l12 mt text-center pb grey lighten-5 p-2  mt ">
          {this.state.room}
                {this.state.disconectionBtn}
             </div>
      </div>
       </div>
       
      <div className="col s10 m10 l10 chat ">

      <div className="col s12 m12 l10 chat ">
      
        <div class="container-fluid">
          <div class="row">
            <div class="col border">
               <h5><i class="material-icons small">message</i>Chat messages</h5>
                   <div id="messages mb-4 " >
                   {this.state.messages.map((value, index) => {
                                    return  <div class="messages border grey lighten-5 m-2">{value}</div>
                                })}   
                   </div>

              </div>
            </div>
          </div> 
          <div>
          <input id='m' autocomplete='off' placeholder="Enter your message" />
          </div>
          <div class="form float"> <button class="btn waves-effect waves-light" type="submit" name="action">Send
    <i class="material-icons right">send</i>
  </button></div>

      </div>
      <div className="col s12 m12 l2 chat z-depth-1">
       <div class="col-4 border">
              <h5><i class="material-icons small">account_circle</i>User`s list</h5>
                    <div id="users mb-4 " >
                   {this.state.users.map((value, index) => {
                                    return  <div class="messages border grey lighten-5 m-2">{value}</div>
                                })}   
                   </div>
                   
              </div>
      </div>
      
      </div>

    </div>
          
    </div>;
  }
}

export default Chat;
