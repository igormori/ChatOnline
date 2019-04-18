import React, { Component } from 'react';
import './chat.css'
import { API } from '../FrontEndController'
import { DATE } from '../FrontEndController'
import { TIME } from '../FrontEndController'
import {RND} from '../FrontEndController'
import { CheckUserConnected } from '../FrontEndController'

class messages extends Component {

    state ={
        name:"Guest",
        room:"Room not connected",
        messages:[],
        users:[],
        message:""
      }
      
    componentDidMount(){
    // <------ listen for users list update ------->
        this.props.socket.on("new_update",(data)=>{
            this.setState(prevState => { const { messages }  = prevState;messages.push(data.message);return { messages };});
        })
    }
    handleMessage =  event =>{
        this.setState({message: event.target.value})
   
    }
    handleSubmit = event=>{
      event.preventDefault();
        if(CheckUserConnected()){
        // <------ listen messages update   ------->
        API.frontEnd.user.get(this.state.room).then((res)=>{
           var userList =[]
           console.log(this.state.name)
           console.log(this.state.room)
           for (var i = 0; i < res.data.length; i++) {
                  userList.push(res.data[i].user);
             }
            API.frontEnd.messages.post(RND(),localStorage.getItem('userName'),userList,this.state.message,DATE(),TIME(),localStorage.getItem('userRoom')).then((res)=>{
                console.log(res)
            })
        })
        
        this.props.socket.emit("new_message",{message:this.state.message})
    }else{
        window.alert("Please connect first")
    }

    } 

    render() { 
        return ( <div>
<div className="col s10 m10 l10 chat ">
      <div className="col s12 m12 l10 chat ">
         <div >
            <div class="row scroll2 "><h5><i class="material-icons small">message</i>Chat messages</h5>
               <div class="col border scroll">
                  
                  <div id="messages mb-4 " >
                     {this.state.messages.map((value, index) => {
                     return <div class="messages border grey lighten-5 mt">{value}</div>
                     })}   
                  </div>
               </div>
            </div>
         </div>
         <form>
         <div>
            <input id='m' autocomplete='off' placeholder="Enter your message" onChange={this.handleMessage} />
         </div>
         <div class="form float"> <button class="btn waves-effect waves-light" onClick={this.handleSubmit} type="reset" name="action">
            Send
            <i class="material-icons right">send</i>
            </button>
         </div>
         </form>
      </div>
      <div className="col s12 m12 l2 chat z-depth-1">
         <div class="col-4 border">
            <h5><i class="material-icons small">account_circle</i>User`s list</h5>
            <div id="users mb-4 " >
               {this.state.users.map((value, index) => {
               return <div class="messages border grey lighten-5 m-2">{value}</div>
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