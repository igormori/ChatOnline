import React, { Component } from 'react';
import './chat.css'
import { API } from '../FrontEndController'
import { DATE } from '../FrontEndController'
import { TIME } from '../FrontEndController'
import {RND} from '../FrontEndController'
import { CheckUserConnected } from '../FrontEndController'

class messages extends Component {

    state ={
        name:"",
        room:"Room not connected",
        messages:[],
        users:[],
        message:""
      }
      
    componentDidMount(){
    // <------ listen for users list update ------->
      
        this.props.socket.on("new_update",(data)=>{
            this.setState(prevState => { const { messages }  = prevState;messages.push(data.message);return { messages };});
            API.frontEnd.user.get(data.room).then((res)=>{
               var userList =[]
               this.setState({room:data.room})
               for (var i = 0; i < res.data.length; i++) {
                  if(res.data[i].room == data.room && res.data[i].connected == true ){
                   userList.push(res.data[i].user);
                   this.setState({users:userList})
                  }   
                 }
                
               })
         })
    }
    handleMessage =  event =>{
        this.setState({message: event.target.value})
    }
    handleSubmit = event=>{
      event.preventDefault();
        if(CheckUserConnected()){
        // <------ listen messages update   ------->
            API.frontEnd.messages.post(RND(),localStorage.getItem('userName'),this.state.users,this.state.message,DATE(),TIME(),localStorage.getItem('userRoom')).then((res)=>{
                
            })
        this.props.socket.emit("new_message",{message:this.state.message,room:this.state.room})
        this.setState({message:""})
    }else{
        window.alert("Please connect first")
    }

    } 

    render() { 
        return ( <div>
<div className="col s10 m10 l10 ">
      <div className="col s12 m9 l9 ">
         <div >
            <div class="row "><h5><i class="material-icons small">message</i>Chat messages</h5>
               <div class="col border scroll">
                  
                  <div id="messages mb-4 " >
                     {this.state.messages.map((value, index) => {
                     return <div class="messages border grey lighten-5 mt">{value}</div>
                     })}   
                  </div>
               </div>
            </div>
         </div>
      
         <div>
            <input id='m'value={this.state.message}  onfocus="this.value=''" placeholder="Enter your message" onChange={this.handleMessage} />
         </div>
         <div class="form"> 
         <button class="btn waves-effect waves-light" onClick={this.handleSubmit} type="Reset" name="action">
            Send
            <i class="material-icons right">send</i>
            </button>
         </div>
      </div>
      <div className="col s12 m3 l3">
      <h5><i class="material-icons small">account_circle</i>User`s list</h5>
         <div class="col border scroll">
            <div id="users" >
               {this.state.users.map((value, index) => {
               return <div class="messages border grey lighten-5 mt">{value}</div>
               })}   
            </div>
         </div>
      </div>
   </div>
</div>
            
        );
    }
}
 
export default messages;