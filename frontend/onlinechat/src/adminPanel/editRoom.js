import React from 'react';
import {API} from '../FrontEndController'
import { DATE } from '../FrontEndController'
import './adminPanel.css'

class EditRoom extends React.Component {
    state = { 
        id:"",
        name:"",
        createdDate:"",
        editDate:"",
        status:"",
        alert:""

     }

     componentWillMount(){
         API.frontEnd.rooms.getOne(localStorage.getItem('editRoom')).then((res)=>{
             this.setState({id:res.data[0].id,name:res.data[0].name,createdDate:res.data[0].createdDate,editDate:res.data[0].editDate,status:res.data[0].status})
            })
     }


     handleStatus = event =>{
         this.setState({status:event.target.value})
            console.log(event.target.value)
     }
     
     handleName = event =>{
        this.setState({name:event.target.value})
           console.log(event.target.value)
    }

    editRoom = event =>{
        console.log(this.state.id)
        API.frontEnd.rooms.editOne(localStorage.getItem('editRoom'),this.state.name,this.state.id,this.state.createdDate,DATE(),this.state.status).then((res)=>{
            console.log(res)
            window.alert("room edited")
            this.props.history.push("rooms");
        }).catch((error)=>{
            console.log(error)
            this.setState({alert:"Room name already exists! "})
        })
    }
    render() { 
        return ( <div>
            <div className='container-fluid  p-5'>
   <div className="row ">
      <div className="col s0 m3 l3 ">
      </div>
      <div className="col s0 m6 l6 bg-light p card grey lighten-5">
         <div id="message" className="red-text" role="alert"> {this.state.alert}</div>
        <h5> Edit Room: {localStorage.getItem("editRoom")}</h5>
         <div className="form-group">
            <label ><b>ID: </b></label>
            <b className="text blue-text" >{this.state.id} </b >
            <label><b> CREATED DATE: </b></label>
            <b className="text blue-text" >{this.state.createdDate} </b >
            <label><b> EDIT DATE: </b></label>
            <b className="text blue-text" >{this.state.editDate}</b >
         </div>
         <div className="form-group">
            <label><b>Change name</b></label>
            <input type="text" name="password" value={this.state.name} onChange={ (event) => this.handleName(event)}/>
         </div>
         
         <div className="form-group">
            <label><b>Change Status</b></label>
            <input type="text" name="password" value={this.state.status} onChange={ (event) => this.handleStatus(event)}/>
         </div>
         <button className="btn blue lighten-2" type="submit" onClick={this.editRoom}>Edit Room</button>
      
      </div>
      <div className="col s0 m3 l3">
      
      </div>
   </div>
</div>
        </div>  );
    }
}
 
export default EditRoom;