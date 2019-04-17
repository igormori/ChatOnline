import React, { Component } from 'react';
import './adminPanel.css'
import { Link } from 'react-router-dom'
import axios from "axios"

class AdminPanel extends Component {
  state = {  }
 
  
  changeRouteToEvents = () => {
    this.context.router.push('/admin/eventHistory');
}

  componentWillMount(){
    //Check if user is logged
    var token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
        axios.get(`http://localhost:5000/api/me`,{headers}).then(res =>{
              console.log(res.data)
        }).catch(() => {window.location.href = "/";})
       
    //
    };

  render() {
    return <div>
        <div className='container-fluid '>
          <div className="row">
              <div className="col-0 col-sm-0 col-lg-3 col-xl-3">
              </div>
              <div className="col-12 col-sm-12 col-lg-6 col-xl-6  rounded">
                <div className='container-fluid p-5'>
                      <div className="rows row bg-light rounded z-depth-1">                 
                      <Link className="divs col-4 text-center p-2 rounded-left" to="/admin/eventHystory">
                      <i class="material-icons small">history</i><br></br>
                      Event history  
                      </Link>   
                      <Link className="divs col-4 text-center p-2" to="/admin/chatHistory">
                      <i class="material-icons small">chat</i><br></br>
                        Chat history
                        </Link>  
                      <Link className="divs col-4 text-center p-2 rounded-right" to="/admin/rooms">
                      <i class="material-icons small">home</i><br></br>
                      Rooms
                      </Link>  
                      </div>
                    </div>
              </div>
              <div className="col-0 col-sm-0 col-lg-3 col-xl-3">
              </div>
          </div>
        </div>

    </div>;
  }
}

export default AdminPanel;
