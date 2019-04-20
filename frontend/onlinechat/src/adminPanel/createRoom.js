
import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {API} from '../FrontEndController'
import { DATE } from '../FrontEndController'
import { RND } from '../FrontEndController'

class CreateRoom extends React.Component {
    state = {  
        name:"",
        status:""
    }

    handleName = event =>{
        this.setState({name:event.target.value})
    }

    handleStatus = event =>{
        this.setState({status:event.target.value})
    }

    createRoom = event =>{
        API.frontEnd.rooms.create(this.state.name,RND(),DATE(),"not edited yet",this.state.status,).then((res)=>{
            console.log(res)
            window.alert("room created!")
            this.props.history.push("rooms");

        })
    }

    render() { 
        return (<div>
<div className="row ">
      <div className="col s0 m3 l3 ">
      </div>
      <div className="col s0 m6 l6 bg-light p card grey lighten-5">
         <div id="message" className="red-text" role="alert"> {this.state.alert}</div>
        <h5> Create a new room</h5>
        
         <div className="form-group">
            <label><b>Name</b></label>
            <input type="text"  onChange={ this.handleName}/>
         </div>
         
         <div className="form-group">
            <label><b>Status</b></label>
            <input type="text"  onChange={this.handleStatus}/>
         </div>
         <button className="btn blue lighten-2" type="submit" onClick={this.createRoom}>Create Room</button>
      
      </div>
      <div className="col s0 m3 l3">
      
      </div>
   
</div>
        </div>  );
    }
}
 
export default CreateRoom;